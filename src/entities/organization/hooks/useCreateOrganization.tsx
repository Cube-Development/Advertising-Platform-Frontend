import { useToast } from "@shared/ui";
import {
  useCreateOrganizationMutation,
  useGetProfileEDOMutationMutation,
} from "../api";
import { IGetMyOrganizationResponse } from "../types";

export const useCreateOrganization = () => {
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
        title: "Организация успешно отправлена на модерацию",
        variant: "success",
      });
    } catch (error) {
      console.error("Error creating organization:", error);
      toast({
        title: "Ошибка при создании организации",
        variant: "error",
      });
    }
  };

  return {
    create,
    isLoading: isLoadingProfile || isLoadingCreate,
  };
};
