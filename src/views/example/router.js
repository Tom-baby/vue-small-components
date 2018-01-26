const IndexRoute = r => require.ensure([], () => r(require('./index.vue')), 'example');
const validTableRoute = r => require.ensure([], () => r(require('./validTable/index.vue')), 'validTable');
const AccountInputRoute = r => require.ensure([], () => r(require('./accountInput/index.vue'), 'accountInput'));

export default [{
	name: 'example',
	path: '/example',
	component: IndexRoute,
	children: [{
		name: 'validTable',
		path: 'validTable',
		meta: '可编辑的单元格验证',
		component: validTableRoute
	}, {
		name: 'accountInput',
		path: 'accountInput',
		meta: '金额组件',
		component: AccountInputRoute
	}]
}]