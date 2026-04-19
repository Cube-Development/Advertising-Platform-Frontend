import { IReadChannelData } from "@entities/channel";
import {
  ICatalogChannel,
  useRemoveFromCommonCartMutation,
  useRemoveFromManagerCartMutation,
  useRemoveFromPublicCartMutation,
} from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";

export const useChannelCartRemove = (
  isAuth: boolean,
  role: ENUM_ROLES | null,
  guestId: string,
  projectId: string | null,
  channel: IReadChannelData,
  setChannel: (card: IReadChannelData) => void
) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [removeFromCommonCart, { isLoading: isLoadingRemoveFromCommonCart }] =
    useRemoveFromCommonCartMutation();
  const [removeFromPublicCart, { isLoading: isLoadingRemoveFromPublicCart }] =
    useRemoveFromPublicCartMutation();
  const [removeFromManagerCart, { isLoading: isLoadingRemoveFromManagerCart }] =
    useRemoveFromManagerCartMutation();

  const isRemovingFromCart =
    isLoadingRemoveFromCommonCart ||
    isLoadingRemoveFromPublicCart ||
    isLoadingRemoveFromManagerCart;

  const handleRemoveFromCart = async (
    removeReq: { channel_id: string; language: number },
    currentCard: ICatalogChannel,
    newCard: IReadChannelData
  ) => {
    try {
      if (!isAuth && guestId) {
        await removeFromPublicCart({ ...removeReq, guest_id: guestId }).unwrap();
      } else if (isAuth && role === ENUM_ROLES.ADVERTISER && !projectId) {
        await removeFromCommonCart(removeReq).unwrap();
      } else if (
        isAuth && !!projectId
      ) {
        await removeFromManagerCart({ ...removeReq, project_id: projectId }).unwrap();
      }

      if (currentCard.id === channel.id) {
        setChannel(newCard);
      }
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.catalog.remove.error"),
      });
      console.error("Ошибка при удалении с корзины", error);
    }
  };

  return { handleRemoveFromCart, isRemovingFromCart };
};
