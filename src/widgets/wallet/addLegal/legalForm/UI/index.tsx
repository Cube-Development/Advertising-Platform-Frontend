import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useToast } from "@shared/ui";
import { BarSubrofileFilter, CreateLegal, LegalForm } from "@features/wallet";
import { BarProfileFilter } from "@features/other";
import {
  EntityData,
  ILegalData,
  IndividualData,
  SelfEmployedCardData,
  SelfEmployedData,
  profileTypesName,
  subprofileFilter,
  useCreateLegalMutation,
} from "@entities/wallet";
import { pageFilter } from "@shared/routing";
import { useAppSelector } from "@shared/hooks";

export const AddLegalForm: FC = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ILegalData>();

  const { profileFilter: filter, subprofileFilter: subprofile } =
    useAppSelector((state) => state.filter);

  const typeLegal =
    filter.type === profileTypesName.entities
      ? EntityData
      : filter.type === profileTypesName.individuals
        ? IndividualData
        : filter.type === profileTypesName.selfEmployedAccounts &&
            subprofile.type === subprofileFilter.account
          ? SelfEmployedData
          : SelfEmployedCardData;

  const [createLegal, { isLoading }] = useCreateLegalMutation();

  const onSubmit: SubmitHandler<ILegalData> = async (data) => {
    const dataWithLegalType = {
      ...data,
      type_legal: filter.id,
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
    <div className="container sidebar">
      {isLoading ? (
        "LOADING..."
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
          <BarProfileFilter page={pageFilter.profile} resetValues={reset} />

          <div className={styles.block}>
            {filter.type === profileTypesName.selfEmployedAccounts && (
              <BarSubrofileFilter resetValues={reset} />
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
