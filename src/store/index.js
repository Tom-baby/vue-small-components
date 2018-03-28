/**
 * Created by chenjiajun on 2018/3/28.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import confirm from './modules/confirm2';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules:{
		confirm
	}
});

export default store;