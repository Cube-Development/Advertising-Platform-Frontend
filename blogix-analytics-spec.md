# Собственная статистика действий пользователей в Blogix

> **Для Claude, который читает этот файл в репозитории Blogix.**
> Это техническое задание на подробную аналитику поведения пользователей. Его выполняет **фронтенд-разработчик вместе с тобой, без участия бэкенд-команды**: основной API Blogix не меняется. Прочитай файл целиком, прежде чем писать код.
>
> Факты о проекте ниже собраны при изучении кода. Если что-то в репозитории уже изменилось — имя файла, эндпоинта, структура, — **верь коду, а не этому файлу**, и скажи разработчику о расхождении.
>
> Работай этапами из раздела 10. После каждого этапа показывай разработчику результат и как ты его проверил. Решения, которые зависят от инфраструктуры (база, домен, Kubernetes), сначала обсуди с разработчиком — в разделе 7.1 есть список вопросов.

---

## 1. Что хотим получить

Сейчас в Blogix есть только Google Tag Manager (в `index.html`) и бизнес-итоги в админке: страница «Общий обзор» (`/admin/common-observe`) показывает проекты, заказы и оборот по дням. Как пользователь **дошёл** до заказа, где он **отвалился**, что **искал** и **не нашёл** — сейчас не видно.

Цель — раздел **«Статистика»** в существующей админке Blogix (`/admin/statistics/*`, тот же layout, меню и роль модератора, отдельных пользователей нет). Он должен отвечать на вопросы бизнеса.

**Рекламодатели**
- Сколько людей открыли каталог, пользовались фильтрами и AI-подбором, добавили каналы в корзину, начали и оплатили кампанию. На каком шаге теряем больше всего.
- Какие фильтры, категории, регионы, языки и платформы выбирают. Какие запросы дают **пустую выдачу** — это прямой сигнал, каких каналов не хватает.
- Какие каналы чаще показываются, открываются, добавляются в корзину и попадают в кампании. CTR по позиции в каталоге.
- Сколько упираются в окна «войдите, чтобы увидеть больше» и премиум-доступа и что делают дальше.
- Как используют промокоды, сохранённые корзины, шаблоны постов, AI-генерацию поста.
- «Не хватило баланса → пополнили → вернулись к заказу»: сколько людей проходит этот путь и какой способ выбирают (Payme / Click / Didox).

**Блогеры**
- Лендинг блогера → регистрация → добавление канала → цены → активный канал → действия с предложениями (принять, отклонить, опубликовать).

**Общее**
- Регистрация и вход: способы (пароль, Google, сертификат ЭЦП) и на каком шаге обрываются.
- Источники трафика (UTM, referrer), устройства, браузер или Telegram Web App, язык (ru / uz / en).
- Журнал визитов: **кто** (конкретный пользователь, со ссылкой на `/admin/users/:id`), когда, откуда пришёл, что делал по шагам. Гости видны как анонимы, а после входа их путь склеивается с аккаунтом.

---

## 2. Как это устроено — простыми словами

Blogix — это React-приложение, которое после сборки превращается в статические файлы. Их раздаёт nginx, весь код выполняется в браузере пользователя. **Записать что-то в базу прямо из браузера нельзя**: пароль от базы оказался бы в JavaScript, который может открыть любой посетитель.

Поэтому рядом с фронтом появляется **маленький сервис статистики** — отдельная папка `analytics-service/` в этом же репозитории. Это Node.js-сервер на несколько сотен строк, который пишет и поддерживает фронтенд-разработчик. У сервиса две задачи:
1. **Принимать события** от браузера и складывать их в свою базу Postgres.
2. **Отдавать отчёты** админке. Перед этим он проверяет, что запрос делает модератор: передаёт куку пользователя в существующий API Blogix (`/users/me`) и смотрит роль.

Основной бэкенд Blogix при этом не меняется: сервис только читает у него «кто этот пользователь».

```
Браузер                                     Kubernetes (рядом с фронтом)
──────────────────────────────────          ──────────────────────────────────────────
Сайт Blogix                                 frontend (nginx)
 ├ трекер: просмотры, клики,                  ├ отдаёт сайт
 │ корзина, оплата, каталог…  ──POST──►       └ /stats-api/*  ─────────►  analytics-service (Node)
 │                                                                         ├ /collect  → Postgres
 └ админка /admin/statistics  ──GET───►  /stats-api/reports/* ─────────►   └ /reports/* → проверка роли
                                                                                 через GET {API}/users/me
                                                                                 (основной бэкенд, без изменений)
```

Почему сервис открывается **через nginx фронта по пути `/stats-api/`**, а не на своём домене:
- запросы идут на тот же домен, что и сайт, поэтому не нужны настройки CORS;
- браузер сам отправляет сервису куки домена сайта. Это нужно, чтобы проверить модератора (раздел 7.6);
- не нужен отдельный домен и сертификат.

**Чего не будет без бэкенда.** Итогов, которые знает только сервер: «оплата через Payme действительно прошла», «канал прошёл модерацию». Фронт видит, что пользователь **отправил** оплату или ушёл на платёжную страницу, но не подтверждение платёжной системы. Для отчётов этого достаточно. Подтверждённые итоги можно добавить потом — см. раздел 12.

---

## 3. Что важно знать о проекте (найдено в коде)

| Что | Где и как |
|---|---|
| Стек | React 18 + TypeScript + Vite, SPA. Сборка — статика, раздаёт nginx (`dockerfile`, `nginx.conf`). Основной бэкенд отдельный: `VITE_BASE_URL` (сейчас `https://api.blogix.uz/advblog/api`), сайт — `blogix.uz` |
| Архитектура | Feature-Sliced Design: `app → pages → widgets → features → entities → shared`. Импорт только вниз и через `index.ts` слайса |
| Роутер | `createBrowserRouter` в `src/app/router/router.tsx`. Два корневых layout: `RootLayout` (`src/widgets/layouts/layout-user/root-layout.tsx`) для сайта и `RootAdminLayout` для `/admin/*`. Маршруты и роли — `src/app/router/config.ts`, пути — `src/shared/routing/path.enum.ts` (`ENUM_PATHS`) |
| Данные | RTK Query: `baseApi` и `authApi`, эндпоинты встраиваются через `injectEndpoints`. Запросы к API идут с `credentials: "include"`, авторизация на куках |
| Текущий пользователь | `GET {VITE_BASE_URL}/users/me` → `IUser` с полями `id`, `role`, `is_premium`, `language`… (`src/entities/user/api/authService.ts`, `getUser` / `getUserQuery`) |
| Store | `src/app/providers/store.ts`, `configureStore` с цепочкой middleware |
| Куки фронта | `src/shared/config/cookies.ts`: `user_id` (ставит сам фронт в `features/useHandleAuth.ts` после входа), `guest_id` (uuid гостя, `GenerateGuestId()` в `@entities/user`), `role`, `isAuth`. Сессионная кука `adv-blog` ставится бэкендом |
| Роли | `src/entities/user/config/roles.ts`: `advertiser`, `blogger` — пользовательские, между ними можно переключаться (`toggleRole`); `manager`, `moderator`, `agency` — управленческие |
| Telegram | `src/app/providers/withTelegram.tsx`: `window.Telegram.WebApp`, роль из параметра `telegram_role` |
| Админка | Меню `src/widgets/layouts/components/sidebarAdmin/model/config.ts` (`ADMIN_MENU`, иконка `BarChart2` уже импортирована). Образец страницы с графиком, периодами и Excel — `src/widgets/adminPanel/commonObserve/*` (Recharts, `exportToExcel.ts`) |
| Переводы | `public/locales/{ru,en,uz}/translation.json`, ключи админки — в `admin_panel.*` |
| Деплой | GitHub Actions: `.github/workflows/deploy.yml` (`main`) и `dep.yaml` (`dev`). Собирают Docker-образ `abddssh/advblog-frontend`, пушат в Docker Hub и делают `kubectl set image deployment/frontend-deployment …`. Манифестов Kubernetes в репозитории нет — деплойменты созданы в кластере отдельно |
| Аналитика сейчас | Только GTM `GTM-57RN778C` в `index.html`. В коде нет ни одного `dataLayer.push` |

### Ключевые сценарии и где они в коде

- **Каталог** — `src/widgets/catalog/UI/index.tsx`. Состояние — форма `react-hook-form` (`getCatalogReq`): `filter.platform`, `filter.business[]` (категории), `filter.age[]`, `filter.male/female`, `filter.language[]`, `filter.region[]`, `sort`, `search_string`, `page`. Режим — `CATALOG_FILTER.PARAMETERS | AI` (AI-чат `widgets/catalog/components/ai-chat-filter`, эндпоинт `getAIParameters`). Запросы — `getCatalog` (гость, `/sample/public`) и `getAuthCatalog`. Ответ `ICatalogCards`: `elements` (всего найдено), `channels[]`, `page`.
- **Карточка канала** — `src/features/catalog/catalogCard/UI/index.tsx` и `compact-card.tsx`: ссылка на `/channel/:id`, выбор формата (`IFormat.format`), раскрытие подробностей, `AddToBasketBtn`. Для гостя и не-премиум — окна `LoginToViewMore` / `LoginPremiumAccess`. Рекомендации — `getRecommedChannels`, `features/catalog/recomTargetCard`.
- **Корзина** — `features/cart/*`: `addToCommonCart` / `addToPublicCart` / `addToManagerCart` (аргументы `channel_id`, `format`, `match`), `remove…`, `clear…`, `saveCart`, промокоды `checkCommonCartPromocode` и `checkPaymentPromocode`.
- **Создание кампании** — `src/widgets/createOrder/UI/index.tsx`: одна страница из секций, открывающихся по очереди (`useChangeBlur`): `post` → `datetime` → `prices` (только `agency`) → `payment`. Оплатить — `createPaymentProject`, сохранить — `saveAdvProject`, пополнить — `useTopUpFromCreateOrder`. AI-генерация поста — `features/createOrder/postGeneration`, `entities/postGeneration`. Шаблоны — `templatePostsDialog`, `addTemplate`.
- **Кошелёк** — `paymentTypes`: `payme`, `click`, `didox`; мутации `createDepositPayme`, `createDepositClick`, `createDeposit`, `createDepositRequest`, `createWithdraw`.
- **Блогер** — добавление канала `widgets/channel/add-channel` (`createChannel`, `channelVerify`, `setChannelPrices`); предложения `features/offer/*` (`acceptOffer`, `cancelOffer`, `rejectOrder`, `publishPostBlogger`, отправка ссылки); каналы — `activateChannel`, `deactivateChannel`, `deleteChannel`.
- **Авторизация** — `getCodeForRegistration`, `register` / `signUp`, `verifyEmail`, `login`, `getTokenByPassword`, `getTokenByCertificate` (ЭЦП), Google `googleAuthorize` / `googleCallback`, `logout`.
- **Под ключ и тарифы** — `/turnkey`, `postBuyTarif`.

---

## 4. Принципы, проверенные на практике

Похожая система уже работает в другом проекте. Вот что там пришлось учесть — делай так же сразу:

1. **Не размечать каждую кнопку вручную.** Три механизма покрывают почти всё: трекер маршрутов (просмотры и время), один Redux middleware на мутации RTK Query (бизнес-действия) и делегированный обработчик кликов по `data-*` атрибутам (CTA и карточки). Точечные вызовы `track()` — только там, где нет ни запроса, ни ссылки: смена фильтра до запроса, открытие окна премиум-доступа.
2. **Сервер решает, что за страница.** Тип страницы, устройство и время определяет сервис при приёме, а не браузер. Так правило одно на всех.
3. **Анонимный посетитель и визит.** Посетитель — `guest_id` из куки. Визит заканчивается после 30 минут бездействия, как в Яндекс Метрике. Отсюда уникальные и повторные действия.
4. **Пачки и надёжная отправка.** Очередь, отправка раз в 3 секунды и при уходе со страницы. `pagehide` ненадёжен (мобильный Safari убивает вкладки молча), поэтому нужен «пульс» раз в 15 секунд видимого времени. Перед уходом на внешний сайт (Payme, Click) очередь отправляется сразу.
5. **StrictMode в dev вызывает эффекты дважды.** Просмотр того же пути в пределах 1,5 секунды — повтор, а не новый просмотр, и id просмотра переиспользуется. Иначе в dev всё задвоится.
6. **Боты и автоматизация.** В браузере трекер молчит при `navigator.webdriver === true`. Сервис отбрасывает User-Agent с `bot|crawl|spider|headless|…`.
7. **Сотрудники не искажают цифры.** Админка (`RootAdminLayout`) не отслеживается вообще. События ролей `manager` / `moderator` / `agency` пишутся с пометкой, а отчёты по умолчанию их не показывают — есть галочка «вместе с сотрудниками».
8. **Пустая выдача — отдельная ценность.** К каждому запросу каталога — число найденных (`elements`). Отчёт «ищут, но не находят» оказался самым полезным для бизнеса.
9. **Никаких персональных данных.** Не отправлять email, телефоны, ИНН, тексты постов, имена файлов, суммы балансов. Только id сущностей, типы и коды.
10. **Сбой статистики ничего не ломает.** Трекер глотает все ошибки. Сборщик всегда отвечает 204. Если сервис лежит или база недоступна, сайт работает как раньше.

---

## 5. Модель событий

### 5.1. Пачка, которую отправляет браузер

```jsonc
{
  "vid": "c1f7…",          // guest_id из куки (uuid) — посетитель-браузер
  "sid": "9a2b…",          // id визита (uuid, 30 минут бездействия)
  "uid": "123",            // user_id из куки, если пользователь вошёл; иначе нет поля
  "ctx": {                  // контекст, повторяется в каждой пачке
    "lang": "ru",           // язык интерфейса i18n
    "role": "advertiser",   // текущая роль из Redux
    "tg": false,            // открыт ли внутри Telegram Web App
    "vw": 390               // ширина окна — для разреза «телефон / планшет / компьютер»
  },
  "events": [ { /* см. 5.2 */ } ]
}
```

`uid` и `role` браузер присылает сам. Для статистики этого достаточно: подделать их можно, но это лишь исказит аналитику самого подделывающего. Доступ к **отчётам** проверяется строго, через основной API (7.6).

### 5.2. Событие

| Поле | Тип | Что значит |
|---|---|---|
| `t` | string | Тип события (5.3) |
| `ts` | number | Время в браузере, мс. Сервис сверяет его со своим и не верит больше чем на 10 минут |
| `p` | string | Путь страницы с query, например `/catalog?save_project=…` |
| `e` | string? | Тип сущности: `channel`, `project`, `order`, `offer`, `tariff`… |
| `id` | string? | id сущности |
| `n` | string? | Имя действия или параметра: имя фильтра, CTA, шаг |
| `v` | string? | Значение: вариант фильтра, способ оплаты, формат, код ошибки |
| `src` | string? | Место на странице: `catalog`, `recommendations`, `cart`, `hero`… Для `page_view` — внешний referrer |
| `pos` | number? | Позиция карточки в списке с единицы, с учётом страницы |
| `num` | number? | Число: найдено каналов, длительность в мс, номер шага |
| `num2` | number? | Второе число: глубина прокрутки %, число каналов, страница каталога |
| `ok` | boolean? | Успех действия |
| `pv` | string? | Только `page_view` / `page_leave`: id просмотра, связывает время и прокрутку с просмотром |
| `props` | object? | Дополнительные свойства ≤ 2 КБ: массивы id фильтров и т. п. (5.4) |

### 5.3. Типы событий

**Навигация**

| `t` | Когда | Поля |
|---|---|---|
| `page_view` | Смена маршрута | `pv`, `n` = заголовок, `src` = внешний referrer (первый просмотр визита) |
| `page_leave` | Уход, скрытие вкладки, «пульс» раз в 15 с | `pv`, `num` = видимое время в мс (приращение), `num2` = максимум прокрутки % |
| `click` | Клик по элементу с `data-bx-cta` | `n` = имя CTA (`landing.start_campaign`), `src` = блок |
| `external_click` | Уход по внешней ссылке | `v` = хост и путь |

**Каталог и каналы**

| `t` | Когда | Поля |
|---|---|---|
| `catalog_query` | Каталог загрузился с новыми параметрами (middleware, `getCatalog` / `getAuthCatalog`) | `num` = `elements`, `n` = `parameters` / `ai`, `v` = сортировка, `num2` = страница, `props` — фильтры (5.4) |
| `filter_change` | Изменили фильтр (форма каталога, задержка 600 мс) | `n` = поле (`platform`, `business`, `age`, `language`, `region`, `gender`, `sort`, `search`), `v` = id значения, `src` = `add` / `remove` / `set` / `reset` |
| `ai_filter` | Запрос AI-подбора (`getAIParameters`) | `ok`, `num` = длина запроса в символах |
| `impression` | Карточка канала на экране ≥ 50% дольше 0,6 с, один раз за просмотр страницы | `e=channel`, `id`, `src`, `pos` |
| `channel_open` | Переход на страницу канала с карточки | `e=channel`, `id`, `src`, `pos` |
| `channel_view` | Открыта страница `/channel/:id` | `e=channel`, `id` |
| `card_details` | Раскрыли подробности карточки | `e=channel`, `id`, `src` |
| `format_select` | Выбрали формат размещения | `e=channel`, `id`, `v` = `format` |
| `gate_shown` / `gate_click` | Окно «войдите, чтобы увидеть больше» или премиум-доступа показано / нажато | `n` = `login_to_view` / `premium_access`, `e=channel`, `id` |

**Корзина и кампания**

| `t` | Когда | Поля |
|---|---|---|
| `cart_add` / `cart_remove` | `addTo*Cart` / `removeFrom*Cart` | `e=channel`, `id` = `channel_id`, `v` = `format`, `ok` |
| `cart_clear`, `cart_save` | `clear*Cart`, `saveCart` | `ok` |
| `promocode` | `checkCommonCartPromocode`, `checkPaymentPromocode` | `ok`, `v` = код ошибки |
| `order_step` | Впервые открылась секция мастера (`useChangeBlur`) | `n` = `post` / `datetime` / `prices` / `payment`, `num` = номер шага |
| `post_ai_generate` | AI-генерация поста | `ok`, `num` = длительность мс |
| `post_template` | Вставили или сохранили шаблон | `n` = `insert` / `save` |
| `project_save` | `saveAdvProject` | `ok`, `e=project`, `id` |
| `payment_submit` | `createPaymentProject` | `ok`, `e=project`, `id`, `v` = код ошибки |
| `balance_insufficient` | Не хватило баланса на шаге оплаты | `e=project`, `id` |
| `topup_start` | `createDepositPayme` / `createDepositClick` / `createDeposit` / `createDepositRequest` | `v` = `payme` / `click` / `didox` / `request`, `ok`, `src` = `create_order` или `wallet` |
| `withdraw_request` | `createWithdraw` | `ok` |
| `tariff_buy` | `postBuyTarif` | `ok`, `id` = тариф |

**Блогер**

| `t` | Когда | Поля |
|---|---|---|
| `channel_create` | `createChannel` | `ok`, `v` = платформа, `e=channel`, `id` из ответа |
| `channel_verify` | `channelVerify` | `ok` |
| `channel_prices` | `setChannelPrices` | `ok`, `e=channel`, `id` |
| `channel_state` | `activateChannel` / `deactivateChannel` / `deleteChannel` / повторная модерация | `n` = действие, `ok`, `e=channel`, `id` |
| `offer_action` | `acceptOffer` / `cancelOffer` / `rejectOrder` / `publishPostBlogger` / отправка ссылки | `n` = действие, `ok`, `e=offer`, `id` |

**Аккаунт**

| `t` | Когда | Поля |
|---|---|---|
| `auth` | `getCodeForRegistration`, `register` / `signUp`, `verifyEmail`, `login`, `getTokenByPassword`, `getTokenByCertificate`, `googleCallback`, `logout`, `resetPassword` | `n` = шаг или способ, `ok`, `v` = код ошибки |
| `identify` | Сразу после успешного входа или регистрации | без полей. Сервис запомнит связь `guest_id → user_id` |
| `role_switch` | Redux-действие `toggleRole` / `updateRole` | `v` = новая роль |
| `language_change` | Смена языка | `v` = язык |

### 5.4. Свойства `props` для каталога

```jsonc
{ "t": "catalog_query", "num": 37, "n": "parameters", "v": "views_down", "num2": 1,
  "props": { "platform": 1, "business": [3, 7], "age": [2], "language": [1], "region": [5], "male": 40, "search": true, "search_len": 12 } }
```

Строку поиска целиком не отправляй — только `search: true/false` и `search_len`. Исключение — если бизнес явно попросит (A7).

### 5.5. Классификация страниц

Делает сервис при приёме (7.4). Фронту таблица нужна для названий и отладки.

| Шаблон пути (`ENUM_PATHS`) | `page_type` | Раздел |
|---|---|---|
| `/` | `landing_advertiser` | public |
| `/blogger` | `landing_blogger` | public |
| `/catalog` | `catalog` | advertiser |
| `/channel/:id` | `channel` (+ `entity_id`) | advertiser |
| `/cart` | `cart` | advertiser |
| `/createorder` | `create_order` | advertiser |
| `/orders`, `/project/:project_id` | `orders`, `project` | advertiser |
| `/post_templates` | `post_templates` | advertiser |
| `/turnkey`, `/fullService` | `turnkey` | advertiser |
| `/channels`, `/addchannel` | `my_channels`, `add_channel` | blogger |
| `/offers`, `/track-orders` | `offers`, `track_orders` | blogger |
| `/wallet/topup`, `/wallet/withdraw`, `/wallet/history` | `wallet_topup`, `wallet_withdraw`, `wallet_history` | shared |
| `/documents`, `/profile`, `/addLegal` | `documents`, `profile`, `add_legal` | shared |
| `/login`, `/registration`, `/oauth-callback` | `login`, `registration`, `oauth` | auth |
| `/faq`, `/guide/:guide_id`, `/public_offer`, `/service_rules` | `faq`, `guide`, `info`, `info` | info |
| `/admin/*` | не отслеживается | — |

---

## 6. Часть A — трекер во фронте

### A1. Модуль `src/shared/lib/analytics/`

```
src/shared/lib/analytics/
├── index.ts          # публичный API: track, flush, setAnalyticsContext…
├── tracker.ts        # очередь, id визита, отправка
├── types.ts          # ClientEvent, CollectBatch, EventType (раздел 5)
├── marks.ts          # хелперы data-атрибутов: channelMark, listMark, ctaMark
└── rtk-middleware.ts # middleware для RTK Query (A4)
```

Образец `tracker.ts` — адаптируй под стиль проекта:

```ts
import Cookies from "js-cookie";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import type { ClientEvent, CollectBatch } from "./types";

// Тот же домен, что у сайта: nginx фронта проксирует /stats-api/ в сервис статистики (7.8).
const ENDPOINT = "/stats-api/collect";
const ENABLED = import.meta.env.VITE_ANALYTICS_ENABLED === "true";
const SESSION_KEY = "bx_sid";
const SESSION_TTL = 30 * 60 * 1000;
const FLUSH_DELAY = 3000;
const MAX_BATCH = 40;

let queue: ClientEvent[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let batchSession: string | null = null;
let ctxProvider: () => CollectBatch["ctx"] = () => ({ lang: "ru", role: "advertiser", tg: false, vw: 0 });
let guestIdFactory: () => string = () => crypto.randomUUID();

/** Контекст (язык, роль, Telegram) и генератор guest id передаются при старте приложения. */
export const setAnalyticsContext = (ctx: typeof ctxProvider, makeGuestId?: () => string) => {
  ctxProvider = ctx;
  if (makeGuestId) guestIdFactory = makeGuestId;
};

const safe = <T,>(fn: () => T, fallback: T): T => { try { return fn(); } catch { return fallback; } };

/** Посетитель — guest_id из куки: тот же, что у гостевой корзины и каталога. */
const visitorId = () => safe(() => Cookies.get(ENUM_COOKIES_TYPES.GUEST_ID), undefined) ?? guestIdFactory();

/** Визит общий для вкладок, продлевается любым событием, заканчивается после 30 минут бездействия. */
function sessionId(now: number): string {
  const saved = safe(() => JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null"), null);
  const s = saved && now - saved.last < SESSION_TTL ? saved : { id: crypto.randomUUID(), last: now };
  s.last = now;
  safe(() => localStorage.setItem(SESSION_KEY, JSON.stringify(s)), undefined);
  return s.id;
}

function send(events: ClientEvent[], sid: string) {
  if (!ENABLED) return;
  const uid = safe(() => Cookies.get(ENUM_COOKIES_TYPES.USER_ID), undefined);
  const body = JSON.stringify({ vid: visitorId(), sid, ...(uid ? { uid } : {}), ctx: ctxProvider(), events } satisfies CollectBatch);
  // sendBeacon переживает закрытие вкладки; если не принял — fetch с keepalive.
  if (navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: "text/plain" }))) return;
  fetch(ENDPOINT, { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain" } }).catch(() => {});
}

export function flush() {
  if (timer) clearTimeout(timer);
  timer = null;
  if (!queue.length || !batchSession) return;
  const events = queue; const sid = batchSession;
  queue = []; batchSession = null;
  for (let i = 0; i < events.length; i += MAX_BATCH) send(events.slice(i, i + MAX_BATCH), sid);
}

export function track(event: Omit<ClientEvent, "ts" | "p"> & { p?: string }) {
  if (typeof window === "undefined" || navigator.webdriver) return;
  if (safe(() => localStorage.getItem("bx_debug"), null) === "1") console.info("[bx-stats]", event.t, event);
  const now = Date.now();
  const sid = sessionId(now);
  if (batchSession && batchSession !== sid) flush();
  batchSession = sid;
  queue.push({ ...event, ts: now, p: event.p ?? location.pathname + location.search });
  if (queue.length >= MAX_BATCH) flush();
  else if (!timer) timer = setTimeout(flush, FLUSH_DELAY);
}
```

**Почему генератор guest id передаётся снаружи.** `shared` по FSD не может импортировать `entities`, а существующий `GenerateGuestId` лежит в `@entities/user`. Вызови `setAnalyticsContext(...)` один раз в `src/app` (например, в провайдере стора): там доступны и Redux (роль), и i18n (язык), и `GenerateGuestId`.

**Отладка:** `localStorage.bx_debug = "1"` — события выводятся в консоль на любом окружении. **Включение:** `VITE_ANALYTICS_ENABLED=true` при сборке. Пока сервиса нет, держи флаг выключенным.

### A2. Просмотры, время, прокрутка — `RouteTracker`

Компонент без разметки — `src/features/analytics/ui/route-tracker.tsx` (новый слайс `features/analytics`). Ставится **только** в `RootLayout` рядом с `<Outlet />`. В `RootAdminLayout` его нет: админка не отслеживается.

Что он делает:
- **На смену `useLocation().pathname`** — `page_view` с новым `pv`. Заголовок берётся через 400 мс, когда он обновится.
- **Повтор того же пути в пределах 1,5 с** (StrictMode) — не новый просмотр, `pv` переиспользуется.
- **Время на странице.** Считается только видимое время (`visibilitychange`). На уход, скрытие и `pagehide` — `page_leave` с приращением времени и максимумом прокрутки. Плюс **`setInterval` раз в 15 с**: пока вкладка видима, отправлять приращение.
- **Первый просмотр визита.** Если `document.referrer` внешний, передать его в `src`. UTM сервис возьмёт из `p`.
- **Query не создаёт новый просмотр** (`save_project` и т. п.).

Образец ядра (из рабочего проекта):

```tsx
let lastView = { path: "", at: 0, id: "" };

useEffect(() => {
  const path = location.pathname + location.search;
  const repeat = lastView.path === path && Date.now() - lastView.at < 1500;
  const current = { id: repeat ? lastView.id : randomId(), path,
    visibleSince: document.visibilityState === "visible" ? Date.now() : null,
    visibleMs: 0, maxScroll: 0, sentScroll: 0 };
  view.current = current;
  let sent = false;
  const sendView = () => {
    if (sent) return; sent = true;
    if (lastView.path === path && Date.now() - lastView.at < 1500) return;
    lastView = { path, at: Date.now(), id: current.id };
    track({ t: "page_view", pv: current.id, n: document.title.slice(0, 200), ...externalReferrer() });
  };
  const titleTimer = setTimeout(sendView, 400);
  return () => { clearTimeout(titleTimer); sendView(); leave(current); };
}, [location.pathname]);

/** Приращение видимого времени и прокрутки с прошлой отправки. */
function leave(c) {
  if (c.visibleSince !== null) { c.visibleMs += Date.now() - c.visibleSince; c.visibleSince = null; }
  if (c.visibleMs < 300 && c.maxScroll <= c.sentScroll) return;
  track({ t: "page_leave", p: c.path, pv: c.id, num: Math.round(c.visibleMs), num2: c.maxScroll });
  c.visibleMs = 0; c.sentScroll = c.maxScroll;
}
```

### A3. Клики и показы — делегирование по `data-*`

Один обработчик `click` (и `auxclick` для средней кнопки) на `document` в фазе захвата. Ставится в том же `RouteTracker`.

**Разметка (хелперы в `marks.ts` возвращают объект для spread):**

```tsx
// Карточка канала (catalogCard, compact-card, recomTargetCard, карточки в корзине)
<div {...channelMark(card.id, "catalog")}>…</div>
// → data-bx-entity="channel" data-bx-id="…" data-bx-src="catalog"

// Контейнер списка: позиции с учётом страницы
<div {...listMark((page - 1) * perPage)}>…</div>   // → data-bx-list data-bx-offset="…"

// Кнопка или ссылка, клики по которой интересны бизнесу
<Button {...ctaMark("landing.start_campaign", "hero")}>…</Button>
```

**Обработчик:**
- Клик внутри `[data-bx-cta]` → `click` с `n` и `src`.
- Клик по ссылке на `/channel/:id` внутри `[data-bx-entity=channel]` → `channel_open` с `id`, `src`, `pos`. Позиция — индекс карточки среди **видимых** (`getClientRects().length > 0`) в ближайшем `[data-bx-list]` плюс `offset`. Невидимые копии (десктоп и мобайл в одном DOM) не считаются.
- Клик по внешней ссылке → `external_click` с хостом и путём, затем сразу `flush()`.

**Показы:** `IntersectionObserver` с `threshold: 0.5` на всех `[data-bx-entity]`. Карточка видна 600 мс → `impression`, один раз на (сущность, место) за просмотр страницы. Новые карточки ловит `MutationObserver` на `document.body` с дебаунсом через `requestAnimationFrame`: бесконечная прокрутка каталога и пагинация.

**Где разметить** (найди все места, где рисуются карточки каналов, и проверь, что ничего не пропущено):
- `features/catalog/catalogCard/UI/index.tsx` и `compact-card.tsx` — `src` = `catalog` или `cart` (по пропсу `page`);
- `features/catalog/recomTargetCard` — `src` = `recommendations`;
- список каталога `widgets/catalog/components/catalogList` — `listMark`;
- CTA лендингов (`pages/Main`, `pages/MainBlogger`, `widgets/mainPages`, `widgets/main`): «Начать кампанию», «В каталог», «Добавить канал», «Под ключ», тарифы — `ctaMark` с именами `landing.*` / `landing_blogger.*`.

### A4. Бизнес-действия — один middleware на RTK Query

Главный механизм. RTK Query диспатчит `…/executeMutation/fulfilled` и `…/rejected`, в `meta.arg` у них есть `endpointName`, `type` и `originalArgs`. Один middleware превращает их в события по таблице.

```ts
// src/shared/lib/analytics/rtk-middleware.ts
import type { Middleware } from "@reduxjs/toolkit";
import { isFulfilled } from "@reduxjs/toolkit";
import { track, flush } from "./tracker";
import type { ClientEvent, EventType } from "./types";

type Rule = {
  t: EventType;
  /** Поля события из аргументов и ответа. Никаких персональных данных. */
  map?: (args: any, result: any) => Partial<ClientEvent>;
  /** Отправить сразу: после этого пользователь может уйти на внешний сайт. */
  urgent?: boolean;
};

const RULES: Record<string, Rule> = {
  addToCommonCart:      { t: "cart_add", map: (a) => ({ e: "channel", id: a?.channel_id, v: String(a?.format ?? "") }) },
  addToPublicCart:      { t: "cart_add", map: (a) => ({ e: "channel", id: a?.channel_id, v: String(a?.format ?? "") }) },
  addToManagerCart:     { t: "cart_add", map: (a) => ({ e: "channel", id: a?.channel_id, v: String(a?.format ?? "") }) },
  removeFromCommonCart: { t: "cart_remove", map: (a) => ({ e: "channel", id: a?.channel_id }) },
  // … removeFromPublicCart, removeFromManagerCart, clearCommonCart/clearPublicCart/clearProjectCart, saveCart
  checkCommonCartPromocode: { t: "promocode" },
  checkPaymentPromocode:    { t: "promocode" },
  createPaymentProject: { t: "payment_submit", map: (a) => ({ e: "project", id: a?.project_id }) },
  saveAdvProject:       { t: "project_save",   map: (a) => ({ e: "project", id: a?.project_id }) },
  createDepositPayme:   { t: "topup_start", map: () => ({ v: "payme" }), urgent: true },
  createDepositClick:   { t: "topup_start", map: () => ({ v: "click" }), urgent: true },
  createDeposit:        { t: "topup_start", map: () => ({ v: "didox" }) },
  createDepositRequest: { t: "topup_start", map: () => ({ v: "request" }) },
  createWithdraw:       { t: "withdraw_request" },
  postBuyTarif:         { t: "tariff_buy" },
  createChannel:        { t: "channel_create", map: (a, r) => ({ e: "channel", id: r?.id, v: String(a?.platform ?? "") }) },
  channelVerify:        { t: "channel_verify" },
  setChannelPrices:     { t: "channel_prices" },
  activateChannel:      { t: "channel_state", map: (a) => ({ n: "activate", e: "channel", id: a?.channel_id }) },
  deactivateChannel:    { t: "channel_state", map: (a) => ({ n: "deactivate", e: "channel", id: a?.channel_id }) },
  deleteChannel:        { t: "channel_state", map: (a) => ({ n: "delete", e: "channel", id: a?.channel_id }) },
  acceptOffer:          { t: "offer_action", map: (a) => ({ n: "accept", e: "offer", id: a?.order_id }) },
  cancelOffer:          { t: "offer_action", map: (a) => ({ n: "cancel", e: "offer", id: a?.order_id }) },
  rejectOrder:          { t: "offer_action", map: (a) => ({ n: "reject", e: "offer", id: a?.order_id }) },
  publishPostBlogger:   { t: "offer_action", map: (a) => ({ n: "publish", e: "offer", id: a?.order_id }) },
  getCodeForRegistration: { t: "auth", map: () => ({ n: "registration_code" }) },
  register:             { t: "auth", map: () => ({ n: "register" }) },
  signUp:               { t: "auth", map: () => ({ n: "signup" }) },
  verifyEmail:          { t: "auth", map: () => ({ n: "verify_email" }) },
  login:                { t: "auth", map: () => ({ n: "login_password" }) },
  getTokenByPassword:   { t: "auth", map: () => ({ n: "login_password" }) },
  getTokenByCertificate:{ t: "auth", map: () => ({ n: "login_certificate" }) },
  googleCallback:       { t: "auth", map: () => ({ n: "login_google" }) },
  logout:               { t: "auth", map: () => ({ n: "logout" }) },
  changeLanguage:       { t: "language_change", map: (a) => ({ v: String(a?.language ?? "") }) },
};

const LOGIN_ENDPOINTS = ["login", "getTokenByPassword", "getTokenByCertificate", "googleCallback", "register", "signUp"];

export const analyticsMiddleware: Middleware = () => (next) => (action: any) => {
  const result = next(action);
  try {
    const arg = action?.meta?.arg;
    const endpoint: string | undefined = arg?.endpointName;
    const done = isFulfilled(action);
    const failed = typeof action?.type === "string" && action.type.endsWith("/rejected");

    if (endpoint && arg?.type === "mutation" && (done || failed)) {
      const rule = RULES[endpoint];
      if (rule) {
        const errCode = done ? undefined : String(action.payload?.status ?? action.error?.name ?? "error");
        track({ t: rule.t, ok: done, ...(rule.map?.(arg.originalArgs, action.payload) ?? {}), ...(errCode ? { v: errCode } : {}) });
        if (rule.urgent) flush();
      }
      if (done && LOGIN_ENDPOINTS.includes(endpoint)) { track({ t: "identify" }); flush(); }
    }

    // Каталог — это запросы, а не мутации
    if ((endpoint === "getCatalog" || endpoint === "getAuthCatalog") && done) {
      const a = arg.originalArgs;
      if (a?.page === 1) track({ t: "catalog_query", num: action.payload?.elements, num2: a.page, v: a.sort, n: catalogMode(), props: catalogProps(a) });
    }

    // Не-API действия Redux
    if (typeof action?.type === "string" && /\/(toggleRole|updateRole)$/.test(action.type)) {
      track({ t: "role_switch", v: String(action.payload) });
    }
  } catch { /* статистика не должна ломать приложение */ }
  return result;
};
```

- **Проверь каждую строку таблицы по коду.** Имена полей в `originalArgs` (`channel_id`, `project_id`, `order_id`…) в разных эндпоинтах разные. Открой каждый эндпоинт в `entities/*/api` и подставь правильные поля. Если поля нет, не придумывай — оставь событие без `id`.
- **`catalogMode()`** — режим «параметры / AI». Храни его в модуле: страница каталога вызывает `setCatalogMode(...)` при переключении вкладки.
- **Подключение:** последним в цепочку `src/app/providers/store.ts` (`.concat(..., analyticsMiddleware)`). Middleware лежит в `shared` и ничего не импортирует из верхних слоёв.

### A5. Точечные события — где нет ни запроса, ни ссылки

| Событие | Где |
|---|---|
| `filter_change` | `widgets/catalog/UI/index.tsx`, в `setValueWithPage`: сравнить новое `filter.*` / `sort` / `search_string` с прошлым, найти добавленные и удалённые id, отправить с задержкой 600 мс (ползунок пола не должен сыпать событиями). Сброс — одно событие `src: "reset"` |
| смена режима «Параметры / AI» | там же, `setCatalogFilter` → `click` с `n: "catalog.mode"`, `v` = режим, плюс `setCatalogMode` |
| `ai_filter` | `ai-chat-filter/model/hooks.ts` — при отправке запроса и по результату |
| `card_details`, `format_select` | `catalogCard`: `handleChangeOpenSubcard` (только при раскрытии), `handleChangeFormat` |
| `gate_shown` / `gate_click` | компоненты `LoginToViewMore`, `LoginPremiumAccess` |
| `order_step` | `widgets/createOrder/model/hooks/useChangeBlur.ts` — когда секция впервые открывается |
| `balance_insufficient` | `useCheckBalance` / `useTopUpFromCreateOrder` — где решено, что денег не хватает |
| `post_ai_generate` | `features/createOrder/postGeneration/model/usePostGeneration.ts`. Если генерация идёт мимо RTK своим `fetch`, отправь вручную: длительность и успех |
| `post_template` | вставка шаблона в `templatePostsDialog`; сохранение ловит middleware по `addTemplate` (добавь правило) |
| `channel_view` | страница канала `pages/Channel` — id из `useParams` при загрузке |

### A6. Что не отправлять и что решить с бизнесом

**Не отправлять никогда:** email, телефон, ФИО, ИНН/ПИНФЛ, реквизиты, текст постов и комментариев, имена и ссылки загруженных файлов, данные сертификатов ЭЦП, суммы балансов и платежей.

**Решить с бизнесом (по умолчанию — не отправлять):**
- текст строки поиска каталога и запросов в AI-подбор. Полезно знать, что ищут, но туда попадают названия компаний и случайные личные данные. Если решат включить — обрезать до 200 символов и хранить 90 дней;
- промокоды — обычно не персональные данные, их можно отправлять.

### A7. GTM не трогаем

Сниппет Google Tag Manager в `index.html` оставить как есть. Дублировать ли события в `window.dataLayer` — спроси разработчика.

---

## 7. Часть B — сервис статистики `analytics-service/`

### 7.1. Сначала выяснить у разработчика

| Вопрос | Зачем | Вариант по умолчанию |
|---|---|---|
| Где будет Postgres для статистики | Сервису нужна своя база | Отдельная база `blogix_analytics` с отдельным пользователем на существующем сервере Postgres, или управляемая база у облачного провайдера. Не таблицы в основной базе бэкенда |
| Кто создаёт объекты в Kubernetes | Нужен один раз новый Deployment и Service | Тот, у кого есть доступ к кластеру. Манифесты лежат в репозитории (7.9) |
| На каком домене кука сессии `adv-blog` | От этого зависит, увидит ли сервис сессию для проверки модератора (7.6) | Проверить в браузере (7.6, шаг 1) |
| Часовой пояс отчётов | «Сутки» в графиках | `Asia/Tashkent` |
| Отчёты только `moderator` или ещё `manager` | Доступ к разделу | Только `moderator`, как остальная админка |

### 7.2. Что это за сервис

- **Стек:** Node.js 18+, TypeScript, сервер [Fastify](https://fastify.dev) (или `express` — как удобнее), драйвер `pg`, валидация `zod`.
- **Где:** папка `analytics-service/` в корне репозитория со своим `package.json`, `tsconfig.json`, `Dockerfile`. Она **не входит в сборку Vite**: добавь её в `exclude` корневого `tsconfig.json`, в игнор ESLint и в `.dockerignore` фронта.
- **Что делает:** три HTTP-маршрута — `POST /collect`, `GET /reports/:name`, `GET /health`. Таблицы создаёт сам при старте (`create table if not exists`).

```
analytics-service/
├── package.json        # fastify, pg, zod; scripts: dev (tsx watch), build (tsc), start (node dist/server.js)
├── tsconfig.json
├── Dockerfile
├── k8s/                # манифесты Deployment и Service (7.9)
└── src/
    ├── server.ts       # маршруты, запуск
    ├── db.ts           # пул pg, схема (7.3)
    ├── classify.ts     # путь → page_type (таблица 5.5)
    ├── ua.ts           # боты, устройство, браузер, ОС
    ├── ingest.ts       # проверка и запись пачки (7.4)
    ├── auth.ts         # проверка модератора через основной API (7.6)
    └── reports/        # отчёты (7.7): overview.ts, funnels.ts, catalog.ts, channels.ts, sessions.ts, …
```

**Переменные окружения сервиса:**

| Переменная | Пример | Что это |
|---|---|---|
| `DATABASE_URL` | `postgres://analytics:***@db-host:5432/blogix_analytics` | База статистики |
| `BLOGIX_API_URL` | `https://api.blogix.uz/advblog/api` | Основной API — только для `/users/me` |
| `ALLOWED_ROLES` | `moderator` | Кому доступны отчёты |
| `REPORT_TZ` | `Asia/Tashkent` | Часовой пояс отчётов |
| `RETENTION_DAYS` | `400` | Сколько хранить события |
| `PORT` | `8080` | Порт сервиса |

### 7.3. Схема базы

```sql
create table if not exists events (
  id            bigserial primary key,
  ts            timestamptz not null,
  type          text not null,
  guest_id      uuid not null,
  session_id    uuid not null,
  user_id       text,
  role          text,
  is_staff      boolean not null default false,
  view_id       text,
  path          text not null,
  page_type     text not null,
  page_section  text,
  page_entity   text,
  entity        text,
  entity_id     text,
  name          text,
  value         text,
  place         text,
  position      smallint,
  num           integer,
  num2          integer,
  ok            boolean,
  props         jsonb,
  referrer_host text,
  utm_source    text, utm_medium text, utm_campaign text,
  lang          text,
  is_telegram   boolean,
  device        text not null,
  browser       text, os text
);
create index if not exists events_ts_brin   on events using brin (ts);
create index if not exists events_type_ts   on events (type, ts);
create index if not exists events_entity    on events (entity, entity_id, ts) where entity_id is not null;
create index if not exists events_user      on events (user_id, ts) where user_id is not null;
create index if not exists events_guest     on events (guest_id, ts);
create index if not exists events_session   on events (session_id, ts);
create index if not exists events_page      on events (page_type, ts);

create table if not exists identities (
  guest_id   uuid primary key,
  user_id    text not null,
  first_seen timestamptz not null default now()
);
create index if not exists identities_user on identities (user_id);
```

Новые колонки в будущем добавляй через `alter table events add column if not exists …` в той же схеме — тогда уже работающая база обновится сама при перезапуске сервиса.

**Удаление старых событий:** раз в сутки, прямо в сервисе по таймеру — `delete from events where ts < now() - make_interval(days => $1)`.

### 7.4. `POST /collect` — приём событий

- **Тело:** JSON из 5.1. Браузер отправляет его с `Content-Type: text/plain`, поэтому разбирай тело как строку и вызывай `JSON.parse` сам. В Fastify для этого нужен `addContentTypeParser('text/plain', { parseAs: 'string' }, …)`.
- **Ответ:** всегда `204` без тела, даже при ошибке. Ошибки — только в лог.
- **Свой ли источник:** заголовок `Origin` или `Referer` должен быть с домена сайта (`blogix.uz`, dev-домены, `localhost` в разработке), иначе молча игнорировать.
- **Проверка (zod):**
  - тело ≤ 64 КБ, событий 1–60;
  - `vid` и `sid` — uuid;
  - `t` — из списка 5.3;
  - строки обрезать: `p` 500, `n` 200, `v` 300, `src` 300, `id` 100 символов;
  - числа — целые;
  - `props` ≤ 2 КБ, только простые значения и массивы чисел.
- **Боты:** User-Agent пустой или содержит `bot|crawl|spider|slurp|headless|lighthouse|curl|wget|python|scrapy|puppeteer|playwright|selenium|externalagent|perplexity` → не писать.
- **Лимит:** не больше 400 событий в минуту с одного IP (`X-Forwarded-For` от nginx), лишнее молча отбрасывать.
- **Время:** время сервера при приёме. Время браузера — только для порядка в пачке: `now − (max_ts − ts)`, разница не больше 10 минут.
- **Обогащение:**
  - `page_type`, раздел и `page_entity` по таблице 5.5 (сопоставление `p` с шаблонами);
  - для `page_view` — `utm_*` из query `p` и `referrer_host` из `src`;
  - `device` по `ctx.vw` (`< 768` — mobile, `< 1024` — tablet, иначе desktop) и User-Agent, браузер и ОС по User-Agent;
  - `is_staff = true` для ролей `manager` / `moderator` / `agency`;
  - `role`, `lang`, `is_telegram` — из `ctx`.
- **`identify`:** `insert into identities (guest_id, user_id) values (…) on conflict do nothing`.
- **Запись** — одной вставкой всей пачки.

### 7.5. `GET /health`

`200 ok`, если сервис запущен. Можно проверять и соединение с базой. Нужен для проверок Kubernetes.

### 7.6. Проверка модератора для отчётов

Сервис не хранит пользователей. Он спрашивает основной API, кто пришёл:

```ts
// auth.ts — кэш на минуту: страница отчёта делает много запросов разом
const cache = new Map<string, { role: string; userId: string; until: number }>();

export async function requireStaff(req): Promise<{ userId: string; role: string } | null> {
  const cookie = req.headers.cookie ?? "";
  if (!cookie) return null;
  const key = createHash("sha256").update(cookie).digest("hex");
  const hit = cache.get(key);
  if (hit && hit.until > Date.now()) return ALLOWED_ROLES.includes(hit.role) ? hit : null;

  const res = await fetch(`${process.env.BLOGIX_API_URL}/users/me`, { headers: { cookie } });
  if (!res.ok) return null;
  const me = await res.json();                 // IUser: { id, role, … }
  const entry = { role: me.role, userId: String(me.id), until: Date.now() + 60_000 };
  cache.set(key, entry);
  return ALLOWED_ROLES.includes(me.role) ? entry : null;
}
```

Каждый `/reports/*` сначала вызывает `requireStaff`. Нет доступа — `401`, не та роль — `403`.

**Важно — шаг 1, проверь домен куки.** Работает это, только если браузер отправляет сервису сессионную куку. Открой в браузере `blogix.uz`, войди модератором, DevTools → Application → Cookies:
- **У куки `adv-blog` домен `.blogix.uz`** (с точкой — общий для поддоменов). Сервис за nginx фронта по пути `/stats-api/` на `blogix.uz` её получит. Ничего дополнительно делать не нужно.
- **Домен `api.blogix.uz`** (без точки — кука только для API). На `blogix.uz` она не придёт. Тогда сервис нужно открыть на пути **того же хоста API**, например `https://api.blogix.uz/stats-api/`, через правило ingress в Kubernetes. Это настройка маршрутизации, а не код бэкенда. Проверь, что `Path` куки покрывает этот путь (`/` покрывает всё). Трекеру и админке в этом случае нужна база `${API_ORIGIN}/stats-api` вместо относительного `/stats-api` и `credentials: "include"`, а сервису — CORS с `Access-Control-Allow-Credentials: true` для домена сайта.

Сообщи разработчику, какой вариант получился, прежде чем делать деплой.

### 7.7. Отчёты — `GET /reports/:name`

Общие параметры для всех отчётов:

| Параметр | Значение |
|---|---|
| `from`, `to` | `YYYY-MM-DD` включительно, в часовом поясе `REPORT_TZ`. По умолчанию — последние 30 дней. Больше двух лет за раз не считать |
| `role` | `advertiser` / `blogger` / `guest` / пусто = все |
| `device` | `mobile` / `tablet` / `desktop` |
| `platform` | `web` / `telegram` |
| `lang` | `ru` / `uz` / `en` |
| `source` | `search` / `social` / `direct` / `referral` / `utm` — по UTM и referrer первого `page_view` визита |
| `staff` | `1` — включить сотрудников (по умолчанию `not is_staff`) |

**Условие периода** — так, чтобы сутки считались по Ташкенту:

```sql
e.ts >= ($from::date)::timestamp at time zone $tz
and e.ts < ($to::date + 1)::timestamp at time zone $tz
```

**Тип источника визита:**

```sql
case when s.utm_source is not null then 'utm'
     when s.referrer_host is null then 'direct'
     when s.referrer_host ~* '(google|yandex|bing|mail\.ru|duckduckgo)\.' then 'search'
     when s.referrer_host ~* '(t\.me|telegram|instagram|facebook|youtube|vk\.com|tiktok)' then 'social'
     else 'referral' end
-- s — первый page_view визита: select distinct on (session_id) … order by session_id, ts
```

Каждый отчёт с периодом отдаёт и **прошлый период той же длины** — для сравнения «+12% / −5%». Динамика — по часам для 1–2 дней, по неделям для периодов больше 120 дней, иначе по дням. Пустые промежутки — нулями (`generate_series`).

| Отчёт | Что отдаёт |
|---|---|
| `overview` | Посетители (уникальные `guest_id`), новые и вернувшиеся, визиты, вошедшие пользователи, просмотры, среднее время визита, отказы (визит из одной страницы < 15 с без действий), корзины, отправленные оплаты, созданные каналы. Динамика. Разрезы: роль, источники, устройства, Telegram / браузер, языки |
| `funnel_advertiser` | По визитам: лендинг → каталог → фильтр или AI → открыли канал → в корзину → создание кампании → `order_step post` → `datetime` → `payment` → `payment_submit ok`. Абсолют, доля от первого шага, потеря к предыдущему. Ветка «не хватило баланса → пополнение → оплата» |
| `funnel_blogger` | Лендинг блогера → регистрация → `channel_create ok` → `channel_verify ok` → `channel_prices` → `offer_action accept` → `publish` |
| `catalog` | Запросы: всего, с фильтрами, AI-режим. Популярность каждого значения фильтров (`jsonb_array_elements_text(props->'business')` и т. д.). **Пустые выдачи** (`num = 0`) по значениям и комбинациям. Сортировки. Глубина прокрутки. Доля визитов с корзиной по каждому значению фильтра |
| `channels` | По каналу: показы (с уникальными), средняя позиция, открытия карточки и страницы, CTR, форматы, добавления и удаления из корзины, окна «войдите / премиум», попадание в отправленные оплаты (в визитах с `payment_submit ok`) |
| `channel` (`?id=`) | Один канал: динамика, откуда открывают, CTR по позиции, форматы, что выбирали в фильтрах в визитах перед добавлением, устройства |
| `cart` | Корзины: добавления, удаления, очистки, сохранения, брошенные (добавили, но без `payment_submit` за 7 дней), промокоды (успешные и неуспешные, по кодам ошибок), шаблоны, AI-генерация (запусков, успешность, среднее время), способы пополнения, ошибки оплаты |
| `blogger` | Создание каналов по платформам, верификация, цены, активации, деактивации и удаления, действия с предложениями по типам |
| `auth` | Регистрации и входы по способам, успешность каждого шага, ошибки по кодам, склейки гость → пользователь |
| `pages` | По типам страниц и адресам: просмотры, уникальные, время, прокрутка, входы, выходы, отказы |
| `sources` | По типам источников, сайтам и UTM-кампаниям: визиты, регистрации, корзины, оплаты, конверсия |
| `sessions` | Журнал визитов с фильтрами (роль, была ли оплата, был ли канал или проект, путь содержит, пользователь) и постраничным выводом: начало, длительность, страницы, источник, устройство, пользователь, ключевые действия |
| `session` (`?id=`) | Хронология одного визита |
| `user` (`?id=`) | Все визиты и действия пользователя, включая гостевые до регистрации (через `identities`) |
| `realtime` | Посетители за последние 5 минут, просмотры по минутам за 30 минут, текущие страницы |

**Пример** — пустые выдачи каталога по категориям:

```sql
select cat::int as business_id,
       count(*) as queries,
       count(*) filter (where e.num = 0) as zero_results,
       count(distinct e.session_id) as sessions
from events e
cross join lateral jsonb_array_elements_text(coalesce(e.props->'business', '[]'::jsonb)) as cat
where e.type = 'catalog_query' and <условие периода> and not e.is_staff
group by 1 order by zero_results desc, queries desc;
```

**Пример** — уникальные и повторные добавления канала в корзину:

```sql
select entity_id as channel_id,
       count(*) as adds,
       count(distinct guest_id) as unique_adds,
       count(*) - count(distinct guest_id) as repeat_adds
from events
where type = 'cart_add' and ok and <условие периода> and not is_staff
group by 1 order by adds desc;
```

**Названий в базе статистики нет** — только id категорий, регионов, языков, каналов, пользователей. Названия админка подставляет из **существующих** справочников фронта: `getChannelCategories`, `getChannelRegions`, `getChannelLanguages`, `getChannelAges`, данные канала и пользователя из админских запросов. Сервис отдаёт id, фронт показывает подписи.

**Безопасность запросов:** все значения — только через параметры (`$1, $2…`). Имена колонок и порядок сортировки — только из белого списка в коде. Каждому запросу — `statement_timeout` около 20 секунд (можно настроить на пул в `pg`).

### 7.8. Связь с фронтом через nginx

Добавь в `nginx.conf` фронта (до `location /`):

```nginx
location /stats-api/ {
    proxy_pass http://analytics-service:8080/;      # имя Service в Kubernetes (7.9)
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Cookie $http_cookie;           # сессия — для проверки модератора
    proxy_read_timeout 30s;
    client_max_body_size 128k;
}
```

**Если сервис ещё не задеплоен,** nginx фронта не запустится с неизвестным хостом в `proxy_pass`. Поэтому выкатывай сервис раньше, чем фронт с этим блоком. Либо используй `resolver` с переменной — тогда nginx стартует и без сервиса, а запросы просто получат 502:

```nginx
resolver kube-dns.kube-system.svc.cluster.local valid=10s;   # уточнить DNS кластера
set $stats_upstream http://analytics-service.default.svc.cluster.local:8080;
location /stats-api/ { rewrite ^/stats-api/(.*)$ /$1 break; proxy_pass $stats_upstream; … }
```

**Локальная разработка:** в `vite.config.ts` → `server.proxy`: `'/stats-api': { target: 'http://localhost:8080', rewrite: p => p.replace(/^\/stats-api/, '') }`. Локальную базу можно поднять через `docker run postgres:16`.

### 7.9. Docker, Kubernetes, CI

**`analytics-service/Dockerfile`:**

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["node", "dist/server.js"]
```

**`analytics-service/k8s/`** — Deployment (1 реплика, `livenessProbe` / `readinessProbe` на `/health`, переменные из Secret `analytics-service-env`, лимиты памяти около 256 МБ) и Service `analytics-service` на порт 8080, ClusterIP. Применить один раз (`kubectl apply -f analytics-service/k8s/`). Секрет с `DATABASE_URL` создать отдельно, **не коммитить**.

**CI:** в `.github/workflows/deploy.yml` (и `dep.yaml` для dev) добавь шаги по образцу существующих. Собрать `analytics-service/` в образ (например, `abddssh/advblog-analytics`), запушить с тем же тегом времени, `kubectl set image deployment/analytics-service analytics-service=…`. Удобнее запускать эти шаги, только когда менялась папка `analytics-service/` (`dorny/paths-filter` или отдельный workflow с `paths:`).

---

## 8. Часть C — раздел «Статистика» в админке

### C1. Маршруты, меню, запросы

1. В `ENUM_PATHS` добавить `/admin/statistics` (обзор) и вложенные: `…/advertisers`, `…/bloggers`, `…/catalog`, `…/channels`, `…/channels/:id`, `…/cart`, `…/auth`, `…/pages`, `…/sources`, `…/sessions`, `…/sessions/:id`, `…/users/:id`.
2. В `src/app/router/config.ts` — маршруты с `roles: [ENUM_ROLES.MODERATOR]`, `auth: PRIVATE`, `layout: ADMIN`, как у `ADMIN_COMMON_OBSERVE`.
3. В `ADMIN_MENU` — пункт «Статистика» с иконкой `BarChart2` сразу после «Главной».
4. Страницы — `src/pages/AdminStatistics*`, виджеты — `src/widgets/adminPanel/statistics/*`, типы — `src/entities/admin/types`.
5. Запросы — **отдельный** `createApi` (например, `statsApi` в `src/shared/api/stats/`) с `fetchBaseQuery({ baseUrl: "/stats-api/reports", credentials: "include" })`. Подключить его middleware в store. Он ходит в сервис статистики, а не в основной API. Ответ `401` или `403` — сообщение «нет доступа». `502` или `503` — «Статистика временно недоступна», без падения страницы.

### C2. Общая панель фильтров

Одна панель для всех страниц раздела. Её состояние — в query-параметрах адреса, чтобы ссылкой можно было поделиться:
- **период:** пресеты (сегодня, вчера, 7 / 30 / 90 дней, этот и прошлый месяц, год) и выбор диапазона в календаре — в проекте уже есть `react-calendar`;
- **разрезы:** роль, устройство, Telegram / браузер, язык, тип источника;
- **«Сравнить с прошлым периодом»** (включено) и **«Вместе с сотрудниками»** (выключено);
- **«Сейчас на сайте: N»** — раз в 30 с из `realtime`.

Вкладки разделов — над панелью.

### C3. Компоненты

- **Графики** — Recharts, как в `CommonObserveChart.tsx`. Текущий период — линией, прошлый — пунктиром.
- **Карточки показателей:** значение, изменение к прошлому периоду (зелёный / красный; у «отказов» наоборот), мини-график, иконка «?» с объяснением метрики простыми словами.
- **Воронка:** горизонтальные полосы с абсолютом, долей от первого шага и «−N% к предыдущему».
- **Таблицы:** сортировка по любой колонке, поиск, пагинация, выгрузка в Excel существующим `exportToExcel.ts`. На телефоне строки становятся карточками «подпись — значение».
- **Переходы:** канал → `/admin/statistics/channels/:id`; пользователь → `/admin/statistics/users/:id` и ссылка на существующую карточку `/admin/users/:id`; визит → его хронология.
- **Хронология визита** человеческим языком: «Открыл каталог», «Выбрал в фильтре „Регион“: Ташкент — 37 каналов», «Добавил в корзину канал (формат 1/24)», «Не хватило баланса», «Пополнение через Payme», «Отправил оплату кампании».
- **Состояния:** загрузка, пусто за период, ошибка, «нет доступа», «статистика временно недоступна».
- **Адаптивность:** всё работает от 375 px без горизонтальной прокрутки страницы. В CSS-гридах — `minmax(0, 1fr)`, иначе таблицы и переключатели распирают колонку.

### C4. Переводы

Все подписи — через `t()`, ключи в `admin_panel.statistics.*` во всех трёх `public/locales/{ru,en,uz}/translation.json`. Нет узбекского перевода — поставь русский и дай разработчику список таких ключей.

---

## 9. Что показывать на страницах

| Вкладка | Содержание |
|---|---|
| **Обзор** | Карточки: посетители (новые / вернувшиеся), визиты, пользователи, просмотры, время визита, отказы, корзины, отправленные оплаты, новые каналы. График с выбором метрики. Разрезы: роль, источники, устройства, Telegram / браузер, языки |
| **Рекламодатели** | Воронка до оплаты, ветка «баланс → пополнение → оплата», окна «войдите / премиум» и что после них, «под ключ» и тарифы |
| **Блогеры** | Воронка до публикации, платформы каналов, действия с предложениями, деактивации и удаления |
| **Каталог** | Фильтры и их значения, AI-подбор, сортировки, глубина прокрутки, вкладка **«Ищут, но не находят»** |
| **Каналы** | Таблица каналов (показы, позиция, CTR, корзина); карточка канала с динамикой и источниками |
| **Корзина и заказы** | Корзины, брошенные корзины, промокоды, шаблоны, AI-генерация, способы пополнения, ошибки оплаты |
| **Вход и регистрация** | Способы, шаги, ошибки, склейки гость → пользователь |
| **Страницы** | По типам и адресам: время, прокрутка, входы, выходы, отказы |
| **Источники** | Типы, сайты, UTM-кампании с конверсией в регистрацию, корзину и оплату |
| **Визиты** | Журнал, хронология визита, страница пользователя |

---

## 10. План работ по этапам

1. **Согласование.** Покажи разработчику план и вопросы из 7.1. Выясни домен куки `adv-blog` (7.6, шаг 1). Реши вопросы из A6 и A7.
2. **Трекер:** `shared/lib/analytics`, `RouteTracker` в `RootLayout`, флаг `VITE_ANALYTICS_ENABLED` (пока выключен), отладка `bx_debug`. Проверка: в консоли с `bx_debug=1` — один `page_view` на переход, `page_leave` со временем, без дублей в dev.
3. **Middleware RTK Query:** правила по реальным аргументам эндпоинтов, `catalog_query`, `identify`, `role_switch`. Проверка: каждое действие из таблицы даёт событие с правильным `id` и `ok`.
4. **Разметка и точечные события:** карточки каналов, списки, CTA лендингов, показы, окна «войдите / премиум», фильтры, шаги мастера, AI-генерация. Проверка: показы с позициями при прокрутке; фильтры не сыплют событиями от ползунка.
5. **Сервис `analytics-service`:** приём, схема, отчёты, проверка модератора, Dockerfile. Локально — с Postgres в Docker и прокси Vite. Проверка: события из шагов 2–4 в таблице `events` с правильными `page_type`, устройством, ролью; отчёты отдают данные модератору и `401` / `403` остальным.
6. **Админка:** маршруты, меню, `statsApi`, панель фильтров, страницы по разделу 9. Проверка: на 1440 и 375 px без горизонтальной прокрутки, все подписи из переводов.
7. **Выкладка на dev:** база, Secret, `kubectl apply` манифестов сервиса, шаги в `dep.yaml`, блок `/stats-api/` в `nginx.conf`, `VITE_ANALYTICS_ENABLED=true`. Неделя наблюдения, затем то же для `main`.

После каждого этапа — `npm run lint` (ноль предупреждений), `npx tsc --noEmit`, `npm run build` (и `npm run build` в `analytics-service/`). Затем короткий отчёт разработчику: что сделано и как проверено.

---

## 11. Чек-лист проверки

- [ ] С `localStorage.bx_debug = "1"`: переход между страницами — один `page_view`; в dev (StrictMode) не задваивается.
- [ ] Время на странице приходит и при переходе внутри SPA, и после закрытия вкладки (через «пульс» не позже 15 с).
- [ ] `POST /stats-api/collect` уходит с `text/plain`, отвечает 204; при выключенном сервисе сайт работает, в консоли нет ошибок от трекера.
- [ ] Гость: события с `guest_id`; после входа — `identify`, и в отчёте `user` видны гостевые шаги до регистрации.
- [ ] Каталог: смена фильтров → `filter_change` с id значений; запрос → `catalog_query` с `num = elements`; пустая выдача видна в отчёте «Ищут, но не находят».
- [ ] Показы карточек — один раз на канал и место за просмотр страницы, позиции учитывают страницу, подгрузка при прокрутке тоже даёт показы.
- [ ] Корзина, промокод, оплата, пополнение, каналы, предложения, вход и регистрация — у каждого действия есть событие с `ok`.
- [ ] Payme / Click: `topup_start` уходит **до** редиректа на внешний сайт.
- [ ] В `/admin/*` трекер не работает; действия сотрудников помечены `is_staff` и по умолчанию не попадают в отчёты.
- [ ] Ни одно событие не содержит email, телефон, текст поста, имя файла или сумму.
- [ ] `/stats-api/reports/*`: модератору — данные, другому пользователю — 403, без входа — 401.
- [ ] Запрос с чужого `Origin` и с User-Agent бота не пишет ничего в базу.
- [ ] `npm run lint`, `tsc`, `npm run build` фронта и сервиса — без ошибок; FSD не нарушен; папка `analytics-service/` не попала в сборку Vite.
- [ ] Админка: все страницы раздела на 1440 и 375 px без горизонтальной прокрутки, выгрузка в Excel работает, подписи на ru / en / uz.

---

## 12. Готово, когда

- Рекламодатель и блогер проходят свои сценарии, и все действия из 5.3 появляются в базе статистики с правильными пользователем, ролью, сущностью и результатом.
- В админке у модератора есть раздел «Статистика» со всеми вкладками из раздела 9, фильтрами периода и разрезов, сравнением с прошлым периодом и переходами между отчётами.
- Отчёт «Ищут, но не находят» показывает пустые выдачи каталога.
- Журнал визитов показывает конкретных пользователей со ссылкой на их карточку в админке и хронологию действий.
- Основной бэкенд не менялся. Если сервис статистики недоступен, сайт работает как раньше.

### На будущее, по желанию (потребует бэкенд-разработчика)

Подтверждённые итоги знает только основной бэкенд: оплата через Payme / Click действительно прошла, канал прошёл модерацию, блогеру пришло предложение, размещение опубликовано. Если когда-нибудь бэкендер согласится, ему достаточно отправлять такие события тем же `POST /collect` (или прямо в таблицу `events` с пометкой `source = 'server'`). Тогда воронки будут заканчиваться не «отправил оплату», а «оплата подтверждена». Для первой версии это не нужно.
