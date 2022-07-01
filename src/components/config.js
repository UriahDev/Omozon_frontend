const p = import.meta.env;

const apiKey = p.VITE_API_KEY;
const authDomain = p.VITE_AUTH_DOMAIN;
const projectId = p.VITE_PROJECT_ID;
const storageBucket = p.VITE_STORAGE_BUCKET;
const messagingSenderId = p.VITE_MESSAGING_SENDER_ID;
const appId = p.VITE_APP_ID;

export const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
};

