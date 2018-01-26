/**
 * Created by chenjiajun on 2018/1/8.
 */
import Validator from './index.vue'

Validator.install = function (Vue) {
	Vue.component(Validator.name, Validator);
};

export default Validator;