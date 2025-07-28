import { SignDocument } from "@features/documents";
import { FC } from "react";

interface OfferSignProps {
  documentId: string;
  isAuthEcp?: boolean;
  isModalOpen?: boolean;
}

export const OfferSign: FC<OfferSignProps> = ({
  documentId,
  isAuthEcp,
  isModalOpen,
}) => {
  return (
    <>{isAuthEcp && !isModalOpen && <SignDocument documentId={documentId} />}</>
  );
};
