# Tuition Class Admin Panel

A comprehensive admin panel for managing tuition class students with a modern, responsive interface built with Express.js, MongoDB, and vanilla JavaScript.

## Features

### 🎯 Core Functionality
- **Add Students**: Complete student registration with comprehensive details
- **View Students**: Display all students in a sortable, searchable table
- **Edit Students**: Update student information with real-time validation
- **Delete Students**: Remove students with confirmation dialog
- **Search**: Real-time search across student names, emails, and phone numbers

### 📊 Dashboard Statistics
- Total number of students
- Active students count
- Total monthly fees collected
- Real-time updates

### 🎨 User Interface
- Modern, responsive design
- Mobile-friendly interface
- Intuitive navigation
- Loading states and animations
- Success/error notifications
- Keyboard shortcuts (Ctrl+N for new student, Esc to close modals)

### 📋 Student Information
- Full name and contact details
- Grade level (1st-12th)
- Multiple subject selection
- Monthly fee tracking
- Enrollment date
- Student status (Active/Inactive/Completed)
- Parent/Guardian information
- Address details

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with modern design patterns
- **Icons**: Font Awesome

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd tuition-admin-panel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system. If you're using MongoDB locally:
   ```bash
   mongod
   ```

4. **Start the application**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open your browser and navigate to: `http://localhost:3000`

## Database Configuration

The application connects to MongoDB using the following default configuration:
- **Database**: `tuition_admin`
- **Connection URL**: `mongodb://localhost:27017/tuition_admin`

To use a different database or connection string, modify the connection in `server.js`:

```javascript
mongoose.connect('your-mongodb-connection-string', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
```

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student
- `GET /api/students/search/:query` - Search students

### Statistics
- `GET /api/stats` - Get dashboard statistics

## Project Structure

```
tuition-admin-panel/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── README.md             # Project documentation
├── public/               # Frontend files
│   ├── index.html        # Main HTML file
│   ├── styles.css        # CSS styles
│   └── script.js         # JavaScript functionality
└── node_modules/         # Dependencies (created after npm install)
```

## Usage Guide

### Adding a New Student
1. Click the "Add New Student" button or press `Ctrl+N`
2. Fill in all required fields (marked with *)
3. Select at least one subject
4. Click "Save Student"

### Editing a Student
1. Click the "Edit" button next to any student
2. Modify the information as needed
3. Click "Save Student"

### Searching Students
1. Use the search box in the top-right corner
2. Type any part of the student's name, email, or phone number
3. Results update in real-time

### Deleting a Student
1. Click the "Delete" button next to any student
2. Confirm the deletion in the popup dialog
3. The student will be permanently removed

## Features in Detail

### Student Management
- **Comprehensive Data**: Store complete student information including personal details, academic information, and parent/guardian contacts
- **Status Tracking**: Monitor student status (Active, Inactive, Completed)
- **Fee Management**: Track monthly fees for each student
- **Subject Selection**: Multiple subject enrollment with checkbox interface

### Search and Filter
- **Real-time Search**: Instant search results as you type
- **Multiple Fields**: Search across name, email, and phone number
- **Case-insensitive**: Search works regardless of case

### Data Validation
- **Client-side Validation**: Immediate feedback on form errors
- **Server-side Validation**: Robust backend validation
- **Duplicate Prevention**: Email uniqueness enforcement
- **Required Fields**: Comprehensive field validation

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Visual feedback during operations
- **Success/Error Messages**: Clear communication of results
- **Keyboard Shortcuts**: Quick access to common actions
- **Modal Dialogs**: Clean, focused interfaces for data entry

## Customization

### Adding New Fields
To add new student fields:

1. Update the MongoDB schema in `server.js`
2. Modify the HTML form in `public/index.html`
3. Update the JavaScript form handling in `public/script.js`
4. Adjust the table rendering to display the new field

### Styling Changes
The application uses custom CSS with modern design patterns. Key styling files:
- `public/styles.css` - Main stylesheet
- Responsive design with CSS Grid and Flexbox
- Modern color scheme and typography

### Database Schema
The student schema includes:
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  grade: String (required, enum),
  subjects: [String] (required),
  enrollmentDate: Date (auto-generated),
  fee: Number (required),
  status: String (enum: active/inactive/completed),
  address: String (required),
  parentName: String (required),
  parentPhone: String (required),
  timestamps: true
}
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `server.js`
   - Verify database permissions

2. **Port Already in Use**
   - Change the port in `server.js` (line 10)
   - Kill existing processes on port 3000

3. **Dependencies Not Found**
   - Run `npm install` to install missing packages
   - Check `package.json` for correct dependencies

### Performance Tips
- Use the search feature instead of scrolling through large lists
- Keep student data up to date for accurate statistics
- Regularly backup your MongoDB database

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Happy Teaching! 📚✨**
