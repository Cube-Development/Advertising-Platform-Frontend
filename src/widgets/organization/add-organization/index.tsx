import {
  ENUM_DIGITAL_LOGIN_TYPE,
  ENUM_DIGITAL_SIGNATURE_AUTH,
  IDigitalFormData,
  ILegalData,
  useDigitalAuth,
  useGetProfileEDOQuery,
} from "@entities/organization";
import { PROFILE_STATUS, PROFILE_TYPE } from "@entities/wallet";
import { AddDataForm } from "@features/organization";
import { useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { CustomTitle } from "@shared/ui";
import { ScanLine } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export const AddOrganization: FC = ({}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthEcp } = useAppSelector((state) => state.user);

  const { data: profile, isLoading } = useGetProfileEDOQuery(undefined, {
    skip: !isAuthEcp,
  });

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IDigitalFormData>({
    defaultValues: {
      profileFilter: {
        type: PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT,
        id: PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT,
      },
      certificate: null,
      digitalAuthType: ENUM_DIGITAL_SIGNATURE_AUTH.REGISTRATION,
      digitalLoginType: ENUM_DIGITAL_LOGIN_TYPE.PASSWORD,
    },
  });
  const formState = watch();

  useEffect(() => {
    if (!isAuthEcp) return;
    if (isLoading) return;
    if (!profile) return;

    reset({
      // type_legal: Number(profile?.type) || 0,
      name: profile?.name || "",
      address: profile?.address || "",
      INN: Number(profile?.tin) || 0,
      checking_account: profile?.account || "",
      bank_name: profile?.bankCode || "",
      bank_mfo: Number(profile?.mfo) || 0,
      phone: profile?.mobile || profile?.phone || "",
      email: profile?.email || "",
      PNFL: Number(profile?.pinfl) || 0,
      registration_number: 0,
      registration_date: "",
      transit_account: "",
      card_number: 0,
      card_date: "",
      password: "",

      profileFilter: {
        type: PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT,
        id: PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT,
      },
      certificate: null,
      digitalAuthType: ENUM_DIGITAL_SIGNATURE_AUTH.REGISTRATION,
      digitalLoginType: ENUM_DIGITAL_LOGIN_TYPE.PASSWORD,
    });
  }, [profile, isLoading, isAuthEcp]);

  const [isNotFoundModalOpen, setIsNotFoundModalOpen] =
    useState<boolean>(false);

  const { registration, loginPassword, loginCertificate } = useDigitalAuth();

  const onSubmit = async (data: ILegalData) => {
    try {
      if (
        formState?.digitalAuthType === ENUM_DIGITAL_SIGNATURE_AUTH.REGISTRATION
      ) {
        const userData: Pick<
          ILegalData,
          "name" | "email" | "phone" | "password"
        > = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
        };
        await registration(
          formState?.certificate!,
          userData,
          data?.INN || data?.PNFL || "",
        );
      } else if (
        formState?.digitalLoginType === ENUM_DIGITAL_LOGIN_TYPE.CERTIFICATE
      ) {
        await loginCertificate(formState?.certificate!);
      } else if (
        formState?.digitalLoginType === ENUM_DIGITAL_LOGIN_TYPE.PASSWORD
      ) {
        const userData: Pick<ILegalData, "password" | "PNFL"> = {
          password: data?.password,
          PNFL: data?.PNFL,
        };
        await loginPassword(userData);
      }

      // if (formStep === 0) {
      //   if (data.profileFilter.type === PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT) {
      //     reset({ ...data, ...MOCK_ADD_SELF_EMPLOYED });
      //   } else {
      //     reset({ ...data, ...MOCK_ADD_LEGAL });
      //   }
      //   setFormStep(1);
      //   return;
      // }

      // if (formStep === 1) {
      //   toast({
      //     variant: "success",
      //     title: t("toasts.add_organization.accept.success"),
      //   });

      //   navigate(ENUM_PATHS.PROFILE);
      //   return;
      // }
    } catch (error) {
      console.log("[On Submit] error: ", error);
    }
  };

  const handleClick = () => {
    if (isAuthEcp) {
      navigate(ENUM_PATHS.PROFILE);
    } else {
      handleSubmit(onSubmit);
    }
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <CustomTitle title={t("organization.title")} icon={<ScanLine />} />
        <AddDataForm
          formState={formState}
          reset={reset}
          register={register}
          setValue={setValue}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        />
        {/* <NotFoundModal
          type={formState.profileFilter.type}
          isOpen={isNotFoundModalOpen}
        /> */}
      </div>
    </div>
  );
};
