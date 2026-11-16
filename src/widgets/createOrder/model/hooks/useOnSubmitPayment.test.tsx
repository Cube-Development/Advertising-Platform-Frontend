import { ICreatePostForm } from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import {
  ENUM_WALLETS_TYPE,
  promocodeSlice,
  resetPromocode,
} from "@entities/wallet";
import { seedPromocode } from "@entities/wallet/testing/seedPromocode";
import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useOnSubmitPayment } from "./useOnSubmitPayment";

const PROJECT_ID = "00000000-0000-4000-8600-000000000321";
const DISCOUNT = {
  amount_before: 1000,
  discount_amount: 100,
  amount_after: 900,
};
const FORM = {
  datetime: { orders: [] },
  wallet_type: "deposit",
} as unknown as ICreatePostForm;

const ok = () => ({ unwrap: () => Promise.resolve({ success: true }) });
const createPayment = vi.fn(ok);
const uploadFilesAndMedia = vi.fn(async () => undefined);
const toast = vi.fn();

vi.mock("@entities/project", () => ({
  ENUM_AGENCY_PROJECT_STATUS: {},
  ENUM_AGENCY_PROJECT_TYPES: {},
  ENUM_PROJECT_TYPES: {},
  ENUM_MANAGER_PROJECT_STATUS: {},
  ENUM_MANAGER_PROJECT_TYPES: {},
  useApproveProjectMutation: () => [vi.fn(ok)],
  useCreateOrderDatesMutation: () => [vi.fn(ok)],
  useCreateOrderPricesMutation: () => [vi.fn(ok)],
  useProjectNameMutation: () => [vi.fn(ok)],
  useRequestApproveMutation: () => [vi.fn(ok)],
  useSaveAdvProjectMutation: () => [vi.fn(ok)],
}));

// Настоящий слайс промокода без барреля сущности (он тянет UI)
vi.mock("@entities/wallet", async () => ({
  ...(await import("@entities/wallet/store/promocodeSlice")),
  ...(await import("@entities/wallet/helpers/getPromocodeError")),
  ...(await import("@entities/wallet/config/promocode")),
  ENUM_WALLETS_TYPE: { DEPOSIT: "deposit" },
  useCreatePaymentProjectMutation: () => [createPayment],
}));

vi.mock("./useUploadFilesAndMedia", () => ({
  useUploadFilesAndMedia: () => ({ uploadFilesAndMedia }),
}));

vi.mock("./useUploadPosts", () => ({
  useUploadPosts: () => ({ uploadPosts: async () => undefined }),
}));

vi.mock("@shared/hooks", async () => {
  const redux = await import("react-redux");
  return { useAppDispatch: redux.useDispatch };
});

vi.mock("@shared/ui", () => ({ useToast: () => ({ toast }) }));

vi.mock("react-router-dom", () => ({ useNavigate: () => vi.fn() }));

const setupStore = () =>
  configureStore({
    reducer: { [promocodeSlice.reducerPath]: promocodeSlice.reducer },
  });

const renderPayment = (store: ReturnType<typeof setupStore>) =>
  renderHook(() => useOnSubmitPayment(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    ),
  });

const pay = async (result: {
  current: ReturnType<typeof useOnSubmitPayment>;
}) => {
  let isPaid = false;
  await act(async () => {
    isPaid = await result.current.payment(
      { ...FORM, wallet_type: ENUM_WALLETS_TYPE.DEPOSIT },
      PROJECT_ID,
      ENUM_ROLES.ADVERTISER,
    );
  });
  return isPaid;
};

beforeEach(() => {
  window.sessionStorage.clear();
  createPayment.mockClear();
  uploadFilesAndMedia.mockClear();
  toast.mockClear();
});

describe("useOnSubmitPayment — промокод в оплате", () => {
  test("в оплату уходит код этого проекта, после оплаты он сбрасывается", async () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: DISCOUNT,
      }),
    );
    const { result } = renderPayment(store);

    expect(await pay(result)).toBe(true);

    expect(createPayment).toHaveBeenCalledWith({
      project_id: PROJECT_ID,
      wallet_type: ENUM_WALLETS_TYPE.DEPOSIT,
      promocode: "AUTUMN",
    });
    expect(store.getState().promocode.code).toBeNull();
  });

  test("код общей корзины в оплату проекта не уходит и остаётся на месте", async () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({ code: "AUTUMN", projectId: null, discount: DISCOUNT }),
    );
    const { result } = renderPayment(store);

    expect(await pay(result)).toBe(true);

    expect(createPayment).toHaveBeenCalledWith(
      expect.objectContaining({ promocode: undefined }),
    );
    expect(store.getState().promocode).toMatchObject({
      code: "AUTUMN",
      projectId: null,
    });
  });

  test("код, сброшенный пока грузились файлы, в оплату не уходит", async () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: DISCOUNT,
      }),
    );
    // Экран оплаты убрал недоступный код посреди отправки
    uploadFilesAndMedia.mockImplementationOnce(async () => {
      store.dispatch(resetPromocode());
    });
    const { result } = renderPayment(store);

    expect(await pay(result)).toBe(true);

    expect(createPayment).toHaveBeenCalledWith(
      expect.objectContaining({ promocode: undefined }),
    );
  });

  test("код стал недоступен при оплате — сброс и тост про промокод", async () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: DISCOUNT,
      }),
    );
    createPayment.mockImplementationOnce(() => ({
      unwrap: () =>
        Promise.reject({ data: { message: "Promocode is expired" } }),
    }));
    const { result } = renderPayment(store);

    expect(await pay(result)).toBe(false);

    expect(store.getState().promocode.code).toBeNull();
    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "toasts.cart.promocode.expired" }),
    );
  });
});
