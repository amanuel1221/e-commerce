# 🛒 E-Commerce Website

A modern **responsive e-commerce frontend** built with **React**, **Tailwind CSS**, and **Vite**.  
This project demonstrates product listing, shopping cart functionality, favorites, dummy payment flow, contact form with **EmailJS**, AI visibility components, and a responsive UI.

---

## 🔗 Live Demo
[View Live Demo](https://your-netlify-link.com)

**Screenshots**

![Home Page](screenshots/home.png)
![Product Page](screenshots/product.png)
![Cart Page](screenshots/cart.png)
![Favorites Page](screenshots/favorites.png)
![Contact Form](screenshots/contact.png)

---

## 🚀 Features

### Core Features

- **Product Listing** – Browse all products with images, prices, and descriptions.
- **Shopping Cart** – Add/remove products, view subtotal, and persist items using localStorage.
- **Favorites / Wishlist** – Mark products as favorites to view them later.
- **Contact Form** – Send messages via **EmailJS** (frontend-only email sending).
- **Payment (Dummy/Show Only)** – Simulated payment flow for demonstration purposes.
- **Search & Filter** – (Optional) Filter products by categories or search terms.
- **Responsive Design** – Works on desktop, tablet, and mobile devices.
- **AI Visibility Component** – UI component to showcase AI-powered product suggestions or highlights.
- **Icons & UI Enhancements** – Using **Lucide React icons** for better visual experience.

---

## 🛠 Tech Stack

- **Frontend:** React, Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context + useState
- **Email Service:** EmailJS (for contact form)
- **Icons:** Lucide React
- **Hosting:** Netlify / Vercel
- **Data:** Local JSON or dummy products (simulating backend API)

---

## 💻 Installation / Setup

1. **Clone the repository**

```bash
git clone https://github.com/amanuel1221/e-commerce.git
cd e-commerce
---

2.Install dependencies

npm install
3.Set up environment variables

4. Run the development server

npm run dev


Open in your browser

Go to http://localhost:5173

📂 Project Structure
e-commerce/
├─ public/                # Static assets (images, icons)
├─ src/
│  ├─ components/         # Reusable components
│  │   ├─ Header.jsx
│  │   ├─ Footer.jsx
│  │   ├─ ProductCard.jsx
│  │   ├─ CartItem.jsx
│  │   ├─ FavoriteItem.jsx
│  │   ├─ ContactForm.jsx
│  │   ├─ PaymentForm.jsx
│  │   └─ AIVisibility.jsx
│  ├─ pages/              # Pages
│  │   ├─ Home.jsx
│  │   ├─ Product.jsx
│  │   ├─ Cart.jsx
│  │   ├─ Favorites.jsx
│  │   ├─ Contact.jsx
│  │   └─ Payment.jsx
│  ├─ context/            # React Context for global state (Cart, Favorites)
│  ├─ data/               # Sample product data
│  ├─ services/           # EmailJS service integration
│  ├─ App.jsx             # Main app component
│  └─ main.jsx            # Entry point
├─ package.json
├─ tailwind.config.js
├─ vite.config.js
└─ README.md

5.⚡ Usage

Browse products and add them to your Cart or Favorites.

View Cart or Favorites pages to manage items.

Use the Contact Form to send emails via EmailJS.

Click Proceed to Payment to simulate a payment flow (for demonstration only).

Explore the AI Visibility Component showcasing product recommendations or highlights.

📨 EmailJS Integration

Used for frontend-only contact form emails.

Requires creating an EmailJS account, service, and template.

Add Service ID, Template ID, and Public Key to .env.

Sends email on form submission without exposing SMTP credentials.

💳 Payment Integration (Demo / Show Only)

Dummy payment form included to simulate checkout.

Collects basic card info (fake, no real payment processing).

Demonstrates frontend payment UI workflow for portfolio purposes.

⭐ AI Visibility Component

A reusable UI component to showcase AI-powered suggestions.

Highlights products based on “simulated AI logic” for portfolio demonstration.

Can later be integrated with real AI recommendation engines.

🔧 Future Improvements

Real backend integration for products, orders, and payments.

Secure payment gateway (Stripe, PayPal, etc.).

Authentication and user accounts.

Persistent favorites across sessions using database.

Dynamic AI product recommendations.

Unit, integration, and end-to-end testing.

CI/CD workflow for automated testing and deployment.

🤝 Contributing

Fork the repository.

Create a new branch: git checkout -b feature/your-feature

Make changes and commit: git commit -m "Add your feature"

Push to the branch: git push origin feature/your-feature

Open a pull request.

📄 License

This project is licensed under the MIT License. See the LICENSE
 file for details.

🌟 Acknowledgements

React

Tailwind CSS

Vite

EmailJS

Lucide React Icons

