import React, { useState, useEffect } from "react";
import {
  Shield,
  User,
  Phone,
  Mail,
  Lock,
  Key,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface Certificate {
  disk: string;
  path: string;
  name: string;
  alias: string;
}

interface FormData {
  email: string;
  mobile: string;
  password: string;
  inn?: string;
  pnfl?: string;
}

interface WebSocketResponse {
  certificates?: Certificate[];
  keyId?: string;
  type?: string;
  pkcs7_64?: string;
  signer_serial_number?: string;
  signature_hex?: string;
  success: boolean;
  reason?: string;
}

export const ECPRegistration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    mobile: "",
    password: "",
    inn: "",
    pnfl: "",
  });

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [certificatesLoading, setCertificatesLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Подключение к WebSocket и загрузка сертификатов при загрузке компонента
  useEffect(() => {
    const initWebSocket = async () => {
      try {
        setCertificatesLoading(true);
        setError("");

        const websocket = new WebSocket(
          "wss://127.0.0.1:64443/service/cryptapi",
        );

        websocket.onopen = async () => {
          setWs(websocket);

          // Запрос списка сертификатов
          const getCertsMessage = {
            plugin: "pfx",
            name: "list_all_certificates",
          };

          websocket.send(JSON.stringify(getCertsMessage));
        };

        websocket.onmessage = (event) => {
          try {
            const response: WebSocketResponse = JSON.parse(event.data);

            if (response.success && response.certificates) {
              setCertificates(response.certificates);
              if (response.certificates.length === 0) {
                setError("Сертификаты не найдены на компьютере");
              }
            } else {
              setError("Ошибка получения сертификатов");
            }
          } catch (e) {
            setError("Ошибка обработки ответа сервера");
          } finally {
            setCertificatesLoading(false);
          }
        };

        websocket.onerror = () => {
          setError("Не удалось подключиться к криптографическому сервису");
          setCertificatesLoading(false);
        };
      } catch (err) {
        setError("Ошибка подключения к WebSocket");
        setCertificatesLoading(false);
      }
    };

    initWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleCertificateSelect = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setError("");
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.mobile || !formData.password) {
      setError("Заполните все обязательные поля");
      return false;
    }
    if (!formData.inn && !formData.pnfl) {
      setError("Укажите ИНН или ПНФЛ");
      return false;
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Некорректный email");
      return false;
    }
    if (!selectedCertificate) {
      setError("Выберите сертификат для подписи");
      return false;
    }
    return true;
  };

  const sendWebSocketMessage = (message: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!ws) {
        reject(new Error("Нет подключения к WebSocket"));
        return;
      }

      const timeout = setTimeout(() => {
        reject(new Error("Таймаут запроса"));
      }, 30000);

      const handler = (event: MessageEvent) => {
        clearTimeout(timeout);
        ws.removeEventListener("message", handler);

        try {
          const response = JSON.parse(event.data);

          // Обработка отмены ввода пароля
          if (!response.success && response.reason === "Ввод пароля отменен") {
            reject(new Error("Ввод пароля отменен"));
            return;
          }

          if (response.success) {
            resolve(response);
          } else {
            reject(
              new Error(response.reason || "Ошибка криптографического сервиса"),
            );
          }
        } catch (e) {
          reject(new Error("Некорректный ответ сервиса"));
        }
      };

      ws.addEventListener("message", handler);
      ws.send(JSON.stringify(message));
    });
  };

  const handleRegistration = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      // Шаг 1: Загрузка ключа
      const loadKeyMessage = {
        plugin: "pfx",
        name: "load_key",
        arguments: [
          selectedCertificate!.disk,
          selectedCertificate!.path,
          selectedCertificate!.name,
          selectedCertificate!.alias,
        ],
      };

      const keyResponse = await sendWebSocketMessage(loadKeyMessage);
      const keyId = keyResponse.keyId;

      // Шаг 2: Создание подписи
      const dataToSign = formData.inn || formData.pnfl || "";
      const base64Data = btoa(dataToSign);

      const signMessage = {
        plugin: "pkcs7",
        name: "create_pkcs7",
        arguments: [base64Data, keyId, "no"],
      };

      const signResponse = await sendWebSocketMessage(signMessage);

      // Шаг 3: Прикрепление TimeStamp
      const timestampResponse = await fetch(
        "https://stage.goodsign.biz/v1/dsvs/timestamp",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer partner_token",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pkcs7: signResponse.pkcs7_64,
            signatureHex: signResponse.signature_hex,
          }),
        },
      );

      if (!timestampResponse.ok) {
        throw new Error(`Ошибка timestamp API: ${timestampResponse.status}`);
      }

      const timestampData = await timestampResponse.json();

      if (!timestampData.success || !timestampData.timeStampTokenB64) {
        throw new Error("Ошибка получения временной метки");
      }

      // Шаг 4: Финальная регистрация
      const registrationResponse = await fetch(
        "https://stage.goodsign.biz/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password,
            accept: true,
            signature: timestampData.timeStampTokenB64,
          }),
        },
      );

      const registrationData = await registrationResponse.json();

      // Проверка на существующего пользователя
      if (
        registrationData.taxId &&
        registrationData.taxId.includes("validation.unique")
      ) {
        throw new Error("Пользователь с таким ПИНФЛ уже существует в системе");
      }

      if (!registrationResponse.ok) {
        throw new Error(`Ошибка регистрации: ${registrationResponse.status}`);
      }

      if (!registrationData.token) {
        throw new Error("Ошибка регистрации пользователя");
      }

      console.log("Регистрация успешна");
      console.log("Токен:", registrationData.token);

      setRegistrationSuccess(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ошибка регистрации";
      setError(errorMessage);

      // Если отменен ввод пароля - сбрасываем выбранный сертификат
      if (errorMessage === "Ввод пароля отменен") {
        setSelectedCertificate(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const parseCertificateAlias = (alias: string) => {
    const parts = alias.split(",");
    const info: Record<string, string> = {};

    parts.forEach((part) => {
      const [key, value] = part.split("=");
      if (key && value) {
        info[key.trim()] = value.trim();
      }
    });

    return {
      name: info.name || "Не указано",
      surname: info.surname || "Не указано",
      location: info.l || "Не указано",
      organization: info.o || "Не указано",
    };
  };

  // Экран успешной регистрации
  if (registrationSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500">
        <div className="w-full max-w-md p-8 text-center shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Регистрация успешна!
          </h2>
          <p className="mb-8 text-gray-600">
            Ваш аккаунт был успешно создан с электронно-цифровой подписью.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
          >
            Создать новый аккаунт
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="relative w-full max-w-lg p-8 overflow-hidden shadow-2xl bg-white/90 backdrop-blur-2xl rounded-3xl">
        {/* Анимированная верхняя полоса */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse" />

        {/* Заголовок */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full shadow-xl bg-gradient-to-r from-indigo-500 to-purple-600">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
            Регистрация с ЭЦП
          </h1>
          <p className="text-gray-600">
            Безопасная регистрация с электронно-цифровой подписью
          </p>
        </div>

        {/* Ошибки */}
        {error && (
          <div className="p-4 mb-6 border-l-4 border-red-400 bg-red-50 rounded-r-xl">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-3 text-red-400" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Форма */}
        <div className="mb-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full py-4 pl-12 pr-4 transition-all duration-200 border border-gray-200 outline-none bg-white/70 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
              <input
                type="tel"
                name="mobile"
                placeholder="Телефон (+998901234567)"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full py-4 pl-12 pr-4 transition-all duration-200 border border-gray-200 outline-none bg-white/70 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full py-4 pl-12 pr-4 transition-all duration-200 border border-gray-200 outline-none bg-white/70 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                <input
                  type="text"
                  name="inn"
                  placeholder="ИНН"
                  value={formData.inn}
                  onChange={handleInputChange}
                  className="w-full py-4 pl-12 pr-4 transition-all duration-200 border border-gray-200 outline-none bg-white/70 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
              <div className="relative">
                <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                <input
                  type="text"
                  name="pnfl"
                  placeholder="ПНФЛ"
                  value={formData.pnfl}
                  onChange={handleInputChange}
                  className="w-full py-4 pl-12 pr-4 transition-all duration-200 border border-gray-200 outline-none bg-white/70 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Сертификаты */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-center text-gray-900">
            Выберите сертификат
          </h3>

          {certificatesLoading ? (
            <div className="py-8 text-center">
              <Loader2 className="w-8 h-8 mx-auto mb-4 text-purple-500 animate-spin" />
              <p className="text-gray-600">Загрузка сертификатов...</p>
            </div>
          ) : certificates.length > 0 ? (
            <div className="space-y-3 overflow-y-auto max-h-64">
              {certificates.map((cert, index) => {
                const info = parseCertificateAlias(cert.alias);
                const isSelected = selectedCertificate?.name === cert.name;

                return (
                  <div
                    key={index}
                    onClick={() => handleCertificateSelect(cert)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                      isSelected
                        ? "border-purple-500 bg-purple-50 shadow-lg"
                        : "border-gray-200 bg-white/50 hover:border-purple-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Key
                          className={`w-6 h-6 mr-4 ${isSelected ? "text-purple-600" : "text-gray-400"}`}
                        />
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            {cert.name}
                          </p>
                          <p className="font-medium text-gray-700">
                            {info.name} {info.surname}
                          </p>
                          <p className="text-sm text-gray-500">
                            {info.organization}
                          </p>
                          <p className="text-xs text-gray-400">
                            {info.location}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle className="text-purple-600 w-7 h-7 animate-pulse" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Key className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Сертификаты не найдены</p>
            </div>
          )}
        </div>

        {/* Кнопка регистрации */}
        <button
          onClick={handleRegistration}
          disabled={loading || !selectedCertificate}
          className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-xl flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 mr-3 animate-spin" />
              Создание подписи...
            </>
          ) : (
            "Зарегистрироваться"
          )}
        </button>
      </div>
    </div>
  );
};
