import { ICreatePostForm, IPostChannel } from "@entities/project";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTelegramCollectPost } from "../../../model";
import styles from "./styles.module.scss";

interface TelegramCollectNoticeProps {
  projectId: string;
  isMultiPost: boolean;
  selectedMultiPostId?: string | null;
  cards: IPostChannel[];
  getValues: UseFormGetValues<ICreatePostForm>;
  setValue: UseFormSetValue<ICreatePostForm>;
  saveProject: (formData: ICreatePostForm) => Promise<boolean>;
  isSaving?: boolean;
}

export const TelegramCollectNotice: FC<TelegramCollectNoticeProps> = ({
  projectId,
  isMultiPost,
  selectedMultiPostId,
  cards,
  getValues,
  setValue,
  saveProject,
  isSaving,
}) => {
  const { t } = useTranslation();
  const { sendToTelegram } = useTelegramCollectPost({
    projectId,
    isMultiPost,
    selectedMultiPostId,
    cards,
    getValues,
    setValue,
    saveProject,
  });

  return (
    <div className={styles.wrapper}>
      <p>{t("create_order.create.telegram_collect.hint")}</p>
      <MyButton type="button" disabled={isSaving} onClick={sendToTelegram}>
        {t("create_order.create.telegram_collect.button")}
      </MyButton>
    </div>
  );
};
