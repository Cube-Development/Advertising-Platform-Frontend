import { FC } from "react";
import { ProjectBadge } from "@shared/ui";
import { useLocation, useNavigate } from "react-router-dom";
import { buildPathWithQuery, QueryParams } from "@shared/utils";
import { useGetProjectNameQuery } from "@entities/project";
import { useTranslation, Trans } from "react-i18next";

export interface ClearActiveProjectProps {
  projectId?: string;
  defaultPath?: string;
  className?: string;
  i18nKey?: string;
}

export const ClearActiveProject: FC<ClearActiveProjectProps> = ({
  projectId,
  defaultPath,
  className,
  i18nKey,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const params = QueryParams();

  const { data: projectNameData } = useGetProjectNameQuery(
    { project_id: projectId || "" },
    { skip: !projectId },
  );

  const projectName = projectNameData?.name || "Project name";

  const handleClose = () => {
    const currentParams = { ...params };
    delete currentParams.save_project;

    if (defaultPath) {
      const newPath = buildPathWithQuery(defaultPath, currentParams);
      navigate(newPath, { replace: true });
    } else {
      const newPath = buildPathWithQuery(location.pathname, currentParams);
      navigate(newPath, { replace: true });
    }
  };

  if (!projectId) return null;

  return (
    <ProjectBadge
      text={
        <Trans
          i18nKey={i18nKey}
          values={{ name: projectName }}
          components={[
            <span className="font-semibold" />,
            <span className="text-blue-600" />,
          ]}
        />
      }
      onClose={handleClose}
      className={className}
    />
  );
};
