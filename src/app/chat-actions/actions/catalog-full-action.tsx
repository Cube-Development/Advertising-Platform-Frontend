import { ENUM_PATHS } from "@shared/routing";
import { useTranslation } from "react-i18next";
import { DeepLinkAction } from "../ui/deep-link-action";

/**
 * The full catalog is a two-column layout with a filter sidebar, saved
 * projects and an infinite list — it needs the whole page. `catalog-search`
 * is the in-panel version.
 */
const CatalogFullAction = () => {
  const { t } = useTranslation();
  return (
    <DeepLinkAction
      title={t("chat_actions.catalog_full.title", "Полный каталог каналов")}
      subtitle={t(
        "chat_actions.catalog_full.subtitle",
        "Все фильтры, сравнение и сохранённые подборки",
      )}
      bullets={[
        t("chat_actions.catalog_full.b1", "Фильтры по тематике, охвату и цене"),
        t(
          "chat_actions.catalog_full.b2",
          "Сравнение каналов и добавление в корзину",
        ),
        t("chat_actions.catalog_full.b3", "Сохранённые подборки каналов"),
      ]}
      to={ENUM_PATHS.CATALOG}
    />
  );
};

export default CatalogFullAction;
