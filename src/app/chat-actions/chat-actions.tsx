import React from "react";
import { ChatAction } from "./chat-action";

/**
 * Registry of AI chat actions.
 *
 * Every flow is lazy-loaded and mounted only when its action is opened (see
 * `ChatAction`), so declaring all of them here has no runtime cost until the
 * user actually triggers one. Mounted once for all non-admin pages, so the AI
 * can surface any of these from anywhere.
 */

// Auth
const LoginPage = React.lazy(() =>
  import("@pages/Login").then((m) => ({ default: m.LoginPage })),
);
const RegistrationPage = React.lazy(() =>
  import("@pages/Registration").then((m) => ({ default: m.RegistrationPage })),
);

// Advertiser flows
const CatalogPage = React.lazy(() =>
  import("@pages/Catalog").then((m) => ({ default: m.CatalogPage })),
);
const CartPage = React.lazy(() =>
  import("@pages/Cart").then((m) => ({ default: m.CartPage })),
);
const CreateOrderPage = React.lazy(() =>
  import("@pages/CreateOrder").then((m) => ({ default: m.CreateOrderPage })),
);
const OrdersPage = React.lazy(() =>
  import("@pages/Orders").then((m) => ({ default: m.OrdersPage })),
);

// Blogger flows
const AddChannelPage = React.lazy(() =>
  import("@pages/AddChannel").then((m) => ({ default: m.AddChannelPage })),
);
const MyChannelsPage = React.lazy(() =>
  import("@pages/MyChannels").then((m) => ({ default: m.MyChannelsPage })),
);
const OffersPage = React.lazy(() =>
  import("@pages/Offers").then((m) => ({ default: m.OffersPage })),
);

// Common flows
const ProfilePage = React.lazy(() =>
  import("@pages/Profile").then((m) => ({ default: m.ProfilePage })),
);
const TopupPage = React.lazy(() =>
  import("@pages/Topup").then((m) => ({ default: m.TopupPage })),
);
const WithdrawalPage = React.lazy(() =>
  import("@pages/Withdrawal").then((m) => ({ default: m.WithdrawalPage })),
);
const FAQPage = React.lazy(() =>
  import("@pages/FAQ").then((m) => ({ default: m.FAQPage })),
);

export const ChatActions = () => (
  <>
    <ChatAction
      name="auth"
      description="Регистрация нового аккаунта и вход (авторизация) в систему"
    >
      <LoginPage />
      <RegistrationPage />
    </ChatAction>

    <ChatAction
      name="catalog"
      description="Каталог Telegram, Instagram и YouTube каналов для размещения рекламы"
    >
      <CatalogPage />
    </ChatAction>

    <ChatAction
      name="cart"
      description="Корзина с выбранными для размещения рекламы каналами"
    >
      <CartPage />
    </ChatAction>

    <ChatAction
      name="create-order"
      description="Оформление и создание заказа на рекламу по выбранным каналам"
    >
      <CreateOrderPage />
    </ChatAction>

    <ChatAction
      name="my-campaigns"
      description="Мои рекламные кампании и заказы рекламодателя, отслеживание их статусов"
    >
      <OrdersPage />
    </ChatAction>

    <ChatAction
      name="add-channel"
      description="Добавить свой канал (Telegram, Instagram, YouTube) на площадку"
    >
      <AddChannelPage />
    </ChatAction>

    <ChatAction
      name="my-channels"
      description="Мои каналы: просмотр и редактирование добавленных каналов блогера"
    >
      <MyChannelsPage />
    </ChatAction>

    <ChatAction
      name="my-offers"
      description="Мои заказы блогера: входящие предложения о размещении рекламы"
    >
      <OffersPage />
    </ChatAction>

    <ChatAction
      name="profile"
      description="Мой профиль: личные данные и настройки аккаунта"
    >
      <ProfilePage />
    </ChatAction>

    <ChatAction name="wallet-topup" description="Пополнить баланс кошелька">
      <TopupPage />
    </ChatAction>

    <ChatAction
      name="wallet-withdraw"
      description="Вывести средства с баланса кошелька"
    >
      <WithdrawalPage />
    </ChatAction>

    <ChatAction
      name="guides"
      description="Гайды, инструкции и ответы на частые вопросы (FAQ)"
    >
      <FAQPage />
    </ChatAction>
  </>
);
