import { ENUM_INVOICE_TYPE, useCreateOrderInvoice } from "@entities/offer";
import { useAppSelector } from "@shared/hooks";
import { MyButton } from "@shared/ui";
import { Loader2, PenTool } from "lucide-react";
import { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface ISignOrderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  orderId: string;
  docType: ENUM_INVOICE_TYPE;
}

export const SignOrder: FC<ISignOrderProps> = ({
  orderId,
  docType,
  ...props
}) => {
  const { t } = useTranslation();
  const { onClick, disabled, ...rest } = props;
  const { isAuthEcp, isOfferSign } = useAppSelector((state) => state.user);
  const {
    createAndSign: create,
    isLoading,
    isSignatureLoading,
  } = useCreateOrderInvoice();

  const handleSign = async () => {
    if (!isAuthEcp || !isOfferSign) return;
    await create(orderId);
  };

  return (
    <MyButton
      {...rest}
      disabled={disabled || isLoading || isSignatureLoading}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        handleSign();
        onClick && onClick?.(e);
      }}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <PenTool size={18} />
      )}
      {disabled ? t("offer_btn.signed") : t("offer_btn.sign")}
    </MyButton>
  );
};
