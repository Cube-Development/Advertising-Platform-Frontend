import { channelParameterData } from "@entities/channel";
import { platformTypesNum } from "@entities/platform";
import {
  catalogAPI,
  catalogBarFilter,
  getCatalogReq,
  ICart,
  ICatalogChannel,
  sortingFilter,
  sortingTypes,
  useAddToCommonCartMutation,
  useAddToManagerCartMutation,
  useAddToPublicCartMutation,
  useGetCatalogQuery,
  useReadCommonCartQuery,
  useReadManagerCartQuery,
  useReadPublicCartQuery,
  useRemoveFromCommonCartMutation,
  useRemoveFromManagerCartMutation,
  useRemoveFromPublicCartMutation,
  setFormState,
} from "@entities/project";
import { GenerateGuestId, roles, useFindLanguage } from "@entities/user";
import {
  BREAKPOINT,
  cookiesTypes,
  INTERSECTION_ELEMENTS,
  Languages,
} from "@shared/config";
import { useAppDispatch, useAppSelector, useWindowWidth } from "@shared/hooks";
import { ToastAction, useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CatalogCart, CatalogList, CatalogSearch } from "../components";
import styles from "./styles.module.scss";

export const CatalogBlock: FC = () => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const { toast } = useToast();
  const screen = useWindowWidth();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const savedFormState = useAppSelector(
    (state) => state.catalogFilter.formState,
  );
  const userId = Cookies.get(cookiesTypes.userId);
  const guestId = Cookies.get(cookiesTypes.guestId) || GenerateGuestId();
  const projectId = Cookies.get(cookiesTypes.projectId);
  const catalogTopRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [catalogFilter, setCatalogFilter] = useState<catalogBarFilter>(
    catalogBarFilter.parameters,
  );

  const { watch, reset, setValue, resetField } = useForm<getCatalogReq>({
    defaultValues: {
      page: 1,
      elements_on_page:
        savedFormState?.elements_on_page || INTERSECTION_ELEMENTS.catalog,
      filter: savedFormState?.filter || {
        platform: platformTypesNum.telegram,
        business: [],
        age: [],
        language: [],
        region: [],
      },
      sort: savedFormState?.sort || sortingTypes[0].type,
    },
  });

  const formState = watch();

  useEffect(() => {
    const { ...stateToSave } = formState;
    if (JSON.stringify(stateToSave) !== JSON.stringify(savedFormState)) {
      dispatch(setFormState(stateToSave));
    }
  }, [formState, savedFormState, dispatch]);

  const setValueWithPage = (key: any, value: any) => {
    setValue(channelParameterData.page, 1);
    setValue(key, value);
  };

  const { data: catalogAuth, isFetching: isCatalogAuthLoading } =
    useGetCatalogQuery(
      {
        ...formState,
        language: language?.id || Languages[0].id,
        user_id: userId,
      },
      {
        skip: !isAuth || !userId || role !== roles.advertiser,
      },
    );

  const { data: catalogManager, isFetching: isCatalogManagerLoading } =
    useGetCatalogQuery(
      {
        ...formState,
        language: language?.id || Languages[0].id,
        project_id: projectId,
      },
      { skip: !isAuth || !projectId || role !== roles.manager },
    );

  const { data: catalogPublic, isFetching: isCatalogLoading } =
    useGetCatalogQuery(
      {
        ...formState,
        language: language?.id || Languages[0].id,
        guest_id: guestId,
      },
      { skip: isAuth || !guestId },
    );

  const { data: cart } = useReadCommonCartQuery(
    { language: language?.id || Languages[0].id },
    { skip: !isAuth || role !== roles.advertiser },
  );
  const { data: cartManager } = useReadManagerCartQuery(
    { project_id: projectId, language: language?.id || Languages[0].id },
    { skip: !isAuth || role !== roles.manager || !projectId },
  );

  const { data: cartPub } = useReadPublicCartQuery(
    { guest_id: guestId, language: language?.id || Languages[0].id },
    { skip: isAuth || !guestId },
  );

  const [currentCart, setCurrentCart] = useState<ICart>(
    cart || cartPub || cartManager!,
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
      (isAuth && role == roles.advertiser
        ? catalogAuth?.channels
        : isAuth && role == roles.manager
          ? catalogManager?.channels
          : catalogPublic?.channels) || []
    )?.find((card) => card?.id === cartChannel.id);

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
        !currentCard?.selected_format &&
        cartChannel.selected_format
      ) {
        newCards = (
          (isAuth && role == roles.advertiser
            ? catalogAuth?.channels
            : isAuth && role == roles.manager
              ? catalogManager?.channels
              : catalogPublic?.channels) || []
        ).map((card) => {
          if (card?.id === cartChannel.id) {
            const newItem = {
              ...card,
              selected_format: cartChannel.selected_format,
            };
            return newItem;
          }
          return card;
        });
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
        } else if (isAuth && role === roles.advertiser) {
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
        } else if (isAuth && role === roles.manager && projectId) {
          addToManagerCart({ ...addReq, project_id: projectId })
            .unwrap()
            .then((data) => {
              // setCurrentCart(cartManager);
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
        } else if (isAuth && role === roles.advertiser) {
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
        } else if (isAuth && role === roles.manager && projectId) {
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
        newCards = (
          (isAuth && role == roles.advertiser
            ? catalogAuth?.channels
            : isAuth && role == roles.manager
              ? catalogManager?.channels
              : catalogPublic?.channels) || []
        ).map((card) => {
          if (
            card?.id === cartChannel.id &&
            card?.selected_format &&
            cartChannel.selected_format
          ) {
            return {
              ...card,
              selected_format: { ...cartChannel.selected_format },
            };
          }
          return card;
        });
      } else {
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
        } else if (isAuth && role === roles.advertiser) {
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
        } else if (isAuth && role === roles.manager && projectId) {
          removeFromManagerCart({ ...removeReq, project_id: projectId })
            .unwrap()
            .then((data) => {
              // setCurrentCart(cartManager);
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
          (isAuth && role == roles.advertiser
            ? catalogAuth?.channels
            : isAuth && role == roles.manager
              ? catalogManager?.channels
              : catalogPublic?.channels) || []
        ).map((card) => {
          if (card?.id === cartChannel.id) {
            const newItem = {
              ...card,
              selected_format: undefined,
            };
            return newItem;
          }
          return card;
        });
      }
      dispatch(
        catalogAPI.util.updateQueryData(
          "getCatalog",
          {
            ...formState,
            user_id: userId,
            guest_id: guestId,
            project_id: projectId,
          },
          (draft) => {
            draft.channels = newCards;
          },
        ),
      );
    }
  };

  useEffect(() => {
    if (
      (formState?.filter?.age ||
        formState?.filter?.business ||
        formState?.filter?.region ||
        formState?.filter?.language ||
        formState?.filter?.male ||
        formState?.filter?.female) &&
      !formState?.sort
    ) {
      setValue("sort", sortingFilter.match);
    }
  }, [formState?.filter]);

  console.log("render catalog", catalogAuth);
  return (
    <div className="container">
      <div className={`${styles.wrapper}`}>
        <div className={styles.title}>{t("catalog.catalog")}</div>
        <div className={styles.content}>
          {screen >= BREAKPOINT.LG && (
            <div className={styles.left}>
              <CatalogSearch
                formState={formState}
                reset={reset}
                setValue={setValueWithPage}
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
                formState={formState}
                reset={reset}
                setValue={setValueWithPage}
                resetField={resetField}
                page={formState.page}
                channels={
                  (isAuth && role == roles.advertiser
                    ? catalogAuth?.channels
                    : isAuth && role == roles.manager
                      ? catalogManager?.channels
                      : catalogPublic?.channels) || []
                }
                onChangeCard={handleChangeCards}
                isLast={
                  (isAuth && role == roles.advertiser
                    ? catalogAuth?.isLast
                    : isAuth && role == roles.manager
                      ? catalogManager?.isLast
                      : catalogPublic?.isLast) || false
                }
                isLoading={
                  isCatalogAuthLoading ||
                  isCatalogLoading ||
                  isCatalogManagerLoading
                }
              />
            </div>
            <div className={styles.cart}>
              {currentCart?.channels?.length > 0 && (
                <CatalogCart cart={currentCart!} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
