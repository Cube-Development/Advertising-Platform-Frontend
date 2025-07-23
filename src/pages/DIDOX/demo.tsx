import {
  useCryptoCertificates,
  useCryptoMessage,
  useCryptoWebSocket,
} from "@shared/api";
import { useState } from "react";

export const CryptoWebSocketDemo: React.FC = () => {
  const crypto = useCryptoWebSocket();
  const cryptoMessage = useCryptoMessage();
  const cryptoCerts = useCryptoCertificates();

  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [messagePlugin, setMessagePlugin] = useState("pfx");
  const [messageName, setMessageName] = useState("list_all_certificates");
  const [messageArgs, setMessageArgs] = useState("[]");
  const [customMessage, setCustomMessage] = useState(
    '{"plugin": "pfx", "name": "list_all_certificates"}',
  );
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const handleTestSignature = async () => {
    if (!selectedCert) {
      addLog("❌ Сначала выберите сертификат");
      return;
    }

    try {
      addLog("🔑 Загрузка ключа...");
      const keyId = await cryptoCerts.loadKey(selectedCert);
      addLog(`✅ Ключ загружен: ${keyId}`);

      addLog("✍️ Создание подписи...");
      const signature = await cryptoCerts.createSignature(keyId, "test data");
      addLog(`✅ Подпись создана: ${signature.pkcs7.substring(0, 50)}...`);
    } catch (error) {
      addLog(
        `❌ Ошибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
      );
    }
  };

  const handleSendStructuredMessage = async () => {
    if (!messagePlugin.trim() || !messageName.trim()) {
      addLog("❌ Заполните plugin и name");
      return;
    }

    try {
      const args = messageArgs.trim() ? JSON.parse(messageArgs) : [];
      addLog(
        `📤 Отправка структурированного сообщения: ${messagePlugin}.${messageName}`,
      );
      const response = await cryptoMessage.sendWebSocketMessage(
        messagePlugin,
        messageName,
        args,
      );
      addLog(`📥 Ответ: ${JSON.stringify(response)}`);
    } catch (error) {
      addLog(
        `❌ Ошибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
      );
    }
  };

  const handleSendRawMessage = async () => {
    if (!customMessage.trim()) return;

    try {
      const message = JSON.parse(customMessage);
      addLog(`📤 Отправка raw сообщения: ${customMessage}`);
      const response = await cryptoMessage.sendRawMessage(message);
      addLog(`📥 Ответ: ${JSON.stringify(response)}`);
    } catch (error) {
      addLog(
        `❌ Ошибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
      );
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          🔐 CryptoAPI WebSocket Provider Demo
        </h1>

        {/* Статус подключения */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="flex items-center mb-4 text-xl font-semibold">
            🔌 Статус подключения
          </h2>
          <div className="flex items-center mb-4 space-x-4">
            <div
              className={`w-4 h-4 rounded-full ${crypto.isConnected ? "bg-green-500 animate-pulse" : crypto.isConnecting ? "bg-yellow-500 animate-ping" : "bg-red-500"}`}
            />
            <span className="text-lg font-medium">
              {crypto.isConnected
                ? "✅ Подключен"
                : crypto.isConnecting
                  ? "🔄 Подключение..."
                  : "❌ Отключен"}
            </span>
            {crypto.error && (
              <span className="px-3 py-1 text-sm text-red-600 bg-red-100 rounded-full">
                ⚠️ {crypto.error}
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={crypto.reconnect}
              disabled={crypto.isConnecting}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              🔄 Переподключиться
            </button>
            <button
              onClick={crypto.clearError}
              disabled={!crypto.error}
              className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700 disabled:opacity-50"
            >
              🧹 Очистить ошибку
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Управление сертификатами */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="flex items-center mb-4 text-xl font-semibold">
              📋 Сертификаты ({cryptoCerts.certificates.length})
            </h2>
            <div className="space-y-4">
              <button
                onClick={cryptoCerts.loadCertificates}
                disabled={
                  !crypto.isConnected || cryptoCerts.certificatesLoading
                }
                className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {cryptoCerts.certificatesLoading
                  ? "⏳ Загрузка..."
                  : "📋 Загрузить сертификаты"}
              </button>

              {cryptoCerts.certificates.length > 0 && (
                <select
                  value={selectedCert?.name || ""}
                  onChange={(e) => {
                    const cert = cryptoCerts.certificates.find(
                      (c) => c.name === e.target.value,
                    );
                    setSelectedCert(cert || null);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">🔑 Выберите сертификат</option>
                  {cryptoCerts.certificates.map((cert, index) => (
                    <option key={index} value={cert.name}>
                      {cert.name}
                    </option>
                  ))}
                </select>
              )}

              <button
                onClick={handleTestSignature}
                disabled={!crypto.isConnected || !selectedCert}
                className="w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
              >
                ✍️ Тест подписи
              </button>
            </div>
          </div>

          {/* Отправка структурированных WebSocket сообщений */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="flex items-center mb-4 text-xl font-semibold">
              📡 Отправка WebSocket сообщений
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={messagePlugin}
                  onChange={(e) => setMessagePlugin(e.target.value)}
                  placeholder="🔌 Plugin (например: pfx)"
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={messageName}
                  onChange={(e) => setMessageName(e.target.value)}
                  placeholder="⚡ Name (например: list_all_certificates)"
                  className="p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <textarea
                value={messageArgs}
                onChange={(e) => setMessageArgs(e.target.value)}
                placeholder='📋 Arguments JSON (например: ["arg1", "arg2"] или [] для пустого)'
                className="w-full h-20 p-3 font-mono text-sm border border-gray-300 rounded-lg resize-none"
              />
              <button
                onClick={handleSendStructuredMessage}
                disabled={
                  !crypto.isConnected ||
                  !messagePlugin.trim() ||
                  !messageName.trim()
                }
                className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                📡 Отправить структурированное сообщение
              </button>
            </div>
          </div>
        </div>

        {/* Отправка raw JSON сообщений */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="flex items-center mb-4 text-xl font-semibold">
            🛠️ Отправка Raw JSON сообщений
          </h2>
          <div className="space-y-4">
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full h-32 p-3 font-mono text-sm border border-gray-300 rounded-lg"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSendRawMessage}
                disabled={!crypto.isConnected || !customMessage.trim()}
                className="px-6 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                📤 Отправить Raw JSON
              </button>
              <button
                onClick={() =>
                  setCustomMessage(
                    '{"plugin": "pfx", "name": "list_all_certificates"}',
                  )
                }
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                🔄 Сброс к примеру
              </button>
            </div>
          </div>
        </div>

        {/* Логи */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="flex items-center mb-4 text-xl font-semibold">
            📜 Логи активности
          </h2>
          <div className="p-4 overflow-y-auto font-mono text-sm text-green-400 bg-gray-900 border rounded-lg h-80">
            {logs.length === 0 ? (
              <div className="italic text-gray-500">Логи появятся здесь...</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1 leading-relaxed">
                  {log}
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => setLogs([])}
            className="px-4 py-2 mt-3 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
          >
            🧹 Очистить логи
          </button>
        </div>
      </div>
    </div>
  );
};
