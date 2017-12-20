/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:34 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-11-30 10:49:25
 */

import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';

import cookie from "utils/cookie";
const baseDir = cookie("basedir"); // host:ip/crm_web/

import { Modal, Button, message } from 'antd';
const confirm = Modal.confirm;

//请求初始业务对象列表
const getBusinessObjList = (val) => {
	debugger;
	return (dispatch, getState) => {
		message.loading('搜索中..', 0);
		reqwest({
			url: baseDir + "sys/modules/3/biztypes",
			method: 'get',
			data: JSON.stringify({
				value: val
			})
		}, (data) => {
			message.destroy()
			dispatch(fetchData('business_obj_data', {
				data: []
			}));
		})
	}
}

//搜索输入框筛选业务类型
const searchBusinessObj = (val, cardData) => {
	return (dispatch) => {
		message.loading('搜索中..', 0);
		setTimeout(() => {
			message.destroy()
		}, 1000);
	}
}

//点击下拉框筛选业务类型
const selectChangeSearchBusinessObj = (val, cardData) => {
	return (dispatch) => {
		message.loading('搜索中..', 0);
		setTimeout(() => {
			message.destroy()
		}, 1000);
	}
}

//保存新建业务对象
const saveAddBusinessObj = (addData) => {
	return {
		type:"business_obj_save_add_data",
		content: {
			addData
		}
	}
	
	// return (dispatch, getState) => {
	// 	message.loading('搜索中..', 0);
	// 	reqwest({
	// 		url: baseDir + "sys/modules/3/biztypes",
	// 		method: 'get',
	// 		data: JSON.stringify({
	// 			value: val
	// 		})
	// 	}, (data) => {
	// 		debugger
	// 		message.destroy()
	// 		dispatch(fetchData('business_obj_data', {
	// 			data: []
	// 		}));
	// 	})
	// }
}

//保存编辑业务对象
const saveEditBusinessObj = (editData, editIndex) => {
	return {
		type:"business_obj_save_edit_data",
		content: {
			editData,
			editIndex
		}
	}
	// return (dispatch, getState) => {
	// 	message.loading('搜索中..', 0);
	// 	reqwest({
	// 		url: baseDir + "sys/modules/3/biztypes",
	// 		method: 'get',
	// 		data: JSON.stringify({
	// 			value: val
	// 		})
	// 	}, (data) => {
	// 		debugger
	// 		message.destroy()
	// 		dispatch(fetchData('business_obj_data', {
	// 			data: []
	// 		}));
	// 	})
	// }
}


//删除业务类型
const delBusinessObjData = (item, index) => {
	return {
		type: "business_obj_del_data",
		content: {item, index}
	}
	
	// return (dispatch, getState) => {
	// 	message.loading('搜索中..', 0);
	// 	reqwest({
	// 		url: baseDir + "sys/modules/3/biztypes",
	// 		method: 'get',
	// 		data: JSON.stringify({
	// 			ids: [id]
	// 		})
	// 	}, (data) => {
	// 		debugger
	// 		message.destroy()
	// 		dispatch(fetchData('business_obj_data', {
	// 			data: []
	// 		}));
	// 	})
	// }
}

//添加业务类型-弹出框
const addBusinessObjData = () => {
	return {
		type: "business_obj_add_showModal",
		val: "",
	}
}

//编辑业务类型-弹出框
const editBusinessObjData = (item, index) => {
	item.roles = item.roles.map((item)=>{
		return item.value
	})

	return {
		type: "business_obj_edit_showModal",
		content: {
			item,
			index
		}
	}
}

//改变编辑业务类型数据-弹出框
const changeBusinessObjEditData = (keyName, val) => {
	return {
		type: "business_obj_change_edit_data",
		content: {
			keyName,
			val
		}
	}
}


//隐藏-弹出框
const handleCancel = () => {
	return {
		type: "business_obj_hideModal"
	}
}


//输出方法
export {
	getBusinessObjList,
	searchBusinessObj,
	selectChangeSearchBusinessObj,

	addBusinessObjData,
	saveAddBusinessObj,

	editBusinessObjData,
	changeBusinessObjEditData,
	saveEditBusinessObj,

	delBusinessObjData,

	handleCancel,
}

/* 
  这个返回一个无名函数的形式和直接返回一个对象的形式的区别是什么？？怎么实现的一致效果？？？？

*/