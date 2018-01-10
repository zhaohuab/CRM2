/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:34 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-11-30 10:49:25
 */

import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import cookie from "utils/cookie";
import {approval as url } from 'api/zhb'
const baseDir = cookie("basedir"); // host:ip/crm_web/

import { Modal, Button, message } from 'antd';
const confirm = Modal.confirm;

//请求初始业务对象列表
const getBusinessObjList = (val) => {
	debugger;
	return (dispatch, getState) => {
		message.loading('搜索中..', 0);
		reqwest({
			url: url.approval,
			method: 'get',
			data:[]
		}, (data) => {
			debugger;
			message.destroy()
			dispatch(fetchData('APPROVAL_GETLIST_SUCCESS', {
				data: data
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
		type:"approval_save_add_data",
		content: {
			addData
		}
	}
}

//保存编辑业务对象
const saveEditBusinessObj = (editData, editIndex) => {
	return {
		type:"approval_save_edit_data",
		content: {
			editData,
			editIndex
		}
	}
}


//删除业务类型
const delBusinessObjData = (item, index) => {
	return {
		type: "approval_del_data",
		content: {item, index}
	}
}

//添加业务类型-弹出框
const addBusinessObjData = (obj) => {
	return (dispatch) => {
		reqwest({
			url: url.approval,
			method: 'POST',
			data:{
				param:obj
			}
		}, (ysUrl) => {
			dispatch(fetchData('APPROVAL_ADD_SHOW', {
				url:ysUrl.ysUrl
			}));
		
		})
	}
}

//编辑业务类型-弹出框
const editBusinessObjData = (item, index) => {
	item.roles = item.roles.map((item)=>{
		return item.value
	})

	return {
		type: "approval_edit_showModal",
		content: {
			item,
			index
		}
	}
}

//改变编辑业务类型数据-弹出框
const changeBusinessObjEditData = (keyName, val) => {
	return {
		type: "approval_change_edit_data",
		content: {
			keyName,
			val
		}
	}
}


//隐藏-弹出框
const handleCancel = () => {
	return {
		type: "approval_hideModal"
	}
}

//
const onClosed = () => {
	return {
		type: "approval_add_closed"
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
	onClosed,
}
