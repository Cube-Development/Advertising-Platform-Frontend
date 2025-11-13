import { FC } from "react";
import { OrdersList, TopInfo, Statistics } from "../components";
import { IAgencyProjectCard } from "@entities/project";

interface AgencyProjectProps {
  project_data: IAgencyProjectCard;
  code: number;
}

export const AgencyProject: FC<AgencyProjectProps> = ({
  project_data,
  code,
}) => {
  return (
    <div className="grid grid-flow-row md:gap-10 gap-6 lg:mt-10 md:mt-6 mt-0">
      <TopInfo
        project_name={project_data.project_name}
        is_request_approve={project_data.is_request_approve!}
        count_channels={project_data.count_channels}
        budget={project_data.budget}
        views={project_data.views}
        in_progress={project_data.in_progress || 0}
        completed={project_data.completed}
        canceled={project_data.canceled_rejected || 0}
        wait={project_data.wait || 0}
        remainder={project_data.remainder}
        viewer={project_data.viewer}
        project_id={project_data.id}
        code={code}
        orders={project_data.orders || []}
      />
      <OrdersList
        orders={project_data.orders || []}
        is_request_approve={project_data.is_request_approve!}
        project_id={project_data.id}
        viewer={project_data.viewer}
        code={code}
      />
      <Statistics project={project_data} />
    </div>
  );
};
