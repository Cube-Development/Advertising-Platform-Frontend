import { useSignDocument } from "@entities/documents";
import { MyButton } from "@shared/ui";
import { Loader, Loader2, PenTool } from "lucide-react";
import { FC, MouseEvent } from "react";

interface ISignDocumentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  documentId: string;
  owner: 0 | 1;
}

export const SignDocument: FC<ISignDocumentProps> = ({
  documentId,
  owner,
  ...props
}) => {
  const { sign, isLoading } = useSignDocument();
  const { onClick, disabled, ...rest } = props;
  const handleSign = async () => {
    await sign(documentId, owner);
  };

  return (
    <MyButton
      {...rest}
      disabled={disabled || isLoading}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        handleSign();
        // onClick?.(e);
      }}
    >
      <PenTool size={18} />
      {props?.disabled ? "Подписан" : "Подписать"}
      {isLoading && <Loader2 className="animate-spin" size={20} />}
    </MyButton>
  );
};
