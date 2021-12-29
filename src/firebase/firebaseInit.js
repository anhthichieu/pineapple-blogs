import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBJMkhA9wAvIY1G5Vs7S22QiUFShKSP1u4',
  authDomain: 'blogs-c5f18.firebaseapp.com',
  projectId: 'blogs-c5f18',
  storageBucket: 'blogs-c5f18.appspot.com',
  messagingSenderId: '299731440382',
  appId: '1:299731440382:web:0c3bc76e0f86a2e5fb4baf'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
