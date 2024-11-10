import { IAdminReviewData } from "@entities/admin";
import { ArrowLongHorizontalIcon, CancelIcon2, StarIcon } from "@shared/assets";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  MyButton,
} from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SeeReviewProps {
  card: IAdminReviewData;
  AcceptBtn: FC<{ id: string }>;
  RejectBtn: FC<{ id: string }>;
}

export const SeeReview: FC<SeeReviewProps> = ({
  card,
  AcceptBtn,
  RejectBtn,
}) => {
  const { t } = useTranslation();
  return (
    <AlertDialog>
      <AlertDialogTrigger className={styles.trigger}>
        <ArrowLongHorizontalIcon className="icon__grey" />
      </AlertDialogTrigger>
      <AlertDialogContent className={styles.content}>
        <div className={styles.top}>
          <div className={styles.close}>
            <AlertDialogCancel>
              <CancelIcon2 />
            </AlertDialogCancel>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.text__wrapper}>
            <div className={styles.rate}>
              {Array.from({ length: card?.review?.rate }).map((_, index) => (
                <StarIcon key={index} />
              ))}
            </div>
            <div className={styles.text}>
              <p>{card?.review?.text}</p>
            </div>
          </div>
          <div
            className={`${styles.buttons} ${!card?.closeDate ? styles.choose : ""}`}
          >
            {!card?.closeDate ? (
              <>
                <RejectBtn id={card?.id} />
                <AcceptBtn id={card?.id} />
              </>
            ) : (
              <AlertDialogCancel asChild>
                <MyButton>
                  <p>{t("admin_panel.reviews.card.buttons.ok")}</p>
                </MyButton>
              </AlertDialogCancel>
            )}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
