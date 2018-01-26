/**
 * Created by chenjiajun on 2017/10/31.
 */
export default [{
	name:'notFound',
	path: '*',
	component: (resolve) => {
		require.ensure(['./index.vue'], () => {
			resolve(require('./index.vue'))
		})
	},
}]