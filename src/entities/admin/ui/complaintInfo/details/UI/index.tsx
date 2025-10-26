import { FC } from "react";
import styles from "./styles.module.scss";
import { IAdminComplaintInfoData } from "@entities/admin";
import { useTranslation } from "react-i18next";
import { MyButton, useToast } from "@shared/ui";
import noUserAvatar from "/images/notFound/noUserAvatar.jpg";
import { useGetPostQuery } from "@entities/project";
import { SeePost } from "@features/order";

interface ComplaintDetailsProps {
  card: IAdminComplaintInfoData;
}

export const ComplaintDetails: FC<ComplaintDetailsProps> = ({ card }) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { data: post, error } = useGetPostQuery({ order_id: card.order_id });

  const handleCopyLink = (text: string = "") => {
    navigator.clipboard.writeText(text);
    toast({
      variant: "default",
      title: t("copy.default"),
    });
  };

  return (
    <div className={styles.wrapper}>
      <h1>{t("admin_panel.complaintInfo.card.details.title")}</h1>
      <div className={styles.details}>
        <div className={styles.platform__wrapper}>
          <div className={styles.platform}>
            <p className={styles.head}>
              {t("admin_panel.complaintInfo.card.details.channel")}:
            </p>
            <div className={styles.info}>
              <div className={styles.logo}>
                <img src={card?.channel?.avatar || noUserAvatar} alt="avatar" />
              </div>
              <div className={styles.title}>
                <p className="truncate">{card?.channel?.name}</p>
                <span
                  className="truncate"
                  onClick={() => handleCopyLink(card?.channel?.id)}
                >
                  # {card?.channel?.id}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.platform}>
            <p className={styles.head}>
              {t("admin_panel.complaintInfo.card.details.owner")}:
            </p>
            <div className={styles.info}>
              <div className={styles.logo}>
                <img
                  src={card?.moderator?.avatar || noUserAvatar}
                  alt="avatar"
                />
              </div>
              <div className={styles.title}>
                <p className="truncate">{card?.owner?.name}</p>
                <span
                  className="truncate"
                  onClick={() => handleCopyLink(card?.owner?.id)}
                >
                  # {card?.owner?.id}
                </span>
              </div>
            </div>
          </div>
          <div className={`${styles.offer} ${styles.id}`}>
            <p>{t("admin_panel.complaintInfo.card.details.id")}:</p>
            <span
              className="truncate"
              onClick={() => handleCopyLink(card?.order_id)}
            >
              {card?.order_id}
            </span>
          </div>
        </div>
        <div className={styles.post_wrapper}>
          <div className={styles.date}>
            <p>{t("admin_panel.complaintInfo.card.details.date")}:</p>
            <span>{card?.post?.published_date}</span>
          </div>
          <div className={styles.time}>
            <p>{t("admin_panel.complaintInfo.card.details.time")}:</p>
            <span>{card?.post?.published_time}</span>
          </div>
          <div className={styles.priority}>
            <p>{t("admin_panel.complaintInfo.card.details.platform")}:</p>
            <span>{card?.channel?.platform}</span>
          </div>
        </div>
        <div className={styles.post_wrapper}>
          <div className={styles.format}>
            <p>{t("admin_panel.complaintInfo.card.details.format")}:</p>
            <span>{card?.post?.format?.big}</span>
          </div>
          <div className={styles.amount}>
            <p>{t("admin_panel.complaintInfo.card.details.amount")}:</p>
            <span>
              {card?.post?.amount.toLocaleString()} {t("symbol")}
            </span>
          </div>
        </div>
        <div className={styles.check__post}>
          <div className={styles.role}>
            <p className="truncate">
              {t("admin_panel.complaintInfo.card.details.link_blogger")}:
            </p>
            <MyButton buttons_type="button__white" className={styles.seePost}>
              <a href={card?.post?.post_url || ""} target="_blank">
                {t("admin_panel.complaintInfo.card.details.buttons.seePost")}
              </a>
            </MyButton>
          </div>
          <div className={styles.role}>
            <p className="truncate">
              {t("admin_panel.complaintInfo.card.details.link_advertiser")}:
            </p>
            <SeePost
              post={post!}
              className={styles.seePost}
              post_deeplink={card?.post?.post_deeplink}
            />
            {/* <MyButton buttons_type="button__white">
              <span>
                {t("admin_panel.complaintInfo.card.details.buttons.seePost")}
              </span>
            </MyButton> */}
          </div>
        </div>
      </div>
    </div>
  );
};
