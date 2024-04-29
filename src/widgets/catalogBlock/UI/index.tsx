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
import { platformData, sortingFilter } from "@shared/config/platformData";
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
import { GetUserId } from "@features/getUserId";

export const CatalogBlock: FC = () => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const elements = 5;

  const { watch, reset, setValue, getValues } = useForm<getCatalogReq>({
    defaultValues: {
      language: language?.id || Languages[0].id,
      page: 1,
      elements_on_page: elements,
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
  const guestId = Cookies.get("guest_id");
  if (!guestId) {
    GenerateGuestId();
  }
  const userId = GetUserId();

  const formFields = watch();

  const { filter, sort, language: lang } = formFields;

  const { data: cart } = useReadCommonCartQuery(
    { language: language?.id || Languages[0].id },
    { skip: !isAuth },
  );
  const { data: catalogAuth } = useGetCatalogQuery(
    { ...formFields, user_id: userId },
    {
      skip: !userId,
    },
  );
  const { data: catalog } = useGetCatalogQuery(
    { ...formFields, guest_id: guestId },
    { skip: isAuth },
  );

  const { data: cartPub } = useReadPublicCartQuery(
    { guest_id: guestId, language: language?.id || Languages[0].id },
    { skip: !guestId || isAuth },
  );

  const [cards, setCards] = useState<IPlatform[]>(
    catalogAuth?.channels ? catalogAuth?.channels : catalog?.channels || [],
  );

  useEffect(() => {
    console.log("setValue('page', 1)", cards.length);
    console.log("catalogAuth?.channels", catalogAuth?.channels);
    setValue(platformData.page, 1);
    setCards(
      catalogAuth?.channels ? catalogAuth?.channels : catalog?.channels || [],
    );
  }, [filter, sort, lang]);

  useEffect(() => {
    if (catalog) {
      setCards(catalog?.channels);
    }
  }, [catalog]);

  useEffect(() => {
    console.log("catalogAuth", cards);
    if (catalogAuth) {
      // const cardsEnd = cards.slice(-elements);
      // console.log("cards", cards);
      // console.log("cardsEnd", cardsEnd);
      // console.log("catalogAuthEND", catalogAuth.channels);

      const isIncluded = catalogAuth.channels.every((item) =>
        cards.includes(item),
      );
      if (!isIncluded) {
        setCards([...cards, ...catalogAuth.channels]);
      }
    }
  }, [catalogAuth]);

  const [currentCart, setCurrentCart] = useState<ICart>(
    cartPub ? cartPub : cart!,
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
        language: language?.id || Languages[0].id,
      };

      const removeReq = {
        channel_id: cartChannel.id,
        language: language?.id || Languages[0].id,
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
              console.error("Ошибка при добавлении в корзину", error),
            );
        } else if (isAuth) {
          addToCommonCart(addReq)
            .unwrap()
            .then((data) => {
              setCurrentCart(data);
            })
            .catch((error) =>
              console.error("Ошибка при добавлении в корзину", error),
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
              console.error("Ошибка при добавлении в корзину", error),
            );
        } else if (isAuth) {
          addToCommonCart(addReq)
            .unwrap()
            .then((data) => {
              setCurrentCart(data);
            })
            .catch((error) =>
              console.error("Ошибка при добавлении в корзину", error),
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
          removeFromPublicCart({ ...removeReq, guest_id: guestId })
            .unwrap()
            .then((data) => {
              setCurrentCart(data);
            })
            .catch((error) =>
              console.error("Ошибка при удалении с корзины", error),
            );
        } else if (isAuth) {
          removeFromCommonCart(removeReq)
            .unwrap()
            .then((data) => {
              setCurrentCart(data);
            })
            .catch((error) =>
              console.error("Ошибка при удалении с корзины", error),
            );
        }
        newCards = cards.map((item) => {
          if (item.id === cartChannel.id) {
            const { selected_format, ...newItem } = item;
            console.log(selected_format);
            return newItem;
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
                page={formFields.page}
                channels={cards || []}
                onChangeCard={handleChangeCards}
                isPagination={Boolean(
                  catalogAuth?.channels.length || catalog?.channels.length,
                )}
              />
            </div>
            <div className={styles.cart}>
              {cartPub && currentCart?.channels.length ? (
                <CatalogCart cart={currentCart!} />
              ) : (
                cart &&
                currentCart?.channels?.length > 0 && (
                  <CatalogCart cart={currentCart!} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
