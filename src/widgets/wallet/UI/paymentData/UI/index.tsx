import { PaymentDidox } from "@features/paymentDidox";
import { ProfileData } from "@features/profileData/UI";
import {
  EntityData,
  IndividualData,
  SelfEmployedCardData,
  SelfEmployedData,
} from "@shared/config/profileData";
import { profileFilter } from "@shared/config/profileFilter";
import { useAppSelector } from "@shared/store";
import { IProfileData } from "@shared/types/profile";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { subprofileFilter } from "@shared/config/profileFilter";

interface PaymentDataProps {
  account: any;
}

export const PaymentData: FC<PaymentDataProps> = ({ account }) => {
  const { t } = useTranslation();
  const [activeAccount, setActiveAccount] = useState(account);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProfileData>();

  const { profileFilter: filter, subprofileFilter: subprofile } =
    useAppSelector((state) => state.filterReducer);

  const typeLegal =
    filter === profileFilter.entity
      ? EntityData
      : filter === profileFilter.individual
        ? IndividualData
        : filter === profileFilter.selfEmployed &&
            subprofile === subprofileFilter.account
          ? SelfEmployedData
          : SelfEmployedCardData;

  return (
    <form className={styles.payment__data} action="">
      <div className={styles.block}>
        <div className={styles.ammount}>
          <p>{t("wallet.ammount.title")}</p>
          <span>{t("wallet.ammount.text")}</span>
          <div>
            <input type="text" />
            <small>{t("symbol")}</small>
          </div>
        </div>
        {typeLegal.map((block, index) => (
          <ProfileData data={block} onChange={setValue} key={index} />
        ))}
      </div>
      <div className={styles.payment}>
        <div>
          <p>{t("wallet.pay.title")}:</p>
        </div>
        <div>
          <p>12151515 {t("symbol")}</p>
          <span>{t("wallet.pay.text")}</span>
        </div>
      </div>
      <div className={styles.accept}>
        <input type="checkbox" />
        <p>
          {`${t("wallet.accept.text1")} `}
          <span>{`${t("wallet.accept.span1")} `}</span>
          {`${t("wallet.accept.and")} `}
          <span>{`${t("wallet.accept.span2")} `}</span>
          {t("wallet.accept.text2")}
        </p>
      </div>
      <div className={styles.accept}>
        <input type="checkbox" />
        <p>{t("wallet.save_data")}</p>
      </div>
      <div className={styles.button}>
        <PaymentDidox />
      </div>
    </form>
  );
};
