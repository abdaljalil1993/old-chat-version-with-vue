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



createApp(App).use(store).use(router)
.component("fa",FontAwesomeIcon).mount('#app')
