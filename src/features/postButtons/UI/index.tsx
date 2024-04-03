import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { MyButton } from "@shared/ui";
import { AddIcon, CancelIcon2 } from "@shared/assets";

interface PostButtonsProps {}

interface IButton {
  name: string;
  link: string;
}

export const PostButtons: FC<PostButtonsProps> = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttons, setButtons] = useState<IButton[]>([]);
  const [button, setButton] = useState<IButton>({ name: "", link: "" });
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOnChange = (type: keyof IButton, value: string) => {
    setButton((prevState) => ({
      ...prevState,
      [type]: value,
    }));

    console.log(button);
  };

  const handleAddButton = () => {
    setButtons([...buttons, button]);
    setButton({ name: "", link: "" });
    (document.getElementById("nameInput") as HTMLInputElement).value = "";
    (document.getElementById("linkInput") as HTMLInputElement).value = "";
  };

  const handleRemoveButton = (button: IButton) => {
    setButtons(buttons.filter((item) => item !== button));
  };

  return (
    <>
      <MyButton className={styles.wrapper} onClick={handleOpenModal}>
        <div>
          <AddIcon />
          <p>{t("create_order.create.add_button.title")}</p>
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

            <div className={styles.inputs}>
              <div>
                <p>{t("create_order.create.add_button.name.title")}</p>
                <input
                  id="nameInput"
                  type="text"
                  placeholder={t(
                    "create_order.create.add_button.name.default_value",
                  )}
                  onChange={(e) => handleOnChange("name", e.target.value)}
                />
              </div>
              <div>
                <p>{t("create_order.create.add_button.link.title")}</p>
                <input
                  id="linkInput"
                  type="text"
                  placeholder={t(
                    "create_order.create.add_button.link.default_value",
                  )}
                  onChange={(e) => handleOnChange("link", e.target.value)}
                />
              </div>
            </div>
            <MyButton
              onClick={handleAddButton}
              className={
                buttons.length === 3 || button.name === "" || button.link === ""
                  ? styles.disabled
                  : ""
              }
            >
              <p>{t("create_order.create.add_button.add_button")}</p>
            </MyButton>
            <div
              className={`${styles.all__buttons} ${buttons.length ? "" : styles.zero}`}
            >
              {buttons.length ? (
                buttons.map((button, index) => (
                  <div className={styles.row__button} key={index}>
                    <div>
                      <span>№ {index}</span>
                      <p>
                        {t("create_order.create.add_button.button")} "
                        {button.name}"
                      </p>
                    </div>
                    <button onClick={() => handleRemoveButton(button)}>
                      <CancelIcon2 />
                    </button>
                  </div>
                ))
              ) : (
                <big>{t("create_order.create.add_button.zero")}</big>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
