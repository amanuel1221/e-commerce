# 🛒 **E-Commerce Website**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)  
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)  
[![Vite](https://img.shields.io/badge/Vite-4-purple?logo=vite)](https://vitejs.dev/)  
[![Deployment](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://e-commerce-49ma.vercel.app/)

A modern **responsive e-commerce frontend** built with **React**, **Tailwind CSS**, and **Vite**.  
This project demonstrates product listing, cart management, favorites, a dummy payment flow, EmailJS contact form, AI-driven UI components, and a clean responsive design.

---

## 🔗 **Live Demo**

👉 **[View Demo](https://e-commerce-49ma.vercel.app/)**

---

## 📸 **Screenshots**

| Home | Product | Cart |
|------|---------|------|
| ![Home Page](screenshots/Home.png) | ![Product Page](screenshots/Product.png) | ![Cart Page](screenshots/Cart.png) |

| Favorites | Contact | Payment |
|-----------|---------|---------|
| ![Favorites Page](screenshots/Favorites.png) | ![Contact Form](screenshots/Contact.png) | ![Payment Form](screenshots/Payment-2.png) |

---

## 🚀 **Features**

- 🛍️ **Product Listing** – Images, prices, descriptions  
- 🛒 **Shopping Cart** – Add/remove items, update quantities, persistent with localStorage  
- ❤️ **Favorites / Wishlist** – Save favorite products  
- ✉️ **Contact Form** – EmailJS integration (frontend only)  
- 💳 **Payment (Demo)** – Address + card form UI for checkout simulation  
- 🔍 **Search & Filter** – Keyword & category search  
- 🤖 **AI Visibility Component** – Highlights AI-based product suggestions  
- 📱 **Responsive UI** – Mobile, tablet, desktop optimized  
- 🎨 **Modern Icons** – Lucide React Icons  
- 📦 **Order History** – Simulated order progress (Pending → Delivered)

---

## 🛠 **Tech Stack**

- **Frontend:** React + Vite  
- **Styling:** Tailwind CSS  
- **State Management:** React Context API + Hooks  
- **Email Service:** EmailJS  
- **Icons:** Lucide React  
- **Hosting:** Vercel  
- **Data:** Static JSON (mock backend)

---

## 💻 **Installation & Setup**

```bash
# 1. Clone the repository
git clone https://github.com/amanuel1221/e-commerce.git
cd e-commerce

# 2. Install dependencies
npm install

# 3. Add environment variables (EmailJS)
# Create a .env file
VITE_EMAILJS_SERVICE_ID=xxxx
VITE_EMAILJS_TEMPLATE_ID=xxxx
VITE_EMAILJS_PUBLIC_KEY=xxxx

# 4. Start development server
npm run dev

# 5. Open the app
http://localhost:5173
📂 Project Structure
plaintext
e-commerce/
├─ public/
├─ src/
│  ├─ components/
│  │   ├─ Header.jsx
│  │   ├─ Footer.jsx
│  │   ├─ ProductCard.jsx
│  │   ├─ CartItem.jsx
│  │   ├─ FavoriteItem.jsx
│  │   ├─ ContactForm.jsx
│  │   ├─ PaymentForm.jsx
│  │   └─ AIVisibility.jsx
│  ├─ pages/
│  │   ├─ Home.jsx
│  │   ├─ Product.jsx
│  │   ├─ Cart.jsx
│  │   ├─ Favorites.jsx
│  │   ├─ Contact.jsx
│  │   └─ Payment.jsx
│  ├─ context/
│  ├─ data/
│  ├─ services/
│  ├─ App.jsx
│  └─ main.jsx
├─ package.json
├─ tailwind.config.js
├─ vite.config.js
└─ README.md
⚡ Usage
Browse products and add them to Cart or Favorites

Manage items from Cart or Favorites

Submit the Contact Form using EmailJS

Test the demo payment UI

View AI suggested items

🧠 EmailJS Integration
Sends emails directly from frontend

No backend required

Uses Service ID, Template ID & Public Key

Beginner-friendly and safe for portfolio projects

💳 Payment Integration (Demo Only)
No real payment processing

Address & payment form included

Demonstrates checkout flow UI

Practice form handling & validation

📚 What I Learned
Component Architecture – Reusable components, props, shared state

EmailJS – Setup, environment variables, debugging failed submissions

UI Libraries – Tailwind, Lucide icons, Framer Motion animations

Cart & Payment Logic – State management, totals, multi-step checkout

Deployment – Fixing Vercel build errors, handling environment variables

🧩 Challenges I Faced
Component Connection Issues – Fixed by lifting state & reorganizing components

EmailJS Fails – Solved with correct IDs & .env setup

UI Errors – Debugged imports & library setup

Cart & Payment Bugs – Fixed totals & navigation issues

Deployment Errors – Case-sensitive filenames, missing dependencies

🔧 Future Improvements
Real backend (Node.js / Django)

Authentication (Login/Register)

Real payments (Stripe/PayPal)

Admin dashboard for product management

AI-powered recommendations

Persistent orders & favorites in a database

🤝 Contributing
bash
# Fork the repo
# Create new branch
git checkout -b feature/your-feature

# Commit changes
git commit -m "Add your feature"

# Push branch
git push origin feature/your-feature
Open a pull request 🚀

📄 License
This project is licensed under the MIT License.

🌟 Acknowledgements
React

Tailwind CSS

Vite

EmailJS

Lucide React Icons
