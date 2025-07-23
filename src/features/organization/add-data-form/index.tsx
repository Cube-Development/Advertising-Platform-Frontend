import {
  ADD_LEGAL_DATA,
  ENUM_DIGITAL_LOGIN_TYPE,
  ENUM_DIGITAL_SIGNATURE_AUTH,
  IDigitalFormData,
  InfoCard,
  LEGAL_DATA,
  LOGIN_BY_PASSWORD_DATA,
} from "@entities/organization";
import { PROFILE_FILTER_TABS_LIST } from "@entities/wallet";
import { SelectOptions } from "@features/other";
import { Certificate, useCryptoCertificates } from "@shared/api";
import { useAppSelector } from "@shared/hooks";
import {
  AccountsLoader,
  cn,
  CustomBlockData,
  CustomMiniTabItem,
  CustomMiniTabs,
  MyButton,
} from "@shared/ui";
import { ArrowRight } from "lucide-react";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CertificateSelect } from "../certificate-select";
import { LogoutEcp } from "../logout-ecp";
import { DIGITAL_AUTH_TABS_LIST, DIGITAL_LOGIN_TABS_LIST } from "./model";
import styles from "./styles.module.scss";

interface IAddDataFormProps {
  formState: IDigitalFormData;
  errors: Record<string, any>;
  register: any;
  reset: any;
  setValue: any;
  onSubmit: () => void;
  isLoading?: boolean;
}

export const AddDataForm: FC<IAddDataFormProps> = ({
  formState,
  register,
  errors,
  reset,
  setValue,
  onSubmit = () => {},
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const { certificates, certificatesLoading, error } = useCryptoCertificates();
  const { isAuthEcp } = useAppSelector((state) => state.user);

  // const { profileFilter } = formState;
  // const [ADD_DATA, DATA] = useMemo(() => {
  //   switch (profileFilter?.type) {
  //     case PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT:
  //       return [ADD_LEGAL_DATA, SELF_EMPLOYED_DATA];
  //     case PROFILE_TYPE.INDIVIDUALS:
  //       return [ADD_LEGAL_DATA, SELF_EMPLOYED_DATA];
  //     case PROFILE_TYPE.ENTITIES:
  //       return [ADD_LEGAL_DATA, LEGAL_DATA];
  //     default:
  //       return [ADD_LEGAL_DATA, SELF_EMPLOYED_DATA];
  //   }
  // }, [profileFilter?.type, formStep]);

  // const [ADD_DATA, DATA] = useMemo(() => {
  //   switch (formState?.digitalAuthType) {
  //     case ENUM_DIGITAL_SIGNATURE_AUTH.REGISTRATION:
  //       return [ADD_LEGAL_DATA];
  //     case ENUM_DIGITAL_SIGNATURE_AUTH.LOGIN:
  //       return [LOGIN_BY_PASSWORD_DATA];
  //     default:
  //       return [LOGIN_BY_PASSWORD_DATA];
  //   }
  // }, [formState?.digitalAuthType]);

  const [ADD_DATA, DATA] = useMemo(() => {
    if (
      isAuthEcp ||
      formState?.digitalAuthType === ENUM_DIGITAL_SIGNATURE_AUTH.REGISTRATION
    ) {
      return [ADD_LEGAL_DATA, LEGAL_DATA];
    } else {
      return [LOGIN_BY_PASSWORD_DATA, []];
    }
  }, [isAuthEcp, formState?.digitalAuthType, formState?.digitalLoginType]);

  const TRANSLATE_LIST = PROFILE_FILTER_TABS_LIST.map((el) => {
    return { ...el, name: t(el.name) };
  });

  const onChangeOption = (type: string, value: number) => {
    const newLegal = PROFILE_FILTER_TABS_LIST.find((item) => item.id === value);
    const { name, ...rest } = newLegal!;
    reset({ profileFilter: rest });
  };

  const isNeedCertificate = useMemo(() => {
    if (isAuthEcp) return false;
    else if (
      formState?.digitalAuthType === ENUM_DIGITAL_SIGNATURE_AUTH.REGISTRATION
    ) {
      return true;
    } else if (
      formState?.digitalAuthType === ENUM_DIGITAL_SIGNATURE_AUTH.LOGIN
    ) {
      return (
        formState?.digitalLoginType === ENUM_DIGITAL_LOGIN_TYPE.CERTIFICATE
      );
    }
    return false;
  }, [formState?.digitalAuthType, formState?.digitalLoginType, isAuthEcp]);

  const isLoginByCertificate = useMemo(() => {
    if (formState?.digitalAuthType === ENUM_DIGITAL_SIGNATURE_AUTH.LOGIN) {
      return (
        formState?.digitalLoginType === ENUM_DIGITAL_LOGIN_TYPE.CERTIFICATE
      );
    }
    return false;
  }, [formState?.digitalAuthType, formState?.digitalLoginType]);

  const handleLogout = () => {
    const { profileFilter, digitalAuthType, digitalLoginType } = formState;
    reset({
      profileFilter,
      digitalAuthType,
      digitalLoginType,
    });
  };

  return (
    <form className={cn("frame", styles.wrapper)} onSubmit={onSubmit}>
      <div className="grid items-center grid-cols-[1fr_auto]">
        <p className={styles.title}>
          {!isAuthEcp ? (
            <>{t("organization.form.title.add")}</>
          ) : (
            <>{t("organization.form.title.data")}</>
          )}
        </p>
        {isAuthEcp && <LogoutEcp onClick={handleLogout} />}
      </div>
      {!isAuthEcp && (
        <CustomMiniTabs>
          {DIGITAL_AUTH_TABS_LIST.map((item) => (
            <CustomMiniTabItem
              key={item.type}
              onClick={() => {
                setValue("digitalAuthType", item.type);
              }}
              active={formState?.digitalAuthType === item.type}
              className="flex items-center gap-2"
            >
              <item.icon size={20} />
              {t(item.name)}
            </CustomMiniTabItem>
          ))}
        </CustomMiniTabs>
      )}
      {!isAuthEcp &&
        formState?.digitalAuthType === ENUM_DIGITAL_SIGNATURE_AUTH.LOGIN && (
          <CustomMiniTabs>
            {DIGITAL_LOGIN_TABS_LIST.map((item) => (
              <CustomMiniTabItem
                key={item.type}
                onClick={() => {
                  setValue("digitalLoginType", item.type);
                }}
                active={formState?.digitalLoginType === item.type}
                className="flex items-center gap-2"
              >
                <item.icon size={20} />
                {t(item.name)}
              </CustomMiniTabItem>
            ))}
          </CustomMiniTabs>
        )}

      {formState?.digitalAuthType ===
        ENUM_DIGITAL_SIGNATURE_AUTH.REGISTRATION && (
        <SelectOptions
          typeParameter={"profileFilter"}
          defaultValue={[formState?.profileFilter?.id]}
          onChangeOption={onChangeOption}
          options={TRANSLATE_LIST}
          textData="organization.form.legal"
          single={true}
          showButtonClear={false}
          showListClear={false}
          showCheckBox={false}
          isRow={true}
        />
      )}
      {!isLoginByCertificate && (
        <CustomBlockData
          key={"add_data_form"}
          data={ADD_DATA}
          register={register}
          inputError={errors}
          isRow
          disabled={isAuthEcp}
        />
      )}
      {isNeedCertificate && (
        <CertificateSelect
          certificates={certificates}
          selectedCertificate={formState?.certificate}
          onSelect={(value: Certificate) => setValue("certificate", value)}
          loading={certificatesLoading}
          error={error!}
          placeholder="Выберите сертификат для подписи..."
          showDetails={true}
        />
      )}
      {isAuthEcp && (
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
      <MyButton
        className="md:max-w-[250px] md:justify-self-center"
        type="submit"
      >
        {!isAuthEcp
          ? t("organization.form.buttons.next")
          : t("organization.form.buttons.accept")}
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
