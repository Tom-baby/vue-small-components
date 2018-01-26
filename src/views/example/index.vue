<template>
	<div class="clearfix" id="example-wrapper">
		<div class="header-wrapper">
			组件示例
		</div>
		<div class="menu side-bar">
			<el-menu
				router
				:default-active="menuActive"
				class="el-menu-vertical-demo">
				<template v-for="(o,index) in list">
					<el-menu-item :index="`/example/${o.path}`">
						{{o.meta}}
					</el-menu-item>
				</template>
			</el-menu>
		</div>
		<div class="page-wrapper">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: this.$router.options.routes[1].children,
				menuActive: this.$router.options.routes[1].children[0].meta
			}
		}
	}
</script>

<style lang="less" type="text/less">
	@import "../../static/less/base.less";
	.header-wrapper{
		z-index: 2000;
	}
</style>