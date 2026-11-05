import { platformTypesNum } from "@entities/platform";
import { desireStatus, orderStatus, projectStatus } from "../config";

export interface IAdvProjects {
  page: number;
  elements: number;
  projects: IAdvProjectCard[];
  isLast?: boolean;
  status?: string;
}

export interface IAdvSubprojects {
  page: number;
  elements: number;
  orders: IAdvProjectSubcard[];
}

export interface IAdvProjectCard {
  id: string;
  identifier: number;
  tariff_name?: string;
  created: string;
  project_name: string;
  count_channels: number;
  is_request_approve?: projectStatus;
  views: number;
  budget: number;
  remainder?: number;
  completed: number;
  canceled_rejected?: number;
  canceled?: number;
  wait?: number;
  in_progress?: number;
  moderation?: number;
  frozen?: number;
  report?: IOrderReportInfo | null;
  subcard?: IAdvProjectSubcard[];
}

export interface IAdvProjectSubcard {
  id: string;
  identifier: number;
  channel_id?: string;
  date_coming: string;
  name: string;
  category: string;
  avatar: string;
  order_status: string;
  api_status: orderStatus;
  publish_date:
    | {
        date_from: string;
        date_to: string;
      }
    | string;
  publish_time: {
    time_from: string;
    time_to: string;
  };
  format: {
    small: string;
    big: string;
  };
  price: number;
  subscribers: number;
  views: number;
  er: number;
  cpv: number;
  male: number;
  female: number;
  post_url?: string;
  desire: IDesire[];
  platform: platformTypesNum;
  is_review: boolean;
  rate?: number;
  post_deeplink: string;
  cancel_reason?: string;
  qr_code_url?: IQrCodeUrl | null;
}

export interface IQrCodeUrl {
  sale_check?: string;
  refund_sale_check?: string;
}

interface IDesire {
  desire_type: desireStatus;
  comment: string;
}

export interface IAdvManagerProjectsDev {
  page: number;
  elements: number;
  projects: IAdvManagerProjectsDevCard[];
  isLast?: boolean;
  status?: string;
}

export interface IAdvManagerProjectsDevCard {
  id: string;
  identifier: number;
  tariff_id: string;
  project_name: string;
  tariff_name: string;
  created: string;
  budget: number;
}

export interface ISavedProjects {
  page: number;
  elements: number;
  projects: ISavedProjectCard[];
  isLast?: boolean;
}

export interface ISavedProjectCard {
  id: string;
  identifier: number;
  project_name: string;
  orders: number;
  views: number;
  budget: number;
  completed: number;
  canceled: number;
  wait: number;
  in_progress: number;
  moderation: number;
  is_request_approve: projectStatus.cart_created;
  created: string;
}

export interface IOrderReportInfo {
  id: string;
  project_id: string;
  file_name: string;
  url: string;
  created: string;
}

export interface IProjectReports {
  reports: IOrderReportInfo[];
}

/** Выполненный заказ проекта — как приходит с GET /report/{project_id}/completed-orders */
export interface ICompletedOrderResponse {
  id: string;
  name: string;
  url: string;
  subscribers: number;
  average_views: number;
  amount: number;
  VAT: number;
  total_sum: number;
  publish_date: string;
  publish_time: string;
  publish_count: number;
  post_url: string;
  /** Ссылка на скриншот поста */
  post_screenshot_url: string | null;
  real_views: number;
  ER: number;
  CPV: number;
  category: string;
  male: number;
  female: number;
  platform: platformTypesNum;
  region: string;
  /** Динамика просмотров поста: снимки после публикации */
  views_dynamics?: IViewsDynamics | null;
  /** Точки графика с бэка: минуты после публикации, накопленные просмотры и прирост */
  views_points?: IViewsPointResponse[] | null;
}

export interface IViewsPointResponse {
  /** Минуты после публикации — точная позиция точки */
  minutes: number;
  /** Округлённые часы — для графика не используем, только minutes */
  hours: number;
  /** Накопленные просмотры */
  views: number;
  /** Прирост с предыдущей точки */
  gain: number;
}

export interface IViewsSnapshot {
  taken: string;
  views: number;
}

export interface IViewsDynamics {
  published: string;
  snapshots: IViewsSnapshot[];
}

/** Точка графика динамики — собирается маппером при получении ответа */
export interface IViewsChartPoint {
  /** Часы после публикации — точка стоит там, где реально снят снимок */
  hours: number;
  /** Накопленные просмотры на момент снимка */
  views: number;
  /** Прирост просмотров с предыдущего снимка */
  delta: number;
  /** Время снимка (ISO) */
  taken: string;
}

export interface IViewsChart {
  points: IViewsChartPoint[];
  /** Длина оси X в целых часах (вверх) */
  maxHour: number;
  maxViews: number;
  maxDelta: number;
  /** Минимальный интервал между снимками, ч — для ширины столбиков */
  minGapHours: number;
}

/** Выполненный заказ для UI: ответ + готовые данные графика */
export interface ICompletedOrder extends ICompletedOrderResponse {
  /** null — снимков нет или их меньше одного */
  views_chart: IViewsChart | null;
  /** Последний снимок или real_views, если снимков нет */
  last_views: number;
}

/** Итоги отчёта — считает бэкенд */
export interface ICompletedOrdersSummary {
  orders_count: number;
  subscribers: number;
  real_views: number;
  amount: number;
  total_sum: number;
  average_ER: number;
  average_CPV: number;
  planned_views: number;
  views_plan_percent: number;
  real_ER: number;
  real_CPV: number;
  real_CPM: number;
  period_start: string | null;
  period_end: string | null;
}

/** Ответ GET /report/{project_id}/completed-orders */
export interface ICompletedOrdersResponse {
  orders: ICompletedOrderResponse[];
  summary: ICompletedOrdersSummary | null;
}

/** Ответ после маппера — с готовыми данными графиков */
export interface ICompletedOrders {
  orders: ICompletedOrder[];
  summary: ICompletedOrdersSummary | null;
}
