import { createContext } from "react";
import { CryptoWebSocketContextType } from "./model";

export const CryptoWebSocketContext =
  createContext<CryptoWebSocketContextType | null>(null);
