/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:34 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-22 18:42:04
 */

import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';

import cookie from "utils/cookie";
const baseDir = cookie("basedir"); // host:ip/crm_web/

import {
	Modal,
	Button,
	message
} from 'antd';

const confirm = Modal.confirm;


//请求字段类型列表
const getFieldtTypeList = () => {
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: `${baseDir}sys/modules/5/customFieldTypes`,
			method: 'get',
		}, (data) => {
			message.destroy()
			dispatch(fetchData('field_type_data', {
				data: data.data
			}));
		})
	}
}

//请求字段列表
const getFieldSettingList = () => {
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: `${baseDir}sys/modules/5/fields`,
			method: 'get',
		}, (data) => {
			message.destroy()
			dispatch(fetchData('field_setting_data', {
				data: data.data
			}));
		})
	}
}

//删除字段
const delFieldSetting = (item, index, moduleType) => {
	return (dispatch, getState) => {
		message.destroy()
		message.loading('删除中..', 0);
		reqwest({
			url: `${baseDir}sys/fields/${item.fullname}`,
			method: 'delete',
		}, (data) => {
			message.destroy()
			dispatch(fetchData('field_setting_del_data', {
				index,
				moduleType
			}));
		})
	}
}

//添加字段-弹出框
const addFieldSettingShow = (moduleType) => {
	return {
		type: "field_setting_add_showModal",
		content: {
			moduleType
		}
	}
}

//编辑字段-弹出框
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
const eidtFieldSettingHide = (index) => {
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
	return dispatch=>{
		if (editAddControl.type==21||editAddControl.type==2){
			reqwest({
				url: `${baseDir}/base/docs/detail`,
				method: 'GET',
			}, (data) => {
				message.destroy()
				dispatch(fetchData('field_setting_reference_data', { menuData: data.data }));
			})
		}
		dispatch(fetchData('field_setting_editAddControl', {editAddControl: editAddControl}))
	}
}

//存数据库-添加字段
const saveAddField = (addData, objId) => {
	let nameFlag ;
	if(!addData.name){//非空验证
		nameFlag =  true;		
		return {
			type: "field_setting_error_show",
			content: {
				nameFlag
			}
		}
	}
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: `${baseDir}sys/modules/${objId}/fields`,
			method: 'post',
			data: {
				param: addData
			}
		}, (data) => {
			message.destroy()
			dispatch(fetchData('field_setting_save_add_data', {
				data: data.data
			}));
		})
	}
}

//存数据库-编辑字段
const saveEditField = (editData) => {
	let nameFlag ;
	if(!editData.name){//非空验证
		nameFlag =  true;		
		return {
			type: "field_setting_error_show",
			content: {
				nameFlag
			}
		}
	}
	let param = {
		name: editData.name,
		description: editData.description,
		defaultChecked: editData.defaultChecked,
		precision: editData.precision,
		minValue: editData.minValue,
		maxValue: editData.maxValue
	}
	
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: `${baseDir}sys/fields/${editData.fullname}`,
			method: 'put',
			data: {
				param
			}
		}, (data) => {
			message.destroy()
			dispatch(fetchData('field_setting_save_edit_data', {
				data: data.data
			}));
		})
	}
}

//选择参照
const refChoice = (id) => {//这里不需要参照属性，只需要一个id就可以么？？？？
	return {
		type: "field_setting_ref_choice_data",
		content: {
			id
		}
	}
}

export {
	//列表增删改
	getFieldSettingList,
	getFieldtTypeList,
	saveAddField,
	saveEditField,
	delFieldSetting,

	//添加框本地操作
	addFieldSettingShow,
	addFieldSettingHide,
	changeAddData,
	checkFormControls,

	//编辑框本地操作
	editFieldSettingShow,
	eidtFieldSettingHide,
	changeEditData,

	refChoice,
}







