<template>
	<div>
		<div class="page-title-style">
			可编辑的单元格
		</div>
		
		<div class="page-content">
			<div class="tool-wrapper">
				<el-button @click="getQueryValue">获取下拉筛选条件的值</el-button>
				<el-button @click="resetDefault">重置下拉筛选条件的值</el-button>
				<el-button @click="clear">清空下拉筛选条件的值</el-button>
				<el-button @click="checkAllValid()">整体表单验证</el-button>
			</div>
			
			<el-tabs v-model="activeName">
				<el-tab-pane label="表格一" name="first">
					<validator ref="validator1" tabName="first">
						<el-table
							:data="tableData"
							class="edit-table"
							stripe>
							<el-table-column
								prop="date"
								label="日期"
								width="150">
							</el-table-column>
							<el-table-column
								label="验证信息"
								width="150">
								<template slot-scope="props">
									<valid-item :value="props.row.validVal" :validRule="validRules.remark"
									            @change="changeValidItem">
										<div @click="clickRow(props.row)">{{props.row.validVal}}</div>
									</valid-item>
								</template>
							</el-table-column>
							<el-table-column
								label="姓名">
								<template slot-scope="props">
									<valid-item :value="value">
										<el-select v-model="value" placeholder="请选择">
											<el-option
												v-for="item in options"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</valid-item>
								</template>
							</el-table-column>
							<el-table-column
								label="备注">
								<template slot-scope="props">
									<valid-item :value="props.row.remark" :validRule="validRules.remark"
									            @change="getValidResult($event,props.row.remark)"
									            @blur="getValidResult">
										<el-input placeholder="placeholder" v-model="props.row.remark"
										          clearable></el-input>
									</valid-item>
								</template>
							</el-table-column>
							<el-table-column
								label="备注1">
								<template slot-scope="props">
									<valid-item :value="props.row.remark1" :validRule="validRules.remark1">
										<amount-input v-model="props.row.remark1" decimalDigits="2"
										              :clearable="true"></amount-input>
									</valid-item>
								</template>
							</el-table-column>
							<el-table-column
								label="备注1">
								<template slot-scope="props">
									<valid-item :value="props.row.date">
										<el-date-picker
											v-model="props.row.date"
											@change="changeCell"
											type="date"
											placeholder="选择日期"
											default-value="2010-10-01">
										</el-date-picker>
									</valid-item>
								</template>
							</el-table-column>
						</el-table>
					</validator>
				</el-tab-pane>
				<el-tab-pane label="表格二" name="second">
					<validator ref="validator2" tabName="second">
						<el-table
							style="width: 100%"
							:data="tableData2"
							stripe>
							<el-table-column
								prop="date"
								label="日期"
								width="150">
							</el-table-column>
							<el-table-column
								label="验证信息"
								width="150">
								<template slot-scope="props">
									<valid-item :value="props.row.validVal" :validRule="validRules.remark"
									            @change="changeValidItem">
										<div @click="clickRow(props.row)">{{props.row.validVal}}</div>
									</valid-item>
								</template>
							</el-table-column>
							<el-table-column
								label="姓名">
								<template slot-scope="props">
									<valid-item :value="props.row.name">
										<el-input placeholder="placeholder" v-model="props.row.name"
										          clearable></el-input>
									</valid-item>
								</template>
							</el-table-column>
							<el-table-column
								label="备注">
								<template slot-scope="props">
									<valid-item :value="props.row.remark" :validRule="validRules.remark">
										<el-input placeholder="placeholder" v-model="props.row.remark"
										          clearable></el-input>
									</valid-item>
								</template>
							</el-table-column>
							<el-table-column
								label="备注1">
								<template slot-scope="props">
									<valid-item :value="props.row.remark1" :validRule="validRules.remark1">
										<amount-input v-model="props.row.remark1" decimalDigits="2"
										              :clearable="true"></amount-input>
									</valid-item>
								</template>
							</el-table-column>
							<el-table-column
								label="备注1">
								<template slot-scope="props">
									<valid-item :value="props.row.date">
										<el-date-picker
											v-model="props.row.date"
											@change="changeCell"
											type="date"
											placeholder="选择日期"
											default-value="2010-10-01">
										</el-date-picker>
									</valid-item>
								</template>
							</el-table-column>
						</el-table>
					</validator>
				</el-tab-pane>
			</el-tabs>
		</div>
	
	
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				testTableData: [
					{name: 'dingyi', age: '18'},
					{name: 'jiajun', age: '18'},
					{name: 'wwk', age: '18'},
					{name: 'liuli', age: '18'},
					{name: 'jinhui', age: '18'}
				],
				origin: [],
				selectedRows: [],
				tableData: [{
					validVal: '11',
					date: '2018-01-05',
					name: 'sds',
					remark: '11',
					remark1: '11'
				}, {
					validVal: '11',
					date: '2018-01-05',
					name: 'sds',
					remark: '11',
					remark1: '11'
				}, {
					validVal: 12,
					date: '2018-01-05',
					name: 'sds',
					remark: '11',
					remark1: '11'
				}, {
					validVal: 0,
					date: '2018-01-05',
					name: 'sds',
					remark: '11'
				}, {
					validVal: 11,
					date: '2018-01-05',
					name: 'sds',
					remark: '11',
					remark1: '11'
				}],
				tableData2: [{
					validVal: '11',
					date: '2018-01-05',
					name: 'sds',
					remark: 'ss',
					remark1: '11'
				}, {
					validVal: '11',
					date: '2018-01-05',
					name: 'sds',
					remark: '11',
					remark1: '11'
				}, {
					validVal: 12,
					date: '2018-01-05',
					name: 'sds',
					remark: '11',
					remark1: '11'
				}, {
					validVal: 0,
					date: '2018-01-05',
					name: 'sds',
					remark: '11'
				}, {
					validVal: 11,
					date: '2018-01-05',
					name: 'sds',
					remark: '11',
					remark1: '11'
				}],
				validRules: {
					remark: {
						required: false,
						reg: 'number'
					},
					name: {
						required: false
					},
					remark1: {
						reg: 'decimal'
					}
				},
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: '选项1',
				input: '',
				activeName: 'first'
			}
		},
		created() {
			this.origin = [...this.testTableData];
			console.log(this.origin);
		},
		methods: {
			handleSelectionChange(val) {
				this.selectedRows = val;
			},
			getValidResult(valid) {
				console.log('验证结果', arguments);
			},
			changeCell() {
				console.log(this.tableData);
			},
			checkAllValid() {
				this.$refs.validator1.valid();
				this.$refs.validator2.valid();
			},
			changeValidItem() {
				console.log('change');
			},
			clickRow(value) {
				let a = Number(value.validVal);
				a++;
				value.validVal = a;
			},
			getQueryValue() {
				console.log(this.$refs.queryPop.getQueryValue());
			},
			resetDefault() {
				this.$refs.queryPop.resetDefault();
			},
			clear() {
				this.$refs.queryPop.clear();
			},
			submitHandle() {
				console.log('submit');
			},
			indexMethod(index) {
				return index;
			}
		}
	}
</script>
