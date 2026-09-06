import { projectStatus } from "@entities/project";
import { IOption } from "@shared/types";

export const PROJECT_STATUS_LABELS: Record<number, string> = {
  [projectStatus.cart_created]: "В корзине",
  [projectStatus.request_approve]: "На согласовании",
  [projectStatus.approved]: "Согласован",
  [projectStatus.changed]: "Изменён",
  [projectStatus.in_progress]: "В работе",
  [projectStatus.completed]: "Завершён",
};

export const getProjectStatusLabel = (status: number): string =>
  PROJECT_STATUS_LABELS[status] ?? `Статус ${status}`;

export const PROJECT_STATUS_OPTIONS: IOption[] = (
  Object.values(projectStatus).filter(
    (value): value is number => typeof value === "number",
  ) as number[]
).map((id) => ({
  id,
  name: PROJECT_STATUS_LABELS[id],
}));
