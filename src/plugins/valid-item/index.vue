<template>
	<div class="valid-item"
	     :class="{'inp-wrapper':true,'inp-error-wrapper':failValid}">
		<div :class="{info:true,hide:!failValid}" @mouseover="failValid = true">{{errorTip}}</div>
		<el-tooltip class="item" :disabled="!failValid" effect="dark" :content="errorTip"
		            placement="bottom" ref="slot">
			<div @click="tipShow = !tipShow">
				<slot></slot>
			</div>
		</el-tooltip>
	
	</div>
</template>

<script>
	import emitter from './mixins/emitter'
	import REGCONF from './regConf' //引入配置文件
	
	export default {
		name: 'validItem',
		componentName: 'ElFormItem',
		props: {
			value: {//表单的值
				default: ''
			},
			validRule: {//表单验证规则
				type: Object,
				default: function () {
					return {};
				}
			}
		},
		mixins: [emitter],
		data() {
			return {
				failValid: false,
				rules: {},
				tipShow: false,
				defaultValidRules: {
					isValid: true,//是否验证
					required: true,//是否是必填
					requiredTip: '必须填写该信息',//如果是必填，未填写显示的信息
					reg: null,//验证规则或正则表达式
					regTip: '请输入正确格式的信息'//验证规则失败时显示的信息
				},
				errorTip: ''
			}
		},
		watch: {
			validRule() {
				this.rules = Object.assign(this.defaultValidRules, this.validRule);
			},
			value() {
				let result = this.valid();
				this.dispatch('Validator', 'validator.valid', [this]);
				this.$emit('change', result);
			}
		},
		mounted() {
			this.dispatch('Validator', 'validator.addField', [this]);
			
			//element 表单组件注册了this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue]);
			//因此在这里捕获这个事件
			this.$on('el.form.blur', () => {
				let result = this.valid();
				this.dispatch('Validator', 'validator.valid', [this]);
				this.$emit('blur', result);
			});
			
			this.rules = Object.assign(this.defaultValidRules, this.validRule);
		},
		beforeDestroy() {
			this.dispatch('Validator', 'validator.removeField', [this]);
		},
		methods: {
			valid(notShowError) {//验证表单,自身调用,validator组件也会在外部调用此函数
				const rules = this.rules;
				if (rules.isValid) {
					if (rules.required && !this.value && this.value !== 0) {
						this.validFail(rules.requiredTip, notShowError);
						return false;
					}
					
					if (rules.reg) {
						if (typeof rules.reg === 'string') {
							if (REGCONF[rules.reg]) {
								if (!REGCONF[rules.reg].reg.test(this.value)) {
									this.validFail(REGCONF[rules.reg].regTip, notShowError);
									return false;
								}
							} else {
								throw new Error('validRule.reg is not found!');
							}
						}
						
						if (rules.reg instanceof RegExp) {
							if (!rules.reg.test(this.value)) {
								this.validFail(rules.regTip, notShowError);
								return false;
							}
						}
					}
				}
				
				if (!notShowError) {
					this.errorTip = '';
					this.failValid = false;
				}
				
				return true;
			},
			validFail(tip, notShowError) {
				if (notShowError) {
					return;
				}
				this.errorTip = tip || '';
				this.failValid = true;
				this.$emit('validFail', tip);
			}
		}
	}
</script>

<style type="text/less" lang="less">
	@errorColor: #fd9f9e;
	.inp-wrapper {
		box-sizing: border-box;
		&.inp-error-wrapper {
			position: relative;
			border-bottom: 1px solid @errorColor;
			margin-top: -1px;
			
			.el-input {
				.el-input__inner {
					border-bottom: 0 !important;
					opacity: 0;
					
					&:focus {
						+ .el-input__prefix {
							opacity: 1;
						}
					}
				}
			}
			* {
				color: @errorColor;
			}
			
			.info {
				color: @errorColor;
				position: absolute;
				left: 0;
				top: 0;
				max-width: 101%;
				pointer-events: none;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			
			.amount-input-wrapper {
				&.has-icon {
					.el-input-group__prepend {
						opacity: 0;
					}
					
					&.is-focus {
						.el-input-group__prepend {
							opacity: 1;
						}
					}
				}
			}
			
			.el-input__prefix {
				opacity: 0;
			}
		}
		
		.hide {
			display: none;
		}
	}

</style>