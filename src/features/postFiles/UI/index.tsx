import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { MyButton } from "@shared/ui";
import { CancelIcon2, ImageIcon } from "@shared/assets";
import { useTranslation } from "react-i18next";
import { BarProfileFilter } from "@features/barProfileFilter/UI";

interface PostFilesProps {}

export const PostFiles: FC<PostFilesProps> = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <MyButton className={styles.wrapper} onClick={handleOpenModal}>
        <div>
          <ImageIcon />
          <p>{t("create_order.create.add_file")}</p>
        </div>
      </MyButton>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.top}>
              <p>{t("create_order.create.add_button.title")}</p>
              <button onClick={handleOpenModal}>
                <CancelIcon2 />
              </button>
            </div>
            {/* <BarProfileFilter /> */}
          </div>
        </div>
      )}
    </div>
  );
};
