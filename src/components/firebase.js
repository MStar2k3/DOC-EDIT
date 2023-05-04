import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyAGSNTwjFshoGBdkTzj-HjXWY18h4YWbRE",
    authDomain: "doc-edit-76992.firebaseapp.com",
    projectId: "doc-edit-76992",
    storageBucket: "doc-edit-76992.appspot.com",
    messagingSenderId: "125738721432",
    appId: "1:125738721432:web:a0a6027c94b27a440b70ed",
    measurementId: "G-0BGQRWTTY3"
});

const storage = firebase.storage();
const storageRef = storage.ref();

