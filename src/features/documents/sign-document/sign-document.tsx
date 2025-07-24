import {
  useGetSignInfoEDOMutation,
  useSignDocument,
} from "@entities/documents";
import { MyButton } from "@shared/ui";
import { FC } from "react";

interface ISignDocumentProps {
  documentId: string; // ID документа для подписи
  disabled: boolean; // Флаг, указывающий, подписан ли документ
}

export const SignDocument: FC<ISignDocumentProps> = ({
  documentId,
  disabled = false,
}) => {
  const [toSign] = useGetSignInfoEDOMutation();
  const { sign } = useSignDocument();
  const handleSign = async () => {
    await sign(documentId);
    // console.log("responce", response);
  };
  return (
    <MyButton disabled={disabled} onClick={handleSign}>
      {disabled ? "Подписан" : "Подписать"}
    </MyButton>
  );
};
