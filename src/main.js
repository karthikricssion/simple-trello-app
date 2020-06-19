import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMaterialIcon from 'vue-material-icon';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import HomeIcon from 'vue-material-design-icons/Home.vue';
import CloseIcon from 'vue-material-design-icons/Close.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false
Vue.component(VueMaterialIcon.name, VueMaterialIcon)
Vue.component('delete-icon', DeleteIcon);
Vue.component('close-icon', CloseIcon);
Vue.component('home-icon', HomeIcon);
Vue.use(require('vue-moment'));
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
