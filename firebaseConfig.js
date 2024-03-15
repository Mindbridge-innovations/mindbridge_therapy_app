// firebaseConfig.js

import {initializeApp, getApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import Config from './config';

const firebaseConfig = {
  apiKey: Config.API_KEY,
  authDomain: Config.AUTH_DOMAIN,
  projectId: Config.PROJECT_ID,
  storageBucket: Config.STORAGE_BUCKET,
  messagingSenderId: Config.MESSAGE_SENDER_ID,
  appId: Config.APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export {db, auth};
