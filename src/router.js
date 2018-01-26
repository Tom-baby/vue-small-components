/**
 * Created by chenjiajun on 2017/10/31.
 */
import Router from 'vue-router'

// 页面路由引入
import NotFoundRoute from './views/notFound/router'
import exampleRoute from './views/example/router'
import testRoute from './views/test/router'

const router = new Router({
	mode: 'history',
	routes: [
		...NotFoundRoute,
		...exampleRoute,
		...testRoute
	]
});

export default router