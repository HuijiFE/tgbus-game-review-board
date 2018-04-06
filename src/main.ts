// tslint:disable:no-import-side-effect
import 'normalize.css';
import '@/main.scss';
import Vue from 'vue';
import App from '@/App.vue';

Vue.config.productionTip = false;

/**
 * App
 */
new Vue({
  render: createElement => createElement(App),
}).$mount('#app');
