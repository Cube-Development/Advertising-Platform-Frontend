import {
  ContentType,
  ICreatePost,
  ICreatePostForm,
  IPostChannel,
} from "@entities/project";
import {
  computeDefaults,
  computeMinValue,
  formatTime,
} from "@features/createOrder";
import { useToast } from "@shared/ui";
import { formatDateToRuString } from "@shared/utils";
import { useMemo } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  buildTelegramCollectUrl,
  encodeTelegramCollectStart,
} from "../helpers";

interface Props {
  projectId: string;
  isMultiPost: boolean;
  selectedMultiPostId?: string | null;
  cards: IPostChannel[];
  getValues: UseFormGetValues<ICreatePostForm>;
  setValue: UseFormSetValue<ICreatePostForm>;
  saveProject: (formData: ICreatePostForm) => Promise<boolean>;
}

const withEmptyPostText = (post: ICreatePost): ICreatePost => {
  if (
    post.comment ||
    post.media?.length ||
    post.files?.length ||
    post.buttons?.length ||
    post.content?.length ||
    post.text?.length
  ) {
    return post;
  }

  return {
    ...post,
    text: [{ content_type: ContentType.text, content: "" }],
  };
};

const withAllowedDatetime = (
  form: ICreatePostForm,
  cards: IPostChannel[],
): ICreatePostForm["datetime"] => {
  const today = formatDateToRuString(new Date());

  return {
    ...form.datetime,
    orders: cards.map((card) => {
      const existing = form.datetime?.orders?.find(
        (order) => order.order_id === card.id,
      );
      const hasDate = Boolean(
        existing?.date || (existing?.date_from && existing?.date_to),
      );
      const hasTime = Boolean(existing?.time_from && existing?.time_to);
      const date = hasDate ? existing?.date : today;
      const [from, to] = computeDefaults(
        computeMinValue(date || existing?.date_from || today, card.platform),
      );

      return {
        ...existing,
        order_id: card.id,
        date,
        time_from: hasTime ? existing?.time_from : formatTime(from),
        time_to: hasTime ? existing?.time_to : formatTime(to),
      };
    }),
  };
};

export const useTelegramCollectPost = ({
  projectId,
  isMultiPost,
  selectedMultiPostId,
  cards,
  getValues,
  setValue,
  saveProject,
}: Props) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const telegramUrl = useMemo(() => {
    try {
      if (!isMultiPost) {
        return buildTelegramCollectUrl(
          encodeTelegramCollectStart({ projectId }),
        );
      }

      if (!selectedMultiPostId) {
        return null;
      }

      return buildTelegramCollectUrl(
        encodeTelegramCollectStart({
          projectId,
          orderId: selectedMultiPostId,
        }),
      );
    } catch {
      return null;
    }
  }, [projectId, isMultiPost, selectedMultiPostId]);

  const sendToTelegram = async () => {
    if (!telegramUrl) {
      toast({
        variant: "error",
        title: t("toasts.create_order.post.error"),
      });
      return;
    }

    const current = getValues();
    const formData: ICreatePostForm = {
      ...current,
      posts: (current.posts || []).map(withEmptyPostText),
      multiposts: (current.multiposts || []).map(withEmptyPostText),
      datetime: withAllowedDatetime(current, cards),
    };

    setValue("posts", formData.posts);
    setValue("multiposts", formData.multiposts);
    setValue("datetime", formData.datetime);

    const ok = await saveProject(formData);
    if (!ok) return;

    window.open(telegramUrl, "_blank", "noopener,noreferrer");
  };

  return { sendToTelegram };
};
