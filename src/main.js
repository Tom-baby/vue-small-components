/**
 * Created by chenjiajun on 2017/10/31.
 */
import Vue from 'vue'
import App from './views/app.vue'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import ValidItem from './plugins/valid-item'
import Validator from './plugins/validator'
import AmountInput from './plugins/amount-input'
import confirm from './plugins/confirm'
import store from './store/index'

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Validator);
Vue.use(ValidItem);
Vue.use(AmountInput);

Vue.prototype.$confirm = confirm;
console.log('APP', App);


const app = new Vue({
	el: '#app',
	router,
	store,
	...App
});
