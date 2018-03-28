<template>
	<div :class="{'pop-up':true,'show':show}">
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
	export default {
		props: {
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
		data() {
			return {
				promiseStatus: null,
				show: false
			}
		},
		methods: {
			confirm() {
				let _this = this;
				this.show = true;
				return new Promise(function (resolve, reject) {
					_this.promiseStatus = {resolve, reject};
				});
			},
			noClick() {
				this.show = false;
				this.promiseStatus && this.promiseStatus.reject();
				
			},
			yesClick() {
				this.show = false;
				this.promiseStatus && this.promiseStatus.resolve();
				
			},
			alertClick() {
				this.show = false;
				this.promiseStatus && this.promiseStatus.resolve();
			}
		}
	}
</script>


<style lang='less'>
	@import "./index.less";
</style>
