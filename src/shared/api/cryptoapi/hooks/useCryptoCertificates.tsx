import { useContext } from "react";
import { CryptoWebSocketContextType } from "../model";
import { CryptoWebSocketContext } from "../context";

export const useCryptoWebSocket = (): CryptoWebSocketContextType => {
  const context = useContext(CryptoWebSocketContext);
  if (!context) {
    throw new Error(
      "useCryptoWebSocket должен использоваться внутри CryptoWebSocketProvider",
    );
  }
  return context;
};

export const useCryptoCertificates = () => {
  const {
    certificates,
    certificatesLoading,
    loadCertificates,
    loadKey,
    createSignature,
    isConnected,
    error,
  } = useCryptoWebSocket();

  return {
    certificates,
    certificatesLoading,
    loadCertificates,
    loadKey,
    createSignature,
    isConnected,
    error,
  };
};
