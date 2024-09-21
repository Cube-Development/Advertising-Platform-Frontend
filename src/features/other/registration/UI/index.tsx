import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link as ScrollLink } from "react-scroll";
import styles from "./styles.module.scss";
import { useAppSelector } from "@shared/hooks";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";

export const Registration: FC = () => {
  const { t } = useTranslation();
  const { isAuth } = useAppSelector((state) => state.user);

  const registrationButton = (
    <MyButton buttons_type="button__orange" className={styles.button}>
      {t(`registration`)}
    </MyButton>
  );

  return (
    <>
      {isAuth ? (
        <ScrollLink
          to="registration"
          smooth={true}
          duration={500}
          offset={-200}
        >
          {registrationButton}
        </ScrollLink>
      ) : (
        <Link to={paths.registration}>{registrationButton}</Link>
      )}
    </>
  );
};
