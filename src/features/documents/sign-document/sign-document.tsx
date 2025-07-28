import { useSignDocument } from "@entities/documents";
import { MyButton } from "@shared/ui";
import { PenTool } from "lucide-react";
import { FC, MouseEvent } from "react";

interface ISignDocumentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  documentId: string;
}

export const SignDocument: FC<ISignDocumentProps> = ({
  documentId,
  ...props
}) => {
  const { sign } = useSignDocument();

  const { onClick, ...rest } = props;
  const handleSign = async () => {
    await sign(documentId);
    // console.log("responce", response);
  };
  return (
    <MyButton
      {...rest}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        handleSign();
        // onClick?.(e);
      }}
    >
      <PenTool size={18} />
      {props?.disabled ? "Подписан" : "Подписать"}
    </MyButton>
  );
};
