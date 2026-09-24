import { IOrderReportInfo } from "@entities/project";
import { ProjectReportVersions } from "../../projectReportVersions";
import { RequestProjectReport } from "../../requestProjectReport";
import { FC } from "react";

interface ProjectReportActionsProps {
  project_id: string;
  report?: IOrderReportInfo | null;
}

export const ProjectReportActions: FC<ProjectReportActionsProps> = ({
  project_id,
  report,
}) => (
  <div className="grid w-full gap-2">
    <RequestProjectReport project_id={project_id} />
    <ProjectReportVersions project_id={project_id} report={report} />
  </div>
);
