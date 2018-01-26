<template>
	<div :class="{'amount-input-wrapper':true,'has-icon':hasIcon,'is-focus':isFocus}">
		<el-input v-model="inputVal" @blur="blurHandle" :placeholder="placeholder" @focus="isFocus=true"
		          :disabled="disabled"
		          @input="inputHandle" @change="changeHandle"
		          :clearable="clearable">
			<template slot="prepend">
				<span v-if="hasIcon">￥</span>
			</template>
		</el-input>
	</div>
</template>

<script>
	export default {
		name: 'amountInput',
		props: {
			value: {},
			placeholder: {
				type: String,
				default: ''
			},
			hasIcon: {
				type: Boolean,
				default: true
			},
			decimalDigits: {
				type: String,
				default: 2
			},
			clearable: {
				type: Boolean,
				default: false
			},
			autoFill: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				inputVal: this.value,
				place: this.decimalDigits,
				isFocus: false
			}
		},
		watch: {
			value(val) {
				this.inputVal = val;
			},
			decimalDigits() {
				this.place = this.convertPlaceToNum(this.decimalDigits);
			}
		},
		created() {
			this.place = this.convertPlaceToNum(this.decimalDigits);
		},
		methods: {
			convertPlaceToNum(place) {
				if (isNaN(place)) {
					throw new Error('decimalDigits is not a number');
				} else if (place < 0) {
					return 0;
				} else {
					return Number(place);
				}
			},
			toDecimal(value, place) {
				let f = value;
				if (isNaN(f)) {
					return f;
				}
				if (!this.autoFill && !f) {
					return f;
				}
				
				f = Math.round(value * Math.pow(10, place)) / Math.pow(10, place);
				let s = f.toString();
				let rs = s.indexOf('.');
				if (rs < 0 && place > 0) {
					rs = s.length;
					s += '.';
				}
				while (s.length <= rs + place) {
					s += '0';
				}
				return s;
			},
			blurHandle() {
				this.isFocus = false;
				let val = this.toDecimal(this.inputVal, this.place);
				this.$emit('blur', val);
				this.$emit('input', val);
			},
			inputHandle() {
				this.$emit('input', this.inputVal);
			},
			changeHandle() {
				this.$emit('change', this.inputVal);
				this.$emit('input', this.inputVal);
			}
		}
	}
</script>

<style lang="less" type="text/less">
	@input-lr-padding: 12px;
	@input-border-color: #c1c1c1;
	@input-border-radius: 2px;
	.amount-input-wrapper {
		
		&.has-icon {
			.el-input {
				border: 1px solid @input-border-color;
				border-radius: @input-border-radius;
				vertical-align: middle;
			}
			
			.el-input__inner {
				padding-left: 0;
				border: 0;
				
			}
			
			.el-input-group__prepend {
				padding: 0 0 0 (@input-lr-padding - 2);
				background-color: #fff;
				border-radius: 0;
				border: 0;
				font-size: 12px;
				color: #000;
				vertical-align: text-top;
			}
		}
		
		.el-input.is-disabled {
			border: 0;
			background-color: #f0f0f0;
			.el-input-group__prepend {
				background-color: transparent;
				color: #666;
			}
			.el-input__inner {
				background-color: transparent;
				border: 0;
				color: #666;
			}
		}
	}
	
	.el-form-item {
		&.is-error {
			.amount-input-wrapper {
				&.has-icon {
					.el-input, .el-input:focus {
						border-color: #f56c6c;
					}
				}
			}
		}
	}

</style>