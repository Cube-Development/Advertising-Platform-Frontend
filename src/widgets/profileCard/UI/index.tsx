import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { BarProfileFilter } from "@features/barProfileFilter/UI";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProfileData } from "@shared/types/profile";
import {
  SelfEmployedData,
  EntityData,
  IndividualData,
  SelfEmployedCardData,
} from "@shared/config/profileData";
import { ProfileData } from "@features/profileData/UI";
import { CreateProfile } from "@features/createProfile/UI";
import { useAppSelector } from "@shared/store";
import { subprofileFilter } from "@shared/config/profileFilter";
import { BarSubrofileFilter } from "@features/barSubprofileFilter";
import { pageFilter } from "@shared/config/pageFilter";
import { legalAPI } from "@shared/store/services/legalService";
import { profileTypesName } from "@shared/config/profileFilter";

export const ProfileCard: FC = () => {
  const { t } = useTranslation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileData>();

  const { profileFilter: filter, subprofileFilter: subprofile } =
    useAppSelector((state) => state.filterReducer);

  const typeLegal =
    filter.type === profileTypesName.entities
      ? EntityData
      : filter.type === profileTypesName.individuals
        ? IndividualData
        : filter.type === profileTypesName.selfEmployedAccounts &&
            subprofile === subprofileFilter.account
          ? SelfEmployedData
          : SelfEmployedCardData;

  const [createLegal, { isLoading, error, isError, isSuccess }] =
    legalAPI.useCreateLegalMutation();

  const onSubmit: SubmitHandler<IProfileData> = async (data) => {
    const dataWithLegalType = {
      ...data,
      type_legal: filter.id,
    };
    // кастомный обработчик ошибок сделал если че переделаем
    await createLegal(dataWithLegalType).then((data: any) => {
      if (data.error) {
        alert("ПРОИЗОШЛА ОШИБКА ПРИ ЗАПОЛНЕНИИ ДАННЫХ");
      } else {
        console.log("Данные успешно добавлены.");
        reset();
      }
    });
  };

  return (
    <div className="container sidebar">
      {error && (
        <h1 style={{ fontSize: "50px", color: "red", fontWeight: "700" }}>
          ОШИБКА БОЛДИКОООО АКАААААА!!!!
        </h1>
      )}
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
              <ProfileData
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
          <CreateProfile />
        </form>
      )}
    </div>
  );
};
