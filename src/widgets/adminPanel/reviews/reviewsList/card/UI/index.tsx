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
    <div className={styles.wrapper}>
      <div className={styles.id} onClick={() => handleCopyLink(card?.id)}>
        <p className="truncate">{card?.id}</p>
      </div>
      <div className={styles.platform}>
        <div className={styles.logo}>
          <img src={card?.platform?.avatar} alt="" />
        </div>
        <div className={styles.info}>
          <p className="truncate">{card?.platform?.name}</p>
          <span
            onClick={() => handleCopyLink(card?.platform?.id)}
            className="truncate"
          >
            # {card?.platform?.id}
          </span>
        </div>
      </div>
      <div className={styles.sender}>
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
            onClick={() => handleCopyLink(card?.sender?.userId)}
            className="truncate"
          >
            # {card?.sender?.userId}
          </span>
        </div>
      </div>
      <div className={styles.date}>
        <p>{card?.createdDate}</p>
      </div>
      <div>
        <SeeReview
          card={card}
          AcceptBtn={AcceptReview}
          RejectBtn={RejectReview}
        />
      </div>
    </div>
  );
};
