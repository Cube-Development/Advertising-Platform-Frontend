import {
  ENUM_ADV_MANAGER_PROJECT_STATUS,
  ENUM_ADV_MY_PROJECT_STATUS,
  ENUM_PROJECT_TYPES,
  useGetAdvManagerProjectByIdQuery,
  useGetAdvProjectByIdQuery,
  useGetProjectAmountQuery,
  useGetProjectNameQuery,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import {
  DownloadApproveReport,
  EditProject,
  RunSavedProject,
} from "@features/project";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { FileChartColumn } from "lucide-react";
import { CSSProperties, FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  AdvProjectCardInfo,
  ProjectCardSkeleton,
} from "../../UI/advProjects/card";
import { ProjectOrdersList } from "./project-orders-list";
import { ProjectNavLink, ProjectPageHeader } from "./project-page-header";
import { getProjectReportPath } from "../../lib/projectPaths";

type TProjectStatus =
  | ENUM_ADV_MY_PROJECT_STATUS
  | ENUM_ADV_MANAGER_PROJECT_STATUS;

const isOneOf = <T extends string>(
  values: Record<string, T>,
  value?: string | null,
): value is T => Object.values<string>(values).includes(value ?? "");

const NotFound: FC = () => {
  const { t } = useTranslation();
  return (
    <p className="rounded-[20px] bg-white/60 py-16 text-center text-base font-medium text-slate-500 shadow-lg">
      {t("adv_project_page.not_found")}
    </p>
  );
};

const CardFrame: FC<{ children: ReactNode }> = ({ children }) => (
  <div
    style={
      {
        "--zIndexTop": "-3",
        "--zIndexBottom": "-4",
      } as CSSProperties
    }
    className="border__gradient grid pb-5"
  >
    {children}
  </div>
);

interface ProjectDetailsProps {
  projectId: string;
  typeFilter: ENUM_PROJECT_TYPES;
  statusFilter: TProjectStatus;
}

/** Свой проект или проект с менеджером: шапка — карточка из списка, ниже заказы */
const ProjectDetails: FC<ProjectDetailsProps> = ({
  projectId,
  typeFilter,
  statusFilter,
}) => {
  const language = useFindLanguage();
  const isManager = typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT;
  const req = {
    project_id: projectId,
    status: statusFilter,
    language: language?.id || USER_LANGUAGES_LIST[0].id,
  };

  const myProject = useGetAdvProjectByIdQuery(req, { skip: isManager });
  const managerProject = useGetAdvManagerProjectByIdQuery(req, {
    skip: !isManager,
  });
  const { data: project, isLoading } = isManager ? managerProject : myProject;

  const { t } = useTranslation();
  // Отчёт — отдельная страница и только у «Моих проектов»
  const hasReport = typeFilter === ENUM_PROJECT_TYPES.MY_PROJECT;

  return (
    <>
      <ProjectPageHeader
        title={project?.project_name}
        projectType={typeFilter}
        projectStatus={statusFilter}
        actions={
          hasReport ? (
            <ProjectNavLink
              to={getProjectReportPath({
                projectId,
                projectType: typeFilter,
                projectStatus: statusFilter,
              })}
              icon={<FileChartColumn />}
            >
              {t("adv_project_page.report.link")}
            </ProjectNavLink>
          ) : undefined
        }
      />
      {isLoading ? (
        <ProjectCardSkeleton
          typeFilter={typeFilter}
          statusFilter={statusFilter}
        />
      ) : !project ? (
        <NotFound />
      ) : (
        <>
          <CardFrame>
            <AdvProjectCardInfo
              card={project}
              typeFilter={typeFilter}
              statusFilter={statusFilter}
            />
          </CardFrame>
          <ProjectOrdersList
            projectId={project.id}
            card={project}
            typeFilter={typeFilter}
            statusFilter={statusFilter}
          />
        </>
      )}
    </>
  );
};

/** Сохранённый проект: в списке нет поиска по id — имя берём из /order/project-name */
const SavedProjectDetails: FC<{ projectId: string }> = ({ projectId }) => {
  const { data, isLoading } = useGetProjectNameQuery({ project_id: projectId });
  const { data: amount } = useGetProjectAmountQuery({ project_id: projectId });

  return (
    <>
      <ProjectPageHeader
        title={data?.name}
        projectType={ENUM_PROJECT_TYPES.SAVED_PROJECT}
      />
      {!isLoading && !data ? (
        <NotFound />
      ) : (
        <>
          <div className="grid gap-3 md:grid-flow-col md:justify-end [&>*]:md:min-w-[220px]">
            <DownloadApproveReport project_id={projectId} />
            <EditProject project_id={projectId} />
            <RunSavedProject
              project_id={projectId}
              totalAmount={amount?.amount ?? 0}
            />
          </div>
          <ProjectOrdersList
            projectId={projectId}
            typeFilter={ENUM_PROJECT_TYPES.SAVED_PROJECT}
          />
        </>
      )}
    </>
  );
};

interface AdvProjectPageProps {
  projectId: string;
  projectType?: string | null;
  projectStatus?: string | null;
}

/**
 * Страница проекта рекламодателя вместо аккордеона в карточке списка.
 * Тип и вкладка приходят из ссылки карточки (?project_type=&project_status=):
 * по ним проект ищется в списке своего типа и статуса
 */
export const AdvProjectPage: FC<AdvProjectPageProps> = ({
  projectId,
  projectType,
  projectStatus,
}) => {
  const type = isOneOf<ENUM_PROJECT_TYPES>(ENUM_PROJECT_TYPES, projectType)
    ? projectType
    : ENUM_PROJECT_TYPES.MY_PROJECT;

  return (
    <div className="grid grid-flow-row md:gap-8 gap-5">
      {type === ENUM_PROJECT_TYPES.SAVED_PROJECT ? (
        <SavedProjectDetails projectId={projectId} />
      ) : type === ENUM_PROJECT_TYPES.MANAGER_PROJECT ? (
        <ProjectDetails
          key={`${type}-${projectId}`}
          projectId={projectId}
          typeFilter={type}
          statusFilter={
            isOneOf<ENUM_ADV_MANAGER_PROJECT_STATUS>(
              ENUM_ADV_MANAGER_PROJECT_STATUS,
              projectStatus,
            ) && projectStatus !== ENUM_ADV_MANAGER_PROJECT_STATUS.DEVELOP
              ? projectStatus
              : ENUM_ADV_MANAGER_PROJECT_STATUS.ACTIVE
          }
        />
      ) : (
        <ProjectDetails
          key={`${type}-${projectId}`}
          projectId={projectId}
          typeFilter={type}
          statusFilter={
            isOneOf<ENUM_ADV_MY_PROJECT_STATUS>(
              ENUM_ADV_MY_PROJECT_STATUS,
              projectStatus,
            )
              ? projectStatus
              : ENUM_ADV_MY_PROJECT_STATUS.ACTIVE
          }
        />
      )}
    </div>
  );
};
