const IndexRoute = r => require.ensure([], () => r(require('./index.vue')), 'example');
const validTableRoute = r => require.ensure([], () => r(require('./validTable/index.vue')), 'validTable');
const AccountInputRoute = r => require.ensure([], () => r(require('./accountInput/index.vue'), 'accountInput'));
const ConfirmRoute = r => require.ensure([], () => r(require('./confirm/index.vue'), 'confirm'));

export default [{
	name: 'example',
	path: '/example',
	component: IndexRoute,
	children: [/*{
		name: 'validTable',
		path: 'validTable',
		meta: '可编辑的单元格验证',
		component: validTableRoute
	}, {
		name: 'accountInput',
		path: 'accountInput',
		meta: '金额组件',
		component: AccountInputRoute
	},*/ {
		name: 'Confirm',
		path: 'Confirm',
		meta: 'confirm组件',
		component: ConfirmRoute
	}]
}]