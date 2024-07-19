import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
// import { RecomendationList } from "@widgets/cartBlock/UI/recomendationList";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { CartList, CreatePost } from "../components";
import { GenerateGuestId, roles } from "@entities/user";
import {
  ICart,
  ICatalogChannel,
  useAddToCommonCartMutation,
  useAddToManagerCartMutation,
  useAddToPublicCartMutation,
  useReadCommonCartQuery,
  useReadManagerCartQuery,
  useReadPublicCartQuery,
  useRemoveFromCommonCartMutation,
  useRemoveFromManagerCartMutation,
  useRemoveFromPublicCartMutation,
} from "@entities/project";
import { ToastAction, useToast } from "@shared/ui";
import { Languages } from "@shared/config";
import { useAppSelector } from "@shared/hooks";

export const Cart: FC = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const { isAuth } = useAppSelector((state) => state.user);

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

  const [screen, setScreen] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    cartPub ? cartPub : cart ? cart : cartManager!,
  );
  // const [recomendCards, setRecomendCards] = useState<IPlatform[]>(reccartCards);

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
      //       setCurrentCart({
      //   ...currentCart,
      //   channels: [
      //     ...currentCart.channels.filter((card) => card.id !== cartChannel.id),
      //   ],
      // });
    }
  };

  // const handleChangeRecomendCards = (cart: IToCart) => {
  //   setRecomendCards([
  //     ...recomendCards.filter((card) => card.id !== cart.channel.channel_id),
  //   ]);
  //   const recommendedCard = recomendCards.find(
  //     (card) => card.id === cart.channel.channel_id
  //   );
  //   if (recommendedCard) {
  //     recommendedCard.selected_format = cart.format.format;
  //     setCartCards([...cartCards, recommendedCard]);
  //   }
  //   // запрос в бек
  //   console.log(cart.channel);
  // };

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
            {/* <RecomendationList
              cards={recomendCards}
              onChangeCard={handleChangeRecomendCards}
            /> */}
          </div>
        </div>
        <CreatePost cart={currentCart} />
      </div>
    </div>
  );
};
