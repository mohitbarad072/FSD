const mongoose = require('mongoose');

async function connectDb() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/internal_exam_auth';
  try {
    const allowInsecure = String(process.env.MONGO_TLS_INSECURE || '').toLowerCase() === 'true';
    await mongoose.connect(mongoUri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 15000,
      family: 4,
      tls: true,
      tlsAllowInvalidCertificates: allowInsecure,
      tlsAllowInvalidHostnames: allowInsecure
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
}

module.exports = connectDb;


