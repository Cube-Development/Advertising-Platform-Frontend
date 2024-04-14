import { ArrowLongHorizontalIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";

export const CreatePosts: FC = () => {
  const { t } = useTranslation();
  return (
    <Link to={paths.createOrder}>
      <MyButton buttons_type="button__green" className={styles.button}>
        {t(`cart_btn.create_post`)}
        <ArrowLongHorizontalIcon className="default__icon__white" />
      </MyButton>
    </Link>
  );
};
