// Firebase configuration
// Replace these values with your actual Firebase config
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// For production, these values should be set as environment variables
export const getFirebaseConfig = () => {
  return {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || firebaseConfig.apiKey,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || firebaseConfig.projectId,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || firebaseConfig.messagingSenderId,
    appId: process.env.REACT_APP_FIREBASE_APP_ID || firebaseConfig.appId
  };
};
