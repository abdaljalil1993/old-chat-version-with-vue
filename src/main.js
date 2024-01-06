import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import './assets/mySass/login.scss'
import jQuery from 'jquery'
window.$=window.jQuery=jQuery
window.$cookies=VueCookies
import 'popper.js'
import  firebase from "firebase/app";
import VueCookies from 'vue-cookies'

import {library}from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon}from "@fortawesome/vue-fontawesome"
import {fas}from "@fortawesome/free-solid-svg-icons"
import {fab}from "@fortawesome/free-brands-svg-icons"
library.add(fas,fab)

const firebaseConfig = {
    apiKey: "AIzaSyD0RjRilKmrhA1hIjpYf5vhDh4gHxobYPk",
    authDomain: "memo-d0344.firebaseapp.com",
    databaseURL: "https://memo-d0344-default-rtdb.firebaseio.com",
    projectId: "memo-d0344",
    storageBucket: "memo-d0344.appspot.com",
    messagingSenderId: "977335517103",
    appId: "1:977335517103:web:bc89dff7d26d5eab33f95a",
    measurementId: "G-N77Q3PPBFR"
  };
  firebase.initializeApp(firebaseConfig)

createApp(App).use(store).use(router)
.component("fa",FontAwesomeIcon).mount('#app')
