import {
  EXECUTOR_TYPE_TABS,
  ExecutorType,
  IAdminManageProjectsReq,
  MANAGE_EXECUTOR_TYPE_DEFAULT,
  useGetAdminManageProjectsQuery,
} from "@entities/admin";
import { projectStatus } from "@entities/project";
import { BarStatusFilter } from "@features/other";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { Button, Input, MultiSelect } from "@shared/ui";
import { Label } from "@shared/ui/shadcn-ui/ui/label";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PROJECT_STATUS_OPTIONS } from "../model/constants";
import { OrdersList } from "./OrdersList";

const EXECUTOR_STATUS_TABS = EXECUTOR_TYPE_TABS.map((tab) => ({
  name: tab.name,
  type: tab.type,
}));

export const ManageProjects = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [projectId, setProjectId] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<number[]>([projectStatus.in_progress]);
  const [executorType, setExecutorType] = useState<ExecutorType>(
    MANAGE_EXECUTOR_TYPE_DEFAULT,
  );
  const [applied, setApplied] = useState({
    project_id: "",
    url: "",
    status: [projectStatus.in_progress] as number[],
  });

  const queryParams: IAdminManageProjectsReq = {
    page,
    elements_on_page: INTERSECTION_ELEMENTS.ADMIN_MANAGE_PROJECTS,
    status: applied.status,
    executor_type: executorType,
    ...(applied.project_id ? { project_id: applied.project_id } : {}),
    ...(applied.url ? { url: applied.url } : {}),
  };

  const { data, isLoading, isFetching } =
    useGetAdminManageProjectsQuery(queryParams);

  const handleApplyFilters = () => {
    setPage(1);
    setApplied({
      project_id: projectId.trim(),
      url: url.trim(),
      status: status.length ? status : [projectStatus.in_progress],
    });
  };

  const changeExecutorType = (type: ExecutorType) => {
    setPage(1);
    setExecutorType(type);
  };

  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container">
      <div className="my-6 grid grid-flow-row gap-4 sm:my-8 sm:gap-6 lg:my-10">
        <h1 className="text-xl font-semibold leading-tight sm:text-2xl">
          {t("admin_panel.pages.manage_projects")}
        </h1>

        <div className="grid grid-flow-row gap-4">
          <div className="grid grid-flow-row gap-3">
            <div className="w-full max-w-[420px] space-y-2">
              <Label htmlFor="project_id">
                {t("admin_panel.manage_projects.project_id")}
              </Label>
              <Input
                id="project_id"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="00000000-0000-0000-0000-000000000000"
              />
            </div>
            <BarStatusFilter
              changeStatus={(v) => changeExecutorType(v as ExecutorType)}
              statusFilter={executorType}
              projectStatus={EXECUTOR_STATUS_TABS}
            />
          </div>

          <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-[1fr_1.2fr_auto]">
            <div className="space-y-2">
              <Label htmlFor="url">
                {t("admin_panel.manage_projects.url")}
              </Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://t.me/channel"
              />
            </div>
            <div className="space-y-2">
              <Label>{t("admin_panel.manage_projects.statuses")}</Label>
              <MultiSelect
                options={PROJECT_STATUS_OPTIONS}
                onValueChange={(value) => setStatus(value as number[])}
                defaultValue={status}
                placeholder={t(
                  "admin_panel.manage_projects.statuses_placeholder",
                )}
                showCheckBox
                showButtonClear
                className="!p-2"
              />
            </div>
            <Button
              type="button"
              variant="primary"
              onClick={handleApplyFilters}
              className="h-10"
            >
              {t("admin_panel.manage_projects.apply")}
            </Button>
          </div>
        </div>

        <OrdersList
          data={data}
          isLoading={isLoading || isFetching}
          onShowMore={handleShowMore}
        />
      </div>
    </div>
  );
};
