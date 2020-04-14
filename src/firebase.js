
import { initializeApp } from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';


const app = initializeApp({
    apiKey: "AIzaSyAz4UGab0GZksaYvq0YIJozhM6Vq9eutrk",
    authDomain: "chat-98a53.firebaseapp.com",
    databaseURL: "https://chat-98a53.firebaseio.com",
    projectId: "chat-98a53",
    storageBucket: "chat-98a53.appspot.com",
    messagingSenderId: "614845982229",
    appId: "1:614845982229:web:b40065d55b5207f3ca101c",
    measurementId: "G-PG7D93FFJ0"
})

export const db = app.firestore();
export const namesRefs = db