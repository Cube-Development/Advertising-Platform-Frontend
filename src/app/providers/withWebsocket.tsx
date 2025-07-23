import { CentrifugeProvider } from "@shared/api";
import { CryptoWebSocketProvider } from "@shared/api/cryptoapi/provider";

export const withWebsocket = (Component: React.FC) => {
  return () => (
    <CentrifugeProvider>
      <CryptoWebSocketProvider
        autoConnect={true}
        reconnectAttempts={5}
        reconnectDelay={3000}
      >
        <Component />
      </CryptoWebSocketProvider>
    </CentrifugeProvider>
  );
};
