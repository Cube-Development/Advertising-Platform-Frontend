import { platformTypesNum } from "@entities/platform";
import {
  CATALOG_FILTER,
  catalogAPI,
  ENUM_MANAGER_PROJECT_STATUS,
  ENUM_MANAGER_PROJECT_TYPES,
  getCatalogReq,
  ICart,
  ICatalogChannel,
  setFormState,
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
} from "@entities/project";
import { ENUM_ROLES, GenerateGuestId, useFindLanguage } from "@entities/user";
import {
  BREAKPOINT,
  ENUM_COOKIES_TYPES,
  INTERSECTION_ELEMENTS,
  MOCK_SITE_CATALOG,
} from "@shared/config";
import { useAppDispatch, useAppSelector, useWindowWidth } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ToastAction, useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { FC, useEffect, useRef, useState } from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CatalogCart, CatalogList, CatalogSearch } from "../components";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { ENUM_PATHS } from "@shared/routing";

export const CatalogBlock: FC = () => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const { toast } = useToast();
  const screen = useWindowWidth();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const savedFormState = useAppSelector(
    (state) => state.catalogFilter.formState,
  );
  const userId = Cookies.get(ENUM_COOKIES_TYPES.USER_ID);
  const guestId = Cookies.get(ENUM_COOKIES_TYPES.GUEST_ID) || GenerateGuestId();
  const projectId = Cookies.get(ENUM_COOKIES_TYPES.PROJECT_ID);
  const catalogTopRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [catalogFilter, setCatalogFilter] = useState<CATALOG_FILTER>(
    CATALOG_FILTER.PARAMETERS,
  );

  const { watch, reset, setValue, resetField } = useForm<getCatalogReq>({
    defaultValues: {
      page: savedFormState?.page || 1,
      elements_on_page:
        savedFormState?.elements_on_page || INTERSECTION_ELEMENTS.CATALOG,
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

  const setValueWithPage: UseFormSetValue<getCatalogReq> = (name, value) => {
    if (name === "filter" || name === "sort" || name === "search_string") {
      setValue("page", 1);
    }
    setValue(name, value);
  };

  const { data: catalogAuth, isFetching: isCatalogAuthLoading } =
    useGetCatalogQuery(
      {
        ...formState,
        language: language?.id || USER_LANGUAGES_LIST[0].id,
        user_id: userId,
      },
      {
        skip: !isAuth || !userId || role !== ENUM_ROLES.ADVERTISER,
      },
    );

  const { data: catalogManager, isFetching: isCatalogManagerLoading } =
    useGetCatalogQuery(
      {
        ...formState,
        language: language?.id || USER_LANGUAGES_LIST[0].id,
        project_id: projectId,
      },
      { skip: !isAuth || !projectId || role !== ENUM_ROLES.MANAGER },
    );

  const { data: catalogPublic, isFetching: isCatalogLoading } =
    useGetCatalogQuery(
      {
        ...formState,
        language: language?.id || USER_LANGUAGES_LIST[0].id,
        guest_id: guestId,
      },
      { skip: isAuth || !guestId },
    );

  const {
    data: catalogManagerPublic,
    isFetching: isCatalogManagerPublicLoading,
  } = useGetCatalogQuery(
    {
      ...formState,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      guest_id: guestId,
    },
    {
      skip: !isAuth || (role == ENUM_ROLES.MANAGER && projectId ? true : false),
    },
  );

  const [prevParams, setPrevParams] = useState({
    filter: formState.filter,
    sort: formState.sort,
    search_string: formState.search_string,
  });

  const [isFirstRender, setIsFirstRender] = useState(true);

  // Устанавливаем сохраненную страницу при первом рендере
  useEffect(() => {
    if (isFirstRender && savedFormState?.page) {
      setValue("page", savedFormState.page);
      setIsFirstRender(false);
    }
  }, []);

  // Синхронизация страницы в форме с количеством загруженных данных
  useEffect(() => {
    const currentData =
      isAuth && role === ENUM_ROLES.ADVERTISER
        ? catalogAuth
        : isAuth && role === ENUM_ROLES.MANAGER
          ? projectId
            ? catalogManager
            : catalogManagerPublic
          : catalogPublic;

    const isParamsChanged =
      JSON.stringify(prevParams.filter) !== JSON.stringify(formState.filter) ||
      prevParams.sort !== formState.sort ||
      prevParams.search_string !== formState.search_string;

    // Обновляем предыдущие параметры
    if (isParamsChanged) {
      setPrevParams({
        filter: formState.filter,
        sort: formState.sort,
        search_string: formState.search_string,
      });
    }

    // Синхронизируем страницу только если параметры НЕ менялись и это не первый рендер
    if (currentData?.channels?.length && !isParamsChanged && !isFirstRender) {
      const currentPage = Math.ceil(
        currentData.channels.length / INTERSECTION_ELEMENTS.CATALOG,
      );
      if (currentPage > formState.page) {
        setValue("page", currentPage);
      }
    }
  }, [
    catalogAuth?.channels?.length,
    catalogManager?.channels?.length,
    catalogPublic?.channels?.length,
    isAuth,
    role,
    formState.page,
    formState.filter,
    formState.sort,
    formState.search_string,
    isFirstRender,
  ]);

  const { data: cart } = useReadCommonCartQuery(
    { language: language?.id || USER_LANGUAGES_LIST[0].id },
    { skip: !isAuth || role !== ENUM_ROLES.ADVERTISER },
  );
  const { data: cartManager } = useReadManagerCartQuery(
    {
      project_id: projectId,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
    },
    { skip: !isAuth || role !== ENUM_ROLES.MANAGER || !projectId },
  );

  const { data: cartPub } = useReadPublicCartQuery(
    { guest_id: guestId, language: language?.id || USER_LANGUAGES_LIST[0].id },
    { skip: isAuth || !guestId },
  );

  const [currentCart, setCurrentCart] = useState<ICart>(
    cart || cartPub || cartManager!,
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
    if (role === ENUM_ROLES.MANAGER && !projectId) {
      toast({
        variant: "error",
        title: t("toasts.catalog.manager.error"),
        action: (
          <ToastAction altText="Ok">
            <Link
              to={`${ENUM_PATHS.ORDERS}?project_type=${ENUM_MANAGER_PROJECT_TYPES.MY_PROJECT}&project_status=${ENUM_MANAGER_PROJECT_STATUS.ACTIVE}`}
            >
              {t("toasts.catalog.manager.action")}
            </Link>
          </ToastAction>
        ),
      });
      return;
    }

    if (formState?.filter?.platform === platformTypesNum.site) {
      // setMockData(
      //   // [cartChannel]
      //   mockData.map((item) =>
      //     item.id === cartChannel.id
      //       ? { ...item, selected_format: cartChannel.selected_format }
      //       : item,
      //   ),
      // );
      return;
    }

    let newCards: ICatalogChannel[] = [];
    const currentCard = (
      (isAuth && role == ENUM_ROLES.ADVERTISER
        ? catalogAuth?.channels
        : isAuth && role == ENUM_ROLES.MANAGER
          ? catalogManager?.channels
          : catalogPublic?.channels) || []
    )?.find((card) => card?.id === cartChannel.id);

    if (cartChannel.selected_format) {
      const addReq = {
        channel_id: cartChannel.id,
        format: cartChannel.selected_format.format,
        match: cartChannel.match,
        language: language?.id || USER_LANGUAGES_LIST[0].id,
      };

      const removeReq = {
        channel_id: cartChannel.id,
        language: language?.id || USER_LANGUAGES_LIST[0].id,
      };

      if (
        currentCard &&
        !currentCard?.selected_format &&
        cartChannel.selected_format
      ) {
        newCards = (
          (isAuth && role == ENUM_ROLES.ADVERTISER
            ? catalogAuth?.channels
            : isAuth && role == ENUM_ROLES.MANAGER
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
        newCards = (
          (isAuth && role == ENUM_ROLES.ADVERTISER
            ? catalogAuth?.channels
            : isAuth && role == ENUM_ROLES.MANAGER
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
          (isAuth && role == ENUM_ROLES.ADVERTISER
            ? catalogAuth?.channels
            : isAuth && role == ENUM_ROLES.MANAGER
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

  const [mockData, setMockData] = useState(
    MOCK_SITE_CATALOG as unknown as ICatalogChannel[],
  );

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
                changeCatalogFilter={(filter) => setCatalogFilter(filter)}
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
                  formState?.filter?.platform === platformTypesNum.site
                    ? mockData
                    : (isAuth && role == ENUM_ROLES.ADVERTISER
                        ? catalogAuth?.channels
                        : isAuth && role == ENUM_ROLES.MANAGER
                          ? projectId
                            ? catalogManager?.channels
                            : catalogManagerPublic?.channels
                          : catalogPublic?.channels) || []
                }
                onChangeCard={handleChangeCards}
                isLast={
                  (isAuth && role == ENUM_ROLES.ADVERTISER
                    ? catalogAuth?.isLast
                    : isAuth && role == ENUM_ROLES.MANAGER
                      ? projectId
                        ? catalogManager?.isLast
                        : catalogManagerPublic?.isLast
                      : catalogPublic?.isLast) || false
                }
                isLoading={
                  isCatalogAuthLoading ||
                  isCatalogLoading ||
                  isCatalogManagerLoading ||
                  isCatalogManagerPublicLoading
                }
              />
            </div>
            <div className={styles.cart}>
              {currentCart?.channels?.length > 0 && (
                <CatalogCart cart={currentCart!} role={role} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
