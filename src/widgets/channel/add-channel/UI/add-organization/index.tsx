import { ADD_ORGANIZATION_FILTER_TABS_LIST } from "@entities/organization";
import {
  ILegalData,
  PROFILE_FILTER_TABS_LIST,
  PROFILE_STATUS,
  PROFILE_TYPE,
} from "@entities/wallet";
import { BarSubFilter } from "@features/other";
import {
  MOCK_ADD_LEGAL,
  MOCK_ADD_SELF_EMPLOYED,
  PAGE_ANIMATION,
} from "@shared/config";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
import { AddDataForm, NotFoundModal } from "@widgets/organization";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface IAddOrganizationProps {
  step: number;
  variant: typeof PAGE_ANIMATION.animationLeft;
  onChangeStep: (newStep: number) => void;
}

export const AddOrganization: FC<IAddOrganizationProps> = ({
  step,
  variant,
  onChangeStep,
}) => {
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

  const changeTab = (filter: PROFILE_TYPE) => {
    const item = PROFILE_FILTER_TABS_LIST.find((item) => item.type === filter)!;
    const newFilter = { type: item?.type, id: item?.id };
    reset({
      profileFilter: newFilter,
    });
    setFormStep(0);
  };

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
    <>
      {step === 4 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variant}
          className={styles.wrapper}
        >
          <BarSubFilter
            tab={formState.profileFilter.type}
            tab_list={ADD_ORGANIZATION_FILTER_TABS_LIST}
            changeTab={changeTab}
          />
          <AddDataForm
            formState={formState}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            step={formStep}
          />
          <NotFoundModal
            type={formState.profileFilter.type}
            isOpen={isNotFoundModalOpen}
          />
        </motion.div>
      )}
    </>
  );
};
