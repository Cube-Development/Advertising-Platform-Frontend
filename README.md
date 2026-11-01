# Blogix — Frontend

**Blogix** is an advertising marketplace (ad exchange) that connects **advertisers** with **content creators** (bloggers and channel owners) on **Telegram**, **Instagram** and **YouTube**. Advertisers find channels in a catalog and build campaigns. Bloggers list their channels and accept paid placements. The platform covers the deal from start to finish: payments, publication tracking, legally binding documents with e-signatures, and moderation.

This repository holds the web client: a React + TypeScript single-page application built with Vite. It also runs as a Telegram Web App.

---

## Table of contents

- [Features](#features)
- [User roles](#user-roles)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Architecture notes](#architecture-notes)
- [Routing](#routing)
- [Internationalization](#internationalization)
- [Testing](#testing)
- [Docker & deployment](#docker--deployment)
- [Code style](#code-style)

---

## Features

### For advertisers
- **Channel catalog**: search and filter Telegram, Instagram and YouTube channels by audience, price, category and format. Includes an AI-assisted filter and recommendations.
- **Cart and promocodes**: collect channels into a cart, save the cart, and apply promocodes.
- **Campaign creation**: a multi-step order wizard with a rich-text post editor (TipTap), media and file uploads, post buttons, comments for the blogger, and a calendar and time-slot picker for publication. It also has **AI post generation**.
- **Post templates**: reusable post drafts.
- **Order tracking**: watch each placement move through its stages (accept, check, publish, complete). You can replace a channel or post, leave feedback and view OFD fiscal receipts.
- **Turnkey service**: hand a whole campaign over to a Blogix manager.

### For bloggers
- **Channel management**: add, describe, set prices, activate or deactivate, delete and re-submit channels for moderation.
- **Offers**: accept or reject incoming orders, view posts, and send the publication link for verification.

### Shared
- **Wallet**: top-up, withdrawal and transaction history.
- **Legal entities and documents**: register an organization, sign contracts and orders with an electronic digital signature (EDS / E-IMZO certificates), and use electronic document flow (EDO) through Didox.
- **Real-time communication**: chat and notifications over WebSockets (Centrifugo).
- **Authentication**: login and password, Google OAuth, and Telegram Web App role handoff.
- **FAQ, guides, public offer and service rules** pages.
- **Maintenance mode**: a feature flag that replaces the app with a maintenance screen.

### Admin panel (`/admin/*`)
Back-office tools for moderators and managers: users and user groups, organizations, channels (moderation and owner swap), transactions and accounting (payout reports in Excel), reviews, complaints, documents, mailing, and order operations (transfer, update, publish, complete projects, manage projects).

---

## User roles

Roles are defined in [src/entities/user/config/roles.ts](src/entities/user/config/roles.ts):

| Role         | Description                                       |
| ------------ | ------------------------------------------------- |
| `advertiser` | Buys ad placements and runs campaigns             |
| `blogger`    | Owns channels and sells ad placements             |
| `manager`    | Platform staff with access to the admin panel     |
| `moderator`  | Platform administrator / moderator                |
| `agency`     | Agency account, a management-level role           |

`advertiser` and `blogger` are the user-facing roles, and a user can switch between them. The other three are management roles.

---

## Tech stack

| Area               | Libraries                                                                 |
| ------------------ | ------------------------------------------------------------------------- |
| Core               | React 18, TypeScript 5, Vite 6                                            |
| State and data     | Redux Toolkit, RTK Query, Axios                                           |
| Routing            | React Router 6                                                            |
| Forms & validation | React Hook Form, Zod                                                      |
| UI                 | Tailwind CSS, SCSS modules, Radix UI (shadcn/ui-style components), Lucide and Solar icons |
| Animation          | Framer Motion / Motion, GSAP                                              |
| Rich text          | TipTap, markdown-it, Turndown                                             |
| Real-time          | Centrifuge (Centrifugo client), WebSocket bridge to E-IMZO                |
| Charts             | Recharts                                                                  |
| Documents          | react-pdf / pdfjs-dist, ExcelForge, JSZip, file-saver                     |
| Carousels          | Swiper, Embla Carousel                                                    |
| i18n               | i18next, react-i18next, HTTP backend and language detector                |
| Monitoring         | Sentry (`@sentry/react` + Vite plugin for source maps), Google Tag Manager |
| Testing            | Vitest, Testing Library, jsdom                                            |

---

## Getting started

### Prerequisites
- **Node.js 18+** (the Docker build uses `node:18-alpine`)
- **npm** (the repository ships a `package-lock.json`)

### Installation

```bash
git clone https://github.com/Cube-Development/Advertising-Platform-Frontend.git
cd Advertising-Platform-Frontend
npm ci
```

Create a `.env` file in the project root (see [Environment variables](#environment-variables)), then start the dev server:

```bash
npm run dev
```

The dev server listens on all interfaces (`host: true`), so you can open it from other devices on your network. This is useful when testing inside Telegram.

---

## Environment variables

All variables are read at **build time** through `import.meta.env`.

| Variable                      | Required | Description                                                          |
| ----------------------------- | :------: | -------------------------------------------------------------------- |
| `VITE_BASE_URL`               |   yes    | Base URL of the Blogix backend REST API                              |
| `VITE_BASE_WS_URL`            |   yes    | Centrifugo WebSocket URL for chat and notifications                  |
| `VITE_BASE_DIDOX_URL`         |   yes    | Didox (EDO) API base URL                                             |
| `VITE_BASE_DIDOX_URL_2`       |   yes    | Secondary Didox API base URL                                         |
| `VITE_PUBLIC_OFFER_FILE_URL`  |   yes    | Link to the public offer document                                    |
| `VITE_SERVICE_RULES_FILE_URL` |   yes    | Link to the service rules document                                   |
| `VITE_AI_BASE_URL`            |    no    | Override for the AI post-generation service (a built-in default is used otherwise) |
| `VITE_IS_MAINTENANCE`         |    no    | Set to `"true"` to show the maintenance page instead of the app      |
| `SENTRY_AUTH_TOKEN`           |    no    | Sentry token used at build time to upload source maps                |

Example `.env`:

```dotenv
VITE_BASE_URL=https://api.example.com
VITE_BASE_WS_URL=wss://ws.example.com/connection/websocket
VITE_BASE_DIDOX_URL=https://didox.example.com
VITE_BASE_DIDOX_URL_2=https://didox2.example.com
VITE_PUBLIC_OFFER_FILE_URL=https://cdn.example.com/public_offer.pdf
VITE_SERVICE_RULES_FILE_URL=https://cdn.example.com/service_rules.pdf
VITE_IS_MAINTENANCE=false
```

> Never commit real secrets. `.env` files are for local development only. In CI, values come from GitHub Actions secrets.

---

## Available scripts

| Command           | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| `npm run dev`     | Start the Vite dev server with HMR                                       |
| `npm run build`   | Format the code with Prettier, type-check with `tsc`, and build to `dist/` |
| `npm run preview` | Serve the production build locally                                       |
| `npm run lint`    | Run ESLint (fails on any warning)                                        |
| `npm run format`  | Format `src/**` and `public/**/*.json` with Prettier                     |
| `npm test`        | Run unit tests with Vitest                                               |

---

## Project structure

The codebase follows **[Feature-Sliced Design (FSD)](https://feature-sliced.design/)**. A layer may import only from the layers below it:

```
app → pages → widgets → features → entities → shared
```

```
src/
├── app/            # App initialization
│   ├── providers/  #   HOC providers: store, websocket, telegram, tooltip, height
│   ├── router/     #   Route config, protected routes, maintenance switch
│   └── chat-actions/
├── pages/          # Route-level pages (Catalog, Cart, CreateOrder, Admin*, …)
├── widgets/        # Composite UI blocks (layouts, catalog, cart, adminPanel, …)
├── features/       # User interactions (addToBasket, applyPromocode, acceptOffer, …)
├── entities/       # Business entities with API, store, types, UI
│                   #   (user, channel, offer, project, wallet, organization, documents, …)
├── components/     # Third-party UI kits (kibo-ui)
├── shared/         # Reusable, business-agnostic code
│   ├── api/        #   RTK Query base APIs: blogix, epc (Didox), centrifuge, cryptoapi (E-IMZO)
│   ├── config/     #   i18n, cookies, animation and app constants
│   ├── hooks/      #   Generic hooks (debounce, infinite scroll, screen width, …)
│   ├── routing/    #   Path enums and route types
│   ├── ui/         #   UI kit (buttons, inputs, modals, selects, pagination, …)
│   ├── styles/     #   Global SCSS, variables, mixins
│   └── utils/      #   Helpers (HTML sanitizer, formatting, …)
├── test/           # Vitest setup
└── main.tsx        # Entry point
public/
├── locales/        # Translation files (ru, en, uz)
├── fonts/, images/, animated/, pwa/
```

### Path aliases

Configured in [vite.config.ts](vite.config.ts) and [tsconfig.json](tsconfig.json):

| Alias        | Path             |
| ------------ | ---------------- |
| `@app`       | `src/app`        |
| `@pages`     | `src/pages`      |
| `@widgets`   | `src/widgets`    |
| `@features`  | `src/features`   |
| `@entities`  | `src/entities`   |
| `@shared`    | `src/shared`     |

Each slice exposes a public API through its `index.ts`. Import from the slice root (`@entities/user`), not from its internal files.

---

## Architecture notes

- **Providers.** The root component is wrapped in a set of HOCs ([src/app/providers/index.tsx](src/app/providers/index.tsx)): Redux store, Centrifugo WebSocket, viewport height, tooltip, and Telegram Web App initialization.
- **Data layer.** Server state is managed with **RTK Query**. [src/shared/api/blogix/baseApi.ts](src/shared/api/blogix/baseApi.ts) is the main backend API. It uses cookie credentials and a shared error-handling base query. Entities inject their endpoints into it, and cache invalidation relies on tags defined in [src/shared/api/tags.ts](src/shared/api/tags.ts).
- **E-signature.** [src/shared/api/cryptoapi](src/shared/api/cryptoapi) talks to the local E-IMZO agent over WebSocket. It lists the user's certificates and signs documents. [src/shared/api/epc](src/shared/api/epc) integrates with Didox for electronic document flow.
- **Real-time.** [src/shared/api/centrifuge](src/shared/api/centrifuge) provides a Centrifugo client context that chat and notifications use.
- **Telegram Web App.** When the app is opened inside Telegram, it expands the web view, enables closing confirmation, and can take the user role from the `telegram_role` query parameter.
- **Build chunks.** Heavy vendors are split into separate chunks: UI, Sentry, editor, PDF, charts and sliders. Source maps are generated and uploaded to Sentry.
- **PWA.** A Web App Manifest is prepared in `vite.config.ts`. The `vite-plugin-pwa` integration is currently turned off.

---

## Routing

Paths are declared in [src/shared/routing/path.enum.ts](src/shared/routing/path.enum.ts), and routes are configured in [src/app/router](src/app/router). Protected routes check authentication and role before rendering.

Main paths:

| Path                                  | Page                                 |
| ------------------------------------- | ------------------------------------ |
| `/`, `/blogger`                       | Landing pages for advertisers and bloggers |
| `/catalog`, `/cart`                   | Channel catalog and cart             |
| `/createorder`, `/post_templates`     | Campaign creation and post templates |
| `/orders`, `/project/:project_id`     | Advertiser orders and project details |
| `/channels`, `/channel/:id`, `/addchannel` | Blogger channels                |
| `/offers`, `/track-orders`            | Incoming offers and order tracking   |
| `/wallet/topup`, `/wallet/withdraw`, `/wallet/history` | Wallet              |
| `/documents`, `/profile`              | Documents and profile                |
| `/turnkey`                            | Turnkey campaign service             |
| `/login`, `/registration`, `/oauth-callback` | Authentication                |
| `/faq`, `/guide/:guide_id`, `/public_offer`, `/service_rules` | Information pages |
| `/admin/*`                            | Admin panel                          |

---

## Internationalization

Translations live in `public/locales/{ru,en,uz}`. They are loaded at runtime by `i18next-http-backend`, and the language is detected automatically. Russian is the primary language. Configuration is in [src/shared/config/i18n.ts](src/shared/config/i18n.ts) and [src/shared/languages](src/shared/languages).

To add a string, put the key into every locale file and use it with `useTranslation()`:

```tsx
const { t } = useTranslation();
return <span>{t("catalog.title")}</span>;
```

---

## Testing

Unit tests use **Vitest** with the jsdom environment and global test APIs. The setup file is [src/test/setup.ts](src/test/setup.ts). Test files sit next to the code they cover, as `*.test.ts`:

```bash
npm test               # watch mode
npx vitest run         # single run (CI)
```

---

## Docker & deployment

The [dockerfile](dockerfile) uses a multi-stage build:

1. **Build stage** (`node:18-alpine`): runs `npm ci`, receives the `VITE_*` values as build args, then runs `npm run build`.
2. **Runtime stage** (`nginx`): serves `dist/` with an SPA fallback to `index.html` ([nginx.conf](nginx.conf)).

```bash
docker build \
  --build-arg VITE_BASE_URL=... \
  --build-arg VITE_BASE_WS_URL=... \
  --build-arg VITE_BASE_DIDOX_URL=... \
  --build-arg VITE_BASE_DIDOX_URL_2=... \
  --build-arg VITE_PUBLIC_OFFER_FILE_URL=... \
  --build-arg VITE_SERVICE_RULES_FILE_URL=... \
  -t blogix-frontend .

docker run -p 8080:80 blogix-frontend
```

### CI/CD

GitHub Actions workflows in [.github/workflows](.github/workflows) build the image, push it to Docker Hub with a timestamp tag, and roll it out to Kubernetes with `kubectl set image`:

| Branch | Workflow                                     | Environment |
| ------ | -------------------------------------------- | ----------- |
| `dev`  | [dep.yaml](.github/workflows/dep.yaml)       | Development |
| `main` | [deploy.yml](.github/workflows/deploy.yml)   | Production  |

Build values and the kubeconfig are stored as repository secrets.

### Branching

- `dev`: the integration branch. Every push deploys to the development environment.
- `main`: production. Changes reach it through pull requests from `dev`.

---

## Code style

- **TypeScript** in strict mode. Keep components typed and avoid `any`.
- **ESLint** with `@typescript-eslint`, `react-hooks` and `react-refresh`. `npm run lint` must pass with zero warnings.
- **Prettier** runs automatically as part of `npm run build`.
- Follow FSD layer boundaries and import through the slices' public APIs.
- Styling: use Tailwind utilities for layout. Use SCSS modules (`*.module.scss`) for component-specific styles.

---

© Blogix. All rights reserved.
