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
import { GenerateGuestId, roles } from "@entities/user";
import { Languages } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { ToastAction, useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CartList, CreatePost, RecommendationList } from "../components";
import styles from "./styles.module.scss";

export const Cart: FC = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const { isAuth } = useAppSelector((state) => state.user);

  const user_id = Cookies.get("user_id");
  const guestId = Cookies.get("guest_id");
  const role = Cookies.get("role");
  const projectId = Cookies.get("project_id");

  if (!guestId) {
    GenerateGuestId();
  }

  const { data: cart, isLoading: isLoadingCommon } = useReadCommonCartQuery(
    { language: language?.id || Languages[0].id },
    { skip: !isAuth || role !== roles.advertiser },
  );

  const { data: cartPub, isLoading: isLoadingPublic } = useReadPublicCartQuery(
    { guest_id: guestId, language: language?.id || Languages[0].id },
    { skip: !guestId || isAuth },
  );

  const { data: cartManager, isLoading: isLoadingManager } =
    useReadManagerCartQuery(
      {
        project_id: projectId,
        language: language?.id || Languages[0].id,
      },
      {
        skip: !isAuth || role !== roles.manager || !projectId,
      },
    );

  useEffect(() => {
    if (isAuth && role === roles.advertiser && cart) {
      setCurrentCart(cart);
    }
  }, [cart]);

  useEffect(() => {
    if (!isAuth && guestId && cartPub) {
      setCurrentCart(cartPub);
    }
  }, [cartPub]);

  useEffect(() => {
    if (isAuth && role === roles.manager && cartManager) {
      setCurrentCart(cartManager);
    }
  }, [cartManager]);

  const [currentCart, setCurrentCart] = useState<ICart>(
    cartPub || cart || cartManager!,
  );

  const { watch, reset } = useForm<getRecommendChannels>({
    defaultValues: {
      language: language?.id || Languages[0].id,
      channels: currentCart?.channels?.map((item) => item.id) || [],
    },
  });

  useEffect(() => {
    if (currentCart) {
      reset({
        language: language?.id || Languages[0].id,
        channels: currentCart?.channels?.map((item) => item.id),
      });
    }
  }, [currentCart]);

  const formFields = watch();
  console.log("!currentCart", !currentCart);
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
      (card) => card.id === cartChannel.id,
    );
    if (cartChannel.selected_format && currentCard) {
      const addReq = {
        channel_id: cartChannel.id,
        format: cartChannel.selected_format.format,
        match: cartChannel.match,
        language: language?.id || Languages[0].id,
      };
      const removeReq = {
        channel_id: cartChannel.id,
        language: language?.id || Languages[0].id,
      };
      if (
        currentCard.selected_format?.format ===
        cartChannel.selected_format?.format
      ) {
        if (!isAuth && guestId) {
          removeFromPublicCart({ ...removeReq, guest_id: guestId })
            .unwrap()
            .then((data) => {
              setCurrentCart(data);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.remove.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при удалении с корзины", error);
            });
        } else if (isAuth && role === roles.advertiser) {
          removeFromCommonCart(removeReq)
            .unwrap()
            .then((data) => {
              setCurrentCart(data);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.remove.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при удалении с корзины", error);
            });
        } else if (isAuth && role === roles.manager && projectId) {
          removeFromManagerCart({ ...removeReq, project_id: projectId })
            .unwrap()
            .then((data) => {
              setCurrentCart(data);
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
        currentCard.selected_format?.format !==
        cartChannel.selected_format?.format
      ) {
        if (!isAuth && guestId) {
          addToPublicCart({ ...addReq, guest_id: guestId })
            .unwrap()
            .then((data) => {
              setCurrentCart(data);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.catalog.add.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка при добавлении в корзину", error);
            });
        } else if (isAuth && role === roles.advertiser) {
          addToCommonCart(addReq)
            .unwrap()
            .then((data) => {
              setCurrentCart(data);
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
      } else if (isAuth && role === roles.manager && projectId) {
        addToManagerCart({ ...addReq, project_id: projectId })
          .unwrap()
          .then((data) => {
            setCurrentCart(data);
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
            onChangeCard={handleChangeCartCards}
          />
          <div></div>
        </div>
      </div>
    </div>
  );
};
