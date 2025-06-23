import { ADD_ORGANIZATION_FILTER_TABS_LIST } from "@entities/organization/config";
import {
  ILegalData,
  PROFILE_FILTER_TABS_LIST,
  PROFILE_STATUS,
  PROFILE_TYPE,
} from "@entities/wallet";
import { BarSubFilter } from "@features/other";
import { MOCK_ADD_LEGAL, MOCK_ADD_SELF_EMPLOYED } from "@shared/config";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
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
    setValue,
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

  const [step, setStep] = useState<number>(0);
  const [isNotFoundModalOpen, setIsNotFoundModalOpen] =
    useState<boolean>(false);

  const changeTab = (filter: PROFILE_TYPE) => {
    const item = PROFILE_FILTER_TABS_LIST.find((item) => item.type === filter)!;
    const newFilter = { type: item?.type, id: item?.id };
    reset({
      profileFilter: newFilter,
    });
    setStep(0);
  };

  const onSubmit = async (data: ILegalData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data.INN == 111999333) {
      setIsNotFoundModalOpen(true);
      return;
    }

    if (step === 0) {
      if (data.profileFilter.type === PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT) {
        reset({ ...data, ...MOCK_ADD_SELF_EMPLOYED });
      } else {
        reset({ ...data, ...MOCK_ADD_LEGAL });
      }
      setStep(1);
      return;
    }

    if (step === 1) {
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
        <div className={styles.title}>
          <p className="truncate">{t("add_organization.title")}</p>
          <ScanLine />
        </div>
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
          step={step}
        />
        <NotFoundModal
          type={formState.profileFilter.type}
          isOpen={isNotFoundModalOpen}
        />
      </div>
    </div>
  );
};
