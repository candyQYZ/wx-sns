// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import axios from 'axios'
import router from './router'
import fastclick from 'fastclick'
import './js/rem'
Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded ';
window.$axios = axios
fastclick.attach(document.body)
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    isLoading: false,
    isShowAlert: false,
    isLoging: true,
    alertTxt: ''
  },
  mutations: {
    showAlertTip(state, alertTxt) {
      state.isShowAlert = true;
      state.alertTxt = alertTxt;
      setTimeout(function () {
        state.isShowAlert = false;
        state.alertTxt = '';
      }, 2000)
    },
    setIsLoading(state, flag) {
      state.isLoading = flag;
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
