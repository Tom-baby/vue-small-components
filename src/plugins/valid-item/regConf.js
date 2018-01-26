/**
 * Created by chenjiajun on 2018/1/8.
 */
export default {
	number: {//数字或空
		reg: /(^[1-9]\d*$)|(^0$)|(^$)/,
		regTip: '请输入整数'
	},
	decimal: {//小数
		reg: /^\d+\.?\d*$/,
		regTip: '请输入数字'
	}
}