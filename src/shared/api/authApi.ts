import { authBaseQuery } from "@entities/user";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ADMIN_CHANNELS,
  ADMIN_COMPLAINTS,
  ADMIN_REVIEWS,
  ADV_ORDERS,
  ADV_PROJECTS,
  ADV_TARIFF_ORDERS,
  ADV_TARIFF_PROJECTS,
  BALANCE,
  BLOGGER_CHANNELS,
  BLOGGER_OFFERS,
  CART,
  CART_PUB,
  CATALOG,
  CHAT,
  LEGALS,
  MANAGER_ORDERS,
  MANAGER_PROJECTS,
  RECOMMEND_CARDS,
  USER_DATA,
  VIEWS_ADVERTISER,
  VIEWS_BLOGGER_CHANNELS,
  VIEWS_BLOGGER_OFFERS,
  VIEWS_MANAGER,
  VIEWS_TRANSACTIONS,
} from "@shared/api";

export const authApi = createApi({
  baseQuery: authBaseQuery,
  reducerPath: "authApi",
  endpoints: () => ({}),
  tagTypes: [
    CART,
    CATALOG,
    RECOMMEND_CARDS,
    BLOGGER_CHANNELS,
    USER_DATA,
    CART_PUB,
    BALANCE,
    BLOGGER_OFFERS,
    ADV_PROJECTS,
    ADV_ORDERS,
    ADV_TARIFF_PROJECTS,
    ADV_TARIFF_ORDERS,
    MANAGER_PROJECTS,
    MANAGER_ORDERS,
    LEGALS,
    CHAT,
    ADMIN_REVIEWS,
    ADMIN_COMPLAINTS,
    ADMIN_CHANNELS,
    VIEWS_BLOGGER_CHANNELS,
    VIEWS_BLOGGER_OFFERS,
    VIEWS_ADVERTISER,
    VIEWS_MANAGER,
    VIEWS_TRANSACTIONS,
  ],
});
