# Library Portal with User Session Management

A modern web application that demonstrates user authentication and session management for a library portal. This project simulates real login/logout functionality with secure session handling.

## Features

### 🔐 Authentication & Sessions
- **User Registration**: Create new accounts with secure password hashing
- **User Login**: Authenticate users and create sessions
- **Session Management**: Track user sessions with login time and session ID
- **Secure Logout**: Properly destroy sessions when users log out
- **Session Protection**: Protected routes that require authentication

### 📱 User Interface
- **Modern Design**: Beautiful, responsive UI with gradient backgrounds
- **Dashboard**: Main user interface after login
- **Profile Page**: View user information and session details
- **Session Tracking**: Real-time display of session duration
- **Responsive Layout**: Works on desktop, tablet, and mobile devices

### 🛡️ Security Features
- **Password Hashing**: Uses bcrypt for secure password storage
- **Session Cookies**: Secure session management with Express sessions
- **Route Protection**: Middleware to protect authenticated routes
- **Input Validation**: Form validation and error handling

## Demo Users

For testing purposes, the application includes two pre-configured users:

| Username | Password | Name | Email |
|----------|----------|------|-------|
| `john_doe` | `password` | John Doe | john@example.com |
| `jane_smith` | `password` | Jane Smith | jane@example.com |

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Step 1: Clone or Download
Download the project files to your local machine.

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Application
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

### Step 4: Access the Application
Open your web browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
library-portal/
├── server.js              # Main server file with Express setup
├── package.json           # Project dependencies and scripts
├── README.md             # This file
└── public/               # Frontend files
    ├── index.html        # Landing page
    ├── login.html        # Login page
    ├── register.html     # Registration page
    ├── dashboard.html    # User dashboard
    ├── profile.html      # User profile page
    └── styles.css        # CSS styling
```

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/logout` - User logout

### Session Information
- `GET /api/session-info` - Get current user session details

### Pages
- `GET /` - Landing page (redirects to dashboard if logged in)
- `GET /login` - Login page
- `GET /register` - Registration page
- `GET /dashboard` - User dashboard (requires authentication)
- `GET /profile` - User profile (requires authentication)

## Session Management Details

### What Gets Stored in Session
When a user logs in, the following information is stored in their session:
- `userId`: Unique user identifier
- `username`: User's username
- `name`: User's full name
- `loginTime`: Timestamp when the user logged in

### Session Configuration
- **Duration**: 24 hours
- **Security**: Uses secure session secret
- **Storage**: In-memory (for demo purposes)

### Session Information Displayed
- **Login Time**: When the user logged in
- **Session ID**: Unique session identifier
- **Session Duration**: Real-time calculation of how long the session has been active

## Usage Examples

### 1. User Registration
1. Navigate to the registration page
2. Fill in your details (name, email, username, password)
3. Submit the form
4. You'll be redirected to login

### 2. User Login
1. Use one of the demo accounts or register a new one
2. Enter username and password
3. Upon successful login, you'll be redirected to the dashboard

### 3. Viewing Session Information
1. After login, visit the Profile page
2. View your personal information and session details
3. Session duration updates in real-time

### 4. Logging Out
1. Click the "Logout" button in the navigation
2. Your session will be destroyed
3. You'll be redirected to the home page

## Technical Implementation

### Backend Technologies
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **express-session**: Session management
- **bcryptjs**: Password hashing
- **body-parser**: Request parsing

### Frontend Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Client-side functionality
- **Fetch API**: HTTP requests

### Security Considerations
- Passwords are hashed using bcrypt
- Sessions are properly managed and destroyed
- Protected routes prevent unauthorized access
- Input validation on both client and server

## Customization

### Adding New Users
To add new users, modify the `users` array in `server.js`:

```javascript
const users = [
    // ... existing users
    {
        id: 3,
        username: 'new_user',
        password: '$2a$10$...', // Use bcrypt to hash passwords
        name: 'New User',
        email: 'newuser@example.com'
    }
];
```

### Changing Session Duration
Modify the `maxAge` property in the session configuration:

```javascript
app.use(session({
    // ... other options
    cookie: {
        maxAge: 60 * 60 * 1000 // 1 hour
    }
}));
```

### Styling Customization
Edit `public/styles.css` to customize the appearance:
- Change colors in CSS variables
- Modify layout and spacing
- Add new animations or effects

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Change the port in server.js
   const PORT = process.env.PORT || 3001;
   ```

2. **Dependencies Not Found**
   ```bash
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Session Not Persisting**
   - Check if cookies are enabled in your browser
   - Ensure you're not in incognito/private mode

### Development Tips
- Use `npm run dev` for development with auto-restart
- Check browser console for JavaScript errors
- Monitor server logs for backend issues

## Future Enhancements

Potential improvements for a production environment:
- Database integration (MongoDB, PostgreSQL)
- JWT tokens for stateless authentication
- Password reset functionality
- Email verification
- Role-based access control
- Activity logging
- Rate limiting
- HTTPS implementation

## License

This project is for educational purposes. Feel free to use and modify as needed.

## Support

If you encounter any issues or have questions, please check the troubleshooting section above or create an issue in the project repository.
