import {
  ContentType,
  CreatePostFormData,
  ICreatePostForm,
  ITgButton,
} from "@entities/project";
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
import { FC, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface PostButtonsProps {
  setValue: UseFormSetValue<ICreatePostForm>;
  platformId: number;
  formState: ICreatePostForm;
  type: CreatePostFormData;
}

export const PostButtons: FC<PostButtonsProps> = ({
  setValue,
  platformId,
  formState,
  type,
}) => {
  const { t } = useTranslation();

  const postsWithoutCurrent = formState?.selectedMultiPostId
    ? formState?.multiposts?.filter(
        (item) => item?.order_id !== formState?.selectedMultiPostId,
      ) || []
    : formState?.posts?.filter(
        (item) =>
          item?.platform !== platformId ||
          (item?.platform === platformId &&
            item?.post_type !== formState?.selectedPostType),
      ) || [];

  const currentPost = formState?.selectedMultiPostId
    ? formState?.multiposts?.find(
        (item) => item?.order_id === formState?.selectedMultiPostId,
      )
    : formState?.posts?.find(
        (item) =>
          item?.platform === platformId &&
          item?.post_type === formState?.selectedPostType,
      ) || {
        platform: platformId,
      };

  const [buttons, setButtons] = useState<ITgButton[]>(
    currentPost?.buttons || [],
  );
  const [button, setButton] = useState<ITgButton>({
    content_type: ContentType.button,
    content: "",
    url: "",
  });

  useEffect(() => {
    setButtons(currentPost?.buttons || []);
  }, [
    formState?.isMultiPost,
    formState?.selectedMultiPostId,
    formState?.posts,
    formState?.multiposts,
  ]);

  const handleOnChange = (type: keyof ITgButton, value: string) => {
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

    if (currentPost) {
      currentPost.buttons = [...buttons, button];
      setValue(type, [...postsWithoutCurrent, currentPost]);
    }
  };

  const handleRemoveButton = (button: ITgButton) => {
    setButtons(buttons.filter((item) => item !== button));

    if (currentPost) {
      currentPost.buttons = [...buttons.filter((item) => item !== button)];
      setValue(type, [...postsWithoutCurrent, currentPost]);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
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
              buttons.length === 3 || button.content === "" || button.url === ""
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
  );
};
