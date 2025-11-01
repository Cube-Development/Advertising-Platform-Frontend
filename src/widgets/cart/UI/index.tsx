import {
  getRecommendChannels,
  ICart,
  ICatalogChannel,
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
import { useAppSelector } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ToastAction, useToast } from "@shared/ui";
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
  const { isAuth } = useAppSelector((state) => state.user);

  const userId = Cookies.get(ENUM_COOKIES_TYPES.USER_ID);
  const guestId = Cookies.get(ENUM_COOKIES_TYPES.GUEST_ID);
  const role = Cookies.get(ENUM_COOKIES_TYPES.ROLE);
  const projectId = Cookies.get(ENUM_COOKIES_TYPES.PROJECT_ID);

  if (!guestId) {
    GenerateGuestId();
  }

  const { data: cart, isLoading: isLoadingCommon } = useReadCommonCartQuery(
    { language: language?.id || USER_LANGUAGES_LIST[0].id },
    { skip: !isAuth || role !== ENUM_ROLES.ADVERTISER },
  );

  const { data: cartManager, isLoading: isLoadingManager } =
    useReadManagerCartQuery(
      {
        project_id: projectId,
        language: language?.id || USER_LANGUAGES_LIST[0].id,
      },
      { skip: !isAuth || role !== ENUM_ROLES.MANAGER || !projectId },
    );

  const { data: cartPub, isLoading: isLoadingPublic } = useReadPublicCartQuery(
    { guest_id: guestId, language: language?.id || USER_LANGUAGES_LIST[0].id },
    { skip: isAuth || !guestId },
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
    if (isAuth && role === ENUM_ROLES.MANAGER && cartManager) {
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
    handleChangeCards(cartChannel, currentCard);
  };

  const handleChangeRecommendCards = (cartChannel: ICatalogChannel) => {
    const currentCard = recomendCards?.channels?.find(
      (card) => card?.id === cartChannel?.id,
    );
    handleChangeCards(cartChannel, currentCard);
  };

  const handleChangeCards = (
    cartChannel: ICatalogChannel,
    currentCard: ICatalogChannel | undefined,
  ) => {
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
      if (
        currentCard?.selected_format?.format ===
        cartChannel?.selected_format?.format
      ) {
        if (!isAuth && guestId) {
          removeFromPublicCart({ ...removeReq, guest_id: guestId })
            .unwrap()
            .then((data) => {
              // setCurrentCart(data);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.remove.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при удалении с корзины", error);
            });
        } else if (isAuth && role === ENUM_ROLES.ADVERTISER) {
          removeFromCommonCart(removeReq)
            .unwrap()
            .then((data) => {
              // setCurrentCart(data);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.remove.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при удалении с корзины", error);
            });
        } else if (isAuth && role === ENUM_ROLES.MANAGER && projectId) {
          removeFromManagerCart({ ...removeReq, project_id: projectId })
            .unwrap()
            .then((data) => {
              // setCurrentCart(data);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.remove.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при удалении с корзины", error);
            });
        }
      } else if (
        currentCard?.selected_format?.format !==
        cartChannel?.selected_format?.format
      ) {
        if (!isAuth && guestId) {
          addToPublicCart({ ...addReq, guest_id: guestId })
            .unwrap()
            .then((data) => {
              // setCurrentCart(data);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.add.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при добавлении в корзину", error);
            });
        } else if (isAuth && role === ENUM_ROLES.ADVERTISER) {
          addToCommonCart(addReq)
            .unwrap()
            .then((data) => {
              // setCurrentCart(data);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.add.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при добавлении в корзину", error);
            });
        } else if (isAuth && role === ENUM_ROLES.MANAGER && projectId) {
          addToManagerCart({ ...addReq, project_id: projectId })
            .unwrap()
            .then((data) => {
              // setCurrentCart(data);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.add.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при добавлении в корзину", error);
            });
        }
      }
    }
  };

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
            <CreatePost cart={currentCart} />
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
