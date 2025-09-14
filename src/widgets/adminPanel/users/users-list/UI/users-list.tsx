import { IAdminUsers, SkeletonAdminUserCard } from "@entities/admin-panel";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { ShowMoreBtn, SpinnerLoaderSmall } from "@shared/ui";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { UserCard } from "../card";
import styles from "./styles.module.scss";

interface UsersListProps {
  data?: IAdminUsers;
  isLoading: boolean;
  isFetching: boolean;
  handleChange: () => void;
}

export const UsersList: FC<UsersListProps> = ({
  data,
  isLoading,
  isFetching,
  handleChange,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.users.bar.id")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.users.bar.name")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.users.bar.email")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.users.bar.date")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.users.bar.status")}</p>
        </div>
      </div>
      {!!data?.users?.length && (
        <div className={styles.cards}>
          {data?.users.map((card, index) => (
            <motion.div
              key={card.id}
              initial="hidden"
              animate="visible"
              custom={index % INTERSECTION_ELEMENTS.ADMIN_USERS}
              variants={PAGE_ANIMATION.animationUp}
            >
              <UserCard card={card} />
            </motion.div>
          ))}
          {(isFetching || isLoading) &&
            Array.from({
              length: INTERSECTION_ELEMENTS.ADMIN_USERS,
            }).map((_, index) => <SkeletonAdminUserCard key={index} />)}
          {!data.isLast && (
            <div className={`${styles.show_more}`} onClick={handleChange}>
              {isLoading || isFetching ? (
                <SpinnerLoaderSmall />
              ) : (
                <ShowMoreBtn />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
