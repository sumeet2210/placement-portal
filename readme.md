# 📌 Placement Portal – Full-Stack Web Application

A multi-role campus placement management system that streamlines job applications, company postings, and administrative tasks for universities.

## 🚀 Features

- 🧑‍🎓 **Student Module**  
  - View job listings
  - Apply to eligible companies
  - Track application status

- 🏢 **Company Module**  
  - Post job openings with custom eligibility criteria
  - View and shortlist applicants

- 🔐 **Admin Module**  
  - Approve new job postings
  - Manage users and roles
  - Oversee application workflows

## 🛠️ Tech Stack

| Category      | Technologies                         |
|---------------|--------------------------------------|
| **Frontend**  | HTML, CSS, JavaScript                |
| **Backend**   | Node.js, Express.js                  |
| **Database**  | MongoDB with Mongoose ODM            |
| **Auth**      | JWT (JSON Web Tokens)                |
| **Tools**     | Git, GitHub, Postman, VS Code        |

## 📁 Folder Structure

```bash
placement-portal/
│
├── client/                 # Frontend files (if separated)
│
├── server/
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose models
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth & validation middleware
│   └── server.js           # Entry point
│
├── .env                    # Environment variables
├── package.json
└── README.md
