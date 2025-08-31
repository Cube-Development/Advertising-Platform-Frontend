import { useToast } from "@shared/ui";
import {
  useCreateOrganizationMutation,
  useGetProfileEDOMutationMutation,
} from "../api";
import { IGetMyOrganizationResponse } from "../types";
import { useTranslation } from "react-i18next";

export const useCreateOrganization = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [getProfile, { isLoading: isLoadingProfile }] =
    useGetProfileEDOMutationMutation();

  const [createOrganization, { isLoading: isLoadingCreate }] =
    useCreateOrganizationMutation();

  const create = async (organization: IGetMyOrganizationResponse) => {
    if (organization) return;

    try {
      const profile = await getProfile().unwrap();

      if (!profile) return;

      await createOrganization({
        TIN: profile?.tin || "",
        PINFL: profile?.pinfl || "",
      }).unwrap();

      toast({
        title: t("toasts.organization.create.success"),
        variant: "success",
      });
    } catch (error) {
      console.error("Error creating organization:", error);
      toast({
        title: t("toasts.organization.create.error"),
        variant: "error",
      });

      throw error;
    }
  };

  return {
    create,
    isLoading: isLoadingProfile || isLoadingCreate,
  };
};
