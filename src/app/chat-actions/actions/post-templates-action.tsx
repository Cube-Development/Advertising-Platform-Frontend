import { useGetTemplatesListQuery } from "@entities/project";
import { ENUM_PATHS } from "@shared/routing";
import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ActionList, ActionRow, CHAT_ACTION_PAGE_SIZE } from "../ui";
import { ActionShell } from "../ui/action-shell";

/** Saved ad post templates. Editing them stays on /post_templates. */
const PostTemplatesAction = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useGetTemplatesListQuery({
    page: 1,
    elements_on_page: CHAT_ACTION_PAGE_SIZE,
  });

  const templates = data?.posts ?? [];

  return (
    <ActionShell
      title={t("chat_actions.post_templates.title", "Шаблоны постов")}
      subtitle={t(
        "chat_actions.post_templates.subtitle",
        "Сохранённые рекламные посты",
      )}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      isEmpty={!isLoading && templates.length === 0}
      emptyText={t(
        "chat_actions.post_templates.empty",
        "Шаблонов пока нет — создайте первый",
      )}
      cta={{ to: ENUM_PATHS.POST_TEMPLATES }}
    >
      <ActionList>
        {templates.map((template) => (
          <ActionRow
            key={template.id ?? template.name}
            title={template.name}
            leading={<FileText className="size-4 text-gray-400" />}
          />
        ))}
      </ActionList>
    </ActionShell>
  );
};

export default PostTemplatesAction;
