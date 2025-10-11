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

// Интерфейс для провайдера
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
  reconnectDelay = 2000,
}) => {
  const [state, setState] = useState<CryptoWebSocketState>({
    isConnected: false,
    isConnecting: false,
    certificates: [],
    certificatesLoading: false,
    error: null,
    isSignatureLoading: false,
    pendingOperationType: null,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const messageHandlersRef = useRef<
    Map<
      string,
      {
        resolve: (value: any) => void;
        reject: (error: Error) => void;
        timeout: NodeJS.Timeout;
        operationType: string;
      }
    >
  >(new Map());
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttemptsRef = useRef(0);
  const isManualDisconnectRef = useRef(false);

  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
      isSignatureLoading: false,
      pendingOperationType: null,
    }));
  }, []);

  const generateMessageId = useCallback((message: any): string => {
    return `${message.plugin || "unknown"}_${message.name || "unknown"}_${Date.now()}_${Math.random()}`;
  }, []);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    if (wsRef.current?.readyState === WebSocket.CONNECTING) {
      return;
    }

    setState((prev) => ({
      ...prev,
      isConnecting: true,
      error: null,
      isSignatureLoading: false,
      pendingOperationType: null,
    }));
    isManualDisconnectRef.current = false;

    try {
      const websocket = new WebSocket(url);
      wsRef.current = websocket;

      websocket.onopen = () => {
        setState((prev) => ({
          ...prev,
          isConnected: true,
          isConnecting: false,
          error: null,
          isSignatureLoading: false,
          pendingOperationType: null,
        }));
        reconnectAttemptsRef.current = 0;
        console.log("✅ CryptoAPI WebSocket подключен");

        // Добавляем API-ключ
        addApiKey();
        // Автоматически загружаем сертификаты при подключении
        loadCertificates();
      };

      websocket.onmessage = (event) => {
        try {
          const response: WebSocketResponse = JSON.parse(event.data);

          // Обработка автоматических ответов (например, список сертификатов)
          if (response.success && response.certificates) {
            setState((prev) => ({
              ...prev,
              certificates: response.certificates || [],
              certificatesLoading: false,
            }));
            console.log(
              `📋 Загружено ${response.certificates.length} сертификатов`,
            );
            return;
          }

          // Обработка ответов на конкретные запросы
          const handlers = Array.from(messageHandlersRef.current.entries());
          const handler = handlers.find(([_, h]) => h)?.[1];

          if (handler) {
            const [messageId] = handlers.find(([_, h]) => h === handler) || [];
            if (messageId) {
              clearTimeout(handler.timeout);

              // if (handler.operationType === "create_pkcs7") {
              // }
              setSignatureLoading(false, handler.operationType);

              messageHandlersRef.current.delete(messageId);

              if (
                !response.success &&
                response.reason === "Ввод пароля отменен"
              ) {
                handler.reject(new Error("Ввод пароля отменен"));
                return;
              }

              if (response.success) {
                handler.resolve(response);
              } else {
                handler.reject(
                  new Error(
                    response.reason || "Ошибка криптографического сервиса",
                  ),
                );
              }
            }
          }
        } catch (error) {
          console.error("❌ Ошибка обработки сообщения WebSocket:", error);
          setState((prev) => ({
            ...prev,
            error: "Ошибка обработки ответа сервера",
            isSignatureLoading: false,
          }));
        }
      };

      websocket.onerror = (error) => {
        console.error("❌ Ошибка WebSocket:", error);
        setState((prev) => ({
          ...prev,
          isConnected: false,
          isConnecting: false,
          error: "Ошибка подключения к криптографическому сервису",
          isSignatureLoading: false,
        }));
      };

      websocket.onclose = (event) => {
        setState((prev) => ({
          ...prev,
          isConnected: false,
          isConnecting: false,
          isSignatureLoading: false,
        }));

        console.log("🔌 CryptoAPI WebSocket отключен", {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
        });

        // Отклоняем все ожидающие запросы
        messageHandlersRef.current.forEach((handler) => {
          clearTimeout(handler.timeout);
          handler.reject(new Error("Соединение разорвано"));
        });
        messageHandlersRef.current.clear();

        // Автоматическое переподключение (если не ручное отключение)
        if (
          !isManualDisconnectRef.current &&
          reconnectAttemptsRef.current < reconnectAttempts
        ) {
          reconnectAttemptsRef.current++;
          console.log(
            `🔄 Попытка переподключения ${reconnectAttemptsRef.current}/${reconnectAttempts} через ${reconnectDelay}ms`,
          );

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectDelay);
        } else if (reconnectAttemptsRef.current >= reconnectAttempts) {
          setState((prev) => ({
            ...prev,
            // error: `Не удалось подключиться после ${reconnectAttempts} попыток`,
            error: `organization.login.didox.certificate.error`,
            isSignatureLoading: false,
            pendingOperationType: null,
          }));
        }
      };
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        error: "Не удалось создать WebSocket соединение",
        isSignatureLoading: false,
        pendingOperationType: null,
      }));
    }
  }, [url, reconnectAttempts, reconnectDelay]);

  const disconnect = useCallback(() => {
    isManualDisconnectRef.current = true;

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (wsRef.current) {
      wsRef.current.close(1000, "Manual disconnect");
      wsRef.current = null;
    }

    console.log("🔌 Ручное отключение WebSocket");
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    setTimeout(() => {
      reconnectAttemptsRef.current = 0;
      connect();
    }, 100);
  }, [connect, disconnect]);

  const setSignatureLoading = useCallback(
    (loading: boolean, operationType: string | null = null) => {
      setState((prev) => ({
        ...prev,
        isSignatureLoading: loading,
        pendingOperationType: operationType,
      }));

      if (loading) {
        console.log(`🔄 E-IMZO UI открыто для операции: ${operationType}`);
      } else {
        console.log(`✅ E-IMZO UI закрыто`);
      }
    },
    [],
  );

  const sendMessage = useCallback(
    (
      message: any,
      timeout: number = 30000,
      operationType: string = "unknown",
    ): Promise<any> => {
      return new Promise((resolve, reject) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
          reject(new Error("WebSocket не подключен"));
          return;
        }

        const messageId = generateMessageId(message);

        const timeoutId = setTimeout(() => {
          messageHandlersRef.current.delete(messageId);
          reject(new Error("Таймаут запроса"));
        }, timeout);

        messageHandlersRef.current.set(messageId, {
          resolve,
          reject,
          timeout: timeoutId,
          operationType,
        });
        // if (operationType === "create_pkcs7") {
        // }
        setSignatureLoading(true, operationType);

        try {
          wsRef.current.send(JSON.stringify(message));
          console.log("📤 Отправлено сообщение:", message);
        } catch (error) {
          clearTimeout(timeoutId);
          messageHandlersRef.current.delete(messageId);
          reject(new Error("Ошибка отправки сообщения"));
        }
      });
    },
    [generateMessageId, setSignatureLoading],
  );

  const loadCertificates = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn("⚠️ WebSocket не подключен для загрузки сертификатов");
      return;
    }

    setState((prev) => ({
      ...prev,
      certificatesLoading: true,
      error: null,
      isSignatureLoading: false,
      pendingOperationType: null,
    }));

    const message = {
      plugin: "pfx",
      name: "list_all_certificates",
    };

    wsRef.current.send(JSON.stringify(message));
    console.log("📋 Запрос списка сертификатов отправлен");
  }, []);

  const addApiKey = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn("⚠️ WebSocket не подключен для загрузки сертификатов");
      return;
    }

    const message = {
      name: "apikey",
      arguments: [
        "localhost",
        "96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B",
        "127.0.0.1",
        "A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F",
        "blogix.uz",
        "CB1B8AE5ED0253C1E0683E88A69098946230F142038B6F7E644D303ACC54D63537DC5D8CDE0D9D76E4C02ADB362EA2817E0CF62B41D3B7CFA4427E4A7460526D",
      ],
    };

    wsRef.current.send(JSON.stringify(message));
    console.log("📋 Отправка апи ключей");
  }, []);

  const loadKey = useCallback(
    async (cert: Certificate): Promise<string> => {
      const message = {
        plugin: "pfx",
        name: "load_key",
        arguments: [cert.disk, cert.path, cert.name, cert.alias],
      };

      console.log("🔑 Загрузка ключа для сертификата:", cert.name);
      const response = await sendMessage(message, 6000, "load_key");
      console.log("✅ Ключ загружен:", response.keyId);
      return response.keyId;
    },
    [sendMessage],
  );

  const createSignature = useCallback(
    async (
      keyId: string,
      data: string,
    ): Promise<{
      pkcs7: string;
      signatureHex: string;
      signer_serial_number: string;
    }> => {
      const base64Data = btoa(data);
      const message = {
        plugin: "pkcs7",
        name: "create_pkcs7",
        arguments: [base64Data, keyId, "no"],
      };

      console.log(
        "✍️ Создание подписи для данных:",
        data.substring(0, 20) + "...",
      );
      const response = await sendMessage(message, 6000, "create_pkcs7");
      console.log("✅ Подпись создана");
      return {
        pkcs7: response.pkcs7_64,
        signatureHex: response.signature_hex,
        signer_serial_number: response.signer_serial_number,
      };
    },
    [sendMessage],
  );

  const createAttachedTokenSignature = useCallback(
    async (
      pkcs7: string,
      signer_serial_number: string,
      tokenBase64: string,
    ): Promise<{ pkcs7: string }> => {
      const message = {
        plugin: "pkcs7",
        name: "attach_timestamp_token_pkcs7",
        arguments: [pkcs7, signer_serial_number, tokenBase64],
      };

      const response = await sendMessage(
        message,
        6000,
        "attach_timestamp_token_pkcs7",
      );
      console.log("✅ Подпись создана");
      return {
        pkcs7: response.pkcs7_64,
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

      const response = await sendMessage(message, 6000, "create_pkcs7");
      console.log("✅ Подпись создана");
      return {
        pkcs7: response.pkcs7_64,
        signatureHex: response.signature_hex,
      };
    },
    [sendMessage],
  );

  // Автоподключение при монтировании
  useEffect(() => {
    if (autoConnect) {
      console.log("🚀 Автоподключение к CryptoAPI WebSocket...");
      connect();
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  const contextValue: CryptoWebSocketContextType = {
    // State
    isConnected: state.isConnected,
    isConnecting: state.isConnecting,
    certificates: state.certificates,
    certificatesLoading: state.certificatesLoading,
    error: state.error,
    isSignatureLoading: state.isSignatureLoading,
    pendingOperationType: state.pendingOperationType,

    // Actions
    sendMessage,
    loadCertificates,
    loadKey,
    createSignature,
    createAttachedTokenSignature,
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
