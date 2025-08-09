import { useContext } from "react";
import { CentrifugeContextType } from "../model";
import { CentrifugeContext } from "../context";

export const useCentrifuge = (): CentrifugeContextType => {
  const context = useContext(CentrifugeContext);
  if (!context) {
    throw new Error("useCentrifuge must be used within a CentrifugeProvider");
  }
  return context;
};
