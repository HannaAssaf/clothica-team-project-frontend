
<div align="center">

# 👗 **Clothica — Frontend**
### *Modern clothing marketplace frontend built with Next.js & TypeScript*

<img src="https://img.shields.io/badge/version-1.0.0-blue" />
<img src="https://img.shields.io/badge/license-Apache_2.0-green" />
<img src="https://img.shields.io/badge/language-TypeScript-yellow" />
<img src="https://img.shields.io/badge/framework-Next.js-black" />
<img src="https://img.shields.io/badge/state-Zustand-orange" />
<img src="https://img.shields.io/badge/api-React_Query-red" />

---

### 🔗 **Live Demo:**  
👉 https://last-super-project-group-03-front.vercel.app/

### 🧩 **Backend Repository:**  
👉 https://github.com/codingweb123/last-super-project-group-03-back

</div>

---

## 📍 **About the Project**

**Clothica** is a modern web marketplace for clothing, built by **FlowDevs**.  
This repository contains **only the Frontend** part of the application and is responsible for UI, client-side logic, routing, and API interactions.

The app is powered by **Next.js + TypeScript** and uses a scalable and maintainable architecture with:

- **Axios + React Query** — data fetching & caching
- **Zustand** — global state management
- **CSS Modules** — modular styling
- **Vercel** — hosting & production deployments

---

## ✨ **Features**

| Feature | Description |
|---------|------------|
| 🛍️ Product catalog | Paginated list of clothing items with sorting & filters |
| 📄 Product page | Images, price, details, reviews |
| ❤️ Reviews | Users can post and view product reviews |
| 🧺 Shopping cart | Add, remove, update items |
| 🔑 Authentication | Register, login, token-based auth |
| 👤 User profile | Manage personal info & orders |
| 📦 Orders | Create and view purchase history |
| 🏷 Categories | Catalog structured by categories |
| 🔍 Filters & Search | Filter by brand, category, size, etc. |

---

## 🏗 **Tech Stack**

| Category | Technology |
|----------|------------|
| Framework | **Next.js 14+** |
| Language | **TypeScript** |
| Styling | **CSS Modules** |
| Data Fetching | **React Query + Axios** |
| Global State | **Zustand** |
| Auth | Session (via backend API) |
| Deployment | **Vercel** |
| Code Quality | ESLint, Prettier |

---

## 📂 **Project Structure**

```bash
📦 last-super-project-group-03-front
├── app/                # Next.js routes & pages
├── components/         # UI components
├── config/             # Global app configuration
├── lib/                # API clients & utility functions
├── types/              # Shared TypeScript types
├── public/             # Static assets
```

---

## 🔗 **Communication With Backend**

This frontend communicates with a dedicated backend located here:

👉 **Backend:** https://github.com/codingweb123/last-super-project-group-03-back

### **📡 API Characteristics:**

- Session Authorization
- Entity-based API services (goods, users, orders, reviews)
- Data caching via React Query
- Error handling and request abstraction layer
- Axios instance with interceptors

---

## 🚀 **Getting Started**

### **1️⃣ Install dependencies**

```bash
npm install
```

or

```bash
bun install
```

---

### **2️⃣ Start development server**

```bash
npm run dev
```

---

### **3️⃣ Build for production**

```bash
npm run build
npm run start
```

---

## 🧪 **Roadmap**

- [ ] Recommendation engine (AI-based)
- [ ] Admin dashboard for product management
- [ ] Payment integration (Stripe)
- [ ] i18n internationalization support
- [ ] Unit + E2E testing (Jest / Cypress)

---

## 👥 **Team**

| Name | Role |
|------|------|
| FlowDevs | Full-stack development team |

---

## 📜 **License**

Distributed under the **Apache 2.0 License**.

---

<div align="center">

💛 *Made with passion by FlowDevs*

</div>
