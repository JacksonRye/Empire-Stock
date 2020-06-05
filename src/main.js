import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  created() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyBIlm1EKZNAxYwx_ahVgb1DKQjQ644XYiI",
      authDomain: "empire-stock.firebaseapp.com",
      databaseURL: "https://empire-stock.firebaseio.com",
      projectId: "empire-stock",
      storageBucket: "empire-stock.appspot.com",
      messagingSenderId: "356330427643",
      appId: "1:356330427643:web:538d1703cd247bd5e38c5e"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.firestore().enablePersistence()
      .catch(function (err) {
        if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
        } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        }
      });
    // Subsequent queries will use persistence, if it was enabled successfully
  }
}).$mount('#app')
