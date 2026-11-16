import {
  promocodeSlice,
  selectPromocode,
  startPromocodeApply,
} from "@entities/wallet";
import { seedPromocode } from "@entities/wallet/testing/seedPromocode";
import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useCreatePostAdvertiser } from "./useCreatePostAdvertiser";

const NEW_PROJECT_ID = "00000000-0000-4000-8600-000000000111";
const SAVED_PROJECT_ID = "00000000-0000-4000-8600-000000000321";
const DISCOUNT = {
  amount_before: 1000,
  discount_amount: 100,
  amount_after: 900,
};

const createCart = vi.fn(() => ({
  unwrap: () => Promise.resolve({ project_id: NEW_PROJECT_ID }),
}));
const createProjectCart = vi.fn(() => ({
  unwrap: () => Promise.resolve({ succsess: true }),
}));
const navigate = vi.fn();
/** `save_project` из URL: пустая строка — общая корзина */
let saveProjectId = "";

vi.mock("@entities/project", () => ({
  useCreateCartMutation: () => [createCart, { isLoading: false }],
  useCreateProjectCartMutation: () => [createProjectCart, { isLoading: false }],
}));

vi.mock("@entities/user", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  useFindLanguage: () => ({ id: 1 }),
}));

// Настоящий слайс промокода без барреля сущности (он тянет UI)
vi.mock("@entities/wallet", async () => ({
  ...(await import("@entities/wallet/store/promocodeSlice")),
}));

vi.mock("@shared/hooks", async () => {
  const redux = await import("react-redux");
  return {
    useAppDispatch: redux.useDispatch,
    useAppSelector: redux.useSelector,
  };
});

vi.mock("@shared/ui", () => ({ useToast: () => ({ toast: vi.fn() }) }));

vi.mock("@shared/utils", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  QueryParamsUUID: () => saveProjectId,
}));

vi.mock("react-router-dom", () => ({ useNavigate: () => navigate }));

const setupStore = () =>
  configureStore({
    reducer: { [promocodeSlice.reducerPath]: promocodeSlice.reducer },
  });

const createPost = async (store: ReturnType<typeof setupStore>) => {
  const { result } = renderHook(() => useCreatePostAdvertiser(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    ),
  });
  await act(() => result.current.createPostAdvertiser());
};

beforeEach(() => {
  window.sessionStorage.clear();
  saveProjectId = "";
  createCart.mockClear();
  createProjectCart.mockClear();
  navigate.mockClear();
});

describe("useCreatePostAdvertiser — промокод уходит в оформление заказа", () => {
  test("код общей корзины привязывается к созданному из неё проекту", async () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({ code: "AUTUMN", projectId: null, discount: DISCOUNT }),
    );

    await createPost(store);

    expect(createCart).toHaveBeenCalled();
    expect(selectPromocode(NEW_PROJECT_ID)(store.getState()).code).toBe(
      "AUTUMN",
    );
    expect(navigate).toHaveBeenCalledWith(
      expect.stringContaining(NEW_PROJECT_ID),
    );
  });

  test("корзина сохранённого проекта: код остаётся у этого проекта", async () => {
    saveProjectId = SAVED_PROJECT_ID;
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: SAVED_PROJECT_ID,
        discount: DISCOUNT,
      }),
    );

    await createPost(store);

    expect(createProjectCart).toHaveBeenCalledWith(
      expect.objectContaining({ project_id: SAVED_PROJECT_ID }),
    );
    expect(createCart).not.toHaveBeenCalled();
    expect(selectPromocode(SAVED_PROJECT_ID)(store.getState()).code).toBe(
      "AUTUMN",
    );
    expect(navigate).toHaveBeenCalledWith(
      expect.stringContaining(SAVED_PROJECT_ID),
    );
  });

  test("код сохранённого проекта не переезжает в проект из общей корзины", async () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: SAVED_PROJECT_ID,
        discount: DISCOUNT,
      }),
    );

    await createPost(store);

    expect(selectPromocode(NEW_PROJECT_ID)(store.getState()).code).toBeNull();
    expect(selectPromocode(SAVED_PROJECT_ID)(store.getState()).code).toBe(
      "AUTUMN",
    );
  });
});

describe("useCreatePostAdvertiser — ждёт проверку промокода", () => {
  test("пока идёт «Применить», проект не создаётся", async () => {
    const store = setupStore();
    store.dispatch(startPromocodeApply("apply"));

    await createPost(store);

    expect(createCart).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });
});
