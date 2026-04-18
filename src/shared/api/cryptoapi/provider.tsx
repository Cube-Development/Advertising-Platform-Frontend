import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CryptoWebSocketContext } from "./context";
import {
  Certificate,
  CryptoWebSocketContextType,
  CryptoWebSocketState,
  WebSocketResponse,
} from "./model";

// ────────────────────────────────────────────
// Утилиты для парсинга X500-имён из alias
// ────────────────────────────────────────────

const getX500Value = (x500: string, field: string): string => {
  const parts = x500.split(/,(?=[A-Z]+=)/);
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(`${field}=`)) {
      return trimmed.slice(field.length + 1);
    }
  }
  return "";
};

const parseCertificateAlias = (
  alias: string,
): Omit<Certificate, "disk" | "path" | "name" | "alias"> => {
  let normalized = alias.toUpperCase();
  normalized = normalized.replace("1.2.860.3.16.1.1=", "INN=");
  normalized = normalized.replace("1.2.860.3.16.1.2=", "PINFL=");

  const CN = getX500Value(normalized, "CN");
  const INN = getX500Value(normalized, "INN");
  const UID = getX500Value(normalized, "UID");
  const PINFL = getX500Value(normalized, "PINFL");
  const serialNumber = getX500Value(normalized, "SERIALNUMBER");
  const O = getX500Value(normalized, "O");
  const T = getX500Value(normalized, "T");

  const validFromStr = getX500Value(normalized, "VALIDFROM");
  const validToStr = getX500Value(normalized, "VALIDTO");

  const validFrom = validFromStr
    ? new Date(validFromStr.replace(/\./g, "-").replace(" ", "T"))
    : undefined;
  const validTo = validToStr
    ? new Date(validToStr.replace(/\./g, "-").replace(" ", "T"))
    : undefined;

  const expired = validTo ? new Date() > validTo : undefined;

  return {
    CN,
    TIN: INN || UID,
    UID,
    PINFL,
    serialNumber,
    validFrom,
    validTo,
    O,
    T,
    expired,
  };
};

// ────────────────────────────────────────────
// Ephemeral WebSocket: один запрос → один ответ → close
// E-IMZO сервер закрывает соединение после ответа
// ────────────────────────────────────────────

const callCryptoApi = (
  url: string,
  message: object,
  timeout: number = 30000,
): Promise<WebSocketResponse> => {
  return new Promise((resolve, reject) => {
    if (!window.WebSocket) {
      reject(new Error("Браузер не поддерживает WebSocket"));
      return;
    }

    let socket: WebSocket;
    let timeoutId: NodeJS.Timeout;
    let settled = false;

    const safeResolve = (value: WebSocketResponse) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      resolve(value);
    };

    const safeReject = (error: Error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      reject(error);
    };

    try {
      socket = new WebSocket(url);
    } catch {
      safeReject(new Error("Не удалось создать WebSocket соединение"));
      return;
    }

    timeoutId = setTimeout(() => {
      socket.close();
      safeReject(new Error("Таймаут запроса"));
    }, timeout);

    socket.onopen = () => {
      socket.send(JSON.stringify(message));
    };

    socket.onmessage = (event) => {
      try {
        const data: WebSocketResponse = JSON.parse(event.data);
        socket.close();
        if (data.success) {
          safeResolve(data);
        } else {
          safeReject(
            new Error(data.reason || "Ошибка криптографического сервиса"),
          );
        }
      } catch {
        socket.close();
        safeReject(new Error("Ошибка обработки ответа сервера"));
      }
    };

    socket.onerror = () => {
      safeReject(new Error("Ошибка подключения к криптографическому сервису"));
    };

    socket.onclose = (event) => {
      if (event.code !== 1000) {
        safeReject(new Error(`WebSocket закрыт с кодом ${event.code}`));
      }
    };
  });
};

// ────────────────────────────────────────────
// Минимальная версия E-IMZO
// ────────────────────────────────────────────

const EIMZO_MIN_MAJOR = 6;
const EIMZO_MIN_MINOR = 0;

// ────────────────────────────────────────────
// Провайдер
// ────────────────────────────────────────────

interface CryptoWebSocketProviderProps {
  children: ReactNode;
  url?: string;
  autoConnect?: boolean;
  reconnectAttempts?: number;
  reconnectDelay?: number;
}

export const CryptoWebSocketProvider: React.FC<
  CryptoWebSocketProviderProps
> = ({
  children,
  url = "wss://127.0.0.1:64443/service/cryptapi",
  autoConnect = true,
  reconnectAttempts = 3,
}) => {
  const [state, setState] = useState<CryptoWebSocketState>({
    isConnected: false,
    isConnecting: false,
    certificates: [],
    certificatesLoading: false,
    error: null,
    isSignatureLoading: false,
    pendingOperationType: null,
    isOutdatedVersion: false,
  });

  const mountedRef = useRef(true);

  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
      isSignatureLoading: false,
      pendingOperationType: null,
    }));
  }, []);

  const setSignatureLoading = useCallback(
    (loading: boolean, operationType: string | null = null) => {
      setState((prev) => ({
        ...prev,
        isSignatureLoading: loading,
        pendingOperationType: operationType,
      }));
    },
    [],
  );

  // ── Проверка доступности E-IMZO ────────────

  const checkConnection = useCallback(
    async (attempt: number = 0): Promise<boolean> => {
      setState((prev) => ({ ...prev, isConnecting: true, error: null }));

      try {
        // 1. Проверка версии
        const versionResponse = await callCryptoApi(
          url,
          { name: "version" },
          5000,
        );

        if (versionResponse.major && versionResponse.minor) {
          const installed =
            parseInt(String(versionResponse.major)) * 100 +
            parseInt(String(versionResponse.minor));
          const required = EIMZO_MIN_MAJOR * 100 + EIMZO_MIN_MINOR;

          if (installed < required) {
            console.warn(
              `⚠️ E-IMZO версия ${versionResponse.major}.${versionResponse.minor} устарела. Требуется ${EIMZO_MIN_MAJOR}.${EIMZO_MIN_MINOR}+`,
            );
            setState((prev) => ({ ...prev, isOutdatedVersion: true }));
          } else {
            setState((prev) => ({ ...prev, isOutdatedVersion: false }));
          }

          console.log(
            `✅ E-IMZO версия: ${versionResponse.major}.${versionResponse.minor}`,
          );
        }

        // 2. Установка API-ключей
        await callCryptoApi(
          url,
          {
            name: "apikey",
            arguments: [
              "localhost",
              "96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B",
              "127.0.0.1",
              "A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F",
              "blogix.uz",
              "CB1B8AE5ED0253C1E0683E88A69098946230F142038B6F7E644D303ACC54D63537DC5D8CDE0D9D76E4C02ADB362EA2817E0CF62B41D3B7CFA4427E4A7460526D",
            ],
          },
          5000,
        );
        console.log("🔑 API-ключи установлены");

        if (!mountedRef.current) return false;

        setState((prev) => ({
          ...prev,
          isConnected: true,
          isConnecting: false,
          error: null,
        }));

        // 3. Загрузить сертификаты
        await loadCertificatesInternal();

        return true;
      } catch (err) {
        console.error("❌ E-IMZO недоступен:", err);

        if (!mountedRef.current) return false;

        if (attempt < reconnectAttempts - 1) {
          console.log(
            `🔄 Попытка переподключения ${attempt + 2}/${reconnectAttempts}...`,
          );
          return checkConnection(attempt + 1);
        }

        setState((prev) => ({
          ...prev,
          isConnected: false,
          isConnecting: false,
          error: "organization.login.didox.certificate.error",
          isSignatureLoading: false,
          pendingOperationType: null,
        }));

        return false;
      }
    },
    [url, reconnectAttempts],
  );

  // ── Загрузка сертификатов ────────────

  const loadCertificatesInternal = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      certificatesLoading: true,
      error: null,
    }));

    try {
      const response = await callCryptoApi(
        url,
        { plugin: "pfx", name: "list_all_certificates" },
        10000,
      );

      const rawCerts = response.certificates || [];
      const parsedCerts: Certificate[] = rawCerts.map((cert) => ({
        ...cert,
        ...parseCertificateAlias(cert.alias),
      }));

      if (!mountedRef.current) return;

      setState((prev) => ({
        ...prev,
        certificates: parsedCerts,
        certificatesLoading: false,
      }));

      console.log(`📋 Загружено ${parsedCerts.length} сертификатов`);
    } catch (err) {
      console.error("❌ Ошибка загрузки сертификатов:", err);

      if (!mountedRef.current) return;

      setState((prev) => ({
        ...prev,
        certificatesLoading: false,
        error: "Ошибка загрузки сертификатов",
      }));
    }
  }, [url]);

  // ── Публичные методы ────────────────

  const sendMessage = useCallback(
    async (
      message: any,
      timeout: number = 30000,
      operationType: string = "unknown",
    ): Promise<any> => {
      setSignatureLoading(true, operationType);

      try {
        const response = await callCryptoApi(url, message, timeout);
        // console.log("📤 Ответ на сообщение:", message.name, response);
        return response;
      } finally {
        setSignatureLoading(false, null);
      }
    },
    [url, setSignatureLoading],
  );

  const loadCertificates = useCallback(() => {
    loadCertificatesInternal();
  }, [loadCertificatesInternal]);

  const loadKey = useCallback(
    async (cert: Certificate): Promise<string> => {
      const message = {
        plugin: "pfx",
        name: "load_key",
        arguments: [cert.disk, cert.path, cert.name, cert.alias],
      };

      // console.log("🔑 Загрузка ключа для сертификата:", cert.name);
      const response = await sendMessage(message, 60000, "load_key");
      // console.log("✅ Ключ загружен:", response.keyId);
      return response.keyId;
    },
    [sendMessage],
  );

  const createSignature = useCallback(
    async (
      keyId: string,
      data: string | number,
      convertToBase64: boolean = true,
    ): Promise<{ pkcs7: string; signatureHex: string }> => {
      let base64Data = String(data);

      if (convertToBase64) {
        const bytes = new TextEncoder().encode(base64Data);
        const binary = Array.from(bytes, (byte) =>
          String.fromCharCode(byte),
        ).join("");
        base64Data = btoa(binary);
      }

      const message = {
        plugin: "pkcs7",
        name: "create_pkcs7",
        arguments: [base64Data, keyId, "no"],
      };

      const response = await sendMessage(message, 60000, "create_pkcs7");
      console.log("✅ Подпись создана");
      return {
        pkcs7: response.pkcs7_64,
        signatureHex: response.signature_hex,
      };
    },
    [sendMessage],
  );

  const createAttachedSignature = useCallback(
    async (
      keyId: string,
      base64Data: string,
    ): Promise<{ pkcs7: string; signatureHex: string }> => {
      const message = {
        plugin: "pkcs7",
        name: "append_pkcs7_attached",
        arguments: [base64Data, keyId],
      };

      const response = await sendMessage(message, 60000, "create_pkcs7");
      console.log("✅ Подпись создана");
      return {
        pkcs7: response.pkcs7_64,
        signatureHex: response.signature_hex,
      };
    },
    [sendMessage],
  );

  const reconnect = useCallback(() => {
    checkConnection(0);
  }, [checkConnection]);

  const disconnect = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isConnected: false,
      isConnecting: false,
    }));
    console.log("🔌 Отключение от CryptoAPI");
  }, []);

  // ── Lifecycle ────────────────────

  useEffect(() => {
    mountedRef.current = true;

    if (autoConnect) {
      console.log("🚀 Инициализация CryptoAPI...");
      checkConnection(0);
    }

    return () => {
      mountedRef.current = false;
    };
  }, [autoConnect, checkConnection]);

  // ── Context ────────────────

  const contextValue: CryptoWebSocketContextType = {
    isConnected: state.isConnected,
    isConnecting: state.isConnecting,
    certificates: state.certificates,
    certificatesLoading: state.certificatesLoading,
    error: state.error,
    isSignatureLoading: state.isSignatureLoading,
    pendingOperationType: state.pendingOperationType,
    isOutdatedVersion: state.isOutdatedVersion,

    sendMessage,
    loadCertificates,
    loadKey,
    createSignature,
    createAttachedSignature,
    reconnect,
    disconnect,
    clearError,
  };

  return (
    <CryptoWebSocketContext.Provider value={contextValue}>
      {children}
    </CryptoWebSocketContext.Provider>
  );
};
