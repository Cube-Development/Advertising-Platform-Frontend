import {
  ENUM_DIGITAL_LOGIN_TYPE,
  IDidoxFormData,
  LOGIN_BY_PASSWORD_DATA,
  useDigitalAuth,
} from "@entities/organization";
import { CertificateSelect } from "@features/organization/certificate-select";
import { Certificate, useCryptoCertificates } from "@shared/api";
import { CustomBlockData } from "@shared/ui";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DIGITAL_LOGIN_TABS_LIST } from "./model";
import { TabItem } from "./ui";
import DidoxLogo from "/images/organization/didox-logo.svg";

export const DidoxLogin: FC = () => {
  const { certificates, certificatesLoading, error } = useCryptoCertificates();
  const { t } = useTranslation();
  const { loginPassword, loginCertificate } = useDigitalAuth();

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IDidoxFormData>({
    defaultValues: {
      certificate: null,
      digitalLoginType: ENUM_DIGITAL_LOGIN_TYPE.CERTIFICATE,
    },
  });
  const formState = watch();

  const handleChangeTab = (type: ENUM_DIGITAL_LOGIN_TYPE) => {
    setValue("digitalLoginType", type);
    reset({
      certificate: null,
      digitalLoginType: type,
    });
  };

  const onSubmit = async (data: IDidoxFormData) => {
    try {
      if (formState?.digitalLoginType === ENUM_DIGITAL_LOGIN_TYPE.CERTIFICATE) {
        await loginCertificate(formState?.certificate!);
      } else if (
        formState?.digitalLoginType === ENUM_DIGITAL_LOGIN_TYPE.PASSWORD
      ) {
        const userData = {
          password: data?.password,
          PNFL: data?.PNFL,
        };
        await loginPassword(userData);
      }
    } catch (error) {
      console.log("[On Submit] error: ", error);
    }
  };

  return (
    <div className="grid items-center justify-center grid-rows-[max-content,1fr] h-full">
      <div className="bg-[#341F47] p-6">
        <img src={DidoxLogo} alt="didox-logo" className="h-8" />
      </div>
      <form
        className="relative block h-full px-5 py-10 space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-4 text-center ">
          <h1 className="text-2xl font-semibold text-gray-900 ">
            {t("organization.login.didox.title")}
          </h1>
          <p className="text-gray-600">
            {t("organization.login.didox.description")}
          </p>
        </div>

        {/* Auth Method Selection */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 ">
            {t("organization.login.didox.choose_type")}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {DIGITAL_LOGIN_TABS_LIST.map((item) => (
              <TabItem
                key={item.type}
                label={item.label}
                icon={item.icon}
                isActive={item.type === formState?.digitalLoginType}
                onClick={() => handleChangeTab(item.type)}
              />
            ))}
          </div>
        </div>
        {formState?.digitalLoginType === ENUM_DIGITAL_LOGIN_TYPE.PASSWORD ? (
          <CustomBlockData
            key={"add_data_form"}
            data={LOGIN_BY_PASSWORD_DATA}
            register={register}
            inputError={errors}
            isRow
            classNameInput="rounded-lg bg-[#F4F5F7] border-[#F4F5F7] h-12"
          />
        ) : (
          <CertificateSelect
            certificates={certificates}
            selectedCertificate={formState?.certificate}
            onSelect={(value: Certificate) => setValue("certificate", value)}
            loading={certificatesLoading}
            error={error!}
            errorText={t("organization.login.didox.certificate.error")}
            placeholder={t("organization.login.didox.certificate.placeholder")}
            loadingText={t("organization.login.didox.certificate.loading")}
            notFoundText={t("organization.login.didox.certificate.not_found")}
            classNameTrigger="rounded-lg bg-[#F4F5F7] border-[#F4F5F7] h-12"
          />
        )}

        <div className="absolute left-0 grid w-full space-y-2 bottom-4">
          <button className="bg-[#FFEA00] rounded-lg p-4 font-semibold m-4">
            {t("organization.login.didox.buttons.login")}
          </button>
          <div className="text-center">
            <span className="text-gray-600">
              {t("organization.login.didox.no_account")}{" "}
            </span>
            <a
              href="https://didox.uz/registration?r=/documents/draft&isInternal=true"
              target="_blank"
              className="font-medium text-[#4d37b3] transition-colors hover:text-[#4d37b3"
            >
              {t("organization.login.didox.register")}
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
