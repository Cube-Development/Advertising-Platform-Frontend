import {
  ICreatePostForm,
  useApproveProjectMutation,
  useCreateOrderDatesMutation,
  useProjectNameMutation,
} from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { usePaymentProjectMutation } from "@entities/wallet";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useUploadFilesAndMedia } from "./useUploadFilesAndMedia";
import { useUploadPosts } from "./useUploadPosts";

export const useOnSubmitPayment = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projectName] = useProjectNameMutation();
  const [createOrderDates] = useCreateOrderDatesMutation();
  const [paymentProject] = usePaymentProjectMutation();
  const [approveProject] = useApproveProjectMutation();
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

      // Оплата или подтверждение
      await handleProjectPayment(projectId, role);
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
    await projectName({
      project_id: projectId,
      name: formData?.name || "Some project name",
    })
      .unwrap()
      .catch(() => {
        toast({
          variant: "error",
          title: t("toasts.create_order.date.error"),
        });
        throw new Error("Error: Create order project name");
      });
  };

  const handleProjectDates = async (formData: ICreatePostForm) => {
    await createOrderDates(formData.datetime)
      .unwrap()
      .catch(() => {
        toast({
          variant: "error",
          title: t("toasts.create_order.date.error"),
        });
        throw new Error("Error: Create order dates");
      });
  };

  const handleProjectPayment = async (projectId: string, role: ENUM_ROLES) => {
    await (
      role === ENUM_ROLES.ADVERTISER
        ? paymentProject(projectId)
        : approveProject({ project_id: projectId })
    )
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: t("toasts.create_order.payment.success"),
        });
        navigate(ENUM_PATHS.ORDERS);
      })
      .catch(() => {
        toast({
          variant: "error",
          title: t("toasts.create_order.payment.error"),
        });
        throw new Error("Error: Create order payment | approve project");
      });
  };

  return {
    isLoading,
    payment,
  };
};
