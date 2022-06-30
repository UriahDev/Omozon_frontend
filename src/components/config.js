const p = process.env;

export const firebaseConfig = {
    apiKey: p.REACT_APP_API_KEY,
    authDomain: p.REACT_APP_AUTH_DOMAIN,
    projectId: p.REACT_APP_PROJECT_ID,
    storageBucket: p.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: p.REACT_APP_MESSAGING_SENDER_ID,
    appId: p.REACT_APP_APP_ID
};

