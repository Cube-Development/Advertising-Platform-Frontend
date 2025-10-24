import { ContentType, IFile } from "@entities/project";
import { AddIcon, CancelIcon2 } from "@shared/assets";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  MyButton,
} from "@shared/ui";
import { FC, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { CreateTemplateFormData } from "@widgets/createTemplatePost/model/createTemplateFormType";

interface TemplatePostButtonsProps {
  setValue: UseFormSetValue<CreateTemplateFormData>;
  formState: CreateTemplateFormData;
}

export const TemplatePostButtons: FC<TemplatePostButtonsProps> = ({
  setValue,
  formState,
}) => {
  const { t } = useTranslation();
  const [buttonName, setButtonName] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");

  // Получаем все кнопки из formState
  const currentButtons =
    formState?.files?.filter(
      (file) => file.content_type === ContentType.button,
    ) || [];

  const handleAddButton = () => {
    if (buttonName.trim() && buttonUrl.trim()) {
      const newButton: IFile = {
        content_type: ContentType.button,
        content: buttonName.trim(),
        url: buttonUrl.trim(),
      };

      // Добавляем новую кнопку к существующим файлам
      const updatedFiles = [...(formState?.files || []), newButton];
      setValue("files", updatedFiles);

      // Очищаем поля ввода
      setButtonName("");
      setButtonUrl("");
    }
  };

  const handleRemoveButton = (buttonToRemove: IFile) => {
    // Удаляем кнопку из файлов
    const updatedFiles =
      formState?.files?.filter(
        (file) =>
          !(
            file.content_type === ContentType.button &&
            file.content === buttonToRemove.content &&
            file.url === buttonToRemove.url
          ),
      ) || [];

    setValue("files", updatedFiles);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <div className={`${styles.open} button`}>
          <div className={styles.icon}>
            <AddIcon />
          </div>
          <p className="truncate">
            {t("create_order.create.add_button.title")}
          </p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogDescription className="sr-only"></AlertDialogDescription>
        <div className={styles.modalContent}>
          <div className={styles.top}>
            <AlertDialogTitle className={styles.title}>
              {t("create_order.create.add_button.title")}
            </AlertDialogTitle>
            <AlertDialogCancel>
              <CancelIcon2 />
            </AlertDialogCancel>
          </div>

          <div className={styles.inputs}>
            <div>
              <p>{t("create_order.create.add_button.name.title")}</p>
              <input
                type="text"
                placeholder={t(
                  "create_order.create.add_button.name.default_value",
                )}
                value={buttonName}
                onChange={(e) => setButtonName(e.target.value)}
              />
            </div>
            <div>
              <p>{t("create_order.create.add_button.link.title")}</p>
              <input
                type="text"
                placeholder={t(
                  "create_order.create.add_button.link.default_value",
                )}
                value={buttonUrl}
                onChange={(e) => setButtonUrl(e.target.value)}
              />
            </div>
          </div>
          <MyButton
            onClick={handleAddButton}
            className={
              currentButtons.length >= 3 ||
              !buttonName.trim() ||
              !buttonUrl.trim()
                ? "deactive"
                : ""
            }
            disabled={
              currentButtons.length >= 3 ||
              !buttonName.trim() ||
              !buttonUrl.trim()
            }
          >
            <p>{t("create_order.create.add_button.add_button")}</p>
          </MyButton>
          <div
            className={`${styles.all__buttons} ${currentButtons.length ? "" : styles.zero}`}
          >
            {currentButtons.length ? (
              currentButtons.map((button, index) => (
                <div
                  className={styles.row__button}
                  key={`${button.content}-${button.url}-${index}`}
                >
                  <div>
                    <span>№ {index + 1}</span>
                    <p className="truncate">
                      {t("create_order.create.add_button.button")} "
                      {button?.content}"
                    </p>
                  </div>
                  <button onClick={() => handleRemoveButton(button)}>
                    <CancelIcon2 />
                  </button>
                </div>
              ))
            ) : (
              <big className="p-6">
                {t("create_order.create.add_button.zero")}
              </big>
            )}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
