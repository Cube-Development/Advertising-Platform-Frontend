import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { MyButton } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { LoginIcon } from "@shared/assets/icons/login";
import { AuthStateGenerator } from "@features/authStateGenerator";

export const LoginBtn: FC = () => {
  const { t } = useTranslation();
  const [genCode, setGenCode] = useState<number>();
  const handleAuth = () => {
    const generetedCode = AuthStateGenerator();
    setGenCode(generetedCode);
  };

  const loginLink = `https://auth.cubinc.uz/realms/advertisement-blogger/protocol/openid-connect/auth?response_type=code&client_id=adv-blog-client&state=${genCode}&scope=openid profile&redirect_uri=https://ad.cubinc.uz
  `;
  const registrationLink = `https://auth.cubinc.uz/realms/advertisement-blogger/protocol/openid-connect/registrations?response_type=code&client_id=adv-blog-client&state=${genCode}&scope=openid profile&redirect_uri=https://ad.cubinc.uz`;

  return (
    <div className={styles.wrapper}>
      <a onClick={handleAuth} href={registrationLink}>
        <MyButton>{t("registration")}</MyButton>
      </a>
      <a onClick={handleAuth} href={loginLink}>
        <div className={styles.loginBtn}>
          <button>{t("login")}</button>
          <LoginIcon />
        </div>
      </a>
    </div>
  );
};
