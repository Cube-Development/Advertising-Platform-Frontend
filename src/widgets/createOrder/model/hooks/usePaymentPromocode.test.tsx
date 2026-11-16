import { ENUM_ROLES } from "@entities/user";
import { promocodeSlice } from "@entities/wallet";
import { seedPromocode } from "@entities/wallet/testing/seedPromocode";
import { configureStore } from "@reduxjs/toolkit";
import { renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { usePaymentPromocode } from "./usePaymentPromocode";

const PROJECT_ID = "00000000-0000-4000-8600-000000000321";
const DISCOUNT = {
  amount_before: 1000,
  discount_amount: 100,
  amount_after: 900,
};

const checkPayment = vi.fn(() => ({ unwrap: () => Promise.resolve(DISCOUNT) }));
const toast = vi.fn();

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

// Настоящий слайс промокода без барреля сущности (он тянет UI)
vi.mock("@entities/wallet", async () => ({
  ...(await import("@entities/wallet/store/promocodeSlice")),
  ...(await import("@entities/wallet/helpers/getPromocodeError")),
  ...(await import("@entities/wallet/helpers/isPromocodeRejected")),
  useCheckPaymentPromocodeMutation: () => [checkPayment],
}));

vi.mock("@shared/hooks", async () => {
  const redux = await import("react-redux");
  return {
    useAppDispatch: redux.useDispatch,
    useAppSelector: redux.useSelector,
  };
});

vi.mock("@shared/ui", () => ({ useToast: () => ({ toast }) }));

const setupStore = () =>
  configureStore({
    reducer: { [promocodeSlice.reducerPath]: promocodeSlice.reducer },
  });

const renderPromocode = (
  store: ReturnType<typeof setupStore>,
  role = ENUM_ROLES.ADVERTISER,
) =>
  renderHook(
    () =>
      usePaymentPromocode({ projectId: PROJECT_ID, role, totalAmount: 1000 }),
    {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    },
  );

beforeEach(() => {
  window.sessionStorage.clear();
  checkPayment.mockClear();
  toast.mockClear();
});

describe("usePaymentPromocode — код только этого проекта", () => {
  test("код проекта перепроверяется по проекту и уменьшает сумму к оплате", async () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: DISCOUNT,
      }),
    );
    const { result } = renderPromocode(store);

    expect(checkPayment).toHaveBeenCalledWith({
      project_id: PROJECT_ID,
      promocode: "AUTUMN",
    });
    await waitFor(() => expect(result.current.payableAmount).toBe(900));
    expect(result.current.amountBefore).toBe(1000);
  });

  test("код общей корзины к проекту не применяется", () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({ code: "AUTUMN", projectId: null, discount: DISCOUNT }),
    );
    const { result } = renderPromocode(store);

    expect(checkPayment).not.toHaveBeenCalled();
    expect(result.current).toEqual({
      payableAmount: 1000,
      amountBefore: undefined,
    });
  });

  test("не у рекламодателя промокода нет", () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: DISCOUNT,
      }),
    );
    const { result } = renderPromocode(store, ENUM_ROLES.MANAGER);

    expect(checkPayment).not.toHaveBeenCalled();
    expect(result.current.payableAmount).toBe(1000);
  });

  test("ошибка после ухода со страницы не сбрасывает код и не показывает тост", async () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: DISCOUNT,
      }),
    );
    let reject!: (reason: unknown) => void;
    const response = new Promise((_, rej) => {
      reject = rej;
    });
    response.catch(() => undefined);
    checkPayment.mockImplementationOnce(() => ({
      unwrap: () => response as Promise<typeof DISCOUNT>,
    }));
    const { unmount } = renderPromocode(store);

    unmount();
    reject({ status: 400, data: { message: "Promocode is expired" } });
    await flush();

    expect(store.getState().promocode.code).toBe("AUTUMN");
    expect(toast).not.toHaveBeenCalled();
  });
});

describe("usePaymentPromocode — проверка на оплате не удалась", () => {
  const checkFailsWith = async (outcome: unknown) => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: DISCOUNT,
      }),
    );
    checkPayment.mockImplementationOnce(() => ({
      unwrap: () => Promise.reject(outcome),
    }));
    const { result } = renderPromocode(store);
    await flush();
    return { store, result };
  };

  test("сеть: код остаётся для оплаты, к оплате полная сумма, тоста нет", async () => {
    const { store, result } = await checkFailsWith({
      status: "FETCH_ERROR",
      error: "TypeError: Failed to fetch",
    });

    expect(store.getState().promocode).toMatchObject({
      code: "AUTUMN",
      discount: null,
    });
    expect(result.current).toEqual({
      payableAmount: 1000,
      amountBefore: undefined,
    });
    expect(toast).not.toHaveBeenCalled();
  });

  test("код отвергнут: сброс и тост с причиной", async () => {
    const { store } = await checkFailsWith({
      status: 400,
      data: { message: "Promocode is expired" },
    });

    expect(store.getState().promocode.code).toBeNull();
    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "toasts.cart.promocode.expired" }),
    );
  });
});
