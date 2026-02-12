import {
  sortingFilter,
  useAddToCommonCartMutation,
  useAddToManagerCartMutation,
  useAddToPublicCartMutation,
  useGetCatalogQuery,
  useRemoveFromCommonCartMutation,
  useRemoveFromManagerCartMutation,
  useRemoveFromPublicCartMutation,
} from "@entities/project";
import { GenerateGuestId, useFindLanguage } from "@entities/user";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import Cookies from "js-cookie";
import { updateVoiceSyncState } from "../../slice/sync-slice";

export function useAddToCart() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.user);
  const language = useFindLanguage();
  const langId = language?.id || USER_LANGUAGES_LIST[0].id;
  const projectId = Cookies.get(ENUM_COOKIES_TYPES.PROJECT_ID);
  const guestId = Cookies.get(ENUM_COOKIES_TYPES.GUEST_ID) || GenerateGuestId();

  const [addToCommonCart] = useAddToCommonCartMutation();
  const [addToPublicCart] = useAddToPublicCartMutation();
  const [addToManagerCart] = useAddToManagerCartMutation();

  const [removeFromCommonCart] = useRemoveFromCommonCartMutation();
  const [removeFromPublicCart] = useRemoveFromPublicCartMutation();
  const [removeFromManagerCart] = useRemoveFromManagerCartMutation();

  const { refetch } = useGetCatalogQuery({
    page: 1,
    elements_on_page: 10,
    filter: {
      platform: 1,
      business: [],
      age: [],
      language: [],
      region: [],
    },
    ...(!isAuth ? { guest_id: guestId } : { project_id: projectId }),
    language: langId,
    sort: sortingFilter.match,
  });

  const handleAddToCart = async (channels: any[]) => {
    console.log("Voice Agent: Adding/Updating cart items:", channels);
    for (const channelItem of channels) {
      try {
        const channel_id = channelItem.channel_id;
        const format = channelItem.format || 1;

        if (!channel_id) continue;

        const params = {
          channel_id,
          format,
          language: langId,
        };

        let resultCart;
        if (!isAuth && guestId) {
          resultCart = await addToPublicCart({
            ...params,
            guest_id: guestId,
          }).unwrap();
        } else if (isAuth && projectId) {
          resultCart = await addToManagerCart({
            ...params,
            project_id: projectId,
          }).unwrap();
        } else if (isAuth) {
          resultCart = await addToCommonCart(params).unwrap();
        }

        if (resultCart) {
          dispatch(
            updateVoiceSyncState({
              isCartEmpty: resultCart.channels.length === 0,
              totalPrice: resultCart.amount,
            }),
          );
        }
        refetch();
      } catch (error) {
        console.error("Voice Agent: Error adding to cart", error);
      }
    }
  };

  const handleRemoveFromCart = async (channelIds: string[]) => {
    console.log("Voice Agent: Removing from cart:", channelIds);
    for (const channel_id of channelIds) {
      try {
        if (!channel_id) continue;

        const params = {
          channel_id,
          language: langId,
        };

        let resultCart;
        if (!isAuth && guestId) {
          resultCart = await removeFromPublicCart({
            ...params,
            guest_id: guestId,
          }).unwrap();
        } else if (isAuth && projectId) {
          resultCart = await removeFromManagerCart({
            ...params,
            project_id: projectId,
          }).unwrap();
        } else if (isAuth) {
          resultCart = await removeFromCommonCart(params).unwrap();
        }

        if (resultCart) {
          dispatch(
            updateVoiceSyncState({
              isCartEmpty: resultCart.channels.length === 0,
              totalPrice: resultCart.amount,
            }),
          );
        }
        refetch();
      } catch (error) {
        console.error("Voice Agent: Error removing from cart", error);
      }
    }
  };

  return {
    handleAddToCart,
    handleRemoveFromCart,
  };
}
