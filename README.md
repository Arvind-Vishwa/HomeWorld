# 🏡 Airbnb Clone (EJS • Node.js • Express • MVC)

A modern, full‑stack **Airbnb‑style web application** where users can explore stays, list their properties, and manage bookings — all built with **Express.js**, **EJS templates**, and a clean **MVC architecture**.

This project is deployed on **Render** with a reliable cloud database, showcasing how real‑world travel and booking platforms work under the hood. It’s a hands‑on demonstration of combining backend logic, database operations, and server‑rendered views into a seamless experience.

---


## 🖥️ Live Demo

* **Production**: https://homeworld-1.onrender.com

## ✨ Features

* User authentication (signup / login / logout)
* Create, edit, and delete property listings
* Search & filter listings (location, price, category)
* View listing details with image gallery
* Booking flow (select dates, availability check)
* Reviews & ratings
* Responsive UI with server‑rendered **EJS** views
* Flash messages & validation errors
* Secure sessions & cookies


---

## 🧱 Tech Stack

* **Frontend (SSR)**: EJS, CSS/Bootstrap
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Atlas/local) 
* **Auth & Security**: express-session, bcrypt, connect-mongo (or JWT)
* **Validation**: express-validator / Joi
* **Uploads**: Multer / Cloudinary (
* **Logging**: morgan
* **Deployment**: Render (Web Service)

---

## 🏗️ Architecture (MVC)

```
root
├── src
│   ├── app.js              # express app bootstrap
│   ├── server.js           # server start
│   ├── config/             # db, cloudinary, etc.
│   ├── controllers/        # request handlers (thin)
│   ├── models/             # Mongoose schemas (or your ORM)
│   ├── routes/             # route definitions
│   ├── services/           # business logic (optional)
│   ├── middlewares/        # auth, errors, validation
│   ├── utils/              # helpers
│   └── views/              # EJS templates
│       ├── layouts/
│       ├── partials/
│       ├── listings/
│       ├── auth/
│       └── shared/
├── public/                 # static assets (css, js, images)
├── .env
├── package.json
└── README.md
```

### Key Design Choices

* **Separation of concerns**: controllers are skinny; business logic lives in services.
* **View composition**: EJS layouts + partials for header/footer/flash.
* **Error handling**: centralized error middleware + async wrapper.
* **Security**: helmet, rate limiting, session cookie flags.

---

## 🗄️ Data Models (example: MongoDB + Mongoose)

```js
// models/User.js
{
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  avatarUrl: String,
  createdAt: Date
}

// models/Listing.js
{
  title: String,
  description: String,
  location: String,
  pricePerNight: Number,
  images: [String],
  host: { type: ObjectId, ref: 'User' },
  amenities: [String],
  maxGuests: Number,
  createdAt: Date
}

// models/Booking.js
{
  listing: { type: ObjectId, ref: 'Listing' },
  guest: { type: ObjectId, ref: 'User' },
  from: Date,
  to: Date,
  totalPrice: Number,
  status: { type: String, enum: ['pending','confirmed','cancelled'], default: 'pending' },
  createdAt: Date
}

// models/Review.js
{
  listing: { type: ObjectId, ref: 'Listing' },
  author: { type: ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: Date
}
```
## 🚀 Getting Started (Local)

```bash
# 1) Clone
git clone <REPO_URL>
cd <REPO_NAME>

# 2) Install deps
npm install

# 3) Configure env
cp .env.example .env   # then edit values

# 5) Start
node app.js           # nodemon

```

* App runs at: `http://localhost:<port>` (default: 8000)

### Recommended NPM Scripts (add to package.json)



---

## 🌐 Deployment on Render

1. **Create Web Service** → connect your GitHub repo.
2. **Build Command**: `npm install`
3. **Start Command**: `node app.js`
4. **Environment**: add variables from `.env` (Render → *Environment* tab).
5. **Node Version** (optional): set in `package.json` → `"engines": { "node": ">=18" }`
6. **Auto‑deploy** on push: enable in Render settings.

## 👤 Author

**Arvind Vishwakarma**


* LinkedIn: https://www.linkedin.com/in/arvind7518/
