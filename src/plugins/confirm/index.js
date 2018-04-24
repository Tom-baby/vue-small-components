/**
 * Created by chenjiajun on 2018/3/23.
 */
import Vue from 'vue'
import message from './index.vue'

console.log('message.vue', message);
const VueComponent = Vue.extend(message);
console.log('VueComponent', VueComponent);
console.log('new VueComponent', new VueComponent());
const vm = new VueComponent().$mount();
console.log('vm', vm);
let init = false;
let defaultOptions = {
	yesBtnText: '确定',
	noBtnText: '取消'
};

const confirm = function (options) {
	
	
	Object.assign(vm, defaultOptions, options, {
			type: 'confirm'
		}
	);
	
	if (!init) {
		document.body.appendChild(vm.$el);
		init = true;
	}
	
	return vm.confirm();
};

export default confirm;