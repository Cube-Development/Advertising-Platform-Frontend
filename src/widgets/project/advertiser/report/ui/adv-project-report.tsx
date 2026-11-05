import {
  ENUM_ADV_MY_PROJECT_STATUS,
  ENUM_PROJECT_TYPES,
  useGetAdvProjectByIdQuery,
  useGetCompletedOrdersQuery,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { FolderOpen } from "lucide-react";
import { CSSProperties, FC } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import {
  AdvProjectCardInfo,
  ProjectCardSkeleton,
} from "../../UI/advProjects/card";
import { getProjectPagePath } from "../../lib/projectPaths";
import {
  ProjectNavLink,
  ProjectPageHeader,
} from "../../page/ui/project-page-header";
import { ReportOrdersTabs } from "./report-orders-tabs";
import { ReportSummary } from "./report-summary";

interface AdvProjectReportProps {
  projectId: string;
  projectType?: string | null;
  projectStatus?: string | null;
}

const isMyStatus = (
  value?: string | null,
): value is ENUM_ADV_MY_PROJECT_STATUS =>
  Object.values<string>(ENUM_ADV_MY_PROJECT_STATUS).includes(value ?? "");

/**
 * Страница отчёта проекта: экшены проекта, сводка и выполненные размещения
 * (GET /report/{project_id}/completed-orders). Только для «Моих проектов»
 */
export const AdvProjectReport: FC<AdvProjectReportProps> = ({
  projectId,
  projectType,
  projectStatus,
}) => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const isMyProject =
    !projectType || projectType === ENUM_PROJECT_TYPES.MY_PROJECT;
  const status = isMyStatus(projectStatus)
    ? projectStatus
    : ENUM_ADV_MY_PROJECT_STATUS.ACTIVE;

  const projectPath = getProjectPagePath({
    projectId,
    projectType: ENUM_PROJECT_TYPES.MY_PROJECT,
    projectStatus: status,
  });

  const { data: project, isLoading: isProjectLoading } =
    useGetAdvProjectByIdQuery(
      {
        project_id: projectId,
        status,
        language: language?.id || USER_LANGUAGES_LIST[0].id,
      },
      { skip: !isMyProject },
    );

  const { data, isLoading: isOrdersLoading } = useGetCompletedOrdersQuery(
    { project_id: projectId },
    { skip: !isMyProject },
  );
  const orders = data?.orders ?? [];

  // У проектов с менеджером и сохранённых отчёта нет — ведём на страницу проекта
  if (!isMyProject) {
    return (
      <Navigate
        to={getProjectPagePath({ projectId, projectType, projectStatus })}
        replace
      />
    );
  }

  return (
    <div className="grid grid-flow-row md:gap-8 gap-5">
      <ProjectPageHeader
        title={
          project?.project_name
            ? `${t("adv_project_page.report.title")}: ${project.project_name}`
            : t("adv_project_page.report.title")
        }
        projectType={ENUM_PROJECT_TYPES.MY_PROJECT}
        projectStatus={status}
        // «Назад» — к списку проектов на ту же вкладку, как со страницы проекта
        actions={
          <ProjectNavLink to={projectPath} icon={<FolderOpen />}>
            {t("adv_project_page.report.to_project")}
          </ProjectNavLink>
        }
      />

      {isProjectLoading ? (
        <ProjectCardSkeleton
          typeFilter={ENUM_PROJECT_TYPES.MY_PROJECT}
          statusFilter={status}
        />
      ) : project ? (
        <div
          style={
            {
              "--zIndexTop": "-3",
              "--zIndexBottom": "-4",
            } as CSSProperties
          }
          className="border__gradient grid pb-5"
        >
          <AdvProjectCardInfo
            card={project}
            typeFilter={ENUM_PROJECT_TYPES.MY_PROJECT}
            statusFilter={status}
          />
        </div>
      ) : null}

      <ReportSummary
        summary={data?.summary ?? null}
        isLoading={isOrdersLoading}
      />
      <ReportOrdersTabs orders={orders} isLoading={isOrdersLoading} />
    </div>
  );
};
