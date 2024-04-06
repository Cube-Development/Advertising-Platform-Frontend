import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link as ScrollLink } from "react-scroll";
import styles from "./styles.module.scss";
import { useAppSelector } from "@shared/store";
import { AuthStateGenerator } from "@features/authStateGenerator";

export const Registration: FC = () => {
  const { t } = useTranslation();
  const { isAuth } = useAppSelector((state) => state.user);

  const registrationButton = (
    <MyButton className={styles.button}>{t(`registration`)}</MyButton>
  );

  const handleRegistration = () => {
    const { loginLink } = AuthStateGenerator();
    window.location.href = loginLink;
  };

  return (
    <>
      {isAuth ? (
        <ScrollLink to="registration" smooth={true} duration={500}>
          {registrationButton}
        </ScrollLink>
      ) : (
        <a onClick={handleRegistration}>{registrationButton}</a>
      )}
    </>
  );
};
