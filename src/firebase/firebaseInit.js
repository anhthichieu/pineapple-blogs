import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAQowgcZ-rDXLMEqDJuC_gOrPKaQNKFKow",
  authDomain: "pineappleblogs-426c6.firebaseapp.com",
  projectId: "pineappleblogs-426c6",
  storageBucket: "pineappleblogs-426c6.appspot.com",
  messagingSenderId: "1044962467459",
  appId: "1:1044962467459:web:370e92db1bf67e040545b6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();