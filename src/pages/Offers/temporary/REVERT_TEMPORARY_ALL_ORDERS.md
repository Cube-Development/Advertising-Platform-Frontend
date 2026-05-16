# Откат TEMPORARY: все ордера без пагинации + клиентская сортировка

> **Инструкция для агента:** по этому файлу верни код **в точности** как до задачи.  
> Задача: временно грузить все ордера блогера (page 1, без `elements_on_page`), сортировать на клиенте по `publish_date` + `publish_time.time_from`.

---

## Сводка изменений

| Действие | Файл |
|----------|------|
| **УДАЛИТЬ целиком** | `src/pages/Offers/temporary/allOrdersWithoutPagination.ts` |
| **УДАЛИТЬ целиком** | `src/pages/Offers/temporary/REVERT_TEMPORARY_ALL_ORDERS.md` (этот файл) |
| **УДАЛИТЬ папку** | `src/pages/Offers/temporary/` (если пуста) |
| **ВОССТАНОВИТЬ** | `src/pages/Offers/UI/index.tsx` |
| **ВОССТАНОВИТЬ** | `src/entities/offer/helpers/invalidate-offer/websocket-action.ts` |

Другие файлы **не менялись**.

---

## 1. Удалить новые файлы

```
src/pages/Offers/temporary/allOrdersWithoutPagination.ts
src/pages/Offers/temporary/REVERT_TEMPORARY_ALL_ORDERS.md
```

Папку `src/pages/Offers/temporary/` удалить, если в ней ничего не осталось.

---

## 2. `src/pages/Offers/UI/index.tsx` — восстановить оригинал

### 2.1. Убрать импорт (строки 24–28)

**Удалить:**
```ts
// TEMPORARY — удалить импорт вместе с папкой `pages/Offers/temporary/`
import {
  sortOrdersByPublishDate,
  TEMPORARY_FETCH_ALL_ORDERS,
} from "../temporary/allOrdersWithoutPagination";
```

### 2.2. `useForm` defaultValues

**Было (оригинал):**
```ts
  const { setValue, watch } = useForm<getOrdersByStatusReq>({
    defaultValues: {
      status: startStatus,
      page: 1,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      elements_on_page: INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
      date_sort: dateSortingTypes.decrease,
      ...(startOrderId ? { search_string: startOrderId } : {}),
    },
  });
```

**Сейчас (заменить на оригинал):** закомментирован `elements_on_page` — вернуть строку как выше.

### 2.3. Формирование `getParams`

**Было (оригинал):**
```ts
  const { search_string, ...params } = formState;
  const getParams: getOrdersByStatusReq = {
    ...params,
    ...(search_string && search_string.length >= 3
      ? isValidUUID(search_string)
        ? { order_id: search_string }
        : { search_string }
      : {}),
  };
```

**Сейчас (заменить блок целиком):**
```ts
  const { search_string, elements_on_page, page: formPage, ...params } =
    formState;
  const getParams: getOrdersByStatusReq = {
    ...params,
    // TEMPORARY — всегда page 1, без elements_on_page
    page: TEMPORARY_FETCH_ALL_ORDERS ? 1 : formPage,
    ...(TEMPORARY_FETCH_ALL_ORDERS
      ? {}
      : {
          elements_on_page:
            elements_on_page ?? INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
        }),
    // ORIGINAL pagination — раскомментировать при откате TEMPORARY
    // ...params,
    // page,
    ...(search_string && search_string.length >= 3
      ...
```

### 2.4. `useGetBloggerOrdersQuery` — `selectFromResult`

**Было (оригинал):**
```ts
  const { data, isFetching, refetch, originalArgs } = useGetBloggerOrdersQuery(
    getParams,
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        data: (data?.status === formState?.status && data) || undefined,
      }),
    },
  );
```

**Сейчас:** развёрнутый `selectFromResult` с `sortOrdersByPublishDate` и `isLast: true` — заменить на оригинал выше.

### 2.5. `handleOnChangePage`

**Было (оригинал):**
```ts
  const handleOnChangePage = () => {
    const newPage = Math.floor(
      (data?.orders?.length || 0) / INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
    );
    setValue("page", newPage + 1);

    if (data?.orders?.length === 0) {
      refetch();
    }
  };
```

**Сейчас:** закомментирован оригинал + `const handleOnChangePage = () => {};` — убрать комментарии и заглушку, вернуть оригинал.

### 2.6. `useEffect` для пустого списка

**Было (оригинал) — раскомментировать:**
```ts
  useEffect(() => {
    if (data && data?.orders?.length === 0 && !data?.isLast) {
      refetch();
    }
  }, [data?.orders?.length]);
```

**Сейчас:** этот блок закомментирован — раскомментировать.

### 2.7. `isLoadingMore`

**Было (оригинал):**
```ts
  const isLoadingMore = isFetching && !originalArgs?.__isWebsocket;
```

**Сейчас:**
```ts
  const isLoadingMore =
    !TEMPORARY_FETCH_ALL_ORDERS && isFetching && !originalArgs?.__isWebsocket;
```

### 2.8. Пропсы `MyOffers`

**Было (оригинал):**
```tsx
          <MyOffers
            statusFilter={formState.status as ENUM_OFFER_STATUS}
            offers={data?.orders || []}
            handleOnChangePage={handleOnChangePage}
            isLoading={isLoadingMore}
            isLast={data?.isLast || false}
            currentPage={formState?.page}
          />
```

**Сейчас:**
```tsx
            isLast={
              TEMPORARY_FETCH_ALL_ORDERS ? true : data?.isLast || false
            }
            currentPage={TEMPORARY_FETCH_ALL_ORDERS ? 1 : formState?.page}
```

---

## 3. `src/entities/offer/helpers/invalidate-offer/websocket-action.ts` — восстановить оригинал

### 3.1. Убрать импорт (строки 7–8)

**Удалить:**
```ts
// TEMPORARY — удалить вместе с `pages/Offers/temporary/`
import { TEMPORARY_FETCH_ALL_ORDERS } from "@pages/Offers/temporary/allOrdersWithoutPagination";
```

### 3.2. Объект `params` в `invalidateBloggerOfferByWebsocketAction`

**Было (оригинал):**
```ts
  const params = {
    page: 1,
    elements_on_page: INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
    language: language?.id,
    status: status,
    date_sort: dateSortingTypes.decrease,
    __isWebsocket: true,
  };
```

**Сейчас (заменить на оригинал):**
```ts
  const params = {
    page: 1,
    // ORIGINAL pagination — раскомментировать при откате TEMPORARY
    // elements_on_page: INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
    ...(TEMPORARY_FETCH_ALL_ORDERS
      ? {}
      : { elements_on_page: INTERSECTION_ELEMENTS.BLOGGER_OFFERS }),
    language: language?.id,
    ...
```

---

## 4. Что добавляло TEMPORARY (контекст, не восстанавливать)

Файл `allOrdersWithoutPagination.ts` содержал:

- `TEMPORARY_FETCH_ALL_ORDERS = true`
- `sortOrdersByPublishDate()` — сортировка по `publish_date` (string | `{date_from, date_to}` | массив) + `publish_time.time_from`, формат даты `DD.MM.YYYY`, время `HH:mm`, asc (ближайшие → поздние)
- Для диапазона/массива дат — бралась **самая ранняя** дата

При откате этот файл **не нужен**.

---

## 5. Чеклист для агента после отката

- [ ] Папка `src/pages/Offers/temporary/` удалена
- [ ] В `Offers/UI/index.tsx` нет `TEMPORARY`, `sortOrdersByPublishDate`, `formPage`
- [ ] В запросе снова уходит `elements_on_page: INTERSECTION_ELEMENTS.BLOGGER_OFFERS`
- [ ] Работает «Показать ещё» (`handleOnChangePage`, `isLast` из API)
- [ ] `websocket-action.ts` снова всегда передаёт `elements_on_page`
- [ ] `npm run dev` / сборка без ошибок

---

## 6. Полный оригинал `OffersPage` (эталон для сверки)

Ниже — файл **до** TEMPORARY-изменений (кроме `UnrealizedWallet`, который был и раньше):

```tsx
import { channelData } from "@entities/channel";
import {
  getOrdersByStatusReq,
  ENUM_OFFER_STATUS,
  useGetBloggerOrdersQuery,
} from "@entities/offer";
import { dateSortingTypes } from "@entities/platform";
import { useFindLanguage } from "@entities/user";
import { useGetViewBloggerOrderQuery } from "@entities/views";
import { SearchFilter } from "@features/catalog";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PAGE_FILTER, ENUM_PATHS } from "@shared/routing";
import { SuspenseLoader } from "@shared/ui";
import { buildPathWithQuery, queryParamKeys, QueryParams } from "@shared/utils";
import { BarFilter } from "@widgets/barFilter";
import React, { FC, Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validate as isValidUUID } from "uuid";
import styles from "./styles.module.scss";
import { UnrealizedWallet } from "@features/wallet";

// Ленивый импорт компонента MyOffers
const MyOffers = React.lazy(() =>
  import("@widgets/offer")
    .then((module) => ({ default: module.MyOffers }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

export const OffersPage: FC = () => {
  useClearCookiesOnPage();
  const page = ENUM_PAGE_FILTER.OFFER;
  const language = useFindLanguage();
  const navigate = useNavigate();
  const { offer_status, order_id } = QueryParams();

  const startStatus =
    offer_status &&
    !!Object.values(ENUM_OFFER_STATUS).includes(
      offer_status as ENUM_OFFER_STATUS,
    )
      ? offer_status
      : ENUM_OFFER_STATUS.ACTIVE;

  const startOrderId = isValidUUID(order_id || "") ? order_id : undefined;

  const { setValue, watch } = useForm<getOrdersByStatusReq>({
    defaultValues: {
      status: startStatus,
      page: 1,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      elements_on_page: INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
      date_sort: dateSortingTypes.decrease,
      ...(startOrderId ? { search_string: startOrderId } : {}),
    },
  });
  const formState = watch();

  const changeStatus = (status: string) => {
    setValue("page", 1);
    setValue("status", status);
  };
  const { search_string, ...params } = formState;
  const getParams: getOrdersByStatusReq = {
    ...params,
    ...(search_string && search_string.length >= 3
      ? isValidUUID(search_string)
        ? { order_id: search_string }
        : { search_string }
      : {}),
  };
  const { data, isFetching, refetch, originalArgs } = useGetBloggerOrdersQuery(
    getParams,
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        data: (data?.status === formState?.status && data) || undefined,
      }),
    },
  );
  const { refetch: views } = useGetViewBloggerOrderQuery();

  const handleOnChangePage = () => {
    const newPage = Math.floor(
      (data?.orders?.length || 0) / INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
    );
    setValue("page", newPage + 1);

    if (data?.orders?.length === 0) {
      refetch();
    }
  };

  useEffect(() => {
    if (data && data?.orders?.length === 0 && !data?.isLast) {
      refetch();
    }
  }, [data?.orders?.length]);

  useEffect(() => {
    setTimeout(() => {
      setValue("page", 1);
    }, 500);
  }, [formState.status, formState.search_string]);

  useEffect(() => {
    views();
  }, [formState.page, formState.status]);

  useEffect(() => {
    setValue("search_string", "");
    const newPath = buildPathWithQuery(ENUM_PATHS.OFFERS, {
      [queryParamKeys.offerStatus]: formState.status,
      ...(startOrderId ? { [queryParamKeys.orderId]: startOrderId } : {}),
    });
    navigate(newPath, { replace: true });
  }, [formState.status]);

  const isLoadingMore = isFetching && !originalArgs?.__isWebsocket;

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="container">
        <div className={styles.wrapper}>
          <BarFilter
            page={page}
            listLength={!!data?.orders?.length}
            changeStatus={changeStatus}
            statusFilter={formState.status}
          />
          <SearchFilter
            type={channelData.search}
            onChange={setValue}
            value={formState.search_string}
          />
          <UnrealizedWallet />
          <MyOffers
            statusFilter={formState.status as ENUM_OFFER_STATUS}
            offers={data?.orders || []}
            handleOnChangePage={handleOnChangePage}
            isLoading={isLoadingMore}
            isLast={data?.isLast || false}
            currentPage={formState?.page}
          />
        </div>
      </div>
    </Suspense>
  );
};
```

> **Примечание:** при откате меняй только логику из §2; JSX-оболочку `return` не трогай.

---

## 7. Полный оригинал `websocket-action.ts`

```ts
import { AppDispatch } from "@app/providers/store";
import { bloggerOffersAPI, ENUM_OFFER_STATUS } from "@entities/offer";
import { dateSortingTypes } from "@entities/platform";
import { BALANCE, USER_ME, VIEWS_BLOGGER_OFFERS } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<typeof bloggerOffersAPI.useLazyGetBloggerOrdersQuery>[0];
  language: ILanguage;
  status: ENUM_OFFER_STATUS;
  skip_views?: boolean;
}

export const invalidateBloggerOfferByWebsocketAction = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  status,
  skip_views = false,
}: Props) => {
  //   ? Из-за непонятной выдачи не понятно как лучше ревалидировать данные, так что просто сброс

  // 1. Обновляем кэш заказов в ожидании
  const params = {
    page: 1,
    elements_on_page: INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
    language: language?.id,
    status: status,
    date_sort: dateSortingTypes.decrease,
    __isWebsocket: true,
  };

  await trigger(params).unwrap();
  dispatch(bloggerOffersAPI.util.invalidateTags([BALANCE, USER_ME]));

  if (skip_views) return;
  // 2. Обновляем кэш кружочков
  dispatch(bloggerOffersAPI.util.invalidateTags([VIEWS_BLOGGER_OFFERS]));
};
```

---

*Создано: 2026-05-16. Задача: OffersPage — загрузка всех ордеров без пагинации + сортировка по дате публикации.*
