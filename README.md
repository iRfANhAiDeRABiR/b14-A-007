# 🛒 BazarDor — বাজার দর

**BazarDor (বাজার দর)** is a responsive Bengali-language daily market-price tracking web application that helps users check and compare everyday essential commodity prices across markets in Bangladesh. Users can browse live product categories, monitor daily price risers and fallers, sort commodities by price in Bengali numerals, and view market-by-market price breakdowns.

> **Note:** BazarDor is a **daily market-price information platform** for tracking commodity prices—it is not an e-commerce store or online payment platform.

---

## 📖 A. Project Overview

In everyday life, tracking fluctuating prices of essential commodities such as rice (চাল), lentils (ডাল), cooking oil (তেল), vegetables (সবজি), fish (মাছ), meat, eggs, and spices can be difficult for consumers. **BazarDor (বাজার দর)** provides a clean, Bengali-first interface where citizens, shoppers, and researchers can:

- View today's market prices at a glance with Bengali digits (`৳`) and units (`প্রতি কেজি`, `প্রতি লিটার`, `প্রতি ডজন`, `প্রতি পিস`).
- Identify which items increased (`আজ দাম বেড়েছে ▲`) or decreased (`আজ দাম কমেছে ▼`) in price today.
- Filter commodities by category and sort them from lowest to highest or highest to lowest price.
- Sign in to inspect detailed product price summaries (minimum, maximum, and average prices) along with market-specific (`বাজারভিত্তিক আজকের দাম`) price comparisons.

---

## ✨ B. Key Features

1. **Live API-Driven Market Data with Multi-Endpoint Fallback:** Fetches real-time commodity and category data from the BazarDor API with automatic fallback across backup endpoints and 5-minute ISR revalidation.
2. **Animated Live Price Ticker (Marquee):** Displays a continuous scrolling strip below the navbar with product emojis, Bengali names, current prices, and percentage change badges (`▲` / `▼`).
3. **Today's Top 6 Price Risers & Fallers:** Highlights the top 6 commodities whose prices increased (`আজ দাম বেড়েছে`) and the top 6 whose prices decreased (`আজ দাম কমেছে`) on the homepage.
4. **Dynamic Category Browsing:** Dedicated category pages (`/category/[slug]`) with active category highlighting in both desktop and mobile navigation bars.
5. **Accurate Numeric Price Sorting with Bengali Formatting:** Supports sorting category products by default (`ডিফল্ট`), price low-to-high (`দাম: কম থেকে বেশি`), and price high-to-low (`দাম: বেশি থেকে কম`) using true numeric comparison while displaying Bengali numerals.
6. **Protected Product Details & Market Breakdown:** Server-protected `/product/[slug]` route showing product summary, minimum/maximum/average price cards, and bazar-wise price comparisons (`বাজারভিত্তিক আজকের দাম`).
7. **Complete Authentication with Better Auth & MongoDB:** Supports email/password registration and login, plus Google and GitHub OAuth social login when OAuth credentials are configured.
8. **Session-Aware Navbar Profile Dropdown:** Displays a compact user avatar, short name, and dropdown menu with full name, email, `আমার প্রোফাইল` link, and `সাইন আউট` action.
9. **Protected User Profile & Display Name Update:** Authenticated users can view their account details at `/profile` and update their display name at `/profile/update` using Better Auth's official `authClient.updateUser({ name })` API.
10. **Comprehensive UX Polish — Skeletons, Toasts, Error Boundaries & Custom 404:** Includes route-level skeleton loaders, Bengali toast notifications (`react-hot-toast`), retryable error boundaries, and custom Bengali 404 pages for unknown routes, categories, and products.

---

## 🛠️ C. Technologies Used

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js (App Router)** | `16.4.0` | Server & client rendering, dynamic routing, and API route handlers |
| **React & React DOM** | `19.3.0` | Component architecture and interactive UI state |
| **TypeScript** | `^5` | Strict static type checking across API models, auth, and components |
| **Tailwind CSS** | `^4` | Utility-first responsive layout and custom Bengali theme styling |
| **HeroUI** | `^3.2.6` | Accessible UI primitives (`@heroui/react`, `@heroui/styles`) |
| **Gravity UI Icons** | `^2.22.0` | Clean vector icons (`@gravity-ui/icons`) |
| **Better Auth** | `^1.7.7` | Authentication server, React client, session management, and OAuth |
| **Better Auth Mongo Adapter** | `^1.7.7` | Official MongoDB adapter (`@better-auth/mongo-adapter`) |
| **MongoDB Node.js Driver** | `^7.7.0` | Database connection pooling and user/session persistence |
| **React Hot Toast** | `^2.6.1` | Bengali toast notifications for auth, profile updates, and redirects |
| **Hind Siliguri (`next/font/google`)** | Google Font | Primary Bengali & Latin typography |
| **BazarDor Public API** | REST JSON | Live daily commodity and category market price data |
| **Vercel** | Target Platform | Intended production hosting platform (Step 12) |

---

## 🧭 D. Application Routes

| Route | Purpose | Access |
| :--- | :--- | :--- |
| `/` | Homepage with hero banner, top 6 risers, top 6 fallers, and all products grid | Public |
| `/category/[slug]` | Category-specific product listing with price sorting (`default`, `price-asc`, `price-desc`) | Public |
| `/product/[slug]` | Detailed product price summary (min, max, average) and bazar-wise price list | **Protected (Login required)** |
| `/signin` | User Sign In page (Email/Password + Google & GitHub OAuth) | Public (Redirects if signed in) |
| `/signup` | User Registration page (Name, Email, Password + Google & GitHub OAuth) | Public (Redirects if signed in) |
| `/profile` | Authenticated user's profile overview and account details | **Protected (Login required)** |
| `/profile/update` | Form to update the authenticated user's display name via Better Auth | **Protected (Login required)** |
| `/api/auth/[...all]` | Better Auth catch-all API route handler | Public / Internal Auth API |

---

## 🚀 E. Installation & Local Setup Guide

Follow these steps to run **BazarDor** locally on your machine:

### 1. Clone the repository

```bash
git clone https://github.com/iRfANhAiDeRABiR/b14-A-007.git
cd b14-A-007
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your local environment file

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

*(On Windows PowerShell: `Copy-Item .env.example .env.local`)*

### 4. Configure environment variables

Open `.env.local` and provide your MongoDB connection string, Better Auth secret, and optional Google/GitHub OAuth credentials (see Section F below).

### 5. Start the development server

```bash
npm run dev
```

### 6. Open in browser

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔐 F. Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Required — MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
MONGODB_DB_NAME=bazardor

# Required — Better Auth Configuration
BETTER_AUTH_SECRET=your_generated_32_char_minimum_secret_here
BETTER_AUTH_URL=http://localhost:3000

# Optional — Google OAuth Provider
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Optional — GitHub OAuth Provider
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Optional — BazarDor Public API Base URL Override
BAZARDOR_API_BASE_URL=https://openapi.programming-hero.com/api/bazardor
```

### Variable Reference

- **`MONGODB_URI`** *(Required)*: MongoDB connection string (`mongodb://` or `mongodb+srv://`).
- **`MONGODB_DB_NAME`** *(Required, default: `bazardor`)*: Database name used by Better Auth and MongoDB client.
- **`BETTER_AUTH_SECRET`** *(Required)*: Secret key (minimum 16 characters, recommended 32+ characters) used to sign and encrypt session tokens. Generate one securely with:
  ```bash
  openssl rand -base64 32
  ```
- **`BETTER_AUTH_URL`** *(Required in production, defaults to `http://localhost:3000` in development)*: Canonical base URL of the application.
- **`GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`** *(Optional)*: Enables Google OAuth login when both values are provided.
- **`GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`** *(Optional)*: Enables GitHub OAuth login when both values are provided.
- **`BAZARDOR_API_BASE_URL`** *(Optional)*: Overrides the primary BazarDor API base URL if needed.

> **Security Warning:** Never commit `.env.local` or real credentials to Git.

---

## 🌐 G. Public API Information

BazarDor consumes live market data from the Programming Hero BazarDor public API, with automatic failover to mirror endpoints if the primary endpoint times out or returns an error.

- **Primary Base URL:** `https://openapi.programming-hero.com/api/bazardor`
- **Fallback Base URLs:**
  - `https://api.abcz.workers.dev/api/bazardor`
  - `https://api.api-store.workers.dev/api/bazardor`

### Consumed Endpoints

| Endpoint | Description |
| :--- | :--- |
| `GET /products` | Fetches all commodities with current/previous prices, units, category info, and market lists |
| `GET /products?category=chal` | Fetches commodities filtered by a specific category slug |
| `GET /products/1` | Fetches a single commodity by its numeric ID |
| `GET /categories` | Fetches all commodity categories with Bengali names, slugs, and icons |
| `GET /categories/chal` | Fetches metadata for a single category by slug |

---

## 🛡️ H. Authentication & Authorization Flow

Authentication is powered by **Better Auth** (`better-auth` + `@better-auth/mongo-adapter`) backed by **MongoDB**:

1. **Email & Password Registration (`/signup`):** Validates name, email, password (minimum 8 characters), and password confirmation. Upon registration, clears any auto-session, shows a Bengali success toast, and navigates the user to `/signin`.
2. **Email & Password Sign In (`/signin`):** Authenticates credentials, displays Bengali toast feedback, and redirects the user to their intended destination (`callbackUrl`) or `/`.
3. **Google & GitHub Social Login:** Dynamically enabled on the server when `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` and/or `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET` are configured.
4. **Server-Side Route Protection:** Protected pages (`/product/[slug]`, `/profile`, `/profile/update`) validate the user's session on the server via `getServerSessionResult()` using `auth.api.getSession({ headers })`. Unauthenticated visitors are redirected to `/signin?callbackUrl=...&reason=auth_required`.
5. **Open-Redirect Protection:** All `callbackUrl` parameters are validated through `resolveSafeCallbackUrl()` to allow only internal relative paths and block external or protocol-relative URLs.
6. **Profile Name Update (`/profile/update`):** Uses Better Auth's official `authClient.updateUser({ name })` method to persist display name changes directly in MongoDB and refresh session state across the Navbar and Profile page.
7. **Sign Out:** Invokes `await authClient.signOut()` from the Navbar profile dropdown or Profile card, invalidating the session cookie, showing a Bengali toast, and redirecting to `/`.

*(Note: Email verification and forgot-password flows are intentionally disabled in accordance with assignment guidelines so evaluators can test accounts immediately.)*

---

## 📁 I. Project Structure

```text
bazar-dor/
├── public/
│   ├── images/
│   │   ├── bazar-hero.png
│   │   └── logo-icon.png
│   ├── bazar-hero.png
│   └── logo-icon.png
├── src/
│   ├── app/
│   │   ├── api/auth/[...all]/route.ts   # Better Auth API route handler
│   │   ├── category/[slug]/             # Dynamic category page, loading & 404
│   │   ├── product/[slug]/              # Protected product detail page, loading & 404
│   │   ├── profile/                     # Protected profile & /profile/update routes
│   │   ├── signin/page.tsx              # Sign In route
│   │   ├── signup/page.tsx              # Sign Up route
│   │   ├── error.tsx                    # Global runtime error boundary
│   │   ├── globals.css                  # Tailwind CSS v4 & HeroUI styles
│   │   ├── layout.tsx                   # Root layout with Hind Siliguri font & Toaster
│   │   ├── loading.tsx                  # Homepage skeleton loader
│   │   ├── not-found.tsx                # Global custom Bengali 404 page
│   │   └── page.tsx                     # Homepage
│   ├── components/
│   │   ├── auth/                        # AuthLayout, SignInForm, SignUpForm, SocialAuthButtons
│   │   ├── categories/                  # CategoryHeader, CategoryProductExplorer, CategorySortSelect
│   │   ├── home/                        # HeroSection, PriceRisersSection, PriceFallersSection, AllProductsSection
│   │   ├── layout/                      # Header, BrandLogo, CategoryNav, AuthActions, MobileNavigation, PriceTicker, Footer
│   │   ├── products/                    # ProductCard, ProductGrid, ProductDetailHeader, PriceSummaryCards, MarketPriceList, Skeletons
│   │   ├── profile/                     # ProfileCard, ProfileAvatar, UpdateProfileForm
│   │   └── shared/                      # SectionHeading, EmptyState, ErrorState
│   ├── lib/
│   │   ├── api/bazardor.ts              # BazarDor API service & fallback client
│   │   ├── utils/                       # Bengali numeral formatters, price sorters, auth error & redirect helpers
│   │   ├── auth-client.ts               # Better Auth React client (useSession, signIn, signUp, signOut, updateUser)
│   │   ├── auth-session.ts              # Server-side Better Auth session validator
│   │   ├── auth.ts                      # Better Auth server configuration with MongoDB adapter
│   │   └── mongodb.ts                   # MongoDB connection pooling & replica-set detection
│   └── types/
│       └── market.ts                    # Normalized TypeScript interfaces for products, categories, and markets
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## ☁️ K. Production Deployment Readiness (Vercel)

This application uses Next.js Server Components, dynamic routes, Better Auth route handlers, and MongoDB, and is designed for deployment on **Vercel** (or any Node.js-compatible Next.js hosting provider):

1. **MongoDB Atlas Readiness:** Ensure your MongoDB Atlas cluster allows connections from Vercel's serverless runtime (`0.0.0.0/0` in Network Access) and that `MONGODB_URI` and `MONGODB_DB_NAME` are set in Vercel Environment Variables.
2. **Better Auth Production Variables:**
   - Set a strong `BETTER_AUTH_SECRET` (`openssl rand -base64 32`).
   - Set `BETTER_AUTH_URL` to your exact production HTTPS origin (e.g., `https://<your-production-domain>`).
3. **OAuth Callback URLs:** In Google Cloud Console and GitHub Developer Settings, add your production callback URLs:
   - **Google Redirect URI:** `https://ACTUAL-DOMAIN/api/auth/callback/google`
   - **GitHub Authorization Callback URL:** `https://ACTUAL-DOMAIN/api/auth/callback/github`
4. **Refresh-Safe Dynamic Routes:** Dynamic routes (`/category/[slug]`, `/product/[slug]`, `/profile`, `/profile/update`) are server-rendered on demand (`ƒ (Dynamic)`), ensuring direct URL visits and page reloads work without 404 errors after deployment.

---

## 🔗 L. Links

- **Live Website:** Not deployed yet *(will be deployed and updated in Step 12)*
- **GitHub Repository:** [https://github.com/iRfANhAiDeRABiR/b14-A-007](https://github.com/iRfANhAiDeRABiR/b14-A-007)
