import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { MyButton } from "@shared/ui";
import { CancelIcon2, ImageIcon } from "@shared/assets";
import { useTranslation } from "react-i18next";
import { BarProfileFilter } from "@features/barProfileFilter/UI";
import { pageFilter } from "@shared/config/pageFilter";
import { useAppSelector } from "@shared/store";
import { addFileFilter } from "@shared/config/addFileFilter";
import { AddFiles } from "@features/addFiles";
import { AddMediaFiles } from "@features/addMediaFiles";

interface PostFilesProps {
  AddMediaFiles: FC;
  AddFiles: FC;
}

export const PostFiles: FC<PostFilesProps> = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { addFileFilter: filter } = useAppSelector((state) => state.filter);

  const handle = () => {};

  return (
    <>
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
            <BarProfileFilter
              page={pageFilter.createOrderFiles}
              resetValues={handle}
            />
            {filter === addFileFilter.file ? <AddFiles /> : <AddMediaFiles />}
          </div>
        </div>
      )}
    </>
  );
};
