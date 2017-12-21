/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:34 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-06 14:20:20
 */

import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';

import cookie from "utils/cookie";
const baseDir = cookie("basedir"); // host:ip/crm_web/

import { Modal, Button, message } from 'antd';
const confirm = Modal.confirm;

//请求字段列表
const getFieldSettingList = (val) => {
	// return (dispatch, getState) => {
	// 	message.loading('搜索中..', 0);
	// 	reqwest({
	// 		url: baseDir + "sys/modules/3/biztypes",
	// 		method: 'get',
	// 		data: JSON.stringify({
	// 			value: val
	// 		})
	// 	}, (data) => {
	// 		message.destroy()
	// 		dispatch(fetchData('field_setting_data', {
	// 			data: []
	// 		}));
	// 	})
	// }
}

//删除字段
const delFieldSetting = (item, index) => {
	return {
		type: "field_setting_del_data",
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

//添加字段-弹出框
const addFieldSettingShow = () => {
	return {
		type: "field_setting_add_showModal"
	}
}

//编辑业务-弹出框
const editFieldSettingShow = (item, index, moduleType) => {
	return {
		type: "field_setting_edit_showModal",
		content: {
			item,
			index,
			moduleType
		}
	}
}


//隐藏添加字段-弹出框
const addFieldSettingHide = () => {
	return {
		type: "field_setting_add_hideModal"
	}
}

//隐藏编辑字段-弹出框
const eidtFieldSettingHide = () => {
	return {
		type: "field_setting_edit_hideModal"
	}
}

//改变添加字段数据-弹出框
const changeAddData = (key, value) => {
	return {
		type: "field_setting_change_add_data",
		content: {
			key,
			value
		}
	}
}

//改变编辑字段数据-弹出框
const changeEditData = (key, value) => {
	return {
		type: "field_setting_change_edit_data",
		content: {
			key,
			value
		}
	}
}

//添加字段-切换表单类型
const checkFormControls = (editAddControl) => {
	return {
		type: "field_setting_editAddControl",
		content: {editAddControl}
	}
}

//添加字段-存数据库
const onAdd = (addData) => {
	return {
		type: "field_setting_save_add_data"
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
	// 		message.destroy()
	// 		dispatch(fetchData('field_setting_data', {
	// 			data: []
	// 		}));
	// 	})
	// }
}

//编辑字段-存数据库
const onSave = (editData) => {
	return {
		type: "field_setting_save_edit_data",
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
	// 		message.destroy()
	// 		dispatch(fetchData('field_setting_data', {
	// 			data: []
	// 		}));
	// 	})
	// }
}

//输出方法
export {
	getFieldSettingList,

	addFieldSettingShow,
	editFieldSettingShow,

	changeAddData,
	changeEditData,

	delFieldSetting,

	addFieldSettingHide,
	eidtFieldSettingHide,

	checkFormControls,
	onAdd,
	onSave
}