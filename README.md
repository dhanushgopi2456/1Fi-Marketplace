# 1Fi Marketplace 📱💳

> **Next-Generation E-Commerce with Mutual Fund-Backed Credit Lines & 0% Interest EMIs**

1Fi Marketplace is a full-stack e-commerce and fintech application that lets users purchase premium smartphones, electronics, appliances, and lifestyle products by leveraging their existing Mutual Fund portfolio (via CAMS / KFintech digital liens) without liquidating their investments or incurring steep personal loan interest rates.

---

## 🌟 Key Features

- **Mutual Fund-Backed Credit Line**: Instant digital lien verification against mutual fund units to grant an approved credit limit (up to 50% of portfolio NAV).
- **0% Interest & Flexible EMI Plans**: Support for 3, 6, 9, 12, 18, and 24-month tenures with zero-cost EMI options, cashback rewards, and transparent total payable calculations.
- **Full-Featured Product Catalog**:
  - Multi-variant selection (color, storage capacity, pricing, live stock availability).
  - Dynamic filtering by category, brand, price range, tenure, and zero-interest eligibility.
  - Multi-field search across product names, brands, categories, and descriptions.
- **Comprehensive Authentication & Onboarding**:
  - **Register New User**: Instant KYC & CAMS portfolio lien valuation.
  - **1-Click Demo Login**: Pre-configured verified user (Gopi Dhanush) for testing.
  - **OTP Verification**: Simulated 6-digit SMS verification.
  - **Email Sign-In**: Direct email authentication.
- **Active Loan & EMI Repayment Dashboard**:
  - View active pledged loans, next due dates, remaining installments, and pledged fund details.
  - Interactive EMI repayment modal supporting UPI, Netbanking, and Debit Card mandates.
- **Production & Vercel Ready**:
  - Full-stack Express backend with Prisma ORM.
  - Pre-configured `vercel.json` and Serverless function entry point (`/api/index.ts`).
  - Strict `.gitignore` policy safeguarding all `.env` secrets and credentials.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Motion (animations), Lucide Icons, Wouter (lightweight routing).
- **Backend**: Express.js REST API, Node.js.
- **Database & ORM**: Prisma ORM with SQLite (development) or PostgreSQL (production).
- **Deployment**: Vercel Serverless Ready + Docker / Cloud Run compatible.

---

## 🚀 How to Run in Visual Studio Code (Step-by-Step)

Follow these steps to run the application on your local machine:

### 1. Prerequisites
Ensure you have the following installed on your computer:
- [Node.js](https://nodejs.org/) (Version **18.x** or higher, recommended: **Node 20+**)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

### 2. Open Project in VS Code
1. Launch **Visual Studio Code**.
2. Click **File > Open Folder...** and select the `1Fi Marketplace` project directory.
3. Open an integrated terminal in VS Code by pressing `` Ctrl + ` `` (Windows/Linux) or `` Cmd + ` `` (macOS), or via **Terminal > New Terminal**.

### 3. Install Dependencies
In the VS Code terminal, install all required dependencies:
```bash
npm install
```

### 4. Set Up Environment Variables
Create a local `.env` file from the provided `.env.example`:
- On **macOS / Linux**:
  ```bash
  cp .env.example .env
  ```
- On **Windows (PowerShell)**:
  ```powershell
  Copy-Item .env.example .env
  ```
- On **Windows (Command Prompt)**:
  ```cmd
  copy .env.example .env
  ```

> ⚠️ **Note**: `.env` is already configured in `.gitignore` so your personal keys and local database paths will **never** be committed to GitHub.

Default `.env` configuration for local development:
```env
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
GEMINI_API_KEY=""
```

### 5. Initialize Database & Seed Products
Generate the Prisma Client and seed the database with catalog products, variants, and EMI plans:
```bash
# 1. Generate the Prisma Client
npx prisma generate

# 2. Push the schema to create SQLite database tables
npx prisma db push

# 3. Seed sample smartphones, appliances, and 0% EMI plans
npm run seed
```

### 6. Start Development Server
Run the unified development server:
```bash
npm run dev
```

You should see output similar to:
```
1Fi Marketplace Server running on port 3000
Vite dev server running at: http://localhost:3000/
```

### 7. Open in Browser
Open your browser and navigate to:
```
http://localhost:3000
```

### 💡 Recommended VS Code Extensions
- **Prisma** (`Prisma.prisma`) – Syntax highlighting and formatting for `schema.prisma`.
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) – Autocomplete for Tailwind CSS classes.
- **ESLint** (`dbaeumer.vscode-eslint`) – Real-time code quality feedback.

---

## ☁️ Vercel Deployment Guide (Vercel-Ready)

This repository is pre-configured with `vercel.json` and a Serverless function entry point at `/api/index.ts`.

### Option 1: Deploy via Vercel Dashboard (Recommended)
1. Push your repository to GitHub (see [Push to GitHub](#-how-to-push-to-github) below).
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..." > "Project"**.
4. Import your **`1Fi Marketplace`** GitHub repository.
5. In the project configuration:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `prisma generate && vite build` (or leave default, `vercel.json` handles this automatically)
   - **Output Directory**: `dist`
6. Add your **Environment Variables** in the Vercel project settings:
   - `DATABASE_URL`: A hosted PostgreSQL or cloud database URL (e.g. Supabase, Neon, Railway, or Turso). For serverless deployments, a cloud Postgres database URL is recommended.
   - `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API key.
7. Click **Deploy**.

### Option 2: Deploy via Vercel CLI
```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Login to your Vercel account
vercel login

# 3. Deploy to production
vercel --prod
```

---

## 📤 How to Push to GitHub

### Security Note
Before pushing, verify that no `.env` files are tracked by Git. Our `.gitignore` is pre-configured to strictly ignore:
```gitignore
.env
.env.*
.env.local
!.env.example
```

### Step-by-Step Commands to Push to GitHub

1. Create a new empty repository named **`1Fi-Marketplace`** on [GitHub](https://github.com/new) (do **not** check "Initialize with README", as we already have this README).

2. In your VS Code terminal, run:
```bash
# 1. Initialize Git (if not already initialized)
git init -b main

# 2. Add all project files (excluding .env and build artifacts)
git add .

# 3. Commit the changes
git commit -m "feat: Initial commit for 1Fi Marketplace - Mutual Fund Backed EMI Platform"

# 4. Link to your GitHub repository (replace <your-username> with your GitHub username)
git remote add origin https://github.com/<your-username>/1Fi-Marketplace.git

# 5. Push to GitHub
git push -u origin main
```

*(Alternatively, if you are using Google AI Studio, you can also use the built-in **Settings > Export to GitHub** button to export the project directly).*

---

## 📂 Project Structure

```
├── api/                    # Vercel Serverless Function entry point
│   └── index.ts            # Exports Express app for Vercel Serverless routing
├── prisma/                 # Database schema & migrations
│   ├── schema.prisma       # Prisma models (User, Product, ProductVariant, EmiPlan, Order)
│   ├── seed.ts             # Comprehensive seed script with catalog items
│   └── dev.db              # Local SQLite database
├── src/                    # Frontend React application
│   ├── components/         # Modular UI components (Header, ProductCard, EmiPlanCard, etc.)
│   ├── context/            # Global state (AuthContext, Cart, Filters)
│   ├── lib/                # Shared utilities & currency formatters
│   ├── pages/              # Views (HomePage, ProductListingPage, ProductDetailPage)
│   ├── App.tsx             # Root application component & routes
│   └── main.tsx            # React entry point
├── lib/                    # Shared backend utilities & Prisma client
├── serverApp.ts            # Express REST API endpoints & route handlers
├── server.ts               # Local & container dev/prod Express + Vite server
├── vercel.json             # Vercel routing & build configuration
├── .env.example            # Sample environment variables template
└── .gitignore              # Ignored files (.env, node_modules, dist)
```

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the full-stack Express + Vite dev server on `http://localhost:3000` |
| `npm run build` | Generates Prisma client, builds Vite client to `dist/`, and bundles `server.ts` |
| `npm run vercel-build` | Runs `prisma generate && vite build` for Vercel deployment |
| `npm run start` | Runs the compiled production server (`dist/server.cjs`) |
| `npm run seed` | Seeds the database with products, variants, and EMI plans |
| `npm run lint` | Runs TypeScript compiler checks (`tsc --noEmit`) |
| `npm run clean` | Removes build outputs (`dist/`, `server.cjs`) |

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
