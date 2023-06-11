import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAacTlq7VWfBXHStQ-SUVHw5NXkA0OsdhY",
    authDomain: "link-3a258.firebaseapp.com",
    projectId: "link-3a258",
    storageBucket: "link-3a258.appspot.com",
    messagingSenderId: "75308484268",
    appId: "1:75308484268:web:22291f80648b1910e90109",
    measurementId: "G-QQFYZWZHDP"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };