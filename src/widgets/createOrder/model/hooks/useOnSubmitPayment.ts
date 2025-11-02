import {
  ENUM_MANAGER_PROJECT_STATUS,
  ENUM_MANAGER_PROJECT_TYPES,
  ICreatePostForm,
  // useApproveProjectMutation,
  useCreateOrderDatesMutation,
  useCreateOrderPricesMutation,
  useProjectNameMutation,
  useRequestApproveMutation,
} from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useUploadFilesAndMedia } from "./useUploadFilesAndMedia";
import { useUploadPosts } from "./useUploadPosts";
import {
  ENUM_WALLETS_TYPE,
  useCreatePaymentProjectMutation,
} from "@entities/wallet";

export const useOnSubmitPayment = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projectName] = useProjectNameMutation();
  const [createOrderDates] = useCreateOrderDatesMutation();
  const [createOrderPrices] = useCreateOrderPricesMutation();
  const [createPayment] = useCreatePaymentProjectMutation();
  // const [approveProject] = useApproveProjectMutation();
  const [requestApprove] = useRequestApproveMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { uploadPosts } = useUploadPosts();
  const { uploadFilesAndMedia } = useUploadFilesAndMedia();

  const payment = async (
    formData: ICreatePostForm,
    projectId: string,
    role: ENUM_ROLES,
  ) => {
    try {
      setIsLoading(true);

      // загрузка файлов
      await uploadFilesAndMedia(formData);

      // название проекта
      await handleProjectName(formData, projectId);

      // Создание постов
      await uploadPosts(formData, projectId);

      // Создание дат заказа и оплата
      await handleProjectDates(formData);

      // Создание цен заказов
      if (role === ENUM_ROLES.MANAGER) {
        await handleProjectPrices(formData);
      }

      // Оплата или подтверждение
      await handleProjectPayment(projectId, role, formData?.wallet_type);
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.create_order.post.error"),
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectName = async (
    formData: ICreatePostForm,
    projectId: string,
  ) => {
    try {
      await projectName({
        project_id: projectId,
        name: formData?.name || "Some project name",
      }).unwrap();
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.create_order.date.error"),
      });
      throw new Error("Error: Create order project name");
    }
  };

  const handleProjectDates = async (formData: ICreatePostForm) => {
    try {
      await createOrderDates(formData.datetime).unwrap();
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.create_order.date.error"),
      });
      throw new Error("Error: Create order dates");
    }
  };

  const handleProjectPrices = async (formData: ICreatePostForm) => {
    try {
      const prices = formData?.prices?.map((price) => ({
        order_id: price.order_id,
        price: price.selected_format.price,
      }));
      await createOrderPrices({ orders: prices || [] }).unwrap();
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.create_order.prices.error"),
      });
      throw new Error("Error: Create order prices");
    }
  };

  const handleProjectPayment = async (
    projectId: string,
    role: ENUM_ROLES,
    wallet_type?: ENUM_WALLETS_TYPE,
  ) => {
    try {
      if (role === ENUM_ROLES.ADVERTISER) {
        await createPayment({
          project_id: projectId,
          wallet_type: wallet_type!,
        }).unwrap();
      }
      // else if (role === ENUM_ROLES.MANAGER && !isManagerOwnProject) {
      //   await approveProject({ project_id: projectId }).unwrap();
      // }
      else if (role === ENUM_ROLES.MANAGER) {
        await requestApprove({ project_id: projectId }).unwrap();
      }
      toast({
        variant: "success",
        title: t("toasts.create_order.payment.success"),
      });
      if (role === ENUM_ROLES.MANAGER) {
        navigate(
          `${ENUM_PATHS.ORDERS}?project_type=${ENUM_MANAGER_PROJECT_TYPES.MY_PROJECT}&project_status=${ENUM_MANAGER_PROJECT_STATUS.REQUEST_APPROVE}`,
        );
      } else {
        navigate(ENUM_PATHS.ORDERS);
      }
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.create_order.payment.error"),
      });
      throw new Error("Error: Create order payment | approve project");
    }
  };

  return {
    isLoading,
    payment,
  };
};
