import firebase from 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyBl8KfriYWFO8BQcEhqFdB_fVm4vf6B528",
    authDomain: "mystery-meal-132a4.firebaseapp.com",
    databaseURL: "https://mystery-meal-132a4-default-rtdb.firebaseio.com",
    projectId: "mystery-meal-132a4",
    storageBucket: "mystery-meal-132a4.appspot.com",
    messagingSenderId: "706998004488",
    appId: "1:706998004488:web:63db910f3e9404c32fdabd"
};
// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
export const db = app.database();
    