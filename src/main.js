import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import firebase from "firebase/app";
// import "firebase/firestore";
import './firebase'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)

Vue.config.productionTip = false;



// Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyAz4UGab0GZksaYvq0YIJozhM6Vq9eutrk",
//   authDomain: "chat-98a53.firebaseapp.com",
//   databaseURL: "https://chat-98a53.firebaseio.com",
//   projectId: "chat-98a53",
//   storageBucket: "chat-98a53.appspot.com",
//   messagingSenderId: "614845982229",
//   appId: "1:614845982229:web:b40065d55b5207f3ca101c",
//   measurementId: "G-PG7D93FFJ0"
// };
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);




//Vue.prototype.$db = firebase.firestore()

// const db = firebaseApp.firestore();

//  export { db };







new Vue({
  router,
  store,
  render: h => h(App),
  
}).$mount("#app");
