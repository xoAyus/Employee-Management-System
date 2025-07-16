# Local Setup Guide: Employee Management System

This guide will help you run the Employee Management System project on your local machine.

---

## 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

## 2. Clone the Repository
```sh
git clone https://github.com/yourusername/employee-management-system.git
cd employee-management-system
```

---

## 3. Backend Setup

### A. Install Dependencies
```sh
cd backend
npm install
```

### B. Configure Environment Variables
Create a `.env` file in the `backend` directory:
```
MONGODB_URI=mongodb://localhost:27017/ems
JWT_SECRET=your_jwt_secret
PORT=5000
```
- If using MongoDB Atlas, replace the URI accordingly.

### C. Start the Backend Server
```sh
npm start
```
The backend will run on [http://localhost:5000](http://localhost:5000)

---

## 4. Frontend Setup

### A. Install Dependencies
```sh
cd ../frontend
npm install
```

### B. Configure Environment Variables
Create a `.env` file in the `frontend` directory:
```
VITE_API_URL=http://localhost:5000/api
```

### C. Start the Frontend Dev Server
```sh
npm run dev
```
The frontend will run on [http://localhost:5173](http://localhost:5173)

---

## 5. Usage
- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Register or log in as an admin or employee.

---

## 6. Notes
- For production, see the README for deployed links.
- To seed users, use Postman or the `/api/auth/register` endpoint.
- Make sure backend is running before starting the frontend.

---

## 7. Troubleshooting
- If you see CORS errors, ensure both servers are running and CORS is enabled in the backend.
- If you have issues connecting to MongoDB, check your URI and that MongoDB is running. 