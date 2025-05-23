import {
  ADMIN_USER_STATUS_LIST,
  IAdminUserData,
  ADMIN_USER_STATUS,
} from "@entities/admin";
import { UserCardMenu } from "@features/adminPanel";
import { useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import noUserAvatar from "/images/notFound/noUserAvatar.jpg";

interface UserCardProps {
  card: IAdminUserData;
}

export const UserCard: FC<UserCardProps> = ({ card }) => {
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
      <div className={styles.info}>
        <div className={styles.logo}>
          <img src={card?.avatar || noUserAvatar} alt="avatar" />
        </div>
        <p
          className={`${styles.click} truncate`}
          onClick={() => handleCopyLink(card?.id)}
        >
          # {card?.id}
        </p>
      </div>
      <div className={styles.column}>
        <p className="truncate">{card?.name}</p>
      </div>
      <div className={`${styles.column} ${styles.click}`}>
        <p className="truncate" onClick={() => handleCopyLink(card?.email)}>
          {card?.email}
        </p>
      </div>
      <div className={styles.column}>
        <p className="truncate">{card?.created}</p>
      </div>
      <div
        className={`${styles.status} ${
          card?.status === ADMIN_USER_STATUS.ACTIVE
            ? styles.active
            : styles.banned
        }`}
      >
        <p className="truncate">
          {t(
            ADMIN_USER_STATUS_LIST.find((item) => item.id === card?.status)
              ?.name || "",
          )}
        </p>
      </div>
      <UserCardMenu card={card} />
    </div>
  );
};
