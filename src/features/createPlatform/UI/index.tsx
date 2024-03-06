import { ArrowIcon2, TelegramIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const CreatePlatform: FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log("handleOpenModal");
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    console.log("handleCloseModal");
  };

  return (
    <div>
      <MyButton className={styles.button} onClick={handleOpenModal}>
        <div>
          {t("add_platform_btn.create")}
          <ArrowIcon2 />
        </div>
      </MyButton>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div>
              <TelegramIcon />
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
            <MyButton className={styles.accept__btn} onClick={handleCloseModal}>
              {t("add_platform_btn.accept")}
            </MyButton>
          </div>
        </div>
      )}
    </div>
  );
};
