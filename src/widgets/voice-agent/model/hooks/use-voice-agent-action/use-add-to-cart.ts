import {
  sortingFilter,
  useAddToPublicCartMutation,
  useGetCatalogQuery,
} from "@entities/project";
import { GenerateGuestId } from "@entities/user";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import Cookies from "js-cookie";

export function useAddToCart() {
  const guest_id =
    Cookies.get(ENUM_COOKIES_TYPES.GUEST_ID) || GenerateGuestId();
  const [addToCart] = useAddToPublicCartMutation();
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
    guest_id: guest_id,
    language: 1,
    sort: sortingFilter.match,
  });

  const handleAddToCart = async (ids: string[]) => {
    setTimeout(() => {}, 5000);
    for (const id of ids) {
      try {
        await addToCart({
          channel_id: id,
          format: 1,
          language: 1,
          guest_id,
        });
        refetch();
      } catch (error) {
        console.error("Ошибка при добавлении в корзину", error);
      }
    }
  };

  return {
    handleAddToCart,
  };
}
