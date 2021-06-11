import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBxxK3TzYtaxRsaIlW1xolBUufGhlbeXNo",
    authDomain: "javascript-millionaire.firebaseapp.com",
    projectId: "javascript-millionaire",
    storageBucket: "javascript-millionaire.appspot.com",
    messagingSenderId: "954309459433",
    appId: "1:954309459433:web:fe793dae71e99042b85f78"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;