import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  User,
  Lock,
  Key,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileSignature,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";

const PARTNER_TOKEN = "your_partner_token_here"; // Замените на реальный токен

interface Certificate {
  disk: string;
  path: string;
  name: string;
  alias: string;
}

interface LoginData {
  pnfl: string;
  password: string;
}

interface AccountData {
  mobile: string;
  email: string;
  notifications: number;
  messengers: any[];
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

type LoginMethod = "password" | "ecp";

export const ECPLoginPage: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("password");

  // Логин по паролю
  const [loginData, setLoginData] = useState<LoginData>({
    pnfl: "",
    password: "",
  });

  // Логин по ЭЦП
  const [loginPnfl, setLoginPnfl] = useState<string>("");

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [certificatesLoading, setCertificatesLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState<string>("");
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [currentPnfl, setCurrentPnfl] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Подключение к WebSocket и загрузка сертификатов при загрузке компонента
  useEffect(() => {
    const initWebSocket = async () => {
      try {
        setCertificatesLoading(true);
        setError("");

        const websocket = new WebSocket(
          "wss://127.0.0.1:64443/service/cryptapi",
        );

        websocket.onopen = () => {
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

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchAccountData = async (token: string) => {
    try {
      const response = await fetch("https://stage.goodsign.biz/v1/account", {
        method: "GET",
        headers: {
          "user-key": token,
          "Partner-Authorization": PARTNER_TOKEN,
        },
      });

      if (!response.ok) {
        throw new Error("Ошибка получения данных аккаунта");
      }

      const data = await response.json();
      setAccountData(data);
    } catch (err) {
      console.error("Ошибка получения данных аккаунта:", err);
      setError("Не удалось загрузить данные аккаунта");
    }
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleCertificateSelect = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setIsDropdownOpen(false);
    setError("");
  };

  const validateLoginForm = (): boolean => {
    if (loginMethod === "password") {
      if (!loginData.pnfl || !loginData.password) {
        setError("Заполните ПИНФЛ и пароль");
        return false;
      }
    } else {
      if (!selectedCertificate) {
        setError("Выберите сертификат для подписи");
        return false;
      }
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

  const handlePasswordLogin = async () => {
    if (!validateLoginForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://stage.goodsign.biz/v1/auth/${loginData.pnfl}/password/ru`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: loginData.password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Неверный ПИНФЛ или пароль");
      }

      if (data.token) {
        setUserToken(data.token);
        setCurrentPnfl(loginData.pnfl);
        setIsAuthenticated(true);
        console.log("Вход выполнен успешно");
        console.log("UserKey:", data.token);

        // Получаем данные аккаунта
        await fetchAccountData(data.token);
      } else {
        throw new Error("Токен не получен");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  const handleECPLogin = async () => {
    if (!validateLoginForm()) return;

    setLoading(true);
    setError("");

    try {
      // Получаем ПИНФЛ из выбранного сертификата
      const certInfo = parseCertificateAlias(selectedCertificate!.alias);
      const pnflFromCert = certInfo.pnfl;

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

      // Шаг 2: Создание подписи (используем ПИНФЛ из сертификата)
      const base64Data = btoa(pnflFromCert);

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

      // Шаг 4: Логин по ЭЦП (используем ПИНФЛ из сертификата)
      const loginResponse = await fetch(
        `https://stage.goodsign.biz/v1/auth/${pnflFromCert}/token/ru`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            signature: timestampData.timeStampTokenB64,
          }),
        },
      );

      const loginResponseData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error("Ошибка входа по ЭЦП");
      }

      if (loginResponseData.token) {
        setUserToken(loginResponseData.token);
        setCurrentPnfl(pnflFromCert); // Сохраняем ПИНФЛ из сертификата
        setIsAuthenticated(true);
        console.log("Вход по ЭЦП выполнен успешно");
        console.log("UserKey:", loginResponseData.token);

        // Получаем данные аккаунта
        await fetchAccountData(loginResponseData.token);
      } else {
        throw new Error("Токен не получен");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ошибка входа по ЭЦП";
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

    // Извлекаем ПИНФЛ из поля 1.2.860.3.16.1.2
    const pnfl = info["1.2.860.3.16.1.2"] || "Не указано";

    // Форматируем дату - берем только день.месяц.год
    const formatDate = (dateStr: string) => {
      if (!dateStr || dateStr === "Не указано") return "Не указано";
      // Формат: 2027.02.05 12:49:11 -> 05.02.2027
      const datePart = dateStr.split(" ")[0]; // Берем только дату без времени
      if (datePart) {
        const [year, month, day] = datePart.split(".");
        return `${day}.${month}.${year}`;
      }
      return dateStr;
    };

    return {
      cn: info.cn || "Не указано",
      name: info.name || "Не указано",
      surname: info.surname || "Не указано",
      location: info.l || "Не указано",
      region: info.st || "Не указано",
      organization: info.o || "Не указано",
      pnfl: pnfl,
      validFrom: formatDate(info.validfrom),
      validTo: formatDate(info.validto),
    };
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserToken("");
    setAccountData(null);
    setCurrentPnfl("");
    setLoginData({ pnfl: "", password: "" });
    setSelectedCertificate(null);
    setIsDropdownOpen(false);
    setError("");
  };

  // Экран после успешной авторизации
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500">
        <div className="w-full max-w-md p-8 shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">
            Добро пожаловать!
          </h2>

          {/* Данные пользователя */}
          <div className="mb-8 space-y-4">
            {/* ПИНФЛ */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">ПИНФЛ</p>
                  <p className="font-semibold text-gray-900">{currentPnfl}</p>
                </div>
              </div>
            </div>

            {/* Телефон */}
            {accountData && (
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Телефон</p>
                    <p className="font-semibold text-gray-900">
                      +{accountData.mobile}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Email */}
            {accountData && (
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900">
                      {accountData.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!accountData && (
              <div className="py-4 text-center">
                <Loader2 className="w-6 h-6 mx-auto mb-2 animate-spin text-emerald-500" />
                <p className="text-sm text-gray-600">
                  Загрузка данных аккаунта...
                </p>
              </div>
            )}
          </div>

          {/* UserKey для разработчиков */}
          <div className="p-4 mb-6 bg-gray-50 rounded-xl">
            <p className="mb-2 text-sm text-gray-500">UserKey:</p>
            <p className="p-2 font-mono text-xs break-all bg-white border rounded">
              {userToken}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
          >
            Выйти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500">
      <div className="relative w-full max-w-lg p-8 overflow-hidden shadow-2xl bg-white/90 backdrop-blur-2xl rounded-3xl">
        {/* Анимированная верхняя полоса */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 animate-pulse" />

        {/* Заголовок */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full shadow-xl bg-gradient-to-r from-blue-500 to-purple-600">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Вход в систему
          </h1>
          <p className="text-gray-600">Авторизация по паролю или ЭЦП</p>
        </div>

        {/* Переключатель способа логина */}
        <div className="flex p-1 mb-8 bg-gray-100 rounded-xl">
          <button
            onClick={() => {
              setLoginMethod("password");
              setError("");
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
              loginMethod === "password"
                ? "bg-white text-blue-600 shadow-md"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <Lock className="w-5 h-5 mr-2" />
            По паролю
          </button>
          <button
            onClick={() => {
              setLoginMethod("ecp");
              setError("");
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
              loginMethod === "ecp"
                ? "bg-white text-blue-600 shadow-md"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <FileSignature className="w-5 h-5 mr-2" />
            По ЭЦП
          </button>
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

        {/* Логин по паролю */}
        {loginMethod === "password" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                <input
                  type="text"
                  name="pnfl"
                  placeholder="ПИНФЛ"
                  value={loginData.pnfl}
                  onChange={handleLoginInputChange}
                  className="w-full py-4 pl-12 pr-4 transition-all duration-200 border border-gray-200 outline-none bg-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                  className="w-full py-4 pl-12 pr-4 transition-all duration-200 border border-gray-200 outline-none bg-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <button
              onClick={handlePasswordLogin}
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-xl flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Вход...
                </>
              ) : (
                "Войти"
              )}
            </button>
          </div>
        )}

        {/* Логин по ЭЦП */}
        {loginMethod === "ecp" && (
          <div className="space-y-6">
            {/* Сертификаты для логина по ЭЦП */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-center text-gray-900">
                Выберите сертификат
              </h3>

              {certificatesLoading ? (
                <div className="py-8 text-center">
                  <Loader2 className="w-8 h-8 mx-auto mb-4 text-blue-500 animate-spin" />
                  <p className="text-gray-600">Загрузка сертификатов...</p>
                </div>
              ) : certificates.length > 0 ? (
                <div className="mb-6" ref={dropdownRef}>
                  {/* Кастомный Select */}
                  <div className="relative">
                    <div
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center justify-between w-full p-4 transition-all duration-200 border border-gray-200 outline-none cursor-pointer bg-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                    >
                      <div className="flex items-center">
                        <Key className="w-5 h-5 mr-3 text-gray-400" />
                        <span
                          className={
                            selectedCertificate
                              ? "text-gray-900"
                              : "text-gray-500"
                          }
                        >
                          {selectedCertificate
                            ? (() => {
                                const info = parseCertificateAlias(
                                  selectedCertificate.alias,
                                );
                                return `${info.cn.toUpperCase()} - ${info.pnfl}`;
                              })()
                            : "Выберите сертификат..."}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </div>

                    {/* Dropdown с карточками */}
                    {isDropdownOpen && (
                      <div className="absolute left-0 right-0 z-50 mt-2 overflow-y-auto bg-white border border-gray-200 shadow-xl top-full rounded-xl max-h-80">
                        {certificates.map((cert, index) => {
                          const info = parseCertificateAlias(cert.alias);
                          const isSelected =
                            selectedCertificate?.name === cert.name;

                          return (
                            <div
                              key={index}
                              onClick={() => handleCertificateSelect(cert)}
                              className={`p-4 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 ${
                                isSelected
                                  ? "bg-blue-50 border-l-4 border-l-blue-500"
                                  : ""
                              }`}
                            >
                              <div className="space-y-2">
                                {/* Основная информация */}
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="text-lg font-bold leading-tight text-gray-900">
                                      {info.cn.toUpperCase()}
                                    </h4>
                                    <p className="mt-1 font-mono text-lg font-semibold text-blue-600">
                                      {info.pnfl}
                                    </p>
                                  </div>
                                  {isSelected && (
                                    <CheckCircle className="flex-shrink-0 w-6 h-6 ml-2 text-blue-600" />
                                  )}
                                </div>

                                {/* Срок действия */}
                                <div className="text-sm text-gray-600">
                                  <span className="font-medium">
                                    до {info.validTo}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-8 mb-6 text-center">
                  <Key className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Сертификаты не найдены</p>
                </div>
              )}
            </div>

            <button
              onClick={handleECPLogin}
              disabled={loading || !selectedCertificate}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-xl flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Подписание...
                </>
              ) : (
                "Подписать"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
