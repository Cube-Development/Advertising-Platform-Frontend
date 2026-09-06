import { ENUM_PATHS } from "@shared/routing";
import { ProfitCalculator } from "@widgets/mainPages/calculateIncome/UI/profit-calculator";
import { useTranslation } from "react-i18next";
import { ActionShell } from "../ui/action-shell";

/**
 * The landing page's income calculator, reused as-is.
 *
 * `ProfitCalculator` is Tailwind-only, has no viewport branching of its own and
 * makes no network calls — one of the few widgets that drops into a panel
 * unchanged. What we leave behind is the `CalculateIncome` section wrapper with
 * its framer-motion scroll animations and page headings.
 */
const BloggerIncomeAction = () => {
  const { t } = useTranslation();
  return (
    <ActionShell
      title={t("chat_actions.blogger_income.title", "Калькулятор дохода")}
      subtitle={t(
        "chat_actions.blogger_income.subtitle",
        "Оцените заработок на рекламе в своём канале",
      )}
      cta={{
        to: ENUM_PATHS.ADD_CHANNEL,
        label: t("chat_actions.blogger_income.cta", "Добавить канал"),
      }}
    >
      <ProfitCalculator />
    </ActionShell>
  );
};

export default BloggerIncomeAction;
