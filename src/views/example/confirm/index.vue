<template>
	<div>
		
		<message
			type="confirm"
			:title="confirmTitle"
			:msg="confrimMsg"
			:isShow="isConfirmShow"
			yesBtnText="覆盖"
			@noClick="cancelDel"
			@yesClick="doDel">
		</message>
		
		<button @click="showConfirm1">显示confirm(传属性)</button>
		<button @click="showConfirm2">显示confirm(store)</button>
		<button @click="showConfirm">显示confirm(promise)</button>
	</div>
</template>

<script>
	import Message from '../../../plugins/confirm/confirm1.vue'
	
	let nextObj = null;
	export default {
		components: {
			Message
		},
		data() {
			return {
				isConfirmShow: false,
				confirmTitle: '计划冲突',
				confrimMsg: ''
			}
		},
		beforeRouteLeave(to, from, next) {
			/*this.$confirm({
				title: '',
				msg: '模式未保存，确定离开？',
				yesBtnText: "离开"
			}).then(() => {
				next();
			}).catch(() => {
				next(false);
			});*/
			
			/*this.$store.commit('confirm', {
				title: 'title',
				msg: '模式未保存，确定离开',
				yesClick: () => {
					next();
				},
				noClick: () => {
					next(false);
				}
			});*/
			this.showConfirm1();
			nextObj = next;
		},
		methods: {
			showConfirm1() {
				this.isConfirmShow = true;
			},
			cancelDel() {
				this.isConfirmShow = false;
				nextObj && nextObj(false);
			},
			doDel() {
				this.isConfirmShow = false;
				nextObj && nextObj();
			},
			showConfirm2() {
				this.$store.commit('confirm', {
					title: 'title',
					msg: '是否确认删除',
					yesClick: () => {
						console.log('yes');
					},
					noClick: () => {
						console.log('no');
					}
				});
			},
			showConfirm() {
				this.$confirm({
					title: '',
					msg: '模式未保存，确定离开？',
					yesBtnText: "离开"
				}).then(() => {
					console.log('yes');
				}).catch(() => {
					console.log('no');
				});
			}
		}
	}
</script>