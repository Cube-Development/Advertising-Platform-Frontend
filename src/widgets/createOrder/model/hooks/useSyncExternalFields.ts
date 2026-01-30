import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  ContentType,
  CreatePostFormData,
  ICreatePostForm,
  IDatetime,
} from "@entities/project";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { formatDateToRuString } from "@shared/utils";
import { clearExternalField } from "../slice/createOrderSlice";

interface UseSyncExternalFieldsProps {
  formState: ICreatePostForm;
  setValue: UseFormSetValue<ICreatePostForm>;
}

export const useSyncExternalFields = ({
  formState,
  setValue,
}: UseSyncExternalFieldsProps) => {
  const externalField = useAppSelector(
    (state) => state.createOrder.externalField,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (externalField) {
      const { name, value } = externalField;

      if (name === "postText") {
        const postType = formState.selectedPostType;
        const multiId = formState.selectedMultiPostId;

        if (multiId) {
          const index = formState.multiposts?.findIndex(
            (p) => p.order_id === multiId && p.post_type === postType,
          );
          if (index !== undefined && index !== -1) {
            const newMultiposts = [...(formState.multiposts || [])];
            newMultiposts[index] = {
              ...newMultiposts[index],
              text: [{ content_type: ContentType.text, content: value }],
            };
            setValue(CreatePostFormData.multiposts, newMultiposts);
          }
        } else {
          const index = formState.posts?.findIndex(
            (p) => p.post_type === postType,
          );
          if (index !== undefined && index !== -1) {
            const newPosts = [...(formState.posts || [])];
            newPosts[index] = {
              ...newPosts[index],
              text: [{ content_type: ContentType.text, content: value }],
            };
            setValue(CreatePostFormData.posts, newPosts);
          }
        }
      } else if (name === "schedule") {
        console.log("Voice Agent Sync: Applying schedule", value);
        const { date, date_from, date_to, time_from, time_to } = value;

        const formattedDate = date ? formatDateToRuString(new Date(date)) : "";
        const formattedDateFrom = date_from
          ? formatDateToRuString(new Date(date_from))
          : "";
        const formattedDateTo = date_to
          ? formatDateToRuString(new Date(date_to))
          : "";

        const newOrders: IDatetime[] = (formState.datetime?.orders || []).map(
          (order) => {
            const updatedOrder = {
              ...order,
              time_from: time_from || order.time_from,
              time_to: time_to || order.time_to,
            };

            if (formattedDateFrom && formattedDateTo) {
              delete updatedOrder.date;
              updatedOrder.date_from = formattedDateFrom;
              updatedOrder.date_to = formattedDateTo;
            } else if (formattedDate) {
              delete updatedOrder.date_from;
              delete updatedOrder.date_to;
              updatedOrder.date = formattedDate;
            }

            return updatedOrder;
          },
        );

        setValue(CreatePostFormData.datetime, {
          ...formState.datetime,
          orders: newOrders,
        });
      } else {
        // @ts-ignore
        setValue(name, value);
      }

      dispatch(clearExternalField());
    }
  }, [externalField, setValue, formState, dispatch]);
};
