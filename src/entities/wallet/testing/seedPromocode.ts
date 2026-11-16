import { Dispatch } from "@reduxjs/toolkit";
import { setPromocode, startPromocodeApply } from "../store/promocodeSlice";
import { IPromocodeDiscount, IPromocodeTarget } from "../types/promocode.types";

const SEED_APPLY_ID = "seed";

/** Тестам: код уже применён в корзине — как после успешного «Применить» */
export const seedPromocode =
  (promocode: IPromocodeTarget & { discount: IPromocodeDiscount }) =>
  (dispatch: Dispatch) => {
    dispatch(startPromocodeApply(SEED_APPLY_ID));
    dispatch(setPromocode({ ...promocode, applyId: SEED_APPLY_ID }));
  };
