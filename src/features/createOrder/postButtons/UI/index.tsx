import {
  ContentType,
  CreatePostFormData,
  ICreatePostForm,
  IFile,
} from "@entities/project";
import { applyMultipostUpdate } from "@entities/project";
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

  const [buttons, setButtons] = useState<IFile[]>(currentPost?.buttons || []);
  const [button, setButton] = useState<IFile>({
    content_type: ContentType.button,
    content: "",
    url: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setButtons(currentPost?.buttons || []);
  }, [
    formState?.isMultiPost,
    formState?.selectedMultiPostId,
    formState?.posts,
    formState?.multiposts,
    formState?.selectedPostType,
    platformId,
  ]);

  const handleOnChange = (type: keyof IFile, value: string) => {
    setButton((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleAddButton = () => {
    if (!button.url || !button.url.startsWith("https://")) {
      setError(t("chat.format.url_placeholder"));
      return;
    }
    setError(null);
    setButtons([...buttons, button]);
    setButton({ content_type: ContentType.button, content: "", url: "" });

    if (currentPost) {
      const nextButtons = [...buttons, button];
      if (type === CreatePostFormData.multiposts && currentPost.order_id) {
        setValue(
          type,
          applyMultipostUpdate(
            formState.multiposts || [],
            currentPost.order_id,
            (leader) => ({
              ...leader,
              buttons: nextButtons,
            }),
          ),
        );
      } else {
        currentPost.buttons = nextButtons;
        setValue(type, [...postsWithoutCurrent, currentPost]);
      }
    }
  };

  const handleRemoveButton = (button: IFile) => {
    const nextButtons = buttons.filter((item) => item !== button);
    setButtons(nextButtons);

    if (currentPost) {
      if (type === CreatePostFormData.multiposts && currentPost.order_id) {
        setValue(
          type,
          applyMultipostUpdate(
            formState.multiposts || [],
            currentPost.order_id,
            (leader) => ({
              ...leader,
              buttons: nextButtons,
            }),
          ),
        );
      } else {
        currentPost.buttons = [...nextButtons];
        setValue(type, [...postsWithoutCurrent, currentPost]);
      }
    }
  };

  return (
    <AlertDialog
      onOpenChange={(open) => {
        if (!open) {
          setError(null);
          setButton({ content_type: ContentType.button, content: "", url: "" });
        }
      }}
    >
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
            <div className={styles.input__row}>
              <p>{t("create_order.create.add_button.name.title")}</p>
              <input
                id="nameInput"
                type="text"
                placeholder={t(
                  "create_order.create.add_button.name.default_value",
                )}
                value={button.content}
                onChange={(e) => handleOnChange("content", e.target.value)}
              />
            </div>
            <div className={styles.input__row}>
              <p>{t("create_order.create.add_button.link.title")}</p>
              <div className="grid gap-1">
                <input
                  id="linkInput"
                  type="text"
                  placeholder={t(
                    "create_order.create.add_button.link.default_value",
                  )}
                  value={button.url}
                  onChange={(e) => {
                    handleOnChange("url", e.target.value);
                    if (error) setError(null);
                  }}
                />
                {error && (
                  <span className="mt-1 text-red-500 text-xs">{error}</span>
                )}
              </div>
            </div>
          </div>
          <MyButton
            onClick={handleAddButton}
            className={
              buttons.length === 3 || button.content === "" || !button.url
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
              <big>{t("create_order.create.add_button.zero")}</big>
            )}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
