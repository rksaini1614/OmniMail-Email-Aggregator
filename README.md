# 📬OmniMail – Email Aggregator Web App

OmniMail is a full-stack email aggregator web application that allows users to securely sign up, link multiple Gmail accounts, and view **all unread emails in one unified inbox**. Designed for productivity nerds, digital hoarders, and email-overwhelmed folks alike.

---

## 🚀 Live Demo
**Live:** [Vercel Linl](https://omni-mail-email-aggregator.vercel.app/)
**Backend API:** [Render Link](https://omnimail-email-aggregator.onrender.com)  


---

## 🛠️ Tech Stack

**Frontend:** React, TailwindCSS, Vite, Context API  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Auth:** Google OAuth 2.0, JWT  
**APIs:** Gmail API  
**Storage:** Cloudinary (for profile images)  
**Deployment:** Vercel (Frontend), Render (Backend)

---

## 📈 Key Features

- 🔐 **Secure Auth System:** Sign up, login, and email verification with OTP
- 🔄 **Link Multiple Gmail Accounts:** Users can link **2 or more Gmail accounts**
- 📨 **Unified Inbox:** Fetch and display **all unread emails** across accounts
- 🖼️ **Profile Management:** Upload/change profile image using Cloudinary
- 🧭 **Dashboard Navigation:** Responsive sidebar with protected routes

---

## 🧪 API Highlights

- `POST /auth/signup` – Create a new user with email OTP verification  
- `POST /auth/login` – Login and receive JWT token  
- `GET /profile` – Get current user profile  
- `POST /link-account` – Link Gmail account using OAuth 2.0  
- `GET /emails/unread` – Fetch unread emails from all linked accounts  
- `POST /logout` – Clear session/token  

> Auth is protected using JWT + middleware. Gmail access is authorized per account using OAuth scopes.

---

## 🔐 Security

- OAuth 2.0 Authorization Code Flow with Redirect URI
- Access tokens stored securely in the backend
- CORS protection
- Input validation and sanitized database queries

---

##  Folder Structure (Core)

OmniMail/
│
├── client/ # Frontend (React + Tailwind + Vite)
│ ├── src/
│ │ ├── components/ # Navbar, Sidebar, InboxCard, etc.
│ │ ├── pages/ # Login, Signup, Inbox, Profile, Settings
│ │ └── context/ # Auth context for global state
│ └── ...
│
├── server/ # Backend (Node.js + Express + MongoDB)
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── services/
│ └── ml/ # ML model (spam detection)
│ └── spam_classifier.pkl
│
└── README.md


---

## 📊 Stats

- 📧 **1500+ emails** fetched during testing
- 🔗 **Up to 5 Gmail accounts** linked per user (configurable)
- 🧪 **100% functional OTP verification**
- 🚀 **3s average page load time on Vercel**

---

## 🛡️ Future Enhancements

- 📥 Email Pagination & Search
- 🌙 Dark/Light Theme Toggle
- 📂 Email Labeling and Archiving
- 🔎 Smart ML-based categorization (work, finance, promotions)
- 📊 Dashboard Analytics

---

## 🧑‍💻 Author

Made with ❤️ by **Ritik Saini**  
[GitHub](https://github.com/rksaini1614)

---
