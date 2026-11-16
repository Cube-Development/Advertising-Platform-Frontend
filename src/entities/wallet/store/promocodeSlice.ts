import { login, logout } from "@entities/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IPromocodeDiscount,
  IPromocodeState,
  IPromocodeTarget,
} from "../types/promocode.types";
import { EMPTY_PROMOCODE, readPromocode } from "./promocodeStorage";

/** В слоте всё ещё этот код этой корзины: пока шёл запрос, его могли сменить или убрать */
const isCurrent = (state: IPromocodeState, target: IPromocodeTarget) =>
  state.code === target.code && state.projectId === target.projectId;

/**
 * Бэкенд не хранит промокод до оплаты: код живёт здесь от корзины до экрана оплаты.
 * Код привязан к своей корзине (`projectId`): код общей корзины уходит на оплату
 * только проекта, созданного из неё (`bindPromocodeToProject`), и не применяется
 * молча к сохранённому проекту — и наоборот. Код другой корзины перезаписывает прежний.
 * Переживает перезагрузку — sessionStorage (`promocodeListener`)
 */
export const promocodeSlice = createSlice({
  name: "promocode",
  // Ленивое начальное состояние: каждый новый store читает sessionStorage заново
  initialState: readPromocode,
  reducers: {
    /** «Применить» нажато: запишется ответ только этого применения (`setPromocode`) */
    startPromocodeApply: (state, action: PayloadAction<string>) => {
      state.applyId = action.payload;
    },
    /**
     * Ответ на «Применить». Не записывается, если после него начали другое
     * применение (в этой или другой корзине) или вышли из аккаунта:
     * побеждает последнее действие пользователя, а не последний ответ
     */
    setPromocode: (
      state,
      action: PayloadAction<
        IPromocodeTarget & { discount: IPromocodeDiscount; applyId: string }
      >,
    ) => {
      if (state.applyId !== action.payload.applyId) return;
      state.code = action.payload.code;
      state.projectId = action.payload.projectId;
      state.discount = action.payload.discount;
      state.applyId = null;
    },
    /** Код не принят: ожидание снимается, если это всё ещё последнее применение */
    cancelPromocodeApply: (state, action: PayloadAction<string>) => {
      if (state.applyId === action.payload) {
        state.applyId = null;
      }
    },
    /**
     * Пересчёт скидки: ответ по коду, которого в слоте уже нет, не применяется.
     * `null` — пересчитать не удалось (сеть, таймаут): код остаётся, но скидку
     * за прежнюю сумму не показываем
     */
    setPromocodeDiscount: (
      state,
      action: PayloadAction<
        IPromocodeTarget & { discount: IPromocodeDiscount | null }
      >,
    ) => {
      if (isCurrent(state, action.payload)) {
        state.discount = action.payload.discount;
      }
    },
    /** Общая корзина стала проектом — код уходит вместе с ней на создание заказа */
    bindPromocodeToProject: (state, action: PayloadAction<string>) => {
      if (state.code && state.projectId === null) {
        state.projectId = action.payload;
      }
    },
    /**
     * Без аргумента — убрать код (крестик). С кодом — только если это всё ещё он:
     * код стал недоступен или потрачен, а в слоте уже код другой корзины — его не трогаем.
     * Начатое применение нового кода не отменяется
     */
    resetPromocode: (
      state,
      action: PayloadAction<IPromocodeTarget | undefined>,
    ) => {
      if (action.payload && !isCurrent(state, action.payload)) return;
      return { ...EMPTY_PROMOCODE, applyId: state.applyId };
    },
  },
  extraReducers: (builder) => {
    // Код не переходит к следующему пользователю этой вкладки, ответ на «Применить» — тоже
    builder.addCase(logout, () => EMPTY_PROMOCODE);
    // Сессия могла истечь без logout — вошедший начинает без чужого кода
    builder.addCase(login, () => EMPTY_PROMOCODE);
  },
});

export default promocodeSlice.reducer;
export const {
  startPromocodeApply,
  setPromocode,
  cancelPromocodeApply,
  setPromocodeDiscount,
  bindPromocodeToProject,
  resetPromocode,
} = promocodeSlice.actions;

type TPromocodeRoot = { promocode: IPromocodeState };

/**
 * Промокод своей корзины: `projectId` — сохранённый проект или проект на оплате,
 * `null` — общая корзина. Код другой корзины здесь не виден
 */
export const selectPromocode =
  (projectId: string | null) =>
  (state: TPromocodeRoot): IPromocodeState =>
    state.promocode.projectId === projectId ? state.promocode : EMPTY_PROMOCODE;

/** Этот код этой корзины всё ещё применён: ответ, пришедший позже, ещё про него */
export const selectIsPromocodeCurrent =
  (target: IPromocodeTarget) => (state: TPromocodeRoot) =>
    isCurrent(state.promocode, target);

/** Идёт «Применить»: код ещё не в слоте, создавать проект рано — он уйдёт без кода */
export const selectIsApplyingPromocode = (state: TPromocodeRoot) =>
  state.promocode.applyId !== null;
