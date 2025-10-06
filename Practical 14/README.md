# Job Portal - Resume Upload System

A modern job portal built with Express.js that allows users to upload resumes with secure file validation and management.

## Features

- **Secure File Upload**: Only accepts PDF files up to 2MB
- **Drag & Drop Interface**: Modern, intuitive upload experience
- **File Validation**: Server-side validation for file type and size
- **Resume Management**: View, download, and delete uploaded resumes
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Feedback**: Progress indicators and status messages
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Security Features

- **File Type Validation**: Only PDF files are accepted
- **File Size Limitation**: Maximum 2MB file size
- **Unique Filenames**: Prevents filename conflicts
- **CORS Support**: Cross-origin resource sharing enabled
- **Input Sanitization**: Proper file handling and validation

## Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and go to `http://localhost:3000`

## API Endpoints

### Upload Resume
- **POST** `/upload-resume`
- **Body**: Form data with `resume` field
- **Response**: JSON with upload status and file details

### Get All Resumes
- **GET** `/resumes`
- **Response**: JSON array of uploaded resumes

### Download Resume
- **GET** `/download/:filename`
- **Response**: File download

### Delete Resume
- **DELETE** `/delete/:filename`
- **Response**: JSON with deletion status

## File Structure

```
job-portal-resume-upload/
├── server.js              # Main Express server
├── package.json           # Dependencies and scripts
├── public/
│   └── index.html         # Frontend interface
├── uploads/               # Uploaded files directory (auto-created)
└── README.md              # This file
```

## Usage

1. **Upload a Resume**:
   - Drag and drop a PDF file onto the upload area, or
   - Click "Choose File" to browse and select a PDF file
   - The file must be under 2MB and in PDF format

2. **View Uploaded Resumes**:
   - All uploaded resumes are displayed in the list below
   - Shows file name, size, and upload date

3. **Manage Resumes**:
   - **Download**: Click the "Download" button to save a copy
   - **Delete**: Click the "Delete" button to remove a resume

## Error Handling

The application handles various error scenarios:

- **Invalid File Type**: Shows error for non-PDF files
- **File Too Large**: Shows error for files over 2MB
- **Upload Failures**: Displays appropriate error messages
- **Network Issues**: Handles connection problems gracefully

## Dependencies

- **Express.js**: Web framework
- **Multer**: File upload middleware
- **CORS**: Cross-origin resource sharing
- **Path**: File path utilities
- **FS**: File system operations

## Development

To run in development mode with auto-restart:
```bash
npm run dev
```

This uses nodemon to automatically restart the server when files change.

## Production Deployment

For production deployment:

1. Set the `PORT` environment variable
2. Ensure proper file permissions for the uploads directory
3. Consider using a reverse proxy (nginx, Apache)
4. Implement additional security measures as needed

## Security Considerations

- Files are stored with unique names to prevent conflicts
- Only PDF files are accepted
- File size is strictly limited to 2MB
- Server validates file type using MIME type checking
- Upload directory is separate from application files

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (responsive design)

## License

MIT License - feel free to use and modify as needed.
