import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue2Editor from 'vue2-editor';
import '@/assets/styles/style.scss';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

Vue.config.productionTip = false

Vue.use(Vue2Editor);

let app;
firebase.auth().onAuthStateChanged(() => {
  // make sure that Firebase loads the authState before mounting the app
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
