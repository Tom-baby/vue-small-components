/**
 * Created by chenjiajun on 2018/1/26.
 */
export default [{
	name:'test',
	path: '/test',
	component: (resolve) => {
		require.ensure(['./index.vue'], () => {
			resolve(require('./index.vue'))
		})
	},
}]