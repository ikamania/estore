# E-store

A full-stack app with React + Vite and Django + SQLite3.
Browse products, manage a cart, and handle authentication.
Dockerized for easy setup and deployment.

---

## Features

* User registration and authentication
* Product upload and management
* Store page to browse products
* Cart functionality to manage selected items
* Easily deployable with Docker

---

## Prerequisites

* Docker >= 20.x
* Docker Compose >= 2.x
* Git

---

## 1. Clone the repository

```bash
git clone https://github.com/ikamania/estore.git
cd estore
```

---

## 2. Set up environment variables

1. Copy the template `.env` file:

```bash
cp example.env backend/.env
```

2. Edit `backend/.env` with your own values:

```env
DEBUG=True
SECRET_KEY="yoursupersecretkey"
PYTHONUNBUFFERED=1
TZ=UTC
```

---

## 3. Build and run the Docker containers

```bash
docker-compose up --build
```

* The website will be available at `http://localhost:5173/`.

---

## 4. Apply migrations

```bash
docker-compose exec backend uv run manage.py migrate
```

* Sets up the database tables.

---

## Stop the containers

```bash
docker-compose down
```

---

## Tips

* To reset the database:

```bash
docker-compose exec backend rm db.sqlite3

docker-compose exec backend uv run manage.py migrate
```
