import { ENUM_ROLES } from "@entities/user";
import { ApproveCampaign, CreateOrder } from "@features/createOrder";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import heartAnimation from "/animated/heart_white_lottie.gif";
import { ICreatePostForm } from "@entities/project";
import { UseFormSetValue } from "react-hook-form";
import { SaveProject } from "@features/project";

interface CreateOrderPaymentProps {
  isBlur?: boolean;
  totalAmount: number;
  role: ENUM_ROLES;
  isAllowed: boolean;
  onAction?: () => void;
  onSave?: () => void;
  setValue: UseFormSetValue<ICreatePostForm>;
  formState: ICreatePostForm;
  step: number;
}

export const CreateOrderPayment: FC<CreateOrderPaymentProps> = ({
  isBlur,
  totalAmount,
  role,
  isAllowed,
  onAction,
  onSave,
  setValue,
  formState,
  step,
}) => {
  const { t } = useTranslation();
  const totalAmountCurrent =
    role === ENUM_ROLES.AGENCY
      ? formState?.prices?.reduce(
          (acc, item) => acc + item.selected_format.price,
          0,
        )
      : totalAmount;

  return (
    <div id="payment" className={`layout ${isBlur ? "blur" : ""}`}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.title}>
              <span>{step}</span>
              <p>
                {role === ENUM_ROLES.ADVERTISER
                  ? t("create_order.payment.title")
                  : t(`create_order.payment.approve`)}
              </p>
            </div>
            <div className={styles.info}>
              <div className={styles.lottie}>
                <img src={heartAnimation} alt="heart_lottie_gif" />
              </div>
              <p className={styles.price}>
                {totalAmountCurrent?.toLocaleString()}{" "}
                <span>{t("symbol")}</span>
              </p>
              <p className={styles.description}>
                {role === ENUM_ROLES.ADVERTISER &&
                  t("create_order.payment.description")}
              </p>
            </div>
            <div className={styles.pay_btn}>
              {role === ENUM_ROLES.ADVERTISER ? (
                <div className="grid grid-flow-row gap-4">
                  <CreateOrder
                    disabled={!isAllowed}
                    isAllowed={isAllowed}
                    onAction={onAction}
                    totalAmount={totalAmount}
                    setValue={setValue}
                    formState={formState}
                  />
                  <SaveProject onAction={onSave} />
                </div>
              ) : (
                <ApproveCampaign disabled={!isAllowed} isAllowed={isAllowed} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
