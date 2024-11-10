import { adminUserStatus, IAdminUserData, userStatus } from "@entities/admin";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface UserCardProps {
  card: IAdminUserData;
}

export const UserCard: FC<UserCardProps> = ({ card }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <img src={card?.avatar} alt="" />
        </div>
        <p className="truncate"># {card?.id}</p>
      </div>
      <div className={styles.column}>
        <p className="truncate">{card?.name}</p>
      </div>
      <div className={styles.column}>
        <p className="truncate">{card?.email}</p>
      </div>
      <div className={styles.column}>
        <p className="truncate">{card?.date}</p>
      </div>
      <div
        className={`${styles.status} ${
          card?.status === userStatus.active ? styles.active : styles.banned
        }`}
      >
        <p>
          {t(
            adminUserStatus.find((item) => item.id === card?.status)?.name ||
              "",
          )}
        </p>
      </div>
    </div>
  );
};
