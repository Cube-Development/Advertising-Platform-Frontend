import {
  getRecommendChannels,
  ICart,
  ICatalogChannel,
  publicCartAPI,
  authCartAPI,
  managerCartAPI,
  useAddToCommonCartMutation,
  useAddToManagerCartMutation,
  useAddToPublicCartMutation,
  useGetRecommedChannelsQuery,
  useReadCommonCartQuery,
  useReadManagerCartQuery,
  useReadPublicCartQuery,
  useRemoveFromCommonCartMutation,
  useRemoveFromManagerCartMutation,
  useRemoveFromPublicCartMutation,
} from "@entities/project";
import { ENUM_ROLES, GenerateGuestId, useFindLanguage } from "@entities/user";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CartList, CreatePost, RecommendationList } from "../components";
import styles from "./styles.module.scss";

export const Cart: FC = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const language = useFindLanguage();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const guestId = Cookies.get(ENUM_COOKIES_TYPES.GUEST_ID);
  const projectId = Cookies.get(ENUM_COOKIES_TYPES.PROJECT_ID);

  if (!guestId) {
    GenerateGuestId();
  }

  const {
    data: cart,
    isLoading: isLoadingCommon,
    isFetching: isFetchingCommon,
  } = useReadCommonCartQuery(
    { language: language?.id || USER_LANGUAGES_LIST[0].id },
    {
      skip: !isAuth || role !== ENUM_ROLES.ADVERTISER,
      refetchOnMountOrArgChange: true,
    },
  );

  const {
    data: cartManager,
    isLoading: isLoadingManager,
    isFetching: isFetchingManager,
  } = useReadManagerCartQuery(
    {
      project_id: projectId,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
    },
    {
      skip: !isAuth || !projectId || role !== ENUM_ROLES.MANAGER,
      refetchOnMountOrArgChange: true,
    },
  );

  const {
    data: cartPub,
    isLoading: isLoadingPublic,
    isFetching: isFetchingPublic,
  } = useReadPublicCartQuery(
    { guest_id: guestId, language: language?.id || USER_LANGUAGES_LIST[0].id },
    { skip: isAuth || !guestId, refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (isAuth && role === ENUM_ROLES.ADVERTISER && cart) {
      setCurrentCart(cart);
    }
  }, [cart]);

  useEffect(() => {
    if (!isAuth && guestId && cartPub) {
      setCurrentCart(cartPub);
    }
  }, [cartPub]);

  useEffect(() => {
    if (isAuth && cartManager) {
      setCurrentCart(cartManager);
    }
  }, [cartManager]);

  const [currentCart, setCurrentCart] = useState<ICart>(
    cartPub || cart || cartManager!,
  );

  const { watch, reset } = useForm<getRecommendChannels>({
    defaultValues: {
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      channels: currentCart?.channels?.map((item) => item.id) || [],
    },
  });

  useEffect(() => {
    if (currentCart) {
      reset({
        language: language?.id || USER_LANGUAGES_LIST[0].id,
        channels: currentCart?.channels?.map((item) => item.id),
      });
    }
  }, [currentCart]);

  const formFields = watch();
  const { data: recomendCards } = useGetRecommedChannelsQuery(
    { ...formFields },
    {
      skip: !currentCart,
    },
  );

  // commonCart
  const [addToCommonCart] = useAddToCommonCartMutation();
  const [removeFromCommonCart] = useRemoveFromCommonCartMutation();
  // publicCart
  const [addToPublicCart] = useAddToPublicCartMutation();
  const [removeFromPublicCart] = useRemoveFromPublicCartMutation();
  // managerCart
  const [addToManagerCart] = useAddToManagerCartMutation();
  const [removeFromManagerCart] = useRemoveFromManagerCartMutation();

  const handleChangeCartCards = (cartChannel: ICatalogChannel) => {
    const currentCard = currentCart.channels?.find(
      (card) => card?.id === cartChannel?.id,
    );
    return handleChangeCards(cartChannel, currentCard);
  };

  const handleChangeRecommendCards = (cartChannel: ICatalogChannel) => {
    const currentCard = recomendCards?.channels?.find(
      (card) => card?.id === cartChannel?.id,
    );
    return handleChangeCards(cartChannel, currentCard);
  };

  const handleChangeCards = (
    cartChannel: ICatalogChannel,
    currentCard: ICatalogChannel | undefined,
  ) => {
    const handleUpdateCache = (newFormat?: any) => {
      const params = { language: language?.id || USER_LANGUAGES_LIST[0].id };
      if (isAuth && !projectId) {
        dispatch(
          authCartAPI.util.updateQueryData(
            "readCommonCart",
            params,
            (draft) => {
              if (draft.channels) {
                if (newFormat) {
                  const index = draft.channels.findIndex(
                    (c) => c.id === cartChannel.id,
                  );
                  if (index !== -1)
                    draft.channels[index].selected_format = newFormat;
                } else {
                  draft.channels = draft.channels.filter(
                    (c) => c.id !== cartChannel.id,
                  );
                  draft.count = Math.max(0, (draft.count || 0) - 1);
                }
              }
            },
          ),
        );
      } else if (!isAuth && guestId) {
        dispatch(
          publicCartAPI.util.updateQueryData(
            "readPublicCart",
            { ...params, guest_id: guestId },
            (draft) => {
              if (draft.channels) {
                if (newFormat) {
                  const index = draft.channels.findIndex(
                    (c) => c.id === cartChannel.id,
                  );
                  if (index !== -1)
                    draft.channels[index].selected_format = newFormat;
                } else {
                  draft.channels = draft.channels.filter(
                    (c) => c.id !== cartChannel.id,
                  );
                  draft.count = Math.max(0, (draft.count || 0) - 1);
                }
              }
            },
          ),
        );
      } else if (isAuth && projectId) {
        dispatch(
          managerCartAPI.util.updateQueryData(
            "readManagerCart",
            { ...params, project_id: projectId },
            (draft) => {
              if (draft.channels) {
                if (newFormat) {
                  const index = draft.channels.findIndex(
                    (c) => c.id === cartChannel.id,
                  );
                  if (index !== -1)
                    draft.channels[index].selected_format = newFormat;
                } else {
                  draft.channels = draft.channels.filter(
                    (c) => c.id !== cartChannel.id,
                  );
                  draft.count = Math.max(0, (draft.count || 0) - 1);
                }
              }
            },
          ),
        );
      }

      setCurrentCart((prev) => {
        if (prev?.channels) {
          if (newFormat) {
            return {
              ...prev,
              channels: prev.channels.map((c) =>
                c.id === cartChannel.id
                  ? { ...c, selected_format: newFormat }
                  : c,
              ),
            };
          } else {
            return {
              ...prev,
              channels: prev.channels.filter((c) => c.id !== cartChannel.id),
              count: Math.max(0, (prev.count || 0) - 1),
            };
          }
        }
        return prev;
      });
    };

    if (cartChannel?.selected_format && currentCard) {
      const addReq = {
        channel_id: cartChannel?.id,
        format: cartChannel?.selected_format.format,
        language: language?.id || USER_LANGUAGES_LIST[0].id,
        ...(cartChannel?.match && { match: cartChannel.match }),
      };
      const removeReq = {
        channel_id: cartChannel?.id,
        language: language?.id || USER_LANGUAGES_LIST[0].id,
      };

      let mutationPromise: Promise<any> | undefined;

      if (
        currentCard?.selected_format?.format ===
        cartChannel?.selected_format?.format
      ) {
        if (!isAuth && guestId) {
          mutationPromise = removeFromPublicCart({
            ...removeReq,
            guest_id: guestId,
          })
            .unwrap()
            .then(() => handleUpdateCache(undefined))
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.remove.error"),
              });
              console.error("Ошибка при удалении с корзины", error);
            });
        } else if (isAuth && !projectId) {
          mutationPromise = removeFromCommonCart(removeReq)
            .unwrap()
            .then(() => handleUpdateCache(undefined))
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.remove.error"),
              });
              console.error("Ошибка при удалении с корзины", error);
            });
        } else if (isAuth && projectId) {
          mutationPromise = removeFromManagerCart({
            ...removeReq,
            project_id: projectId,
          })
            .unwrap()
            .then(() => handleUpdateCache(undefined))
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.remove.error"),
              });
              console.error("Ошибка при удалении с корзины", error);
            });
        }
      } else if (
        currentCard?.selected_format?.format !==
        cartChannel?.selected_format?.format
      ) {
        if (!isAuth && guestId) {
          mutationPromise = addToPublicCart({ ...addReq, guest_id: guestId })
            .unwrap()
            .then(() => handleUpdateCache(cartChannel.selected_format))
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.add.error"),
              });
              console.error("Ошибка при добавлении в корзину", error);
            });
        } else if (isAuth && !projectId) {
          mutationPromise = addToCommonCart(addReq)
            .unwrap()
            .then(() => handleUpdateCache(cartChannel.selected_format))
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.add.error"),
              });
              console.error("Ошибка при добавлении в корзину", error);
            });
        } else if (isAuth && projectId) {
          mutationPromise = addToManagerCart({
            ...addReq,
            project_id: projectId,
          })
            .unwrap()
            .then(() => handleUpdateCache(cartChannel.selected_format))
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.add.error"),
              });
              console.error("Ошибка при добавлении в корзину", error);
            });
        }
      }
      return mutationPromise;
    }
  };
  const isLoadingCart =
    isLoadingCommon ||
    isLoadingPublic ||
    isLoadingManager ||
    isFetchingCommon ||
    isFetchingPublic ||
    isFetchingManager;
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div>
          <div className={styles.cards}>
            <CartList
              channels={currentCart?.channels || []}
              onChangeCard={handleChangeCartCards}
              isLoading={isLoadingCommon || isLoadingPublic || isLoadingManager}
            />
            <CreatePost
              cart={currentCart}
              role={role}
              isLoading={isLoadingCart}
            />
          </div>
        </div>
        <div className={styles.cards}>
          <RecommendationList
            channels={recomendCards?.channels || []}
            onChangeCard={handleChangeRecommendCards}
          />
          <div></div>
        </div>
      </div>
    </div>
  );
};
