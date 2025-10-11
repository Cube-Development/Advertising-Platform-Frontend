export interface Certificate {
  disk: string;
  path: string;
  name: string;
  alias: string;
}

export interface WebSocketResponse {
  certificates?: Certificate[];
  keyId?: string;
  type?: string;
  pkcs7_64?: string;
  signer_serial_number?: string;
  signature_hex?: string;
  success: boolean;
  reason?: string;
}

export interface CryptoWebSocketState {
  isConnected: boolean;
  isConnecting: boolean;
  certificates: Certificate[];
  certificatesLoading: boolean;
  error: string | null;
  isSignatureLoading: boolean;
  pendingOperationType: string | null;
}

export interface CryptoWebSocketActions {
  sendMessage: (message: any, timeout?: number) => Promise<any>;
  loadCertificates: () => void;
  loadKey: (cert: Certificate) => Promise<string>;
  createSignature: (
    keyId: string,
    data: string,
  ) => Promise<{ pkcs7: string; signatureHex: string }>;
  createAttachedTokenSignature: (
    pkcs7: string,
    signer_serial_number: string,
    tokenBase64: string,
  ) => Promise<{ pkcs7: string }>;
  createAttachedSignature: (
    keyId: string,
    base64Data: string,
  ) => Promise<{ pkcs7: string; signatureHex: string }>;
  reconnect: () => void;
  disconnect: () => void;
  clearError: () => void;
}

export type CryptoWebSocketContextType = CryptoWebSocketState &
  CryptoWebSocketActions;
