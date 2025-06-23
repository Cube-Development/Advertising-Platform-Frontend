import {
  ADD_LEGAL_DATA,
  ADD_SELF_EMPLOYED_DATA,
  ILegalData,
  LEGAL_DATA,
  SELF_EMPLOYED_DATA,
} from "@entities/organization";
import { PROFILE_TYPE } from "@entities/wallet";
import { AccountsLoader, CustomBlockData, MyButton } from "@shared/ui";
import { ArrowRight } from "lucide-react";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { InfoCard } from "../info-card";
import styles from "./styles.module.scss";

interface IAddDataFormProps {
  formState: ILegalData;
  errors: Record<string, any>;
  register: any;
  onSubmit?: () => void;
  isLoading?: boolean;
  step?: number;
}

export const AddDataForm: FC<IAddDataFormProps> = ({
  formState,
  register,
  errors,
  onSubmit = () => {},
  isLoading = false,
  step = 0,
}) => {
  const { t } = useTranslation();

  const { profileFilter } = formState;
  const [ADD_DATA, DATA] = useMemo(() => {
    switch (profileFilter?.type) {
      case PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT:
        return [ADD_SELF_EMPLOYED_DATA, SELF_EMPLOYED_DATA];
      case PROFILE_TYPE.ENTITIES:
        return [ADD_LEGAL_DATA, LEGAL_DATA];
      default:
        return [ADD_SELF_EMPLOYED_DATA, SELF_EMPLOYED_DATA];
    }
  }, [profileFilter?.type, step]);

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <p className={styles.title}>{t("add_organization.add_form.title")}</p>
      <CustomBlockData
        key={"add_data_form"}
        data={ADD_DATA}
        register={register}
        inputError={errors}
        isRow
        disabled={step === 1}
      />
      {step === 1 && (
        <div className={styles.data}>
          {DATA.map((item, index) => (
            <CustomBlockData
              key={index + (item?.title || "")}
              data={item}
              register={register}
              inputError={errors}
              isRow
              disabled={true}
            />
          ))}
        </div>
      )}
      <InfoCard />
      {step === 1 && (
        <p className={styles.didox}>
          {t("add_organization.add_form.didox.text")}
        </p>
      )}
      <MyButton
        className="md:max-w-[250px] md:justify-self-center"
        type="submit"
      >
        {step === 0
          ? t("add_organization.add_form.buttons.next")
          : t("add_organization.add_form.buttons.accept")}
        {isLoading ? (
          <div className="loader">
            <AccountsLoader />
          </div>
        ) : (
          <ArrowRight />
        )}
      </MyButton>
    </form>
  );
};
