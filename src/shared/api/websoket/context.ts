import { createContext } from "react";
import { CentrifugeContextType } from "./model";

export const CentrifugeContext = createContext<
  CentrifugeContextType | undefined
>(undefined);
