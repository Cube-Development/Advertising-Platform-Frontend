import { IAdminReviewData } from "@entities/admin";
import { AcceptReview, RejectReview, SeeReview } from "@features/adminPanel";
import { useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ReviewCardProps {
  card: IAdminReviewData;
}

export const ReviewCard: FC<ReviewCardProps> = ({ card }) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleCopyLink = (text: string = "") => {
    navigator.clipboard.writeText(text);
    toast({
      variant: "default",
      title: t("copy.default"),
    });
  };

  return (
    <div
      className={`${styles.wrapper} ${!!card?.closeDate ? styles.accept : styles.wait}`}
    >
      <div className={styles.id} onClick={() => handleCopyLink(card?.id)}>
        <p className="truncate">{card?.id}</p>
      </div>
      <div className={styles.platform}>
        <div className={styles.logo}>
          <img src={card?.channel?.avatar} alt="" />
        </div>
        <div className={styles.info}>
          <p className="truncate">{card?.channel?.name}</p>
          <span
            onClick={() => handleCopyLink(card?.channel?.id)}
            className="truncate"
          >
            # {card?.channel?.id}
          </span>
        </div>
      </div>
      <div className={styles.user}>
        <div className={styles.logo}>
          <img src={card?.sender?.avatar} alt="" />
        </div>
        <div className={styles.info}>
          <p
            onClick={() => handleCopyLink(card?.sender?.email)}
            className={`truncate ${styles.email}`}
          >
            {card?.sender?.email}
          </p>
          <span
            onClick={() => handleCopyLink(card?.sender?.id)}
            className="truncate"
          >
            # {card?.sender?.id}
          </span>
        </div>
      </div>
      {!!card?.closeDate && (
        <div className={styles.user}>
          <div className={styles.logo}>
            <img src={card?.moderator?.avatar} alt="" />
          </div>
          <div className={styles.info}>
            <p className="truncate">{card?.moderator?.name}</p>
            <span
              onClick={() => handleCopyLink(card?.moderator?.id)}
              className="truncate"
            >
              # {card?.moderator?.id}
            </span>
          </div>
        </div>
      )}
      <div className={styles.date}>
        <p>{card?.created}</p>
      </div>
      {!!card?.closeDate && (
        <div className={styles.date}>
          <p>{card?.closeDate}</p>
        </div>
      )}
      <div className={styles.last}>
        <SeeReview
          card={card}
          AcceptBtn={AcceptReview}
          RejectBtn={RejectReview}
        />
      </div>
    </div>
  );
};
