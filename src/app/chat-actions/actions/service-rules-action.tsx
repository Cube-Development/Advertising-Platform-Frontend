import { ENUM_PATHS } from "@shared/routing";
import { useTranslation } from "react-i18next";
import { DeepLinkAction } from "../ui/deep-link-action";

/** Long-form legal documents — a PDF/long-read page, not panel content. */
const ServiceRulesAction = () => {
  const { t } = useTranslation();
  return (
    <DeepLinkAction
      title={t("chat_actions.service_rules.title", "Правила сервиса")}
      subtitle={t(
        "chat_actions.service_rules.subtitle",
        "Публичная оферта и условия использования Blogix",
      )}
      bullets={[
        t("chat_actions.service_rules.b1", "Права и обязанности сторон"),
        t("chat_actions.service_rules.b2", "Условия оплаты и возврата средств"),
        t("chat_actions.service_rules.b3", "Правила размещения рекламы"),
      ]}
      to={ENUM_PATHS.SERVICE_RULES}
    />
  );
};

export default ServiceRulesAction;
