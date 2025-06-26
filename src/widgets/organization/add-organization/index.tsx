import { ILegalData, PROFILE_STATUS, PROFILE_TYPE } from "@entities/wallet";
import { MOCK_ADD_LEGAL, MOCK_ADD_SELF_EMPLOYED } from "@shared/config";
import { ENUM_PATHS } from "@shared/routing";
import { CustomTitle, useToast } from "@shared/ui";
import { ScanLine } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { AddDataForm, NotFoundModal } from "./ui";

export const AddOrganization: FC = ({}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ILegalData>({
    defaultValues: {
      profileFilter: {
        type: PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT,
        id: PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT,
      },
    },
  });
  const formState = watch();

  const [formStep, setFormStep] = useState<number>(0);
  const [isNotFoundModalOpen, setIsNotFoundModalOpen] =
    useState<boolean>(false);

  const onSubmit = async (data: ILegalData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data.INN == 111999333) {
      setIsNotFoundModalOpen(true);
      return;
    }

    if (formStep === 0) {
      if (data.profileFilter.type === PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT) {
        reset({ ...data, ...MOCK_ADD_SELF_EMPLOYED });
      } else {
        reset({ ...data, ...MOCK_ADD_LEGAL });
      }
      setFormStep(1);
      return;
    }

    if (formStep === 1) {
      toast({
        variant: "success",
        title: t("toasts.add_organization.accept.success"),
      });

      navigate(ENUM_PATHS.PROFILE);
      return;
    }
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <CustomTitle title={t("add_organization.title")} icon={<ScanLine />} />
        <AddDataForm
          formState={formState}
          reset={reset}
          register={register}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          formStep={formStep}
          setFormStep={setFormStep}
        />
        <NotFoundModal
          type={formState.profileFilter.type}
          isOpen={isNotFoundModalOpen}
        />
      </div>
    </div>
  );
};
