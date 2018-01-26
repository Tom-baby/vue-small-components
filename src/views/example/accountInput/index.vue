<template>
	<div>
		<div class="page-title-style">
			金额表单
		</div>
		
		<div class="page-content">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="220px" class="demo-ruleForm">
				<el-form-item label="金额 带￥的整数" prop="account1">
					<amount-input v-model="ruleForm.account1" placeholder="请输入金额" decimalDigits="0" @change="changeHandle"></amount-input>
				</el-form-item>
				
				<el-form-item label="金额 带￥的两位小数" prop="account2">
					<amount-input v-model="ruleForm.account2" decimalDigits="2" @change="changeHandle"></amount-input>
				</el-form-item>
				
				<el-form-item label="金额 带￥的六位小数 自动填充" prop="account3">
					<amount-input v-model="ruleForm.account3" decimalDigits="6" :autoFill="true"
					              @change="changeHandle"></amount-input>
				</el-form-item>
				
				<el-form-item label="金额 不带￥的整数" prop="account4">
					<amount-input v-model="ruleForm.account4" decimalDigits="0" :hasIcon="false"
					              @change="changeHandle"></amount-input>
				</el-form-item>
				
				<el-form-item label="金额 不带￥的两位小数" prop="account5">
					<amount-input v-model="ruleForm.account5" decimalDigits="2" :hasIcon="false"
					              @change="changeHandle"></amount-input>
				</el-form-item>
				
				<el-form-item label="金额 不带￥的六位小数" prop="account6">
					<amount-input v-model="ruleForm.account6" decimalDigits="6" :hasIcon="false"
					              @change="changeHandle"></amount-input>
				</el-form-item>
				
				
				<el-form-item label="金额 禁用状态" prop="account7">
					<amount-input v-model="ruleForm.account7" decimalDigits="6" :disabled="true"
					              @change="changeHandle"></amount-input>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	
	const rule = [
		{required: true, message: '请输入金额', trigger: 'blur'},
		{pattern: /^\d+\.?\d*$/, message: '必须是数字', trigger: 'blur'}
	];
	
	export default {
		data() {
			return {
				ruleForm: {
					account1: '',
					account2: '',
					account3: '',
					account4: '',
					account5: '',
					account6: '',
					account7: 22.333333
				},
				rules: {
					account1: rule,
					account2: rule,
					account3: rule,
					account4: rule,
					account5: rule,
					account6: rule
				}
			}
		},
		methods: {
			changeHandle() {
				console.log(this.ruleForm);
				
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
		
	}
</script>