import { AddIcon, CancelIcon2 } from "@shared/assets";
import { MyButton } from "@shared/ui";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@shared/ui/shadcn-ui/ui/alert-dialog";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ICreatePost, ICreatePostForm, IFile } from "@shared/types/createPost";
import { ContentType, CreatePostFormData } from "@shared/config/createPostData";

interface PostButtonsProps {
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  platformId: number;
}

interface IButton {
  content_type: ContentType;
  content: string;
  url?: string;
}

export const PostButtons: FC<PostButtonsProps> = ({
  getValues,
  setValue,
  platformId,
}) => {
  const { t } = useTranslation();

  const form: ICreatePostForm = { ...getValues() };
  const posts: ICreatePost[] = (form.posts || []).filter(
    (item) => item.platform !== platformId,
  );
  const currentPost: ICreatePost = (form.posts || []).find(
    (item) => item.platform === platformId,
  ) || {
    project_id: form.project_id,
    platform: platformId,
    files: [],
  };
  const currentFiles: IFile[] = (currentPost.files || []).filter(
    (item) => item.content_type !== ContentType.button,
  );
  const currentButtons: IFile[] = (currentPost.files || []).filter(
    (item) => item.content_type === ContentType.button,
  );

  const [buttons, setButtons] = useState<IButton[]>(
    currentButtons ? currentButtons : [],
  );
  const [button, setButton] = useState<IButton>({
    content_type: ContentType.button,
    content: "",
    url: "",
  });

  const handleOnChange = (type: keyof IButton, value: string) => {
    setButton((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleAddButton = () => {
    setButtons([...buttons, button]);
    setButton({ content_type: ContentType.button, content: "", url: "" });
    (document.getElementById("nameInput") as HTMLInputElement).value = "";
    (document.getElementById("linkInput") as HTMLInputElement).value = "";

    currentPost.files = [...currentFiles, ...buttons, button];
    setValue(CreatePostFormData.posts, [...posts, currentPost]);
  };

  const handleRemoveButton = (button: IButton) => {
    setButtons(buttons.filter((item) => item !== button));
    currentPost.files = [...currentFiles];
    setValue(CreatePostFormData.posts, [...posts, currentPost]);
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className={`${styles.open} button `}>
            <AddIcon />
            <p>{t("create_order.create.add_button.title")}</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className={styles.modalContent}>
            <div className={styles.top}>
              <p>{t("create_order.create.add_button.title")}</p>
              <AlertDialogCancel>
                <CancelIcon2 />
              </AlertDialogCancel>
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
                  onChange={(e) => handleOnChange("content", e.target.value)}
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
                  onChange={(e) => handleOnChange("url", e.target.value)}
                />
              </div>
            </div>
            <MyButton
              onClick={handleAddButton}
              className={
                buttons.length === 3 ||
                button.content === "" ||
                button.url === ""
                  ? "deactive"
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
                      <span>№ {index + 1}</span>
                      <p>
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
                <big>{t("create_order.create.add_button.zero")}</big>
              )}
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
