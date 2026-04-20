import {
  useAddToCommonCartMutation,
  useAddToManagerCartMutation,
  useAddToPublicCartMutation,
  ICatalogChannel,
} from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { IReadChannelData } from "@entities/channel";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";

export const useChannelCartAdd = (
  isAuth: boolean,
  role: ENUM_ROLES | null,
  guestId: string,
  projectId: string | null,
  channel: IReadChannelData,
  setChannel: (card: IReadChannelData) => void
) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [addToCommonCart, { isLoading: isLoadingAddToCommonCart }] =
    useAddToCommonCartMutation();
  const [addToPublicCart, { isLoading: isLoadingAddToPublicCart }] =
    useAddToPublicCartMutation();
  const [addToManagerCart, { isLoading: isLoadingAddToManagerCart }] =
    useAddToManagerCartMutation();

  const isAddingToCart =
    isLoadingAddToCommonCart ||
    isLoadingAddToPublicCart ||
    isLoadingAddToManagerCart;

  const handleAddToCart = async (
    addReq: { channel_id: string; format: number; match?: number; language: number },
    currentCard: ICatalogChannel,
    newCard: IReadChannelData
  ) => {
    try {
      if (!isAuth && guestId) {
        await addToPublicCart({ ...addReq, guest_id: guestId }).unwrap();
      } else if (isAuth && role === ENUM_ROLES.ADVERTISER && !projectId) {
        await addToCommonCart(addReq).unwrap();
      } else if (isAuth && !!projectId) {
        await addToManagerCart({ ...addReq, project_id: projectId }).unwrap();
      }

      if (currentCard.id === channel.id) {
        setChannel(newCard);
      }
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.catalog.add.error"),
      });
      console.error("Ошибка при добавлении в корзину", error);
    }
  };

  return { handleAddToCart, isAddingToCart };
};
