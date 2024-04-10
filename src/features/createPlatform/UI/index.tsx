import { ArrowIcon2, PaperAirplaneIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface CreatePlatformProps {
  isModalOpen: boolean;
  onChange: () => void;
}

export const CreatePlatform: FC<CreatePlatformProps> = ({
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
            <MyButton className={styles.accept__btn} onClick={onChange}>
              {t("add_platform_btn.accept")}
            </MyButton>
          </div>
        </div>
      )}
    </div>
  );
};
