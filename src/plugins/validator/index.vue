<template>
	<div class="valid-fields">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'Validator',
		componentName: 'Validator',
		props: ['tabName'],
		data() {
			return {
				fields: []
			}
		},
		mounted() {
			this.$on('validator.addField', (field) => {
				if (field) {
					this.fields.push(field);
				}
			});
			
			this.$on('validator.removeField', (field) => {
				if (field) {
					this.fields.splice(this.fields.indexOf(field), 1);
				}
			});
			
			this.$on('validator.valid', (field) => {
				if (field) {
					this.validTab(field);
				}
			});
		},
		methods: {
			validTab(field) {
				let validResult = [];
				
				this.fields.forEach(item => {
					validResult.push(item.failValid);
				});
				
				let fieldValidResult = field.valid(true);
				let allValidResult = validResult.every(item => item === false);
				
				if (fieldValidResult && allValidResult) {
					this.changeTabStyle(true);
				}
				
				if (!fieldValidResult) {
					this.changeTabStyle(false);
				}
				
			},
			changeTabStyle(valid) {
				if (this.tabName) {
					if (valid) {
						document.getElementById(`tab-${this.tabName}`).style.color = '#000';
					} else {
						document.getElementById(`tab-${this.tabName}`).style.color = 'red';
					}
				}
			},
			valid() {//需要验证的子组件需要提供一个valid方法
				//return this.fields.every(item => item.valid() === true); //此方法验证到失败就不会再继续验证后面的了,无法显示出所有验证失败的表单
				let validResult = [];
				this.fields.forEach(item => {
					validResult.push(item.valid());
				});
				
				let result = validResult.every(item => item === true);
				
				this.changeTabStyle(result);
				
				return result;
			}
		}
	}
</script>