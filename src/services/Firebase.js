import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {usersStore} from '../store/Users.js';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
};

async function firebaseApp() {
  return new Promise((resolve, reject) => {
    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      onAuthStateChanged(auth, async user => {
        const users = usersStore();
        users.user = user;
        resolve(app);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export {firebaseApp};
