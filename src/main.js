import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue2Editor from 'vue2-editor';
import '@/assets/style.scss';

Vue.config.productionTip = false

Vue.use(Vue2Editor);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
