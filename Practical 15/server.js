const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Session configuration
app.use(session({
    secret: 'library-portal-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// In-memory user storage (in a real app, this would be a database)
const users = [
    {
        id: 1,
        username: 'john_doe',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        name: 'John Doe',
        email: 'john@example.com'
    },
    {
        id: 2,
        username: 'jane_smith',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        name: 'Jane Smith',
        email: 'jane@example.com'
    }
];

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Routes
app.get('/', (req, res) => {
    if (req.session.userId) {
        res.redirect('/dashboard');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});

app.get('/login', (req, res) => {
    if (req.session.userId) {
        res.redirect('/dashboard');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }
});

app.get('/register', (req, res) => {
    if (req.session.userId) {
        res.redirect('/dashboard');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'register.html'));
    }
});

app.get('/dashboard', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/profile', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// API Routes
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username);
    
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Create session
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.name = user.name;
    req.session.loginTime = new Date().toISOString();
    
    res.json({ 
        success: true, 
        message: 'Login successful',
        user: {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email
        }
    });
});

app.post('/api/register', async (req, res) => {
    const { username, password, name, email } = req.body;
    
    // Check if user already exists
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
        id: users.length + 1,
        username,
        password: hashedPassword,
        name,
        email
    };
    
    users.push(newUser);
    
    res.json({ 
        success: true, 
        message: 'Registration successful. Please login.' 
    });
});

app.get('/api/session-info', requireAuth, (req, res) => {
    const user = users.find(u => u.id === req.session.userId);
    
    res.json({
        user: {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email
        },
        session: {
            loginTime: req.session.loginTime,
            sessionId: req.session.id
        }
    });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Library Portal running on http://localhost:${PORT}`);
    console.log('Test users:');
    console.log('Username: john_doe, Password: password');
    console.log('Username: jane_smith, Password: password');
});
