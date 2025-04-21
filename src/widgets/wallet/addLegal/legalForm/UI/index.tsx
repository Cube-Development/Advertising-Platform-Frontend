import {
  EntityData,
  ILegalData,
  IndividualData,
  PROFILE_FILTER_TABS_LIST,
  PROFILE_STATUS,
  PROFILE_TYPE,
  SelfEmployedCardData,
  SelfEmployedData,
  SUBPROFILE_TYPE,
  useCreateLegalMutation,
} from "@entities/wallet";
import { BarSubFilter } from "@features/other";
import { BarSubrofileFilter, CreateLegal, LegalForm } from "@features/wallet";
import { CustomCheckbox, useToast } from "@shared/ui";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const AddLegalForm: FC = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ILegalData>({
    defaultValues: {
      profileFilter: {
        type: PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT,
        id: PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT,
      },
      subprofileFilter: {
        type: SUBPROFILE_TYPE.ACCOUNT,
        id: PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT,
      },
    },
  });
  const formState = watch();

  const changeTab = (filter: PROFILE_TYPE) => {
    const item = PROFILE_FILTER_TABS_LIST.find((item) => item.type === filter)!;
    const newFilter = { type: item?.type, id: item?.id };
    setValue("profileFilter", newFilter);
  };

  const typeLegal =
    formState.profileFilter.type === PROFILE_TYPE.ENTITIES
      ? EntityData
      : formState.profileFilter.type === PROFILE_TYPE.INDIVIDUALS
        ? IndividualData
        : formState.profileFilter.type === PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT &&
            formState.subprofileFilter.type === SUBPROFILE_TYPE.ACCOUNT
          ? SelfEmployedData
          : SelfEmployedCardData;

  const [createLegal, { isLoading }] = useCreateLegalMutation();

  const onSubmit: SubmitHandler<ILegalData> = async (data) => {
    const dataWithLegalType = {
      ...data,
      type_legal: formState.profileFilter.id,
    };
    !isLoading &&
      createLegal(dataWithLegalType)
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.add_profile.create.success"),
          });
        })
        .catch(() => {
          toast({
            variant: "error",
            title: t("toasts.add_profile.create.error"),
          });
        });
  };

  return (
    <div className="container">
      {isLoading ? (
        "LOADING..."
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
          <BarSubFilter
            tab={formState.profileFilter.type}
            tab_list={PROFILE_FILTER_TABS_LIST}
            changeTab={changeTab}
          />

          <div className={styles.block}>
            {formState.profileFilter.type ===
              PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT && (
              <BarSubrofileFilter
                resetValues={reset}
                subprofileFilter={formState.subprofileFilter}
                changeSubprofile={(subprofile: {
                  type: SUBPROFILE_TYPE;
                  id: PROFILE_STATUS;
                }) => setValue("subprofileFilter", subprofile)}
              />
            )}
            {typeLegal.map((block, index) => (
              <LegalForm
                inputError={errors}
                data={block}
                register={register}
                key={index}
                isCreateProfile={true}
              />
            ))}
          </div>
          <div className={styles.accept}>
            <CustomCheckbox />
            <p>
              {`${t("add_profile.accept.text1")} `}
              <span>{`${t("add_profile.accept.span1")} `}</span>
              {`${t("add_profile.accept.and")} `}
              <span>{`${t("add_profile.accept.span2")} `}</span>
              {t("add_profile.accept.text2")}
            </p>
          </div>
          <CreateLegal />
        </form>
      )}
    </div>
  );
};
