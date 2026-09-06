import { ENUM_PATHS } from "@shared/routing";
import { useTranslation } from "react-i18next";
import { DeepLinkAction } from "../ui/deep-link-action";

/**
 * Adding a channel is a four-step wizard with platform verification and file
 * uploads — it keeps its own step state in the URL, so it belongs on its page.
 */
const AddChannelAction = () => {
  const { t } = useTranslation();
  return (
    <DeepLinkAction
      title={t("chat_actions.add_channel.title", "Добавить канал")}
      subtitle={t(
        "chat_actions.add_channel.subtitle",
        "Telegram, Instagram или YouTube — 4 шага",
      )}
      bullets={[
        t("chat_actions.add_channel.b1", "Подтверждение прав на канал"),
        t("chat_actions.add_channel.b2", "Описание, тематика и аудитория"),
        t("chat_actions.add_channel.b3", "Форматы размещения и цены"),
        t("chat_actions.add_channel.b4", "Отправка на модерацию"),
      ]}
      ctaLabel={t("chat_actions.add_channel.cta", "Добавить канал")}
      to={ENUM_PATHS.ADD_CHANNEL}
    />
  );
};

export default AddChannelAction;
