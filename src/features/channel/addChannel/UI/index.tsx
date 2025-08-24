import { IAddChannelQuery } from "@entities/channel";
import { LoginModal } from "@features/user";
import { useAppSelector } from "@shared/hooks";
import { MyButton } from "@shared/ui";
import { CircleFadingPlus } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const AddChannel: FC<IAddChannelQuery> = ({ props, path, orange }) => {
  const { t } = useTranslation();
  const { isAuth } = useAppSelector((state) => state.user);

  if (!isAuth) {
    return (
      <LoginModal
        trigger={
          <MyButton
            {...props}
            className={`${styles.button} ${orange ? styles.orange : ""}`}
          >
            <p>{t(`btn_add_platform`)}</p>
            <CircleFadingPlus />
          </MyButton>
        }
      />
    );
  }

  return (
    <Link to={path}>
      <MyButton
        {...props}
        className={`${styles.button} ${orange ? styles.orange : ""}`}
      >
        <p>{t(`btn_add_platform`)}</p>
        <CircleFadingPlus />
      </MyButton>
    </Link>
  );
};
