import "bootstrap/dist/css/bootstrap.min.css";
import VueMaterialIcon from 'vue-material-icon';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import CloseIcon from 'vue-material-design-icons/Close.vue'
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
Vue.component(VueMaterialIcon.name, VueMaterialIcon)
Vue.component('delete-icon', DeleteIcon);
Vue.component('close-icon', CloseIcon);
Vue.use(require('vue-moment'));

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
