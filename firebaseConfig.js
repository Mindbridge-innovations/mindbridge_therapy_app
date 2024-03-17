// firebaseConfig.js

import {initializeApp, getApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { getDatabase } from 'firebase/database'; // Import for Realtime Database

import Config from './config';

const firebaseConfig = {
  apiKey: Config.API_KEY,
  authDomain: Config.AUTH_DOMAIN,
  projectId: Config.PROJECT_ID,
  storageBucket: Config.STORAGE_BUCKET,
  messagingSenderId: Config.MESSAGE_SENDER_ID,
  appId: Config.APP_ID,
  databaseURL: Config.DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});//using firestore
const rtdb = getDatabase(app); //using realtime database

export {db, auth,rtdb};
