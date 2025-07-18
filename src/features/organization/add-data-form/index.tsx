import {
  ADD_LEGAL_DATA,
  ADD_SELF_EMPLOYED_DATA,
  ILegalData,
  InfoCard,
  LEGAL_DATA,
  SELF_EMPLOYED_DATA,
} from "@entities/organization";
import { PROFILE_FILTER_TABS_LIST, PROFILE_TYPE } from "@entities/wallet";
import { SelectOptions } from "@features/other";
import { AccountsLoader, cn, CustomBlockData, MyButton } from "@shared/ui";
import { ArrowRight } from "lucide-react";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface IAddDataFormProps {
  formState: ILegalData;
  errors: Record<string, any>;
  register: any;
  reset: any;
  onSubmit: () => void;
  isLoading?: boolean;
  formStep: number;
  setFormStep: (step: number) => void;
}

export const AddDataForm: FC<IAddDataFormProps> = ({
  formState,
  register,
  errors,
  reset,
  onSubmit = () => {},
  isLoading = false,
  formStep = 0,
  setFormStep,
}) => {
  const { t } = useTranslation();

  const { profileFilter } = formState;
  const [ADD_DATA, DATA] = useMemo(() => {
    switch (profileFilter?.type) {
      case PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT:
        return [ADD_SELF_EMPLOYED_DATA, SELF_EMPLOYED_DATA];
      case PROFILE_TYPE.INDIVIDUALS:
        return [ADD_SELF_EMPLOYED_DATA, SELF_EMPLOYED_DATA];
      case PROFILE_TYPE.ENTITIES:
        return [ADD_LEGAL_DATA, LEGAL_DATA];
      default:
        return [ADD_SELF_EMPLOYED_DATA, SELF_EMPLOYED_DATA];
    }
  }, [profileFilter?.type, formStep]);
  const TRANSLATE_LIST = PROFILE_FILTER_TABS_LIST.map((el) => {
    return { ...el, name: t(el.name) };
  });

  const onChangeOption = (type: string, value: number) => {
    const newLegal = PROFILE_FILTER_TABS_LIST.find((item) => item.id === value);
    const { name, ...rest } = newLegal!;
    reset({ profileFilter: rest });
    setFormStep(0);
  };

  return (
    <form className={cn("frame", styles.wrapper)} onSubmit={onSubmit}>
      <p className={styles.title}>{t("add_organization.add_form.title")}</p>
      <SelectOptions
        typeParameter={"profileFilter"}
        defaultValue={[formState?.profileFilter?.id]}
        onChangeOption={onChangeOption}
        options={TRANSLATE_LIST}
        textData="add_organization.add_form.legal"
        single={true}
        showButtonClear={false}
        showListClear={false}
        showCheckBox={false}
        isRow={true}
      />
      {!!formState?.profileFilter?.id && (
        <CustomBlockData
          key={"add_data_form"}
          data={ADD_DATA}
          register={register}
          inputError={errors}
          isRow
          disabled={formStep === 1}
        />
      )}
      {formStep === 1 && (
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
      {formStep === 1 && (
        <p className={styles.didox}>
          {t("add_organization.add_form.didox.text")}
        </p>
      )}
      <MyButton
        className="md:max-w-[250px] md:justify-self-center"
        type="submit"
      >
        {formStep === 0
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
