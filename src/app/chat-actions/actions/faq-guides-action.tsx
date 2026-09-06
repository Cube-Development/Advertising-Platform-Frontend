import { GUIDES_LIST } from "@entities/faq";
import { ENUM_PATHS } from "@shared/routing";
import { useTranslation } from "react-i18next";
import { GuideCard } from "@widgets/faq/components";
import { ActionShell } from "../ui/action-shell";
import styles from "./faq-guides-action.module.scss";

/**
 * Guide cards, straight from the FAQ page's own data.
 *
 * `GuideCard` is Tailwind-only and already sizes itself to its column, so it
 * needed no changes — only the grid around it, which is a container query here
 * instead of the page's viewport-driven `auto-fit` track.
 */
const FaqGuidesAction = () => {
  const { t } = useTranslation();
  return (
    <ActionShell
      title={t("chat_actions.faq_guides.title", "Гайды и инструкции")}
      subtitle={t(
        "chat_actions.faq_guides.subtitle",
        "Пошаговые руководства по работе с площадкой",
      )}
      cta={{
        to: ENUM_PATHS.FAQ,
        label: t("chat_actions.faq_guides.cta", "Все гайды и FAQ"),
      }}
    >
      <div className={styles.grid}>
        {GUIDES_LIST.map((guide) => (
          <GuideCard key={guide.guide_id} {...guide} />
        ))}
      </div>
    </ActionShell>
  );
};

export default FaqGuidesAction;
