import { CreatePostFormData, ICreatePostForm } from "@entities/project";
import {
  resetAllDates,
  resetAllTimes,
} from "@features/createOrder/orderCard/lib/formStateUtils";
import { useCallback } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

export const useResetOrderDatetime = (
  getValues: UseFormGetValues<ICreatePostForm>,
  setValue: UseFormSetValue<ICreatePostForm>,
) => {
  const resetDates = useCallback(() => {
    const datetime = getValues().datetime;
    if (!datetime) return;
    setValue(CreatePostFormData.datetime, resetAllDates(datetime));
  }, [getValues, setValue]);

  const resetTimes = useCallback(() => {
    const datetime = getValues().datetime;
    if (!datetime) return;
    setValue(CreatePostFormData.datetime, resetAllTimes(datetime));
  }, [getValues, setValue]);

  const resetDateAndTime = useCallback(() => {
    const datetime = getValues().datetime;
    if (!datetime) return;
    setValue(
      CreatePostFormData.datetime,
      resetAllTimes(resetAllDates(datetime)),
    );
  }, [getValues, setValue]);

  return { resetDates, resetTimes, resetDateAndTime };
};
