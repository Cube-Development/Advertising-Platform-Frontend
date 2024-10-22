import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useToast } from "@shared/ui";
import { BarSubrofileFilter, CreateLegal, LegalForm } from "@features/wallet";
import { BarSubfilter } from "@features/other";
import {
  EntityData,
  ILegalData,
  IndividualData,
  SelfEmployedCardData,
  SelfEmployedData,
  profileTypesName,
  profileTypesNum,
  subprofileFilterTypes,
  useCreateLegalMutation,
} from "@entities/wallet";
import { pageFilter } from "@shared/routing";

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
        type: profileTypesName.selfEmployedAccounts,
        id: profileTypesNum.selfEmployedAccounts,
      },
      subprofileFilter: {
        type: subprofileFilterTypes.account,
        id: profileTypesNum.selfEmployedAccounts,
      },
    },
  });
  const formState = watch();

  const typeLegal =
    formState.profileFilter.type === profileTypesName.entities
      ? EntityData
      : formState.profileFilter.type === profileTypesName.individuals
        ? IndividualData
        : formState.profileFilter.type ===
              profileTypesName.selfEmployedAccounts &&
            formState.subprofileFilter.type === subprofileFilterTypes.account
          ? SelfEmployedData
          : SelfEmployedCardData;

  const [createLegal, { isLoading }] = useCreateLegalMutation();

  const onSubmit: SubmitHandler<ILegalData> = async (data) => {
    const dataWithLegalType = {
      ...data,
      type_legal: formState.profileFilter.id,
    };
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
          <BarSubfilter
            page={pageFilter.profile}
            resetValues={reset}
            profileFilter={formState.profileFilter}
            changeProfile={(profilefilter) =>
              setValue("profileFilter", profilefilter)
            }
          />

          <div className={styles.block}>
            {formState.profileFilter.type ===
              profileTypesName.selfEmployedAccounts && (
              <BarSubrofileFilter
                resetValues={reset}
                subprofileFilter={formState.subprofileFilter}
                changeSubprofile={(subprofile: {
                  type: subprofileFilterTypes;
                  id: profileTypesNum;
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
            <input type="checkbox" />
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
