// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfibnTv03LtZ82Ss9ku6owo25UY0_dcnY",
    authDomain: "msrtc-test26.firebaseapp.com",
    projectId: "msrtc-test26",
    storageBucket: "msrtc-test26.appspot.com",
    messagingSenderId: "201729585988",
    appId: "1:201729585988:web:0210f5916e55a1ab111d11"
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();
export { auth };
