# Productivity Dashboard - MERN Stack Web Application

A modern, responsive task management and productivity dashboard built with the MERN stack (MongoDB, Express.js, React, Node.js) and deployed on Firebase.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure registration and login system with JWT tokens
- **Task Management**: Create, update, delete, and organize tasks with priorities and due dates
- **Project Organization**: Group tasks into projects with progress tracking
- **Real-time Analytics**: Visualize productivity with charts and statistics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Task Features
- ✅ Create and manage tasks with titles, descriptions, and due dates
- 🏷️ Organize tasks with tags and priority levels (Low, Medium, High, Urgent)
- 📊 Track task status (To Do, In Progress, Completed)
- ⏱️ Time tracking with estimated and actual time
- 🔍 Advanced filtering and search capabilities

### Project Features
- 📁 Create and manage multiple projects
- 🎨 Custom project colors and descriptions
- 📈 Progress tracking with completion percentages
- 📅 Project start and end dates
- 📊 Project statistics and task counts

### Analytics & Insights
- 📊 Task completion rates and productivity trends
- 📈 Daily and weekly productivity charts
- 🎯 Priority distribution analysis
- ⏰ Time tracking statistics
- 📋 Project status overview

### User Experience
- 🌙 Dark/Light theme support
- 🔔 Notification preferences
- 📱 Fully responsive design
- ⚡ Fast and smooth animations
- 🎨 Modern Material-UI design system

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **MUI X Date Pickers** - Date/time selection

### Deployment
- **Firebase Hosting** - Frontend hosting
- **MongoDB Atlas** - Cloud database (recommended)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd productivity-dashboard
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### 4. Environment Configuration
Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/productivity-dashboard
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

### 5. Start the Development Server
```bash
# Start both backend and frontend
npm run dev

# Or start them separately
npm run server  # Backend only
npm run client  # Frontend only
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🚀 Deployment

### Firebase Hosting Setup

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**
```bash
firebase login
```

3. **Initialize Firebase Project**
```bash
firebase init hosting
```

4. **Build the React App**
```bash
cd client
npm run build
cd ..
```

5. **Deploy to Firebase**
```bash
firebase deploy
```

### MongoDB Atlas Setup (Recommended)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your environment variables

## 📁 Project Structure

```
productivity-dashboard/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Auth/       # Authentication components
│   │   │   ├── Dashboard/  # Dashboard components
│   │   │   ├── Tasks/      # Task management components
│   │   │   ├── Projects/   # Project management components
│   │   │   ├── Analytics/  # Analytics components
│   │   │   ├── Profile/    # User profile components
│   │   │   ├── Layout/     # Layout components
│   │   │   └── UI/         # Reusable UI components
│   │   ├── contexts/       # React contexts
│   │   ├── config/         # Configuration files
│   │   └── App.tsx
│   └── package.json
├── models/                 # MongoDB models
├── routes/                 # Express routes
├── middleware/             # Custom middleware
├── server.js              # Express server
├── package.json
├── firebase.json          # Firebase configuration
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard analytics
- `GET /api/analytics/productivity` - Get productivity trends

## 🎨 Customization

### Themes
The application supports light and dark themes. Users can toggle between themes in their profile settings.

### Colors
Project colors can be customized from a predefined palette of 12 colors.

### Styling
The app uses Material-UI's theming system for consistent styling across all components.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI for the component library
- React team for the amazing framework
- MongoDB for the database
- Firebase for hosting
- All the open-source contributors

## 📞 Support

If you have any questions or need help, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Made with ❤️ using the MERN stack**
