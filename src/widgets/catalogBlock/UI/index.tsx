import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { CatalogSearch } from "./catalogSearch";
import { CatalogList } from "./catalogList";
import { useTranslation } from "react-i18next";
import { IPlatform } from "@shared/types/platform";
import { CatalogCart } from "./catalogCart";
import {
  getCatalogReq,
  useGetCatalogQuery,
} from "@shared/store/services/catalogService";
import { Languages } from "@shared/config/languages";
import { useForm } from "react-hook-form";
import { platformTypesNum } from "@shared/config/platformTypes";
import { sortingFilter } from "@shared/config/platformData";
import {
  useAddToCommonCartMutation,
  useAddToPublicCartMutation,
  useReadCommonCartQuery,
  useReadPublicCartQuery,
  useRemoveFromCommonCartMutation,
  useRemoveFromPublicCartMutation,
} from "@shared/store/services/cartService";
import { useAppSelector } from "@shared/store";
import Cookies from "js-cookie";
import { ICart } from "@shared/types/cart";
import { GenerateGuestId } from "@features/generateGuestId";

export const CatalogBlock: FC = () => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const { watch, reset, setValue, getValues } = useForm<getCatalogReq>({
    defaultValues: {
      language: language?.id || Languages[0].id,
      page: 1,
      elements_on_page: 10,
      filter: {
        platform: platformTypesNum.telegram,
        business: [],
        age: [],
        language: [],
        region: [],
      },
      sort: sortingFilter.subscribers_down,
    },
  });

  const { isAuth } = useAppSelector((state) => state.user);

  const formFields = watch();
  const { data: catalog } = useGetCatalogQuery(formFields);
  const { data: cart } = useReadCommonCartQuery("", { skip: !isAuth });
  const guestId = Cookies.get("guest_id");
  if (!guestId) {
    GenerateGuestId();
  }
  const { data: cartPub } = useReadPublicCartQuery(
    { guest_id: guestId },
    { skip: !guestId || isAuth }
  );

  const [cards, setCards] = useState<IPlatform[]>(catalog?.channels || []);
  useEffect(() => {
    if (catalog) {
      setCards(catalog.channels);
    }
  }, [catalog]);

  const [currentCart, setCurrentCart] = useState<ICart>(
    cartPub ? cartPub : cart!
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

  // commonCart
  const [addToCommonCart] = useAddToCommonCartMutation();
  const [removeFromCommonCart] = useRemoveFromCommonCartMutation();
  // publicCart
  const [addToPublicCart] = useAddToPublicCartMutation();
  const [removeFromPublicCart] = useRemoveFromPublicCartMutation();

  const handleChangeCards = (cartChannel: IPlatform) => {
    let newCards: IPlatform[] = [];
    const currentCard = cards?.find((card) => card.id === cartChannel.id);

    if (cartChannel.selected_format) {
      const addReq = {
        channel_id: cartChannel.id,
        format: cartChannel.selected_format.format,
        match: cartChannel.match,
      };

      if (
        currentCard &&
        !currentCard.selected_format &&
        cartChannel.selected_format
      ) {
        newCards = cards.map((item) => {
          if (item.id === cartChannel.id) {
            const newItem = {
              ...item,
              selected_format: cartChannel.selected_format,
            };
            return newItem;
          }
          return item;
        });
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
      } else if (
        currentCard?.selected_format?.format !==
          cartChannel.selected_format?.format &&
        cartChannel.selected_format
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
        newCards = cards.map((card) => {
          if (
            card.id === cartChannel.id &&
            card.selected_format &&
            cartChannel.selected_format
          ) {
            card.selected_format = cartChannel.selected_format;
          }
          return card;
        });
      } else {
        if (!isAuth && guestId) {
          removeFromPublicCart({ ...addReq, guest_id: guestId })
            .unwrap()
            .then((data) => {
              setCurrentCart(data);
            })
            .catch((error) =>
              console.error("Ошибка при удалении с корзины", error)
            );
        } else if (isAuth) {
          removeFromCommonCart(addReq)
            .unwrap()
            .then((data) => {
              setCurrentCart(data);
            })
            .catch((error) =>
              console.error("Ошибка при удалении с корзины", error)
            );
        }
        newCards = cards.map((item) => {
          if (item.id === cartChannel.id) {
            delete item.selected_format;
          }
          return item;
        });
      }
      setCards(newCards);
    }
  };

  return (
    <div className="container">
      <div className={`${styles.wrapper}`}>
        <div className={styles.title}>{t("catalog.catalog")}</div>
        <div className={styles.content}>
          <div className={styles.left}>
            <CatalogSearch
              getValues={getValues}
              reset={reset}
              setValue={setValue}
            />
          </div>
          <div className={styles.right}>
            <div className={styles.content__right}>
              <CatalogList
                setValue={setValue}
                channels={cards.length > 0 ? cards : catalog?.channels || []}
                onChangeCard={handleChangeCards}
              />
              <div className={styles.cart}>
                {cartPub && currentCart?.channels.length ? (
                  <CatalogCart cart={currentCart!} />
                ) : (
                  cart &&
                  currentCart?.channels.length && (
                    <CatalogCart cart={currentCart!} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
