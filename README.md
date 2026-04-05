# Finance Dashboard Backend

## 🚀 Overview
This is a backend system for a finance dashboard that supports:
- User authentication
- Role-based access control
- Transaction management
- Dashboard analytics

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## 📁 Folder Structure

src/
controllers/
models/
routes/
middlewares/
config/


---

## 🔐 Authentication APIs

### Register
POST /api/auth/register

### Login
POST /api/auth/login

---

## 💰 Transaction APIs

### Create Transaction
POST /api/transactions

Body:
```json
{
  "amount": 500,
  "type": "expense",
  "category": "food",
  "note": "pizza"
}

Get Transactions (with pagination & filtering)

GET /api/transactions?page=1&limit=5&type=expense&category=food

📊 Dashboard API
Summary

GET /api/dashboard/summary

Response:

{
  "totalIncome": 0,
  "totalExpense": 500,
  "balance": -500,
  "categoryBreakdown": {
    "food": 500
  }
}

🔒 Access Control
Viewer → read only
Analyst → read + insights
Admin → full access
⚠️ Validation
Required fields check
Type validation
Proper error responses (400, 401, 403)
📌 Features Implemented
CRUD operations
Pagination
Filtering
Aggregation (dashboard)
JWT Authentication
Role-based authorization

▶️ Run Project
npm install
npm run dev
🌍 Base URL

http://localhost:5000

👨‍💻 Author

Mohit Raj