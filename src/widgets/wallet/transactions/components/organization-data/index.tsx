import { IWalletOperations, TOP_UP_AMOUNT } from "@entities/wallet";
import { PaymentDidox } from "@features/wallet";
import { useAppSelector } from "@shared/hooks";
import { CustomInput, IParameterData, MyButton } from "@shared/ui";
import { formatWithSpaces } from "@shared/utils";
import { NotLogin, OrganizationDataForm } from "@widgets/organization";
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IOrganizationDataProps {
  amountTitle: string;
  errors: FieldErrors<IWalletOperations>;
  formState: IWalletOperations;
  register: UseFormRegister<IWalletOperations>;
  onSubmit: () => void;
  isLoading?: boolean;
}

export const OrganizationData: FC<IOrganizationDataProps> = ({
  amountTitle,
  errors,
  formState,
  register,
  onSubmit,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const { isAuthEcp } = useAppSelector((state) => state.user);

  const amountText = t(amountTitle, {
    returnObjects: true,
  }) as IParameterData;

  return (
    <div className="relative frame">
      {isAuthEcp ? (
        <form className="grid grid-flow-row gap-5" onSubmit={onSubmit}>
          <CustomInput
            {...register!("amount", { ...TOP_UP_AMOUNT(t) })}
            maxLength={12}
            label={amountText?.title}
            information={amountText?.description}
            placeholder={amountText?.placeholder}
            value={formatWithSpaces(formState?.amount?.toString() || "")}
            error={errors?.amount}
            error_message={errors?.amount?.message}
          />
          <OrganizationDataForm />
          <PaymentDidox isLoading={isLoading} />
        </form>
      ) : (
        <NotLogin />
      )}
    </div>
  );
};
