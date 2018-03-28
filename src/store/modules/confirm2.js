/**
 * Created by chenjiajun on 2018/3/28.
 */
let yesCallBack = () => {
};
let noCallBack = () => {
};
let alertCallBack = () => {
};

export default {
	state: {
		title: '',
		isShow: false,
		msg: '',
		type: 'confirm',
		hasMark: true,
		alertBtnText: '',
		noBtnText: '取消',
		yesBtnText: '确定',
	},
	mutations: {
		confirm(state, data) {
			console.log('---data.hasMark--', data.hasMark);
			Object.assign(state, {
				title: data.title,
				isShow: true,
				msg: data.msg,
				type: 'confirm',
				hasMark: data.hasMark === undefined ? true : data.hasMark,
				alertBtnText: data.alertBtnText,
				noBtnText: data.noBtnText || '取消',
				yesBtnText: data.yesBtnText || '确定',
			});
			
			let yesCb = data.yesClick;
			let noCb = data.noClick;
			if (yesCb) {
				yesCallBack = yesCb;
			} else {
				yesCallBack = () => {
				};
			}
			
			if (noCb) {
				noCallBack = noCb;
			} else {
				noCallBack = () => {
				};
			}
		},
		alert(state, data) {
			Object.assign(state, {
				title: data.title,
				isShow: true,
				msg: data.msg,
				type: 'alert',
				hasMark: data.hasMark === 'undefined' ? true : data.hasMark,
				alertBtnText: data.alertBtnText,
				noBtnText: data.noBtnText || '取消',
				yesBtnText: data.yesBtnText || '确定',
			});
			
			let alertCb = data.alertClick;
			if (alertCb) {
				alertCallBack = alertCb;
			} else {
				alertCallBack = () => {
				};
			}
		},
		noClick(state) {
			noCallBack();
			state.isShow = false;
		},
		yesClick(state) {
			yesCallBack();
			state.isShow = false;
		},
		alertClick(state) {
			alertCallBack();
			state.isShow = false;
		}
	}
}