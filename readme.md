# 🎓 Placement Portal - Campus Recruitment Management System

A comprehensive, multi-role campus placement management system built with modern web technologies. This platform streamlines the entire recruitment process for students, companies, and administrators.

![Placement Portal](https://img.shields.io/badge/Status-Active-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-v6+-green)
![License](https://img.shields.io/badge/License-ISC-blue)

## ✨ Features

### 👨‍🎓 **Student Module**
- 📝 **Registration & Profile Management** - Complete profile setup with academic details
- 💼 **Job Discovery** - Browse available job opportunities with smart filtering
- 📄 **Application Management** - Apply to jobs and track application status
- 📊 **Dashboard Analytics** - View application statistics and placement insights
- 🔍 **Advanced Search** - Filter jobs by company, role, salary, location, and eligibility

### 🏢 **Company Module**  
- 🏭 **Company Registration** - Comprehensive company profile setup
- 📋 **Job Posting** - Create detailed job listings with eligibility criteria
- 👥 **Applicant Management** - View, filter, and shortlist student applications
- 📈 **Recruitment Analytics** - Track application metrics and hiring progress
- 💬 **Student Communication** - Direct messaging and status updates

### 🔐 **Admin Module**
- 🛡️ **Complete System Control** - Manage all users, companies, and job postings
- ✅ **Approval Workflows** - Approve company registrations and job postings
- 📊 **Comprehensive Analytics** - System-wide statistics and reports
- 👨‍🎓 **Student Management** - View, search, filter, and manage all students
- 🏢 **Company Oversight** - Monitor company activities and job postings
- 📈 **Advanced Reporting** - Export data, generate reports, and print functionality

## 🚀 Tech Stack

| **Category** | **Technologies** |
|--------------|------------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), Glassmorphism Design |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs |
| **File Upload** | Multer, Cloudinary |
| **Development** | Nodemon, dotenv |
| **API** | RESTful APIs, CORS enabled |

## 📁 Project Structure

```
placement-portal/
│
├── backend/
│   ├── config/
│   │   ├── cloudinary.js          # Cloudinary configuration
│   │   ├── index.js               # Database connection
│   │   └── multer.js              # File upload configuration
│   │
│   ├── controllers/
│   │   ├── admin.controller.js    # Admin operations
│   │   ├── application.controller.js # Job applications
│   │   ├── auth.controller.js     # Authentication logic
│   │   ├── company.controller.js  # Company operations
│   │   ├── job.controller.js      # Job management
│   │   └── student.controller.js  # Student operations
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js     # JWT authentication
│   │   ├── error.middleware.js    # Error handling
│   │   ├── role.middleware.js     # Role-based access
│   │   └── validate.middleware.js # Input validation
│   │
│   ├── models/
│   │   ├── admin.models.js        # Admin schema
│   │   ├── application.models.js  # Application schema
│   │   ├── company.models.js      # Company schema
│   │   ├── job.models.js          # Job schema
│   │   └── student.models.js      # Student schema
│   │
│   ├── routes/
│   │   ├── admin.routes.js        # Admin API routes
│   │   ├── application.routes.js  # Application API routes
│   │   ├── auth.routes.js         # Authentication routes
│   │   ├── company.routes.js      # Company API routes
│   │   ├── job.routes.js          # Job API routes
│   │   └── student.routes.js      # Student API routes
│   │
│   ├── utils/
│   │   ├── apierror.js           # Custom error handling
│   │   └── asynchandler.js       # Async error wrapper
│   │
│   ├── public/                   # Static file uploads
│   ├── app.js                    # Express app configuration
│   ├── constant.js               # Application constants
│   └── server.js                 # Server entry point
│
├── frontend/
│   ├── css/
│   │   └── style.css             # Modern glassmorphism styling
│   │
│   ├── js/
│   │   ├── admin.js              # Admin dashboard functionality
│   │   ├── company.js            # Company dashboard functionality
│   │   ├── main.js               # Common utilities
│   │   └── student.js            # Student dashboard functionality
│   │
│   ├── pages/
│   │   ├── admin-dashboard.html  # Admin control panel
│   │   ├── company-dashboard.html # Company management panel
│   │   ├── student-dashboard.html # Student portal
│   │   ├── view-students.html    # Advanced student management
│   │   ├── login.html            # Authentication page
│   │   ├── register-*.html       # Registration forms
│   │   ├── post-job.html         # Job creation form
│   │   ├── apply-job.html        # Job application form
│   │   └── ...                   # Additional pages
│   │
│   └── index.html                # Landing page
│
├── services/                     # External service integrations
├── package.json                  # Project dependencies
├── .env                          # Environment variables
└── README.md                     # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn package manager

### 🔧 Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/placement-portal.git
   cd placement-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/placement_portal
   
   # JWT Configuration
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   
   # Cloudinary Configuration (for file uploads)
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3001`

### 🌐 Frontend Setup

1. **Serve the frontend**
   - Use a live server extension in VS Code, or
   - Use a simple HTTP server:
   ```bash
   # Using Python
   python -m http.server 3000
   
   # Using Node.js http-server
   npx http-server frontend -p 3000
   ```

2. **Access the application**
   - Open `http://localhost:3000` in your browser
   - Backend API runs on `http://localhost:3001`

## 📊 API Endpoints

### 🔐 Authentication Routes
```
POST /api/v1/auth/register-student    # Student registration
POST /api/v1/auth/register-company    # Company registration  
POST /api/v1/auth/register-admin      # Admin registration
POST /api/v1/auth/login               # User login
POST /api/v1/auth/logout              # User logout
```

### 👨‍🎓 Student Routes
```
GET  /api/v1/student/profile          # Get student profile
PUT  /api/v1/student/profile          # Update student profile
GET  /api/v1/student/jobs             # Get available jobs
GET  /api/v1/student/applications     # Get student applications
```

### 🏢 Company Routes
```
GET  /api/v1/company/profile          # Get company profile
PUT  /api/v1/company/profile          # Update company profile
POST /api/v1/company/jobs             # Create job posting
GET  /api/v1/company/jobs             # Get company jobs
GET  /api/v1/company/applications     # Get job applications
```

### 🔐 Admin Routes
```
GET  /api/v1/admin/allstudents        # Get all students
GET  /api/v1/admin/companies          # Get all companies
GET  /api/v1/admin/jobs               # Get all jobs
PUT  /api/v1/admin/approve-company    # Approve company
PUT  /api/v1/admin/approve-job        # Approve job posting
```

### 📄 Application Routes
```
POST /api/v1/application/apply        # Submit job application
GET  /api/v1/application/status       # Check application status
PUT  /api/v1/application/update       # Update application status
```

## 🎨 Key Features Implemented

### ✨ **Modern UI/UX**
- **Glassmorphism Design** - Modern, translucent interface elements
- **Responsive Layout** - Mobile-first design approach
- **Interactive Components** - Smooth animations and transitions
- **Dark Mode Support** - Eye-friendly color schemes

### 🔍 **Advanced Student Management**
- **Real-time Search** - Instant search across all student fields
- **Multi-level Filtering** - Filter by year, branch, CGPA, status
- **Statistics Dashboard** - Live analytics and insights
- **Export Functionality** - CSV export with custom formatting
- **Print Support** - Professional print layouts

### 🛡️ **Security Features**
- **JWT Authentication** - Secure token-based authentication
- **Role-based Access Control** - Granular permission system
- **Input Validation** - Comprehensive data validation
- **Password Hashing** - bcrypt encryption for passwords
- **CORS Protection** - Cross-origin request security

### 📱 **User Experience**
- **Intuitive Navigation** - Easy-to-use interface design
- **Loading States** - User feedback during operations
- **Error Handling** - Graceful error messages and recovery
- **Form Validation** - Real-time input validation

## 🚀 Usage Guide

### For Students:
1. Register with academic details
2. Complete your profile
3. Browse available job opportunities
4. Apply to relevant positions
5. Track application status

### For Companies:
1. Register your company
2. Wait for admin approval
3. Post job openings
4. Review student applications
5. Shortlist and communicate with candidates

### For Administrators:
1. Login to admin dashboard
2. Approve company registrations
3. Monitor job postings
4. Manage student database
5. Generate reports and analytics

## 📸 Screenshots

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)
*Comprehensive admin control panel with glassmorphism design*

### Student Management
![Student Management](screenshots/student-management.png)
*Advanced student filtering, search, and export functionality*

### Company Dashboard
![Company Dashboard](screenshots/company-dashboard.png)
*Modern company interface for job posting and applicant management*

## 🔄 Recent Updates

### v1.0.0 (Latest)
- ✅ Modernized all frontend interfaces with glassmorphism design
- ✅ Implemented advanced student management system
- ✅ Added real-time search and filtering capabilities
- ✅ Enhanced admin dashboard with analytics
- ✅ Improved authentication and security
- ✅ Added export and print functionality
- ✅ Mobile-responsive design implementation

## 🤝 Contributing

We welcome contributions to the Placement Portal! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style and structure
- Add comments for complex functionality
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Known Issues

- [ ] Profile picture upload needs better error handling
- [ ] Email notifications not yet implemented
- [ ] Advanced analytics dashboard in development
- [ ] Mobile app version planned for future

## 📋 TODO

- [ ] Implement email notifications system
- [ ] Add advanced analytics and reporting
- [ ] Create mobile application
- [ ] Add video interview scheduling
- [ ] Implement chat system between students and companies
- [ ] Add placement statistics and success tracking

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors & Contributors

- **Developer** - *Full Stack Development* - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- **Node.js Community** - For excellent backend framework
- **MongoDB Team** - For flexible database solutions
- **Express.js Contributors** - For robust web framework
- **Open Source Community** - For inspiration and code examples
- **Design Community** - For glassmorphism design trends
## 🌟 Show Your Support

If this project helped you or you found it interesting, please consider:

- ⭐ **Starring** this repository
- 🍴 **Forking** for your own modifications
- 📢 **Sharing** with your network
- 🐛 **Reporting** issues you find
- 💡 **Suggesting** new features

---

<div align="center">

**⭐ Star this repository if you found it helpful! ⭐**

Made with ❤️ for the education community

</div>
