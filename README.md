# 💳 1Fi Marketplace

<p align="center">
  <img src="https://img.shields.io/badge/1Fi-Marketplace-111827?style=for-the-badge&logo=shopify&logoColor=white" />
  <img src="https://img.shields.io/badge/FinTech-E--Commerce-7C3AED?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<p align="center">
  <strong>Next-Generation E-Commerce Powered by Mutual Fund-Backed Credit</strong>
</p>

<p align="center">
  Shop premium products, unlock credit against eligible mutual fund holdings,
  and manage flexible EMI repayments — without unnecessarily liquidating investments.
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-user-flow">User Flow</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-setup">Setup</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

# 🚀 Project Overview

**1Fi Marketplace** is a full-stack **e-commerce + fintech platform** designed around a mutual-fund-backed credit experience.

The platform combines:

🛍️ **Modern E-Commerce**

💳 **Asset-Backed Credit**

📱 **Premium Product Catalog**

📊 **EMI Management**

🔐 **Authentication & KYC**

📈 **Financial Dashboard**

☁️ **Cloud Deployment**

The core concept is simple:

```text
                 👤 USER
                    │
                    ▼
          ┌───────────────────┐
          │   Verify Identity │
          │   + Portfolio     │
          └─────────┬─────────┘
                    │
                    ▼
          ┌───────────────────┐
          │ Mutual Fund       │
          │ Portfolio Value   │
          └─────────┬─────────┘
                    │
                    ▼
          ┌───────────────────┐
          │ Credit Limit      │
          │ Calculation       │
          └─────────┬─────────┘
                    │
                    ▼
          ┌───────────────────┐
          │ Browse Products   │
          └─────────┬─────────┘
                    │
                    ▼
          ┌───────────────────┐
          │ Select EMI Plan   │
          └─────────┬─────────┘
                    │
                    ▼
          ┌───────────────────┐
          │ Place Order       │
          └─────────┬─────────┘
                    │
                    ▼
          ┌───────────────────┐
          │ Manage Repayment  │
          └───────────────────┘
```

---

# 💡 What Makes 1Fi Marketplace Different?

Traditional e-commerce generally separates shopping from financial services.

1Fi Marketplace combines both experiences into one application.

### 🛒 Shopping

Users can browse:

- 📱 Smartphones
- 💻 Electronics
- 🏠 Appliances
- 🎧 Lifestyle products
- 📦 Multiple product variants

### 💰 Financing

Eligible users can access a credit facility based on their mutual fund portfolio value.

### 📆 Repayment

Users can select supported EMI tenures and manage their active repayment plans from a dedicated dashboard.

---

# ✨ Key Features

## 💳 Mutual Fund-Backed Credit Line

The platform models a credit experience where eligible mutual fund holdings can be used as collateral through a digital lien concept.

```text
Mutual Fund Portfolio
        │
        ▼
Portfolio Valuation
        │
        ▼
Eligible Credit Limit
        │
        ▼
Shopping Power
```

The application supports an approved credit limit model of **up to 50% of portfolio NAV**, based on the application's configured rules.

> ⚠️ This project is a software demonstration. Actual lending, lien creation, KYC, and financial eligibility depend on real financial institutions, regulatory requirements, and production integrations.

---

# 🛍️ Advanced Product Marketplace

The marketplace provides a complete shopping experience.

### Product Discovery

Users can search and filter products using:

- 🔎 Product name
- 🏷️ Brand
- 📂 Category
- 💰 Price range
- 📆 EMI tenure
- 💳 Zero-interest eligibility

### Product Variants

Products can support multiple configurations such as:

```text
📱 Smartphone

├── Color
│   ├── Black
│   ├── Blue
│   └── Silver
│
├── Storage
│   ├── 128 GB
│   ├── 256 GB
│   └── 512 GB
│
└── Availability
    ├── In Stock
    └── Out of Stock
```

---

# 📆 Flexible EMI Experience

Supported example tenures include:

| Tenure | EMI Option |
|---:|---|
| 3 Months | ✅ |
| 6 Months | ✅ |
| 9 Months | ✅ |
| 12 Months | ✅ |
| 18 Months | ✅ |
| 24 Months | ✅ |

The interface can present:

```text
Product Price
      │
      ▼
Selected Tenure
      │
      ▼
Monthly EMI
      │
      ▼
Total Payable
      │
      ▼
Cashback / Benefits
```

The goal is to make repayment information easy to understand before checkout.

---

# 🔐 Authentication & Onboarding

The platform includes multiple authentication and onboarding concepts.

### Supported Flows

- 👤 New user registration
- 📧 Email sign-in
- 🔢 OTP verification
- 🪪 KYC-style onboarding
- 💳 Portfolio verification flow
- ⚡ Demo login

### Demo Experience

A pre-configured demo user can be used to explore the application without going through the complete onboarding process.

---

# 📊 Financial Dashboard

Users can view their financing information from a centralized dashboard.

### Dashboard Information

```text
┌───────────────────────────────────────┐
│          FINANCIAL OVERVIEW           │
├───────────────────────────────────────┤
│                                       │
│  💳 Available Credit                  │
│                                       │
│  📈 Portfolio Value                   │
│                                       │
│  🏦 Active Loan                       │
│                                       │
│  📅 Next EMI Due                      │
│                                       │
│  📊 Remaining Installments            │
│                                       │
└───────────────────────────────────────┘
```

Users can also view information about pledged/linked fund holdings associated with active financing.

---

# 💸 EMI Repayment

The repayment interface is designed to support multiple payment methods.

### Payment Options

- 📱 UPI
- 🏦 Net Banking
- 💳 Debit Card Mandates

Example flow:

```text
Active EMI
    │
    ▼
View Due Amount
    │
    ▼
Choose Payment Method
    │
    ├── UPI
    ├── Net Banking
    └── Debit Card
    │
    ▼
Confirm Payment
    │
    ▼
Repayment Updated
```

---

# 🧭 Complete User Journey

```text
                     START
                       │
                       ▼
                 🏠 Marketplace
                       │
                       ▼
                🔐 Authentication
                       │
                       ▼
                🪪 KYC / Verification
                       │
                       ▼
             💳 Credit Eligibility
                       │
                       ▼
                🛍️ Browse Products
                       │
                       ▼
                🔎 Product Details
                       │
                       ▼
                🎨 Select Variant
                       │
                       ▼
                 📆 Select EMI
                       │
                       ▼
                  🛒 Checkout
                       │
                       ▼
                 📦 Place Order
                       │
                       ▼
              📊 Loan Dashboard
                       │
                       ▼
                💰 EMI Repayment
                       │
                       ▼
                     END
```

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │       USER          │
                         │   Web Browser       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │                     │
                         │  • Marketplace      │
                         │  • Products         │
                         │  • Cart             │
                         │  • EMI              │
                         │  • Dashboard        │
                         │  • Authentication   │
                         └──────────┬──────────┘
                                    │
                              REST API
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Express Backend    │
                         │                     │
                         │  • Auth             │
                         │  • Products         │
                         │  • Orders           │
                         │  • EMI              │
                         │  • Users            │
                         │  • Portfolio        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Prisma ORM        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────┐
                    │       Database Layer         │
                    │                              │
                    │ SQLite Development           │
                    │ PostgreSQL Production        │
                    └─────────────────────────────┘
```

---

# 🧩 Application Architecture

```text
1Fi-Marketplace/
│
├── api/
│   └── index.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── dev.db
│
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── ProductCard/
│   │   ├── EmiPlanCard/
│   │   ├── Cart/
│   │   └── Dashboard/
│   │
│   ├── context/
│   │   ├── AuthContext
│   │   ├── CartContext
│   │   └── FilterContext
│   │
│   ├── pages/
│   │   ├── HomePage
│   │   ├── ProductListingPage
│   │   ├── ProductDetailPage
│   │   └── Dashboard
│   │
│   ├── lib/
│   │   └── utilities
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── lib/
│   └── Prisma utilities
│
├── serverApp.ts
├── server.ts
├── vercel.json
├── .env.example
├── .gitignore
└── package.json
```

---

# 🗄️ Database Design

The application uses **Prisma ORM** for database access.

Core entities include:

```text
                 ┌──────────────┐
                 │     User     │
                 └──────┬───────┘
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
       ┌─────────────┐       ┌─────────────┐
       │    Order    │       │   Portfolio │
       └──────┬──────┘       └─────────────┘
              │
              ▼
       ┌─────────────┐
       │ EMI / Loan  │
       └─────────────┘

       ┌─────────────┐
       │   Product   │
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │   Variant   │
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │   EMI Plan  │
       └─────────────┘
```

### Main Models

- 👤 User
- 🛍️ Product
- 🎨 ProductVariant
- 📆 EmiPlan
- 📦 Order

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| ⚛️ React 19 | UI development |
| 📘 TypeScript | Type-safe development |
| ⚡ Vite | Development and build tooling |
| 🎨 Tailwind CSS v4 | Styling |
| ✨ Motion | UI animations |
| 🧩 Lucide Icons | Interface icons |
| 🧭 Wouter | Lightweight routing |

## Backend

| Technology | Purpose |
|---|---|
| 🟢 Node.js | Runtime |
| 🚀 Express.js | REST API |
| 🔷 Prisma | ORM |
| 🗄️ SQLite | Local development database |
| 🐘 PostgreSQL | Production database option |

## Deployment

| Platform | Usage |
|---|---|
| ▲ Vercel | Production deployment |
| 🐳 Docker | Container compatibility |
| ☁️ Cloud Run | Deployment option |

---

# 🎨 UI / UX Highlights

The application focuses on a modern fintech-commerce experience.

### Visual Design

- ✨ Modern fintech interface
- 🧊 Card-based layouts
- 📱 Responsive design
- 🎞️ Smooth motion effects
- 🧩 Reusable components
- 🌓 Modern visual hierarchy
- 📊 Financial dashboard cards
- 🛍️ Product-focused shopping interface

### UX Principles

```text
Simple Navigation
       ↓
Fast Product Discovery
       ↓
Clear Financing Information
       ↓
Transparent EMI Selection
       ↓
Simple Checkout
       ↓
Easy Repayment Management
```

---

# 🔒 Security Considerations

The project includes development-oriented security practices such as:

- 🔐 Environment variable configuration
- 🚫 `.env` files excluded from Git
- 🔑 Secret/API key separation
- 🧩 Server-side API architecture
- 🗄️ ORM-based database access
- 📦 Dependency-based application structure

Example `.gitignore` protection:

```gitignore
.env
.env.*
.env.local
!.env.example

node_modules/
dist/
```

> For a production financial application, additional controls such as real KYC providers, secure session management, encryption, audit logging, payment-provider integrations, regulatory compliance, and production-grade infrastructure would be required.

---

# 🚀 Local Development

## Prerequisites

Install:

- Node.js **18+**
- npm
- Git
- VS Code

---

## 1️⃣ Clone

```bash
git clone https://github.com/<your-username>/1Fi-Marketplace.git

cd 1Fi-Marketplace
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment

### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

### macOS / Linux

```bash
cp .env.example .env
```

Example development configuration:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
GEMINI_API_KEY=""
```

---

# 🗄️ Initialize Prisma

Generate the Prisma client:

```bash
npx prisma generate
```

Create/update the local database:

```bash
npx prisma db push
```

Seed the catalog:

```bash
npm run seed
```

---

# ▶️ Run the Application

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start full-stack development server |
| `npm run build` | Generate Prisma client and build application |
| `npm run vercel-build` | Production Vercel build |
| `npm run start` | Start compiled production server |
| `npm run seed` | Seed products and EMI plans |
| `npm run lint` | Run TypeScript checks |
| `npm run clean` | Remove build artifacts |

---

# ☁️ Vercel Deployment

The application is designed to work with Vercel using:

```text
GitHub
   │
   ▼
Vercel
   │
   ├── React / Vite Frontend
   │
   └── Serverless API
             │
             ▼
        Production DB
```

### Deployment Steps

1. Push the project to GitHub.
2. Open Vercel.
3. Import the repository.
4. Configure environment variables.
5. Use the production database URL.
6. Deploy.

Production environment variables may include:

```env
DATABASE_URL="your-production-database-url"
GEMINI_API_KEY="your-api-key-if-used"
```

---

# 🧪 Development Workflow

```text
        Developer
            │
            ▼
      VS Code / Git
            │
            ▼
     React + Express
            │
            ▼
         Prisma
            │
            ▼
       Development DB
            │
            ▼
      Build & Testing
            │
            ▼
         GitHub
            │
            ▼
         Vercel
            │
            ▼
       🚀 Production
```

---

# 📸 Screenshots

Add your application screenshots here to make the repository more visually engaging.

### 🏠 Marketplace

```text
![Marketplace](./screenshots/home.png)
```

### 🛍️ Product Details

```text
![Product Details](./screenshots/product-details.png)
```

### 💳 Credit Dashboard

```text
![Credit Dashboard](./screenshots/dashboard.png)
```

### 📆 EMI Selection

```text
![EMI Plans](./screenshots/emi-plans.png)
```

### 📦 Orders

```text
![Orders](./screenshots/orders.png)
```

> Recommended: create a `screenshots/` folder and add 4–6 high-quality images from the application.

---

# 🔮 Future Roadmap

## 💳 Financial Integrations

- [ ] Real CAMS integration
- [ ] Real KFintech integration
- [ ] Production-grade lien workflows
- [ ] Real-time portfolio valuation
- [ ] Credit eligibility engine

## 💰 Payments

- [ ] Razorpay integration
- [ ] UPI AutoPay
- [ ] Payment webhooks
- [ ] Automated EMI reconciliation
- [ ] Payment history

## 🔐 Identity

- [ ] Production KYC provider
- [ ] Aadhaar/PAN verification where legally appropriate
- [ ] Secure OTP provider
- [ ] Identity verification workflow

## 🛍️ Marketplace

- [ ] Wishlist
- [ ] Product reviews
- [ ] Seller management
- [ ] Inventory management
- [ ] Order tracking
- [ ] Coupon engine
- [ ] Recommendation system

## 📊 Analytics

- [ ] User analytics
- [ ] Product performance
- [ ] EMI repayment analytics
- [ ] Credit utilization dashboard
- [ ] Admin analytics

---

# 🏆 Project Highlights

| Capability | Status |
|---|:---:|
| 🛍️ Product Marketplace | ✅ |
| 🔎 Product Search | ✅ |
| 🏷️ Product Filtering | ✅ |
| 🎨 Product Variants | ✅ |
| 💳 Credit Line Concept | ✅ |
| 📆 EMI Plans | ✅ |
| 📊 Financial Dashboard | ✅ |
| 🔐 Authentication | ✅ |
| 🔢 OTP Flow | ✅ |
| 📦 Order Management | ✅ |
| 💰 Repayment UI | ✅ |
| 🗄️ Prisma ORM | ✅ |
| ⚡ React + Vite | ✅ |
| 🟢 Express API | ✅ |
| ▲ Vercel Ready | ✅ |
| 🐳 Docker Compatible | ✅ |

---

# 🎯 Engineering Highlights

This project demonstrates practical experience with:

- ⚛️ Modern React architecture
- 📘 TypeScript
- 🟢 Express REST APIs
- 🔷 Prisma ORM
- 🗄️ Relational database modeling
- 🔐 Authentication flows
- 🛒 E-commerce architecture
- 💳 Fintech product concepts
- 📆 EMI calculation and presentation
- 📦 Order workflows
- 🎨 Responsive UI development
- ✨ Animation-driven UX
- ☁️ Serverless deployment
- 🔧 Environment configuration
- 📦 Database seeding

---

# ⚠️ Disclaimer

**1Fi Marketplace is a software project / demonstration and is not a financial service provider.**

The mutual-fund-backed credit, KYC, lien, EMI, and repayment functionality represented in the application is intended to demonstrate product and engineering concepts.

Production deployment of such functionality would require appropriate:

- Regulatory compliance
- Financial institution partnerships
- KYC/AML processes
- Secure financial integrations
- Payment infrastructure
- Data protection controls
- Legal and compliance review

---

# 👨‍💻 Developed By

## Dhanush Gopi Kavala

**Software Engineer | Full-Stack Developer | AI/ML Enthusiast**

I build modern web applications combining practical backend systems, responsive frontend experiences, databases, APIs, and cloud deployment.

<p align="center">

<a href="https://github.com/dhanushgopi2456">
<img src="https://img.shields.io/badge/GitHub-Dhanush%20Gopi-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>

<a href="https://www.linkedin.com/in/dhanush-gopi-kavala-a460a528b/">
<img src="https://img.shields.io/badge/LinkedIn-Dhanush%20Gopi-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>

</p>

---

# 📜 License

This project is available under the **MIT License**.

---

<p align="center">

## 💳 Shop Smarter. Finance Smarter. Build Better.

### 🚀 1Fi Marketplace

**Modern E-Commerce × FinTech × Asset-Backed Credit**

⭐ If you found this project interesting, consider starring the repository!

</p>
