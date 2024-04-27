import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { CartList } from "./cartList";
import { CreatePost } from "./createPost";
// import { RecomendationList } from "@widgets/cartBlock/UI/recomendationList";
import { IPlatform } from "@shared/types/platform";
import {
  useAddToCommonCartMutation,
  useAddToPublicCartMutation,
  useReadCommonCartQuery,
  useReadPublicCartQuery,
  useRemoveFromCommonCartMutation,
  useRemoveFromPublicCartMutation,
} from "@shared/store/services/cartService";
import { ICart } from "@shared/types/cart";
import { useAppSelector } from "@shared/store";
import Cookies from "js-cookie";
import { GenerateGuestId } from "@features/generateGuestId";
import { useTranslation } from "react-i18next";
import { Languages } from "@shared/config/languages";

export const CartBlock: FC = () => {
  const { i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const { isAuth } = useAppSelector((state) => state.user);

  const { data: cart } = useReadCommonCartQuery(
    { language: language?.id || Languages[0].id },
    { skip: !isAuth }
  );

  const guestId = Cookies.get("guest_id");
  if (!guestId) {
    GenerateGuestId();
  }

  const { data: cartPub } = useReadPublicCartQuery(
    { guest_id: guestId, language: language?.id || Languages[0].id },
    { skip: !guestId || isAuth }
  );

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
    cartPub ? cartPub : cart!
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
      (card) => card.id === cartChannel.id
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
            .catch((error) =>
              console.error("Ошибка при удалении с корзины", error)
            );
        } else if (isAuth) {
          removeFromCommonCart(removeReq)
            .unwrap()
            .then((data) => {
              setCurrentCart(data);
            })
            .catch((error) =>
              console.error("Ошибка при удалении с корзины", error)
            );
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
            .catch((error) =>
              console.error("Ошибка при добавлении в корзину", error)
            );
        } else if (isAuth) {
          addToCommonCart(addReq)
            .unwrap()
            .then((data) => {
              setCurrentCart(data);
            })
            .catch((error) =>
              console.error("Ошибка при добавлении в корзину", error)
            );
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
