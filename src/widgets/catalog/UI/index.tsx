import { channelData } from "@entities/channel";
import { platformTypesNum } from "@entities/platform";
import {
  ICart,
  ICatalogChannel,
  catalogAPI,
  catalogBarFilter,
  getCatalogReq,
  sortingFilter,
  useAddToCommonCartMutation,
  useAddToManagerCartMutation,
  useAddToPublicCartMutation,
  useGetCatalogQuery,
  useReadCommonCartQuery,
  useReadPublicCartQuery,
  useRemoveFromCommonCartMutation,
  useRemoveFromManagerCartMutation,
  useRemoveFromPublicCartMutation,
} from "@entities/project";
import { GenerateGuestId, GetUserId, roles } from "@entities/user";
import { BREAKPOINT, INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { ToastAction, useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CatalogCart, CatalogList, CatalogSearch } from "../components";
import styles from "./styles.module.scss";

export const CatalogBlock: FC = () => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const { toast } = useToast();
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const { isAuth } = useAppSelector((state) => state.user);
  const guestId = Cookies.get("guest_id");
  const role = Cookies.get("role");
  const projectId = Cookies.get("project_id");
  const catalogTopRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  if (!guestId) {
    GenerateGuestId();
  }

  const userId = GetUserId();

  const [catalogFilter, setCatalogFilter] = useState<catalogBarFilter>(
    catalogBarFilter.parameters,
  );

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { watch, reset, setValue, getValues } = useForm<getCatalogReq>({
    defaultValues: {
      language: language?.id || Languages[0].id,
      page: 1,
      elements_on_page: INTERSECTION_ELEMENTS.catalog,
      filter: {
        platform: platformTypesNum.telegram,
        business: [],
        age: [],
        language: [],
        region: [],
      },
      sort: sortingFilter.price_down,
    },
  });

  const formFields = watch();
  const { filter, sort, language: lang } = formFields;

  useEffect(() => {
    setTimeout(() => {
      setValue(channelData.page, 1);
    }, 500);
  }, [filter, sort, lang]);

  const { data: catalogAuth, isFetching: isCatalogAuthLoading } =
    useGetCatalogQuery(
      { ...formFields, user_id: userId },
      {
        skip: !userId,
      },
    );
  const { data: catalog, isFetching: isCatalogLoading } = useGetCatalogQuery(
    { ...formFields, guest_id: guestId },
    { skip: isAuth },
  );

  const { data: cart } = useReadCommonCartQuery(
    { language: language?.id || Languages[0].id },
    { skip: !isAuth },
  );
  const { data: cartPub } = useReadPublicCartQuery(
    { guest_id: guestId, language: language?.id || Languages[0].id },
    { skip: !guestId || isAuth },
  );

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
  // managerCart
  const [addToManagerCart] = useAddToManagerCartMutation();
  const [removeFromManagerCart] = useRemoveFromManagerCartMutation();

  const handleChangeCards = (cartChannel: ICatalogChannel) => {
    let newCards: ICatalogChannel[] = [];
    const currentCard = (
      isAuth ? catalogAuth?.channels : catalog?.channels
    )?.find((card) => card.id === cartChannel.id);

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
        newCards = (
          (isAuth ? catalogAuth?.channels : catalog?.channels) || []
        ).map((item) => {
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
        // newCards = cards.map((card) => {
        newCards = (
          (isAuth ? catalogAuth?.channels : catalog?.channels) || []
        ).map((card) => {
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
        newCards = (
          (isAuth ? catalogAuth?.channels : catalog?.channels) || []
        ).map((item) => {
          if (item.id === cartChannel.id) {
            const { selected_format, ...newItem } = item;
            // console.log(selected_format);
            return newItem;
          }
          return item;
        });
      }
      // setCards(newCards);
      dispatch(
        catalogAPI.util.updateQueryData(
          "getCatalog",
          { ...formFields, user_id: userId, guest_id: guestId },
          (draft) => {
            draft.channels = newCards;
          },
        ),
      );
    }
  };

  return (
    <div className="container">
      <div className={`${styles.wrapper}`}>
        <div className={styles.title}>{t("catalog.catalog")}</div>
        <div className={styles.content}>
          {screen >= BREAKPOINT.LG && (
            <div className={styles.left}>
              <CatalogSearch
                getValues={getValues}
                reset={reset}
                setValue={setValue}
                catalogFilter={catalogFilter}
                changeCatalogfilter={(filter) => setCatalogFilter(filter)}
              />
            </div>
          )}
          <div className={styles.right}>
            <div className={styles.content__right} ref={catalogTopRef}>
              <CatalogList
                changeCatalogFilter={(filter) => setCatalogFilter(filter)}
                catalogFilter={catalogFilter}
                getValues={getValues}
                reset={reset}
                setValue={setValue}
                page={formFields.page}
                channels={
                  (isAuth ? catalogAuth?.channels : catalog?.channels) || []
                }
                onChangeCard={handleChangeCards}
                isLast={
                  (isAuth ? catalogAuth?.isLast : catalog?.isLast) || false
                }
                isLoading={isCatalogAuthLoading || isCatalogLoading}
              />
            </div>
            <div className={styles.cart}>
              {cartPub && currentCart?.channels.length > 0 ? (
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
