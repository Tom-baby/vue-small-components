<template>
	<div :class="{'pop-up':true,'show':isShow}">
		<div class="popup-mask" v-if="hasMark"></div>
		<transition name="bottom">
			<div class="popup-note bottom">
				<div class="pop-content">
					<div class="pop-tit">
						{{title}}
					</div>
					<p class="pop-note hasTitle">
						<span class="msg" v-html="msg"></span>
					</p>
					<div class="btn-wrapper" v-if="type == 'alert'" @click.stop="alertClick">
						<span class="btn btn-block yes-btn">{{alertBtnText}}</span>
					</div>
					<div class="btn-wrapper" v-if="type == 'confirm'">
						<span @click.prevent="noClick" class="btn">{{noBtnText}}</span>
						<span @click.prevent="yesClick" class="btn yes-btn">{{yesBtnText}}</span>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	import {mapState} from 'vuex'
	
	export default {
		computed: mapState({
			title: state => state.confirm.title,
			isShow: state => state.confirm.isShow,
			msg: state => state.confirm.msg,
			type: state => state.confirm.type,
			hasMark: state => state.confirm.hasMark,
			alertBtnText: state => state.confirm.alertBtnText,
			noBtnText: state => state.confirm.noBtnText,
			yesBtnText: state => state.confirm.yesBtnText,
		}),
		methods: {
			alertClick() {
				this.$store.commit('alertClick')
			},
			noClick() {
				this.$store.commit('noClick')
			},
			yesClick() {
				this.$store.commit('yesClick')
			}
		}
	}
</script>

<style lang='less' type="text/less" scoped>
	@import "./index.less";
</style>