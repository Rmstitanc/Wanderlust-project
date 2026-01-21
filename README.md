# 🌍 Wnderlust

Wnderlust is a full-stack travel and accommodation discovery platform that enables users to explore, create, and review property listings. The application is designed with real-world features such as secure authentication, cloud-based image uploads, interactive map integration, dynamic reviews, and strong validations.

---

## 🌐 Live Demo

🔗 **Live Application:**  
https://wanderlust-project-wdlt.onrender.com/listings  

> The live version supports real-time listing creation, image uploads, map visualization, and user reviews.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User **Signup / Login / Logout**
- Secure session-based authentication
- Protected routes for authenticated users
- Ownership-based authorization for listings and reviews

### 🏠 Property Listings
- Create, update, and delete property listings
- Add pricing, descriptions, and location details
- Listings are linked to authenticated users

### 🖼 Image Upload & Cloud Integration
- Image upload and storage using **Cloudinary**
- Automatic image optimization
- Secure image update and deletion

### 🗺 Map & Location Services
- Interactive maps displayed on listing pages
- Geolocation support using **Mapbox**
- Dynamic markers based on listing coordinates

### ⭐ Reviews & Ratings
- Authenticated users can create and delete reviews
- Star-based rating system
- Real-time review rendering

### ✅ Validations & Error Handling
- Server-side and client-side validations
- Centralized error-handling middleware
- Clear and user-friendly validation messages

---

## 🛠 Tech Stack

### Frontend
- HTML5  
- CSS3  
- JavaScript (EJS Templates)  
- Bootstrap  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB  
- Mongoose ODM  

### Cloud & APIs
- Cloudinary (Image Management)  
- Mapbox (Maps & Geolocation)  

### Authentication & Security
- Passport.js  
- Express Sessions  
- Bcrypt  
- Flash Messages  

---

## 📂 Project Structure

```txt
wnderlust/
│── models/         # Database schemas
│── routes/         # Application routes
│── controllers/    # Business logic
│── views/          # EJS templates
│── public/         # Static assets
│── utils/          # Utility functions
│── app.js          # App configuration
│── server.js       # Server entry point
