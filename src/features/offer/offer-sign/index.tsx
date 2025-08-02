import { SignDocument } from "@features/documents";
import { FC } from "react";

interface OfferSignProps {
  documentId: string;
  isAuthEcp?: boolean;
}

export const OfferSign: FC<OfferSignProps> = ({ documentId, isAuthEcp }) => {
  return <>{isAuthEcp && <SignDocument documentId={documentId} owner={0} />}</>;
};
