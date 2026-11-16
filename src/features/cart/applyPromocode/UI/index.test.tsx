import {
  promocodeSlice,
  selectIsApplyingPromocode,
  selectPromocode,
} from "@entities/wallet";
import { seedPromocode } from "@entities/wallet/testing/seedPromocode";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ButtonHTMLAttributes } from "react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { ApplyPromocode } from "./index";

const PROJECT_ID = "00000000-0000-4000-8600-000000000321";
const OTHER_PROJECT_ID = "00000000-0000-4000-8600-000000000322";
const DISCOUNT = {
  amount_before: 1000,
  discount_amount: 100,
  amount_after: 900,
};
const NEW_DISCOUNT = {
  amount_before: 2000,
  discount_amount: 200,
  amount_after: 1800,
};
const EXPIRED = { status: 400, data: { message: "Promocode is expired" } };

const resolved = () => ({ unwrap: () => Promise.resolve(DISCOUNT) });
const checkCommon = vi.fn(resolved);
const checkProject = vi.fn(resolved);
const toast = vi.fn();

/** Ответ, который придёт, когда тест скажет */
const deferred = () => {
  let resolve!: (value: typeof DISCOUNT) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<typeof DISCOUNT>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  // Отклонённый ответ, который никто не ждёт, не должен ронять прогон
  promise.catch(() => undefined);
  return { unwrap: () => promise, resolve, reject };
};

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

vi.mock("@entities/project", () => ({
  useCheckCommonCartPromocodeMutation: () => [
    checkCommon,
    { isLoading: false },
  ],
  useCheckProjectCartPromocodeMutation: () => [
    checkProject,
    { isLoading: false },
  ],
}));

// Настоящий слайс промокода без барреля сущности (он тянет UI)
vi.mock("@entities/wallet", async () => ({
  ...(await import("@entities/wallet/store/promocodeSlice")),
  ...(await import("@entities/wallet/helpers/getPromocodeError")),
  ...(await import("@entities/wallet/helpers/isPromocodeRejected")),
}));

vi.mock("@shared/hooks", async () => {
  const redux = await import("react-redux");
  return {
    useAppDispatch: redux.useDispatch,
    useAppSelector: redux.useSelector,
  };
});

vi.mock("@shared/ui", () => ({
  Input: (props: Record<string, unknown>) => <input {...props} />,
  MyButton: ({
    children,
    type,
    disabled,
  }: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button type={type} disabled={disabled}>
      {children}
    </button>
  ),
  useToast: () => ({ toast }),
}));

const setupStore = () =>
  configureStore({
    reducer: { [promocodeSlice.reducerPath]: promocodeSlice.reducer },
  });

const renderField = (
  store: ReturnType<typeof setupStore>,
  props: { amount?: number; projectId?: string | null },
) =>
  render(
    <Provider store={store}>
      <ApplyPromocode {...props} />
    </Provider>,
  );

const applyCode = (code: string) => {
  const input = screen.getByPlaceholderText("cart.promocode.placeholder");
  fireEvent.change(input, { target: { value: code } });
  fireEvent.submit(input.closest("form")!);
};

beforeEach(() => {
  window.sessionStorage.clear();
  checkCommon.mockClear();
  checkProject.mockClear();
  toast.mockClear();
});

describe("ApplyPromocode — промокод своей корзины", () => {
  test("корзина сохранённого проекта проверяет код по проекту и привязывает его", async () => {
    const store = setupStore();
    renderField(store, { amount: 1000, projectId: PROJECT_ID });

    applyCode("AUTUMN");

    await waitFor(() =>
      expect(store.getState().promocode).toEqual({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: DISCOUNT,
        applyId: null,
      }),
    );
    expect(checkProject).toHaveBeenCalledWith({
      project_id: PROJECT_ID,
      promocode: "AUTUMN",
    });
    expect(checkCommon).not.toHaveBeenCalled();
  });

  test("общая корзина проверяет код по общей корзине", async () => {
    const store = setupStore();
    renderField(store, { amount: 1000 });

    applyCode("AUTUMN");

    await waitFor(() => expect(store.getState().promocode.code).toBe("AUTUMN"));
    expect(store.getState().promocode.projectId).toBeNull();
    expect(checkCommon).toHaveBeenCalledWith({ promocode: "AUTUMN" });
    expect(checkProject).not.toHaveBeenCalled();
  });

  test("код другой корзины не показывается и не перепроверяется", () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({ code: "AUTUMN", projectId: null, discount: DISCOUNT }),
    );
    renderField(store, { amount: 1000, projectId: OTHER_PROJECT_ID });

    const input = screen.getByPlaceholderText(
      "cart.promocode.placeholder",
    ) as HTMLInputElement;
    expect(input.value).toBe("");
    expect(input.disabled).toBe(false);
    expect(checkCommon).not.toHaveBeenCalled();
    expect(checkProject).not.toHaveBeenCalled();
  });

  test("свой код корзины проекта перепроверяется по проекту", async () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: DISCOUNT,
      }),
    );
    renderField(store, { amount: 1000, projectId: PROJECT_ID });

    await waitFor(() =>
      expect(checkProject).toHaveBeenCalledWith({
        project_id: PROJECT_ID,
        promocode: "AUTUMN",
      }),
    );
    expect(checkCommon).not.toHaveBeenCalled();
  });
});

describe("ApplyPromocode — запоздалый ответ перепроверки", () => {
  test("после ухода из корзины ошибка не сбрасывает код и не показывает тост", async () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({ code: "AUTUMN", projectId: null, discount: DISCOUNT }),
    );
    const response = deferred();
    checkCommon.mockImplementationOnce(() => response);
    const { unmount } = renderField(store, { amount: 1000 });

    unmount();
    response.reject(EXPIRED);
    await flush();

    expect(store.getState().promocode.code).toBe("AUTUMN");
    expect(toast).not.toHaveBeenCalled();
  });

  test("после крестика ответ не возвращает скидку", async () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({ code: "AUTUMN", projectId: null, discount: DISCOUNT }),
    );
    const response = deferred();
    checkCommon.mockImplementationOnce(() => response);
    renderField(store, { amount: 1000 });

    fireEvent.click(screen.getByLabelText("cart.promocode.remove"));
    response.resolve(NEW_DISCOUNT);
    await flush();

    expect(store.getState().promocode).toEqual({
      code: null,
      projectId: null,
      discount: null,
      applyId: null,
    });
  });
});

describe("ApplyPromocode — код убрали, пока шла перепроверка", () => {
  test("крестик и новый код: ошибка старой проверки без тоста и без сброса", async () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({ code: "OLD", projectId: null, discount: DISCOUNT }),
    );
    const response = deferred();
    checkCommon.mockImplementationOnce(() => response);
    renderField(store, { amount: 1000 });

    fireEvent.click(screen.getByLabelText("cart.promocode.remove"));
    applyCode("NEW");
    await waitFor(() => expect(store.getState().promocode.code).toBe("NEW"));

    response.reject(EXPIRED);
    await flush();

    expect(toast).not.toHaveBeenCalled();
    expect(store.getState().promocode.code).toBe("NEW");
  });
});

describe("ApplyPromocode — два применения подряд", () => {
  /** Применил в общей корзине и, не дождавшись ответа, применил в корзине проекта */
  const applyInBothCarts = async (store: ReturnType<typeof setupStore>) => {
    const commonResponse = deferred();
    checkCommon.mockImplementationOnce(() => commonResponse);
    const commonCart = renderField(store, { amount: 1000 });
    applyCode("COMMON");
    commonCart.unmount();

    renderField(store, { amount: 1000, projectId: PROJECT_ID });
    applyCode("SAVED");
    await waitFor(() => expect(store.getState().promocode.code).toBe("SAVED"));
    return commonResponse;
  };

  test("побеждает последнее применение, хотя ответ первого пришёл позже", async () => {
    const store = setupStore();
    const commonResponse = await applyInBothCarts(store);

    commonResponse.resolve(NEW_DISCOUNT);
    await flush();

    expect(store.getState().promocode).toEqual({
      code: "SAVED",
      projectId: PROJECT_ID,
      discount: DISCOUNT,
      applyId: null,
    });
  });

  test("ошибка сменённого применения не показывает тост", async () => {
    const store = setupStore();
    const commonResponse = await applyInBothCarts(store);

    commonResponse.reject(EXPIRED);
    await flush();

    expect(toast).not.toHaveBeenCalled();
    expect(store.getState().promocode.code).toBe("SAVED");
  });

  test("ответ своего применения после ухода со страницы записывается", async () => {
    const store = setupStore();
    const response = deferred();
    checkProject.mockImplementationOnce(() => response);
    const savedCart = renderField(store, {
      amount: 1000,
      projectId: PROJECT_ID,
    });

    applyCode("SAVED");
    expect(selectIsApplyingPromocode(store.getState())).toBe(true);
    // Например, «Добавить ещё»: код ждёт в корзине проекта
    savedCart.unmount();
    response.resolve(DISCOUNT);
    await flush();

    expect(selectPromocode(PROJECT_ID)(store.getState()).code).toBe("SAVED");
    expect(selectIsApplyingPromocode(store.getState())).toBe(false);
  });
});

describe("ApplyPromocode — перепроверка суммы не удалась", () => {
  const TIMEOUT = { status: "TIMEOUT_ERROR", error: "AbortError" };

  const recheckWith = async (outcome: unknown) => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({ code: "AUTUMN", projectId: null, discount: DISCOUNT }),
    );
    const response = deferred();
    checkCommon.mockImplementationOnce(() => response);
    renderField(store, { amount: 2000 });

    response.reject(outcome);
    await flush();
    return store;
  };

  test("сеть или таймаут: код остаётся, скидки за прежнюю сумму нет, тоста нет", async () => {
    const store = await recheckWith(TIMEOUT);

    expect(store.getState().promocode).toMatchObject({
      code: "AUTUMN",
      projectId: null,
      discount: null,
    });
    expect(toast).not.toHaveBeenCalled();
  });

  test("код отвергнут: сброс и тост с причиной", async () => {
    const store = await recheckWith(EXPIRED);

    expect(store.getState().promocode.code).toBeNull();
    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "toasts.cart.promocode.expired" }),
    );
  });
});
