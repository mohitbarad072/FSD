# Freelance Portfolio Website

A modern, responsive portfolio website with a contact form that sends emails using NodeMailer. Built with Express.js, HTML5, CSS3, and vanilla JavaScript.

## Features

- 🎨 **Modern Design**: Clean, professional design with smooth animations
- 📱 **Responsive**: Fully responsive design that works on all devices
- 📧 **Contact Form**: Functional contact form with email sending capability
- ✅ **Form Validation**: Client-side and server-side validation
- 🔒 **Rate Limiting**: Protection against spam submissions
- ⚡ **Fast Performance**: Optimized for speed and user experience
- 🎯 **SEO Friendly**: Proper meta tags and semantic HTML

## Sections

1. **Hero Section**: Introduction with call-to-action buttons
2. **About Section**: Personal information and skills
3. **Services Section**: Services offered with icons
4. **Portfolio Section**: Showcase of projects
5. **Contact Section**: Contact form and information

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Gmail account (for email functionality)

## Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd freelance-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `env.example` to `.env`
   - Update the email configuration in `.env`:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   PORT=3000
   NODE_ENV=development
   ```

4. **Configure Gmail for sending emails**
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password:
     1. Go to Google Account settings
     2. Security → 2-Step Verification → App passwords
     3. Generate a new app password for "Mail"
     4. Use this password in your `.env` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Visit `http://localhost:3000`

## Customization

### Personal Information
Update the following files to customize your portfolio:

- **`public/index.html`**: Update name, title, description, and contact information
- **`public/styles.css`**: Modify colors, fonts, and styling
- **`server.js`**: Update email templates and validation rules

### Color Scheme
The main colors used in the design:
- Primary Blue: `#2563eb`
- Secondary Purple: `#7c3aed`
- Accent Yellow: `#fbbf24`
- Dark Gray: `#1f2937`

### Adding Projects
To add your own projects to the portfolio section:

1. Find the portfolio grid in `public/index.html`
2. Copy the portfolio item structure
3. Update the project details, links, and technologies used

### Adding Skills
To add or modify skills in the about section:

1. Find the skill tags in `public/index.html`
2. Add or remove `<span class="skill-tag">Skill Name</span>` elements

## Email Configuration

The contact form uses NodeMailer to send emails. The email template includes:

- Sender's name, email, and subject
- Formatted message content
- Professional styling
- Reply-to functionality

### Email Template Customization
To customize the email template, modify the `mailOptions.html` in `server.js`:

```javascript
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  replyTo: email,
  subject: `Portfolio Contact: ${subject}`,
  html: `Your custom HTML template here`
};
```

## Form Validation

The contact form includes comprehensive validation:

### Client-side Validation
- Name: Minimum 2 characters
- Email: Valid email format
- Subject: Minimum 5 characters
- Message: Minimum 10 characters

### Server-side Validation
- Same validation rules as client-side
- Rate limiting (5 submissions per 15 minutes per IP)
- Error handling and user feedback

## Security Features

- **Rate Limiting**: Prevents spam submissions
- **Input Validation**: Both client and server-side
- **CORS Protection**: Configured for security
- **Environment Variables**: Sensitive data protection

## Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Deploy to Heroku
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new Heroku app
4. Set environment variables in Heroku dashboard
5. Deploy using Git

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

## File Structure

```
freelance-portfolio/
├── public/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS styles
│   └── script.js           # JavaScript functionality
├── server.js               # Express server with NodeMailer
├── package.json            # Dependencies and scripts
├── env.example             # Environment variables template
└── README.md               # This file
```

## Dependencies

- **Express.js**: Web framework
- **NodeMailer**: Email sending
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **express-rate-limit**: Rate limiting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues:

1. Check the console for error messages
2. Verify your email configuration
3. Ensure all dependencies are installed
4. Check that the server is running on the correct port

## Updates and Maintenance

- Keep dependencies updated regularly
- Monitor email delivery rates
- Test the contact form periodically
- Update portfolio content as needed

---

**Note**: Remember to replace placeholder content (name, email, projects, etc.) with your actual information before deploying.
