import { FC } from "react";
import styles from "./styles.module.scss";
import { IAdminUserData } from "@entities/admin";
import { useTranslation } from "react-i18next";
import { UserCard } from "../card";

interface UsersListProps {
  users: IAdminUserData[];
}

export const UsersList: FC<UsersListProps> = ({ users }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      {users.map((card, index) => (
        <div key={index}>
          <UserCard card={card} />
        </div>
      ))}
    </div>
  );
};
