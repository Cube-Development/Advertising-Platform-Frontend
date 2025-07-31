import { ENUM_ROLES, USER_ROLES } from "@entities/user";
import { AddChannelPage } from "@pages/AddChannel";
import { AdminChannelsPage } from "@pages/AdminChannels";
import { AdminComplaintInfoPage } from "@pages/AdminComplaintInfo";
import { AdminComplaintsPage } from "@pages/AdminComplaints";
import { AdminDocumentsPage } from "@pages/AdminDocuments/UI";
import { AdminHomePage } from "@pages/AdminHome";
import { AdminOrganizationPage } from "@pages/AdminOrganization";
import { AdminReviewsPage } from "@pages/AdminReviews";
import { AdminTransactionsPage } from "@pages/AdminTransactions";
import { AdminUserInfoPage } from "@pages/AdminUserInfo";
import { AdminUsersPage } from "@pages/AdminUsers";
import { CartPage } from "@pages/Cart";
import { CatalogPage } from "@pages/Catalog";
import { ChannelPage } from "@pages/Channel";
import { CreateOrderPage } from "@pages/CreateOrder";
import { DocumentsPage } from "@pages/Documents";
import { FAQPage } from "@pages/FAQ";
import { LoginPage } from "@pages/Login";
import { MainPage } from "@pages/Main";
import { MainBloggerPage } from "@pages/MainBlogger";
import { MyChannelsPage } from "@pages/MyChannels";
import { NotFoundPage } from "@pages/NotFound";
import { OffersPage } from "@pages/Offers";
import { OrdersPage } from "@pages/Orders";
import { ProfilePage } from "@pages/Profile";
import { PublicOfferPage } from "@pages/PublicOffer";
import { RegistrationPage } from "@pages/Registration";
import { ServiceRulesPage } from "@pages/ServiceRules";
import { TopupPage } from "@pages/Topup";
import { TurnkeyPage } from "@pages/Turnkey";
import { WalletHistoryPage } from "@pages/WalletHistory";
import { WithdrawalPage } from "@pages/Withdrawal";
import {
  ENUM_AUTH_TYPES,
  ENUM_LAYOUT_TYPES,
  ENUM_PATHS,
  IRouting,
} from "@shared/routing";

export const ALL_APP_ROUTES_LIST: IRouting[] = [
  // only public
  {
    path: ENUM_PATHS.LOGIN,
    component: LoginPage,
    auth: ENUM_AUTH_TYPES.ONLY_PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.REGISTRATION,
    component: RegistrationPage,
    auth: ENUM_AUTH_TYPES.ONLY_PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  // public blogger
  {
    path: ENUM_PATHS.MAIN_BLOGGER,
    component: MainBloggerPage,
    roles: [ENUM_ROLES.BLOGGER],
    auth: ENUM_AUTH_TYPES.PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  // public advertiser
  {
    path: ENUM_PATHS.MAIN,
    component: MainPage,
    roles: [ENUM_ROLES.ADVERTISER],
    auth: ENUM_AUTH_TYPES.PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  {
    path: ENUM_PATHS.TURNKEY,
    component: TurnkeyPage,
    roles: [ENUM_ROLES.ADVERTISER],
    auth: ENUM_AUTH_TYPES.PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  // public common
  {
    path: ENUM_PATHS.FAQ,
    component: FAQPage,
    roles: [...USER_ROLES, ENUM_ROLES.MANAGER],
    auth: ENUM_AUTH_TYPES.PUBLIC,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.NOT_FOUND,
    component: NotFoundPage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.CHANNEL,
    component: ChannelPage,
    roles: [...USER_ROLES, ENUM_ROLES.MANAGER],
    auth: ENUM_AUTH_TYPES.PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.PUBLIC_OFFER,
    component: PublicOfferPage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PUBLIC,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.SERVICE_RULES,
    component: ServiceRulesPage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PUBLIC,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  // private blogger
  {
    path: ENUM_PATHS.ADD_CHANNEL,
    component: AddChannelPage,
    roles: [ENUM_ROLES.BLOGGER],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.MY_CHANNELS,
    component: MyChannelsPage,
    roles: [ENUM_ROLES.BLOGGER],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.OFFERS,
    component: OffersPage,
    roles: [ENUM_ROLES.BLOGGER],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  // private advertiser & manager
  {
    path: ENUM_PATHS.ORDERS,
    component: OrdersPage,
    roles: [ENUM_ROLES.ADVERTISER, ENUM_ROLES.MANAGER],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.CATALOG,
    component: CatalogPage,
    roles: [ENUM_ROLES.ADVERTISER, ENUM_ROLES.MANAGER],
    auth: ENUM_AUTH_TYPES.PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.CART,
    component: CartPage,
    roles: [ENUM_ROLES.ADVERTISER, ENUM_ROLES.MANAGER],
    auth: ENUM_AUTH_TYPES.PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.CREATE_ORDER,
    component: CreateOrderPage,
    roles: [ENUM_ROLES.ADVERTISER, ENUM_ROLES.MANAGER],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  // private common
  {
    path: ENUM_PATHS.DOCUMENTS,
    component: DocumentsPage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.WALLET_TOP_UP,
    component: TopupPage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.WALLET_WITHDRAW,
    component: WithdrawalPage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.WALLET_HISTORY,
    component: WalletHistoryPage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.PROFILE,
    component: ProfilePage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  // private admin
  {
    path: ENUM_PATHS.ADMIN_HOME,
    component: AdminHomePage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_CHANNELS,
    component: AdminChannelsPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_USERS,
    component: AdminUsersPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_COMPLAINTS,
    component: AdminComplaintsPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_TRANSACTIONS,
    component: AdminTransactionsPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_REVIEWS,
    component: AdminReviewsPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_COMPLAINT_INFO,
    component: AdminComplaintInfoPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_USER_INFO,
    component: AdminUserInfoPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_ORGANIZATION,
    component: AdminOrganizationPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_DOCUMENTS,
    component: AdminDocumentsPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
];
