# Tax Form Calculator

A modern, user-friendly web application built with Express.js and EJS that allows users to calculate their total income from two different sources. The application features server-side validation, secure calculations, and a beautiful responsive interface.

## Features

- ✅ **Server-side calculations** - All calculations are performed securely on the server
- ✅ **Input validation** - Comprehensive validation using express-validator
- ✅ **User-friendly interface** - Modern, responsive design with Bootstrap 5
- ✅ **Error handling** - Proper error messages and validation feedback
- ✅ **EJS templating** - Dynamic content rendering
- ✅ **POST method** - Secure form submission
- ✅ **Mobile responsive** - Works perfectly on all device sizes

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. **Clone or download the project files**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

4. **For development (with auto-restart):**
   ```bash
   npm run dev
   ```

5. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
tax-form-website/
├── app.js              # Main Express application
├── package.json        # Project dependencies and scripts
├── README.md          # This file
└── views/
    ├── index.ejs      # Main form template
    └── error.ejs      # Error page template
```

## How It Works

1. **Form Input**: Users enter income amounts from two different sources
2. **Validation**: Server validates that both inputs are positive numbers
3. **Calculation**: Server performs the addition calculation
4. **Display**: Results are displayed in a beautiful card format
5. **Error Handling**: Invalid inputs show clear error messages

## Security Features

- **Server-side validation**: All input validation happens on the server
- **No client-side calculations**: Calculations are performed securely on the server
- **Input sanitization**: Express-validator ensures clean, safe input
- **Error boundaries**: Proper error handling prevents crashes

## Technologies Used

- **Backend**: Express.js
- **Template Engine**: EJS
- **Validation**: express-validator
- **Frontend**: Bootstrap 5, Font Awesome
- **Styling**: Custom CSS with gradients and animations

## API Endpoints

- `GET /` - Display the tax form
- `POST /calculate` - Process form submission and calculate total income

## Customization

You can easily customize the application by:

- Modifying the validation rules in `app.js`
- Changing the styling in the EJS templates
- Adding more income sources
- Implementing additional calculations

## License

MIT License - feel free to use this project for educational or commercial purposes.

## Support

If you encounter any issues or have questions, please check the error messages displayed in the application or review the console output for debugging information.
