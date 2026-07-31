import {
  IAdminManageProjectsReq,
  useGetAdminManageProjectsQuery,
} from "@entities/admin";
import { projectStatus } from "@entities/project";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { Button, Input, MultiSelect } from "@shared/ui";
import { Label } from "@shared/ui/shadcn-ui/ui/label";
import { useMemo, useState } from "react";
import { PROJECT_STATUS_OPTIONS } from "../model/constants";
import { OrdersList } from "./OrdersList";

export const ManageProjects = () => {
  const [page, setPage] = useState(1);
  const [projectId, setProjectId] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<number[]>([projectStatus.in_progress]);
  const [applied, setApplied] = useState({
    project_id: "",
    url: "",
    status: [projectStatus.in_progress] as number[],
  });

  const queryParams: IAdminManageProjectsReq = useMemo(
    () => ({
      page,
      elements_on_page: INTERSECTION_ELEMENTS.ADMIN_MANAGE_PROJECTS,
      status: applied.status,
      ...(applied.project_id ? { project_id: applied.project_id } : {}),
      ...(applied.url ? { url: applied.url } : {}),
    }),
    [page, applied],
  );

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

  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container">
      <div className="grid gap-8">
        <div className="flex items-center justify-between gap-5">
          <div>
            <h1 className="text-2xl font-medium text-black/70">Проекты</h1>
            <p className="text-xs font-medium text-black/70">
              Админ панель
              <span className="text-black/40"> / Проекты</span>
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_2px_5px_0px_rgba(0,0,0,0.16)]">
          <div className="grid gap-4 border-b border-black/10 p-5 md:grid-cols-[1fr_1fr_1.2fr_auto] md:items-end">
            <div className="space-y-2">
              <Label htmlFor="project_id">ID проекта</Label>
              <Input
                id="project_id"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="00000000-0000-0000-0000-000000000000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL канала</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://t.me/channel"
              />
            </div>
            <div className="space-y-2">
              <Label>Статусы</Label>
              <MultiSelect
                options={PROJECT_STATUS_OPTIONS}
                onValueChange={(value) => setStatus(value as number[])}
                defaultValue={status}
                placeholder="Выберите статусы"
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
              Применить
            </Button>
          </div>

          <OrdersList
            data={data}
            isLoading={isLoading || isFetching}
            onShowMore={handleShowMore}
          />
        </div>
      </div>
    </div>
  );
};
