# job-portal
# Job Portal

![GitHub Repo Size](https://img.shields.io/github/repo-size/Meghnaparashar810/job-portal)
![GitHub stars](https://img.shields.io/github/stars/Meghnaparashar810/job-portal?style=social)
![GitHub forks](https://img.shields.io/github/forks/Meghnaparashar810/job-portal?style=social)

A **MERN stack Job Portal** project with a **frontend (React/Vite)** and **backend (Node.js/Express)** connected to **MongoDB**. Users can register, post jobs, and apply for jobs. JWT authentication ensures secure login.

---

## 🌐 API Documentation

Full API documentation is available here:
[API Docs](http://localhost:8000/api-doc)

---

## ⚡ Features

* User authentication with **JWT**
* Job posting and application
* Separate frontend and backend
* MongoDB integration
* Responsive design for all devices

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Authentication:** JWT
* **Version Control:** Git + GitHub

---

## 💻 Installation

### Backend Setup

1. Go to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
PORT=8000
Mongo_url=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

4. Start the backend server:

```bash
npm run dev
```

Server will run at: `http://localhost:8000`

---

### Frontend Setup

1. Go to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 🔐 Environment Variables

* **PORT:** Backend server port
* **Mongo_url:** MongoDB connection URI
* **JWT_SECRET:** Secret key for JWT authentication




## 📂 Project Structure

```
job-portal/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── index.js
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---



## 📄 License

This project is licensed under the MIT License.
