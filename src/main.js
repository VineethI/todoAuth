import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import axios from "axios";
import Vuelidate from "vuelidate";
import "nprogress/nprogress.css";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(Vuelidate);

const firebaseConfig = {
  apiKey: "AIzaSyAzLaQ7JwRjJ4_AD7j1oetaFCpIgK95AjQ",
  authDomain: "w3dev-round2.firebaseapp.com",
  databaseURL: "https://w3dev-round2.firebaseio.com",
  projectId: "w3dev-round2",
  storageBucket: "w3dev-round2.appspot.com",
  messagingSenderId: "213854046606",
  appId: "1:213854046606:web:4e7e8d6e12e3a79d673cdf",
  measurementId: "G-Z83045860E",
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
