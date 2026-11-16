import { ICart } from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { promocodeSlice, startPromocodeApply } from "@entities/wallet";
import { seedPromocode } from "@entities/wallet/testing/seedPromocode";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { CreatePost } from "./index";

const SAVED_PROJECT_ID = "00000000-0000-4000-8600-000000000321";
const DISCOUNT = {
  amount_before: 1000,
  discount_amount: 100,
  amount_after: 900,
};
/** Канал есть: пустая корзина сама выключает «Создать пост» */
const CART_DATA = {
  amount: 1000,
  channels: [{ id: "channel-1", format_unavailable: false }],
} as unknown as ICart;
const DISCOUNT_LABEL = "cart.promocode.discount:";
/** `save_project` из URL: пустая строка — общая корзина */
let saveProjectId = "";

vi.mock("@entities/project", () => ({ CART: { commission: 10 } }));

// Поле промокода — заглушка: проверяем, в какую корзину его передали
vi.mock("@features/cart", () => ({
  ApplyPromocode: ({ projectId }: { projectId?: string | null }) => (
    <div data-testid="promocode" data-project={projectId ?? "common"} />
  ),
  CreatePost: ({ disabled }: { disabled?: boolean }) => (
    <button type="button" disabled={disabled}>
      create_post
    </button>
  ),
}));

vi.mock("@features/user", () => ({
  LoginPremiumAccess: () => null,
  LoginToViewMore: () => null,
}));

// Настоящий слайс промокода без барреля сущности (он тянет UI)
vi.mock("@entities/wallet", async () => ({
  ...(await import("@entities/wallet/store/promocodeSlice")),
}));

vi.mock("@shared/assets", () => ({ ProtectIcon3: () => null }));

vi.mock("@shared/hooks", async () => {
  const redux = await import("react-redux");
  return { useAppSelector: redux.useSelector, useWindowWidth: () => 1440 };
});

vi.mock("@shared/ui", () => ({ Skeleton: () => null }));

vi.mock("@shared/utils", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  QueryParamsUUID: () => saveProjectId,
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
    }: {
      children?: ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,
  },
}));

const setupStore = () =>
  configureStore({
    reducer: {
      user: () => ({ isAuth: true, isPremiumUser: true }),
      [promocodeSlice.reducerPath]: promocodeSlice.reducer,
    },
  });

const renderSummary = (
  role: ENUM_ROLES,
  store: ReturnType<typeof setupStore> = setupStore(),
) =>
  render(
    <Provider store={store}>
      <CreatePost cart={CART_DATA} role={role} isLoading={false} />
    </Provider>,
  );

beforeEach(() => {
  window.sessionStorage.clear();
  saveProjectId = "";
});

describe("CreatePost (итог корзины) — поле промокода", () => {
  test("у рекламодателя поле есть и в корзине сохранённого проекта", () => {
    saveProjectId = SAVED_PROJECT_ID;
    renderSummary(ENUM_ROLES.ADVERTISER);

    expect(screen.getByTestId("promocode").dataset.project).toBe(
      SAVED_PROJECT_ID,
    );
  });

  test("в общей корзине поле работает с общей корзиной", () => {
    renderSummary(ENUM_ROLES.ADVERTISER);

    expect(screen.getByTestId("promocode").dataset.project).toBe("common");
  });

  test.each([ENUM_ROLES.MANAGER, ENUM_ROLES.AGENCY])(
    "у роли %s в корзине проекта поля нет",
    (role) => {
      saveProjectId = SAVED_PROJECT_ID;
      renderSummary(role);

      expect(screen.queryByTestId("promocode")).toBeNull();
    },
  );
});

describe("CreatePost (итог корзины) — скидка своей корзины", () => {
  test("скидка общей корзины в корзине проекта не показывается", () => {
    saveProjectId = SAVED_PROJECT_ID;
    const store = setupStore();
    store.dispatch(
      seedPromocode({ code: "AUTUMN", projectId: null, discount: DISCOUNT }),
    );
    renderSummary(ENUM_ROLES.ADVERTISER, store);

    expect(screen.queryByText(DISCOUNT_LABEL)).toBeNull();
  });

  test("скидка кода этого проекта показывается", () => {
    saveProjectId = SAVED_PROJECT_ID;
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: SAVED_PROJECT_ID,
        discount: DISCOUNT,
      }),
    );
    renderSummary(ENUM_ROLES.ADVERTISER, store);

    expect(screen.getByText(DISCOUNT_LABEL)).toBeTruthy();
  });
});

describe("CreatePost (итог корзины) — «Создать пост» ждёт промокод", () => {
  const getButton = () => screen.getByText("create_post") as HTMLButtonElement;

  const renderApplying = (role: ENUM_ROLES) => {
    const store = setupStore();
    store.dispatch(startPromocodeApply("apply"));
    renderSummary(role, store);
  };

  test("пока идёт «Применить», кнопка недоступна — и мышью, и с клавиатуры", () => {
    renderApplying(ENUM_ROLES.ADVERTISER);

    expect(getButton().disabled).toBe(true);
    expect(getButton().parentElement!.className).toContain("deactive");
  });

  test("без применения кнопка доступна", () => {
    renderSummary(ENUM_ROLES.ADVERTISER);

    expect(getButton().disabled).toBe(false);
    expect(getButton().parentElement!.className).not.toContain("deactive");
  });

  test("у роли без поля промокода ожидание кнопку не блокирует", () => {
    renderApplying(ENUM_ROLES.MANAGER);

    expect(getButton().disabled).toBe(false);
    expect(getButton().parentElement!.className).not.toContain("deactive");
  });
});
