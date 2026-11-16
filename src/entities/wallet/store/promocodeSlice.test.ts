import { login, logout } from "@entities/user";
import { configureStore } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, test } from "vitest";
import { IPromocodeDiscount } from "../types/promocode.types";
import { seedPromocode } from "../testing/seedPromocode";
import { promocodeListener } from "./promocodeListener";
import {
  bindPromocodeToProject,
  cancelPromocodeApply,
  promocodeSlice,
  resetPromocode,
  selectIsApplyingPromocode,
  selectPromocode,
  setPromocode,
  setPromocodeDiscount,
  startPromocodeApply,
} from "./promocodeSlice";

const PROJECT_ID = "00000000-0000-4000-8600-000000000321";
const OTHER_PROJECT_ID = "00000000-0000-4000-8600-000000000322";
const STORAGE_KEY = "promocode";
const DISCOUNT: IPromocodeDiscount = {
  amount_before: 1000,
  discount_amount: 100,
  amount_after: 900,
};

/** Как в app/providers/store: слайс и запись в sessionStorage */
const setupStore = () =>
  configureStore({
    reducer: { [promocodeSlice.reducerPath]: promocodeSlice.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(promocodeListener.middleware),
  });

const readStorage = () => window.sessionStorage.getItem(STORAGE_KEY);

describe("promocodeSlice — промокод привязан к своей корзине", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  test("код и скидка видны только своей корзине", () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({ code: "AUTUMN", projectId: null, discount: DISCOUNT }),
    );

    expect(selectPromocode(null)(store.getState())).toMatchObject({
      code: "AUTUMN",
      discount: DISCOUNT,
    });
    expect(selectPromocode(PROJECT_ID)(store.getState())).toMatchObject({
      code: null,
      discount: null,
    });
  });

  test("код общей корзины уходит в проект, созданный из неё", () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({ code: "AUTUMN", projectId: null, discount: DISCOUNT }),
    );
    store.dispatch(bindPromocodeToProject(PROJECT_ID));

    expect(selectPromocode(PROJECT_ID)(store.getState()).code).toBe("AUTUMN");
    expect(selectPromocode(null)(store.getState()).code).toBeNull();
  });

  test("код сохранённого проекта не переезжает в другой проект", () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: DISCOUNT,
      }),
    );
    store.dispatch(bindPromocodeToProject(OTHER_PROJECT_ID));

    expect(selectPromocode(PROJECT_ID)(store.getState()).code).toBe("AUTUMN");
    expect(selectPromocode(OTHER_PROJECT_ID)(store.getState()).code).toBeNull();
  });

  test("код другой корзины заменяет прежний", () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: DISCOUNT,
      }),
    );
    store.dispatch(
      seedPromocode({
        code: "WINTER",
        projectId: OTHER_PROJECT_ID,
        discount: DISCOUNT,
      }),
    );

    expect(selectPromocode(OTHER_PROJECT_ID)(store.getState()).code).toBe(
      "WINTER",
    );
    expect(selectPromocode(PROJECT_ID)(store.getState()).code).toBeNull();
  });

  test("код хранится в sessionStorage и восстанавливается в новом store", () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: DISCOUNT,
      }),
    );

    expect(JSON.parse(readStorage() ?? "null")).toEqual({
      code: "AUTUMN",
      projectId: PROJECT_ID,
    });
    // Скидка не хранится — корзина и экран оплаты пересчитают её
    expect(setupStore().getState().promocode).toEqual({
      code: "AUTUMN",
      projectId: PROJECT_ID,
      discount: null,
      applyId: null,
    });

    store.dispatch(resetPromocode());
    expect(readStorage()).toBeNull();
  });

  test("битое значение в sessionStorage игнорируется", () => {
    window.sessionStorage.setItem(STORAGE_KEY, "{not json");
    expect(setupStore().getState().promocode.code).toBeNull();

    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ code: 42, projectId: PROJECT_ID }),
    );
    expect(setupStore().getState().promocode.code).toBeNull();
  });

  test("выход из аккаунта сбрасывает код", () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({ code: "AUTUMN", projectId: null, discount: DISCOUNT }),
    );

    store.dispatch(logout());

    expect(store.getState().promocode.code).toBeNull();
    expect(readStorage()).toBeNull();
  });

  test("вход в аккаунт сбрасывает код прошлой сессии", () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({ code: "AUTUMN", projectId: null, discount: DISCOUNT }),
    );

    store.dispatch(login());

    expect(store.getState().promocode.code).toBeNull();
    expect(readStorage()).toBeNull();
  });
});

describe("promocodeSlice — запоздалые ответы не трогают чужой код", () => {
  const NEW_DISCOUNT: IPromocodeDiscount = {
    amount_before: 2000,
    discount_amount: 200,
    amount_after: 1800,
  };

  beforeEach(() => {
    window.sessionStorage.clear();
  });

  test("скидка применяется только к тому же коду той же корзины", () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: DISCOUNT,
      }),
    );

    // Ответ общей корзины и ответ по старому коду этого проекта
    store.dispatch(
      setPromocodeDiscount({
        code: "AUTUMN",
        projectId: null,
        discount: NEW_DISCOUNT,
      }),
    );
    store.dispatch(
      setPromocodeDiscount({
        code: "OLD",
        projectId: PROJECT_ID,
        discount: NEW_DISCOUNT,
      }),
    );
    expect(store.getState().promocode.discount).toEqual(DISCOUNT);

    store.dispatch(
      setPromocodeDiscount({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: NEW_DISCOUNT,
      }),
    );
    expect(store.getState().promocode.discount).toEqual(NEW_DISCOUNT);
  });

  test("после крестика ответ пересчёта не возвращает скидку", () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({ code: "AUTUMN", projectId: null, discount: DISCOUNT }),
    );
    store.dispatch(resetPromocode());

    store.dispatch(
      setPromocodeDiscount({
        code: "AUTUMN",
        projectId: null,
        discount: NEW_DISCOUNT,
      }),
    );

    expect(store.getState().promocode).toEqual({
      code: null,
      projectId: null,
      discount: null,
      applyId: null,
    });
  });

  test("сброс с кодом убирает только этот код этой корзины", () => {
    const store = setupStore();
    store.dispatch(
      seedPromocode({
        code: "AUTUMN",
        projectId: PROJECT_ID,
        discount: DISCOUNT,
      }),
    );

    store.dispatch(resetPromocode({ code: "AUTUMN", projectId: null }));
    store.dispatch(resetPromocode({ code: "WINTER", projectId: PROJECT_ID }));
    expect(selectPromocode(PROJECT_ID)(store.getState()).code).toBe("AUTUMN");

    store.dispatch(resetPromocode({ code: "AUTUMN", projectId: PROJECT_ID }));
    expect(store.getState().promocode.code).toBeNull();
  });
});

describe("promocodeSlice — «Применить»: побеждает последнее начатое применение", () => {
  const COMMON = { code: "COMMON", projectId: null, discount: DISCOUNT };
  const SAVED = { code: "SAVED", projectId: PROJECT_ID, discount: DISCOUNT };

  beforeEach(() => {
    window.sessionStorage.clear();
  });

  test("ответ раньше начатого применения не перезаписывает более позднее", () => {
    const store = setupStore();
    // Применил в общей корзине, ушёл в корзину проекта и применил там
    store.dispatch(startPromocodeApply("common"));
    store.dispatch(startPromocodeApply("saved"));
    store.dispatch(setPromocode({ ...SAVED, applyId: "saved" }));
    store.dispatch(setPromocode({ ...COMMON, applyId: "common" }));

    expect(selectPromocode(PROJECT_ID)(store.getState()).code).toBe("SAVED");
    expect(selectPromocode(null)(store.getState()).code).toBeNull();
  });

  test("ответ раннего применения, пришедший первым, тоже не записывается", () => {
    const store = setupStore();
    store.dispatch(startPromocodeApply("common"));
    store.dispatch(startPromocodeApply("saved"));
    store.dispatch(setPromocode({ ...COMMON, applyId: "common" }));

    expect(store.getState().promocode.code).toBeNull();
    expect(selectIsApplyingPromocode(store.getState())).toBe(true);

    store.dispatch(setPromocode({ ...SAVED, applyId: "saved" }));
    expect(selectPromocode(PROJECT_ID)(store.getState()).code).toBe("SAVED");
    expect(selectIsApplyingPromocode(store.getState())).toBe(false);
  });

  test("выход из аккаунта во время проверки отменяет ответ", () => {
    const store = setupStore();
    store.dispatch(startPromocodeApply("common"));

    store.dispatch(logout());
    store.dispatch(setPromocode({ ...COMMON, applyId: "common" }));

    expect(store.getState().promocode.code).toBeNull();
    expect(selectIsApplyingPromocode(store.getState())).toBe(false);
  });

  test("отказ снимает ожидание только своего применения", () => {
    const store = setupStore();
    store.dispatch(startPromocodeApply("common"));
    store.dispatch(startPromocodeApply("saved"));

    store.dispatch(cancelPromocodeApply("common"));
    expect(selectIsApplyingPromocode(store.getState())).toBe(true);

    store.dispatch(cancelPromocodeApply("saved"));
    expect(selectIsApplyingPromocode(store.getState())).toBe(false);
  });

  test("сброс кода не отменяет начатое применение нового", () => {
    const store = setupStore();
    store.dispatch(seedPromocode(COMMON));
    store.dispatch(startPromocodeApply("saved"));

    store.dispatch(resetPromocode({ code: "COMMON", projectId: null }));
    expect(selectIsApplyingPromocode(store.getState())).toBe(true);

    store.dispatch(setPromocode({ ...SAVED, applyId: "saved" }));
    expect(selectPromocode(PROJECT_ID)(store.getState()).code).toBe("SAVED");
  });

  test("ожидание применения не попадает в sessionStorage", () => {
    const store = setupStore();
    store.dispatch(seedPromocode(SAVED));
    store.dispatch(startPromocodeApply("next"));

    expect(JSON.parse(readStorage() ?? "null")).toEqual({
      code: "SAVED",
      projectId: PROJECT_ID,
    });
    expect(setupStore().getState().promocode.applyId).toBeNull();
  });
});
