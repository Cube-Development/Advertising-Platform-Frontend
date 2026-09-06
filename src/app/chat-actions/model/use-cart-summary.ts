import {
  ICart,
  useReadCommonCartShortQuery,
  useReadPublicCartShortQuery,
} from "@entities/project";
import { ENUM_ROLES, useFindLanguage } from "@entities/user";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import Cookies from "js-cookie";

export interface IChatCartSummary {
  cart?: ICart;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

/**
 * Cart totals for the chat panels, read-only.
 *
 * Two deliberate differences from `widgets/cart`:
 *
 * - It uses the `/short` endpoints, which take different arguments than the
 *   full cart queries the page subscribes to. Different arguments mean a
 *   different RTK Query cache entry, so a panel can never trigger a refetch
 *   that makes the cart page flicker.
 * - It never calls `GenerateGuestId()`. The cart page mints a guest id during
 *   render when one is missing; doing that from a panel the AI opened would
 *   create a second guest cart identity for someone who never touched the cart.
 *   No guest id simply means no public cart to show.
 */
export const useChatCartSummary = (): IChatCartSummary => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  const language = useFindLanguage();
  const guestId = Cookies.get(ENUM_COOKIES_TYPES.GUEST_ID);

  const isCommon = isAuth && role === ENUM_ROLES.ADVERTISER;

  const common = useReadCommonCartShortQuery(undefined, { skip: !isCommon });

  const publicCart = useReadPublicCartShortQuery(
    {
      guest_id: guestId,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
    },
    { skip: isAuth || !guestId },
  );

  const source = isCommon ? common : publicCart;

  return {
    cart: source.data,
    isLoading: source.isLoading,
    isError: source.isError,
    refetch: source.refetch,
  };
};
