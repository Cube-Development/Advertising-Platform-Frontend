import React, { Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";
import { validate as isValidUUID } from "uuid";
import { SuspenseLoader } from "@shared/ui";
import { QueryParams } from "@shared/utils";
import { ENUM_PATHS } from "@shared/routing";

/*
 * ===== Агентская публичная страница проекта (отключена) =====
 * Раньше /project/:project_id?permission=<code> открывал AgencyProject по коду доступа
 * (GET /agency/project/page). Маршрут отдан под страницу проекта рекламодателя.
 *
 * import { useGetProjectQuery } from "@entities/project";
 * import { useFindLanguage } from "@entities/user";
 * import { USER_LANGUAGES_LIST } from "@shared/languages";
 *
 * const AgencyProject = React.lazy(() =>
 *   import("@widgets/project")
 *     .then((module) => ({
 *       default: module.AgencyProject,
 *     }))
 *     .catch(() => {
 *       // При ошибке перезагружаем страницу
 *       window.location.reload();
 *       return { default: () => null };
 *     }),
 * );
 *
 * export const ProjectPage = () => {
 *   const language = useFindLanguage();
 *
 *   const { project_id } = useParams();
 *   const { permission } = QueryParams();
 *
 *   const {
 *     data: project_data,
 *     isLoading: isProjectLoading,
 *     isError: isProjectError,
 *   } = useGetProjectQuery(
 *     {
 *       project_id: project_id!,
 *       code: Number(permission),
 *       language: language?.id || USER_LANGUAGES_LIST[0].id,
 *     },
 *     { skip: !permission || !project_id },
 *   );
 *
 *   if (!permission) {
 *     return <Navigate to={ENUM_PATHS.MAIN} />;
 *   }
 *
 *   if (isProjectError) {
 *     return <Navigate to={ENUM_PATHS.MAIN} />;
 *   }
 *
 *   return (
 *     <Suspense fallback={<SuspenseLoader />}>
 *       {isProjectLoading ? (
 *         <SuspenseLoader />
 *       ) : (
 *         <div className="container md:!py-10 !py-6">
 *           {project_data && (
 *             <AgencyProject
 *               project_data={project_data}
 *               code={Number(permission)}
 *             />
 *           )}
 *         </div>
 *       )}
 *     </Suspense>
 *   );
 * };
 */

const AdvProjectPage = React.lazy(() =>
  import("@widgets/project")
    .then((module) => ({
      default: module.AdvProjectPage,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

/** Страница проекта рекламодателя: /project/:project_id?project_type=&project_status= */
export const ProjectPage = () => {
  const { project_id } = useParams();
  const { project_type, project_status } = QueryParams();

  if (!project_id || !isValidUUID(project_id)) {
    return <Navigate to={ENUM_PATHS.ORDERS} replace />;
  }

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="container md:!py-10 !py-6">
        <AdvProjectPage
          key={project_id}
          projectId={project_id}
          projectType={project_type}
          projectStatus={project_status}
        />
      </div>
    </Suspense>
  );
};
