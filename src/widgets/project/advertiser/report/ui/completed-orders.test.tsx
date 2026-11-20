import { platformTypesNum } from "@entities/platform";
import { ICompletedOrder } from "@entities/project";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CompletedOrdersList } from "./completed-orders";

// График в модалке к проверке не относится
vi.mock("./order-chart-modal", () => ({ OrderChartModal: () => null }));
// Баррели entity тянут API и store по кругу — нужны только иконки платформ
vi.mock("@entities/project", () => ({ platformToIcon: {} }));
vi.mock("@entities/platform", () => ({
  platformTypesNum: { telegram: 1, youtube: 2, instagram: 3, site: 4 },
}));

const order = (
  platform: platformTypesNum,
  id: string,
  name: string,
  post_screenshot_url: string | null,
): ICompletedOrder => ({
  id,
  name,
  url: `https://${name}`,
  subscribers: 0,
  average_views: 0,
  amount: 1000,
  VAT: 120,
  total_sum: 1120,
  publish_date: "20.11.2026",
  publish_time: "12:00",
  publish_count: 1,
  post_url: `https://${name}/post`,
  post_screenshot_url,
  real_views: 0,
  ER: 0,
  CPV: 0,
  category: "Новости",
  male: 50,
  female: 50,
  platform,
  region: "Ташкент",
  views_chart: null,
  last_views: 0,
});

describe("CompletedOrdersList screenshot", () => {
  // Бэкенд отдаёт сайту post_screenshot_url = null, ссылка на статью — в post_url
  test("shown only when post_screenshot_url is set", () => {
    render(
      <CompletedOrdersList
        isLoading={false}
        orders={[
          order(
            platformTypesNum.site,
            "00000000-0000-4000-8930-000000000001",
            "gazeta.uz",
            null,
          ),
          order(
            platformTypesNum.telegram,
            "00000000-0000-4000-8930-000000000002",
            "t.me/news",
            "https://storage.example.com/news.png",
          ),
        ]}
      />,
    );

    // Кнопка скриншота одна — у Telegram; ссылки на пост у обоих
    expect(
      screen.getAllByText("adv_project_page.completed_orders.screenshot"),
    ).toHaveLength(1);
    expect(
      screen.getAllByText("adv_project_page.completed_orders.post"),
    ).toHaveLength(2);
  });
});
