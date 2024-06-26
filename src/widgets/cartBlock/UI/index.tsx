import { FC, useEffect, useState } from "react";
import { CartList } from "./cartList";
import { CreatePost } from "./createPost";
import styles from "./styles.module.scss";
// import { RecomendationList } from "@widgets/cartBlock/UI/recomendationList";
import { GenerateGuestId } from "@features/generateGuestId";
import { ToastAction } from "@radix-ui/react-toast";
import { Languages } from "@shared/config/languages";
import { useAppSelector } from "@shared/store";
import {
  useAddToCommonCartMutation,
  useAddToPublicCartMutation,
  useReadCommonCartQuery,
  useReadPublicCartQuery,
  useRemoveFromCommonCartMutation,
  useRemoveFromPublicCartMutation,
} from "@shared/store/services/cartService";
import { ICart } from "@shared/types/cart";
import { IPlatform } from "@shared/types/platform";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { BREAKPOINT } from "@shared/config/common";

export const CartBlock: FC = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const { isAuth } = useAppSelector((state) => state.user);

  const { data: cart } = useReadCommonCartQuery(
    { language: language?.id || Languages[0].id },
    { skip: !isAuth },
  );

  const guestId = Cookies.get("guest_id");
  if (!guestId) {
    GenerateGuestId();
  }

  const { data: cartPub, isLoading } = useReadPublicCartQuery(
    { guest_id: guestId, language: language?.id || Languages[0].id },
    { skip: !guestId || isAuth },
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
    if (isAuth && cart) {
      setCurrentCart(cart);
    }
  }, [cart]);
  useEffect(() => {
    if (!isAuth && guestId && cartPub) {
      setCurrentCart(cartPub);
    }
  }, [cartPub]);

  const [currentCart, setCurrentCart] = useState<ICart>(
    cartPub ? cartPub : cart!,
  );
  // const [recomendCards, setRecomendCards] = useState<IPlatform[]>(reccartCards);

  // commonCart
  const [addToCommonCart] = useAddToCommonCartMutation();
  const [removeFromCommonCart] = useRemoveFromCommonCartMutation();
  // publicCart
  const [addToPublicCart] = useAddToPublicCartMutation();
  const [removeFromPublicCart] = useRemoveFromPublicCartMutation();

  const handleChangeCartCards = (cartChannel: IPlatform) => {
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
        } else if (isAuth) {
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
        } else if (isAuth) {
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
              isLoading={isLoading}
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
