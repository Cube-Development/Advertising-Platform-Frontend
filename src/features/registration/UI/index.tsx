import { paths } from "@shared/routing";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import styles from "./styles.module.scss";
import { useAppSelector } from "@shared/store";

export const Registration: FC = () => {
  const { t } = useTranslation();
  const { isAuth } = useAppSelector((state) => state.userReducer);

  const registrationButton = (
    <MyButton className={styles.button}>{t(`registration`)}</MyButton>
  );

  return (
    <>
      {isAuth ? (
        <ScrollLink to="registration" smooth={true} duration={500}>
          {registrationButton}
        </ScrollLink>
      ) : (
        <Link to={paths.main}>{registrationButton}</Link>
      )}
    </>
  );
};
