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
					<div class="btn-wrapper" v-if="type == 'alert'" @click="alertClick">
						<span class="btn btn-block yes-btn">{{alertBtnText}}</span>
					</div>
					<div class="btn-wrapper" v-if="type == 'confirm'">
						<span @click="noClick" class="btn">{{noBtnText}}</span>
						<span @click="yesClick" class="btn yes-btn">{{yesBtnText}}</span>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '提示'
			},
			msg: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: 'alert'
			},
			alertBtnText: {
				type: String,
				default: '我知道了'
			},
			yesBtnText: {
				type: String,
				default: '确定'
			},
			noBtnText: {
				type: String,
				default: '取消'
			},
			hasMark: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			noClick() {
				this.$emit('noClick');
			},
			yesClick() {
				this.$emit('yesClick');
			},
			alertClick() {
				this.$emit('alertClick');
			}
		}
	}
</script>

<style lang='less'>
	@import "./index.less";
</style>