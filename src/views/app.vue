<template>
	<div>
		<router-view></router-view>
		<confirm></confirm>
	</div>
</template>

<script>
	import confirm from '../plugins/confirm/confirm2.vue'
	
	export default {
		components: {
			confirm
		}
	}
</script>