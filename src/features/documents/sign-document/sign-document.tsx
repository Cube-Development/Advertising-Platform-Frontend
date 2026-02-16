import { useSignDocument } from "@entities/documents";
import { MyButton } from "@shared/ui";
import { Loader2, PenTool } from "lucide-react";
import { FC, MouseEvent } from "react";

interface ISignDocumentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  documentId: string;
  owner: 0 | 1;
  isLoading?: boolean;
  onSigned?: () => void | Promise<void>;
}

export const SignDocument: FC<ISignDocumentProps> = ({
  documentId,
  owner,
  isLoading,
  onSigned,
  ...props
}) => {
  const {
    signExist,
    isLoading: isLoadingSign,
    isSignatureLoading,
  } = useSignDocument();
  const { onClick, disabled, ...rest } = props;
  const handleSign = async () => {
    const isSuccessSigned = await signExist(documentId, owner);
    if (!isSuccessSigned) return;
    onSigned && (await onSigned());
  };

  return (
    <MyButton
      {...rest}
      disabled={disabled || isLoading || isLoadingSign || isSignatureLoading}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        handleSign();
        onClick && onClick?.(e);
      }}
    >
      <PenTool size={18} />
      {disabled ? "Подписан" : "Подписать"}
      {(isLoading || isLoadingSign || isSignatureLoading) && (
        <Loader2 className="animate-spin" size={20} />
      )}
    </MyButton>
  );
};
