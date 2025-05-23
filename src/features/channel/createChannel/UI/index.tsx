import { PaperAirplaneIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { ENUM_PATHS } from "@shared/routing";

interface CreateChannelProps {
  isModalOpen: boolean;
  onChange: () => void;
}

export const CreateChannel: FC<CreateChannelProps> = ({
  isModalOpen,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div>
              <PaperAirplaneIcon />
              <h1>{t("add_platform.create.send")}</h1>
            </div>
            <div className={styles.text}>
              <p>{t("add_platform.create.moderation")}</p>
              <p>
                {t("add_platform.create.answer.text1")}{" "}
                <span>{t("add_platform.create.answer.span")}</span>{" "}
                {t("add_platform.create.answer.text2")}
              </p>
            </div>
            <Link to={ENUM_PATHS.MY_CHANNELS}>
              <MyButton
                className={styles.accept__btn}
                buttons_type="button__white"
                onClick={onChange}
              >
                {t("add_platform_btn.accept")}
              </MyButton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
