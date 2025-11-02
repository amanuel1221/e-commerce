# E-Commerce Frontend Website
**Author:** Amanuel Amare  
**Role:** Junior Frontend Developer  
**Date:** October 2025  

---

## 1. Project Overview
This project is a **frontend-only e-commerce website** created to demonstrate my skills in **UI/UX design** and **frontend development**.  

The goal is to design a **modern, responsive** shopping interface where users can browse products and view information in an elegant layout.  

The project focuses entirely on **frontend technologies** — HTML, CSS, and JavaScript — with product data stored in a **JSON file**.

---

## 2. Project Objectives
- Build a visually appealing e-commerce website for portfolio use.  
- Create a responsive layout adaptable to all devices.  
- Design the full UI/UX prototype in Figma.  
- Display product data dynamically using JavaScript and JSON.  
- Demonstrate clean structure and maintainable frontend code.

---

## 3. Requirement Elicitation

### Functional Requirements
1. Display all products dynamically from the JSON file.  
2. Include:
   - Product image  
   - Name  
   - Description  
   - Price  
   - Rating  
3. Include 4 main sections:
   - Navbar  
   - Hero section  
   - Product grid  
   - Footer  
4. Responsive layout for desktop, tablet, and mobile devices.

### Non-Functional Requirements
- Fast load speed and smooth scrolling.  
- Clean, consistent, and minimal design.  
- Organized, maintainable code structure.  
- Accessible color contrast and readable text.


## 4. System Design

### 4.1 Architecture Overview
User → Browser → HTML / CSS / JavaScript → JSON Product Data



- **HTML** – Provides the structure  
- **CSS** – Handles styling and layout  
- **JavaScript** – Manages dynamic rendering  
- **Figma** – Used for UI/UX design  

---

### 4.2 Folder Structure
ecommerce-frontend/
│
├── index.html
├── style.css
├── script.js
│
├── /data/
│ └── ecommerce_products_branded.json
│
├── /assets/
│ ├── /images/
│ └── /icons/
│
└── /docs/
├── UI_Wireframes.png
├── ArchitectureDiagram.png
└── README.md



## 5. UI/UX Design (Figma)
....

### 5.1 Frame Setup
- **Frame Size:** 1440 × 1600 px  
- **Grid:** 12 columns, 24 px gutter, 120 px margins  

### 5.2 Color Palette
| Purpose | Color |
|----------|-------|
| Primary | `#007BFF` |
| Secondary | `#E3F2FD` |
| Text | `#212529` |
| Background | `#FFFFFF` |

### 5.3 Section Breakdown
| Section | Height | Description |
|----------|---------|-------------|
| Navbar | 90 px | Logo and navigation links |
| Hero Section | 360 px | Promotional banner |
| Product Grid | 602 px | Product cards layout |
| Footer | 200 px | Links and social icons |

### 5.4 Product Card Layout
| Element | Size | Description |
|----------|------|-------------|
| Card | 320 × 554 px | Product container |
| Image | 320 × 220 px | Product image |
| Name | 18 px bold | Product title |
| Description | 14 px | Product details |
| Price | 16 px | Product cost |
| Button | 100 × 40 px | “Add to Cart” placeholder |

---

## 6. Frontend Implementation

### Technologies Used
| Technology | Purpose |
|-------------|----------|
| HTML5 | Page structure |
| CSS3 | Styling (Flexbox, Grid) |
| JavaScript | Dynamic rendering |
| JSON | Product data |
| Figma | UI/UX design |
| Git | Version control |

---

### JSON Example
```json
{
  "id": 1,
  "name": "Bluetooth Speaker by Sony",
  "price": 59.99,
  "description": "Portable Bluetooth Speaker by Sony with rich sound and 12-hour battery life.",
  "image1": "/images/speaker-sony-front.png",
  "image2":"/images/speaker-sony-bact.png",
  "image3":"/images/speaker-sony-side.png",
  "rating": 4.5,
  "category": "Electronics"
}
JavaScript Example
js
Copy code
fetch('./data/ecommerce_products_branded.json')
  .then(res => res.json())
  .then(products => {
    const grid = document.getElementById('product-grid');
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.image1}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p class="price">$${p.price}</p>
      `;
      grid.appendChild(card);
    });
  });

