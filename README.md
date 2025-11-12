# 🛒 E-Store

A full-stack e-commerce web application built with **Django** (Python) for the backend and **Vite + JavaScript** for the frontend.  
It provides user authentication, product management and designed for scalability and easy customization.

---

## 🧩 Prerequisites

Before you begin, make sure you have the following installed on your system:

- 🐍 **Python 3.10+**  
- 📦 **uv** or **pip** (for Python dependency management)  
- 🧱 **Node.js 18+** and **npm** (for frontend)  
- 🗄️ **Git** (to clone the repository)

---

## 🧰 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/estore.git
cd estore
```

---

## ⚙️ Backend Setup (Django)

### 1. Install dependencies
```bash
cd backend
uv sync
```

### 2. Apply migrations
```bash
uv run python manage.py migrate
```

### 3. Run the development server
```bash
uv run python manage.py runserver
```
* The backend will run at `http://0.0.0.0:8000/`
  
---

## 💻 Frontend Setup (Vite + JavaScript)

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Run the development server
```bash
npm run dev
```
* The frontend will run at `http://127.0.0.1:5173/`
