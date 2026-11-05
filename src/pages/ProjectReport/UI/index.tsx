import React, { Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";
import { validate as isValidUUID } from "uuid";
import { SuspenseLoader } from "@shared/ui";
import { QueryParams } from "@shared/utils";
import { ENUM_PATHS } from "@shared/routing";

const AdvProjectReport = React.lazy(() =>
  import("@widgets/project")
    .then((module) => ({
      default: module.AdvProjectReport,
    }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

/** Страница отчёта проекта: /project/:project_id/report?project_type=&project_status= */
export const ProjectReportPage = () => {
  const { project_id } = useParams();
  const { project_type, project_status } = QueryParams();

  if (!project_id || !isValidUUID(project_id)) {
    return <Navigate to={ENUM_PATHS.ORDERS} replace />;
  }

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="container md:!py-10 !py-6">
        <AdvProjectReport
          key={project_id}
          projectId={project_id}
          projectType={project_type}
          projectStatus={project_status}
        />
      </div>
    </Suspense>
  );
};
