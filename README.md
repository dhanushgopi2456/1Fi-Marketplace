# 💳 1Fi MARKETPLACE

<p align="center">

### **Invest. Unlock Credit. Shop Smarter.**

**Next-generation e-commerce powered by Mutual Fund-backed credit lines and flexible EMI financing.**

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&pause=1000&color=6366F1&center=true&vCenter=true&width=850&lines=Shop+Premium+Products+%F0%9F%9B%8D%EF%B8%8F;Unlock+Credit+Against+Mutual+Funds+%F0%9F%92%B0;Choose+Flexible+EMIs+%F0%9F%93%86;Track+Your+Repayments+%F0%9F%93%8A;Built+for+Modern+Fintech+%E2%9A%A1" />

</p>

<p align="center">

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>

</p>

<p align="center">

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white"/>
<img src="https://img.shields.io/badge/Vercel-Ready-black?style=for-the-badge&logo=vercel"/>

</p>

---

# 💡 What Is 1Fi Marketplace?

**1Fi Marketplace** is a full-stack e-commerce and fintech platform that combines online shopping with a mutual-fund-backed credit experience.

Instead of requiring users to liquidate their investments to fund a purchase, the platform models a workflow where eligible mutual-fund holdings can support a credit limit through digital lien verification.

### The idea in one flow:

```text id="v6y2xk"
                  👤 USER
                     │
                     ▼
             🔐 KYC / ONBOARDING
                     │
                     ▼
             📊 MUTUAL FUND DATA
                     │
                     ▼
              🔗 DIGITAL LIEN
                     │
                     ▼
              💳 CREDIT LIMIT
                     │
                     ▼
               🛍️ SHOPPING
                     │
                     ▼
              📱 SELECT PRODUCT
                     │
                     ▼
             📆 CHOOSE EMI PLAN
                     │
                     ▼
                 💳 CHECKOUT
                     │
                     ▼
              📊 REPAYMENT DASHBOARD
```

---

# 🌟 The 1Fi Experience

1Fi brings **fintech + e-commerce** together in one application.

```text id="g9z0ml"
             💰 MUTUAL FUND PORTFOLIO
                       │
                       ▼
                🔐 DIGITAL LIEN
                       │
                       ▼
                 💳 CREDIT LINE
                       │
                       ▼
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
     📱 Phones     💻 Electronics   🏠 Appliances
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                 📆 EMI PLAN
                       │
                       ▼
                🛒 CHECKOUT
                       │
                       ▼
               📊 REPAYMENTS
```

---

# ✨ Key Features

| 🚀 Module                 | What It Provides                                             |
| ------------------------- | ------------------------------------------------------------ |
| 💰 **Mutual Fund Credit** | Credit-limit workflow based on eligible portfolio value      |
| 🔗 **Digital Lien**       | CAMS / KFintech-oriented lien verification workflow          |
| 📆 **Flexible EMI**       | 3, 6, 9, 12, 18 and 24-month plans                           |
| 🛍️ **Marketplace**       | Smartphones, electronics, appliances and lifestyle products  |
| 🔎 **Smart Search**       | Search across names, brands, categories and descriptions     |
| 🎛️ **Advanced Filters**  | Category, brand, price, tenure and zero-interest eligibility |
| 🎨 **Product Variants**   | Color, storage, pricing and stock availability               |
| 🔐 **Authentication**     | Email authentication and OTP verification                    |
| 🧾 **KYC Onboarding**     | Simulated onboarding and portfolio valuation                 |
| 📊 **Loan Dashboard**     | Active loans, installments and pledged-fund information      |
| 💳 **Repayments**         | UPI, Netbanking and Debit Card repayment flows               |
| ⚡ **Serverless Ready**    | Vercel API deployment architecture                           |
| 🔒 **Secret Protection**  | Environment variables excluded from Git                      |

---

# 💳 Mutual Fund → Credit → Shopping

The core concept of the application can be visualized as:

```text id="q7x1rs"
┌──────────────────────┐
│  📊 MUTUAL FUNDS     │
│                      │
│  Portfolio NAV       │
│  Eligible Holdings   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  🔗 DIGITAL LIEN     │
│                      │
│  Verification        │
│  Pledge Workflow     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  💳 CREDIT LIMIT     │
│                      │
│  Approved Amount     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  🛍️ MARKETPLACE      │
│                      │
│  Products + EMI      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  📆 REPAYMENT        │
│                      │
│  EMI Schedule        │
│  Due Dates           │
└──────────────────────┘
```

> **Prototype note:** The README describes CAMS/KFintech lien verification and financing workflows. Actual financial integrations, eligibility decisions, lien creation, KYC, payment processing, and credit issuance would require the relevant production integrations, approvals, and compliance controls.

---

# 🛍️ Premium Product Marketplace

The shopping experience supports a modern multi-variant catalog.

### Product discovery

```text id="xq1jga"
🔎 SEARCH
   │
   ├── Product Name
   ├── Brand
   ├── Category
   └── Description
   │
   ▼
🎛️ FILTER
   │
   ├── Category
   ├── Brand
   ├── Price
   ├── EMI Tenure
   └── 0% Interest
   │
   ▼
📱 PRODUCT
   │
   ├── Color
   ├── Storage
   ├── Price
   └── Live Stock
```

---

# 📱 Product Experience

Each product can support multiple variants.

```text id="u5h6am"
             📱 PRODUCT
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
   🎨 COLOR   💾 STORAGE   💰 PRICE
      │          │          │
      └──────────┼──────────┘
                 ▼
            📦 STOCK
                 │
                 ▼
             📆 EMI PLAN
                 │
                 ▼
              🛒 CART
```

---

# 📆 Flexible EMI Engine

The marketplace supports multiple financing tenures:

**3 → 6 → 9 → 12 → 18 → 24 months**

Users can view:

* Monthly installment
* Total payable amount
* Tenure
* Zero-cost EMI eligibility
* Cashback/reward information

```text id="f1l1v2"
┌─────────────────────────────────────────────┐
│             📆 EMI OPTIONS                  │
├────────────┬──────────────┬─────────────────┤
│ 3 Months   │ 6 Months     │ 9 Months        │
│ ₹XX,XXX/mo │ ₹XX,XXX/mo   │ ₹XX,XXX/mo      │
├────────────┼──────────────┼─────────────────┤
│ 12 Months  │ 18 Months    │ 24 Months       │
│ ₹XX,XXX/mo │ ₹XX,XXX/mo   │ ₹XX,XXX/mo      │
└────────────┴──────────────┴─────────────────┘
```

---

# 🔐 Authentication & Onboarding

The onboarding flow combines account creation with the application's simulated financial verification workflow.

```text id="d2y7tt"
                   👤 NEW USER
                       │
                       ▼
                  📝 REGISTER
                       │
                       ▼
                   📱 OTP
                       │
                       ▼
                 🔍 KYC FLOW
                       │
                       ▼
              📊 PORTFOLIO CHECK
                       │
                       ▼
                🔗 LIEN VALUATION
                       │
                       ▼
                💳 CREDIT PROFILE
```

### Available authentication paths

* 📝 New user registration
* 📱 6-digit OTP verification
* 📧 Email sign-in
* ⚡ One-click demo login

---

# 📊 Active Loan Dashboard

Once a user has an active financing plan, the dashboard provides a centralized view of repayment information.

```text id="6slp0p"
┌───────────────────────────────────────────────┐
│              💳 MY FINANCING                 │
├───────────────────────────────────────────────┤
│                                               │
│  Active Credit       ₹XX,XXX                  │
│  Remaining           ₹XX,XXX                  │
│  Next EMI            ₹X,XXX                   │
│  Due Date            DD/MM/YYYY               │
│                                               │
├───────────────────────────────────────────────┤
│              📆 REPAYMENT PLAN                │
│                                               │
│  ● Paid       ● Upcoming       ● Current      │
│                                               │
└───────────────────────────────────────────────┘
```

Users can review:

* Active pledged loans
* Next due date
* Remaining installments
* Pledged fund details
* EMI repayment options

---

# 💳 Repayment Experience

The repayment modal supports the project's documented payment-flow options:

```text id="z7x3sk"
                 💳 REPAY EMI
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
        UPI      Netbanking   Debit Card
          │          │          │
          └──────────┼──────────┘
                     ▼
                 ✅ PAYMENT
                     │
                     ▼
              📊 UPDATED LOAN
```

---

# 🧠 Application Architecture

```text id="k6l3nb"
                         👤 USER
                           │
                           ▼
                ┌──────────────────────┐
                │    React 19 + Vite   │
                │                      │
                │ 🛍️ Marketplace       │
                │ 📱 Products          │
                │ 💳 EMI               │
                │ 🔐 Authentication    │
                │ 📊 Dashboard         │
                └──────────┬───────────┘
                           │
                       REST API
                           │
                           ▼
                ┌──────────────────────┐
                │ Express.js Backend   │
                │                      │
                │ Auth                 │
                │ Products             │
                │ Orders               │
                │ EMI                  │
                │ Portfolio            │
                │ Repayments           │
                └──────────┬───────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Prisma    │
                    │     ORM     │
                    └──────┬──────┘
                           │
                           ▼
                🍃 SQLite / PostgreSQL
```

---

# 🛠️ Technology Stack

### 🎨 Frontend

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| ⚛️ React 19        | UI                        |
| ⚡ Vite             | Development/build tooling |
| 🟦 TypeScript      | Type safety               |
| 🎨 Tailwind CSS v4 | Styling                   |
| 🎬 Motion          | Animations                |
| 🎯 Lucide          | Interface icons           |
| 🧭 Wouter          | Lightweight routing       |

### ⚙️ Backend

| Technology    | Purpose                    |
| ------------- | -------------------------- |
| 🟢 Node.js    | Runtime                    |
| 🚂 Express.js | REST API                   |
| 🔷 Prisma     | ORM                        |
| 🗄️ SQLite    | Local development          |
| 🐘 PostgreSQL | Production database option |
| ▲ Vercel      | Serverless deployment      |

---

# 🏗️ Data Model

The application is organized around several core entities:

```text id="o0k9fj"
                         DATABASE
                            │
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
       👤 USER          🛍️ PRODUCT         💳 EMI PLAN
          │                 │                 │
          │                 ▼                 │
          │          📱 PRODUCT VARIANT       │
          │                                   │
          └────────────────┬──────────────────┘
                           ▼
                        📦 ORDER
                           │
                           ▼
                      💳 FINANCING
                           │
                           ▼
                    📆 REPAYMENTS
```

The documented Prisma schema includes models for users, products, product variants, EMI plans, and orders.

---

# 📂 Project Structure

```text id="s2hz8x"
1Fi-Marketplace/
│
├── 📡 api/
│   └── index.ts
│
├── 🗄️ prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── dev.db
│
├── 🎨 src/
│   ├── components/
│   ├── context/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
│
├── ⚙️ lib/
├── 🚂 serverApp.ts
├── 🚀 server.ts
├── ▲ vercel.json
├── 📝 .env.example
└── 📦 package.json
```

---

# 🔄 Full User Journey

```text id="3f7v2a"
              👤 SIGN UP
                  │
                  ▼
              📱 VERIFY OTP
                  │
                  ▼
              🔍 KYC FLOW
                  │
                  ▼
          📊 MUTUAL FUND CHECK
                  │
                  ▼
            💳 CREDIT PROFILE
                  │
                  ▼
             🛍️ BROWSE
                  │
                  ▼
            📱 SELECT PRODUCT
                  │
                  ▼
             📆 SELECT EMI
                  │
                  ▼
                🛒 CART
                  │
                  ▼
              💳 CHECKOUT
                  │
                  ▼
               📦 ORDER
                  │
                  ▼
          📊 REPAYMENT DASHBOARD
```

---

# 🚀 Quick Start

```bash
# Clone
git clone <YOUR_REPOSITORY_URL>

# Enter project
cd 1Fi-Marketplace

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Create database
npx prisma db push

# Seed catalog
npm run seed

# Start development
npm run dev
```

Open:

### 🌐 `http://localhost:3000`

---

# ⚡ Development Workflow

```text id="y4s3zt"
       💻 CODE
         │
         ▼
     📝 TYPECHECK
         │
         ▼
       🧪 TEST
         │
         ▼
    🏗️ PRODUCTION BUILD
         │
         ▼
      ▲ VERCEL
         │
         ▼
      🌐 LIVE APP
```

---

# ☁️ Vercel Deployment

The application includes a Vercel configuration and serverless API entry point.

```text id="f93z7g"
                    ▲ VERCEL
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
    🎨 VITE FRONTEND          📡 SERVERLESS API
                                    │
                                    ▼
                               🗄️ DATABASE
                                    │
                              PostgreSQL /
                              Cloud Database
```

### Production build

```bash
npm run vercel-build
```

The documented Vercel flow uses:

```text
prisma generate → vite build → dist/
```

---

# 🔒 Security & Configuration

Environment secrets should remain outside source control.

```gitignore
.env
.env.*
.env.local
!.env.example
```

### Example development configuration

```env
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
GEMINI_API_KEY=""
```

For production, configure the database and application secrets through the hosting provider's environment-variable system rather than committing credentials.

---

# 🧪 Available Scripts

| Command                | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Start full-stack development server       |
| `npm run build`        | Generate Prisma client + production build |
| `npm run vercel-build` | Vercel production build                   |
| `npm run start`        | Start compiled production server          |
| `npm run seed`         | Seed products, variants and EMI plans     |
| `npm run lint`         | TypeScript checks                         |
| `npm run clean`        | Remove build artifacts                    |

---

# 📈 What This Project Demonstrates

```text
                 FULL-STACK FINTECH ENGINEERING
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   🎨 FRONTEND            ⚙️ BACKEND           💳 FINTECH
        │                     │                     │
     React 19              Express              Credit Flow
     TypeScript            REST API             EMI Plans
     Tailwind              Prisma               Lien Workflow
     Vite                   Auth                 Repayments
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
                       🛍️ E-COMMERCE
                              │
                 ┌────────────┼────────────┐
                 ▼            ▼            ▼
              Products      Orders       Checkout
```

---

# 💡 Why 1Fi Marketplace?

This project goes beyond a conventional e-commerce application.

It demonstrates how a modern product can combine:

**🛍️ E-Commerce**

**💳 Financial workflows**

**📊 Portfolio-backed credit concepts**

**📆 EMI management**

**🔐 Authentication**

**🗄️ Relational data modeling**

**⚡ Serverless deployment**

**🎨 Modern frontend engineering**

into one cohesive platform.

---

# 🗺️ Future Roadmap

### ✅ Current

* [x] Product marketplace
* [x] Product variants
* [x] Advanced filtering
* [x] Search
* [x] EMI plans
* [x] Authentication
* [x] OTP simulation
* [x] Demo login
* [x] Financing dashboard
* [x] Repayment UI
* [x] Prisma ORM
* [x] Vercel configuration

### 🔮 Future

* [ ] 🔗 Production CAMS integration
* [ ] 🔗 Production KFintech integration
* [ ] 🪪 Real KYC provider integration
* [ ] 💳 Production payment gateway
* [ ] 🔐 Stronger transaction authentication
* [ ] 📊 Advanced portfolio analytics
* [ ] 🤖 AI shopping assistant
* [ ] 📱 Mobile application
* [ ] 🔔 EMI reminders
* [ ] 📈 Credit utilization analytics
* [ ] 🧾 Automated financial statements

---

# ⚠️ Prototype & Compliance Note

This repository demonstrates the **technical product architecture and user experience** for mutual-fund-backed financing.

The documented CAMS/KFintech, lien, credit-limit, KYC, EMI, and repayment flows should be treated as **prototype/simulated functionality unless backed by actual authorized financial integrations**.

A production financial product would require appropriate regulatory, lending, KYC/AML, data-security, payment, and partner-integration controls.

---

# 🎯 Project Goal

> **Turn existing investments into a smarter shopping experience — without making the customer journey unnecessarily complicated.**

**1Fi Marketplace connects investment-backed financing concepts with modern e-commerce to create a single, seamless shopping and repayment experience.**

---

<p align="center">

## 💳 Invest. Unlock Credit. Shop Smarter.

**Built with ❤️ using React • TypeScript • Express • Prisma • Vite**

⭐ **Star the repository if you like the project!**

</p>

---

## 📄 License

This project is available under the **MIT License**.
