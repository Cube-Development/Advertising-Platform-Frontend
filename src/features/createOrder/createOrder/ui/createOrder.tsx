import { MyButton } from "@shared/ui";
import { Loader } from "lucide-react";
import { ButtonHTMLAttributes, FC } from "react";
import { useTranslation } from "react-i18next";

interface CreateOrderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isAllowed: boolean;
}

export const CreateOrder: FC<CreateOrderProps> = ({ isAllowed, ...props }) => {
  const { t } = useTranslation();
  return (
    <MyButton buttons_type="button__green" type="submit" {...props}>
      {!isAllowed ? (
        <Loader className="animate-spin" stroke="#fff" width={20} height={20} />
      ) : (
        <p>{t(`create_order.payment.pay`)}</p>
      )}
    </MyButton>
  );
};
