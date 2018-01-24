/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:34 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-21 14:41:35
 */

import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';

import cookie from "utils/cookie";
const baseDir = cookie("basedir"); // host:ip/crm_web/

import { Modal, Button, message } from 'antd';
const confirm = Modal.confirm;

//请求初始业务对象列表
const getBusinessObjList = (val) => {
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: baseDir + "sys/modules/5/biztypes",
			method: 'get'
		}, (data) => {
			message.destroy()
			dispatch(fetchData('business_obj_data', {
				data: data.data
			}));
		})
	}
}

//请求初始业务对象列表
const getRolesList = () => {
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: baseDir + "sys/roles/ref",
			method: 'get',
		/* 	data: {
				param: {
					searchKey: {
						name: value
					}
				}
			} */
		}, (data) => {
			message.destroy()
			dispatch(fetchData('business_obj_get_roles', {
				data: data.data
			}));
		})
	}
}


//保存新建业务对象
const saveAddBusinessObj = (data) => {
	let nameFlag , roleFlag;
	if(!data.name||!data.roleIds.length){//非空验证
		nameFlag = data.name ? false : true;
		roleFlag = data.roleIds.length ? false : true;
		return {
			type: "business_obj_error_show",
			content: {
				nameFlag,
				roleFlag
			}
		}
	}
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: baseDir + "sys/modules/5/biztypes",
			method: 'post',
			data: {
				param: data
			}
		}, (data) => {
			message.destroy()
			dispatch(fetchData('business_obj_save_add_data', {
				data: data.data
			}));
		})
	}
}

//保存编辑业务对象
const saveEditBusinessObj = (data, editId, index) => {
	let nameFlag , roleFlag;
	if(!data.name||!data.roleIds.length){//非空验证
		nameFlag = data.name ? false :true;
		roleFlag = data.roleIds.length ? false : true;
		return {
			type: "business_obj_error_show",
			content: {
				nameFlag,
				roleFlag
			}
		}
	}
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: `${baseDir}sys/biztypes/${editId}`,
			method: 'put',
			data: {
				param: data
			}
		}, (data) => {
			message.destroy()
			dispatch(fetchData('business_obj_save_edit_data', {
				data: data.data,
				index
			}));
		})
	}
}


//删除业务类型
const delBusinessObj = (item, index) => {
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: `${baseDir}sys/biztypes/${item.data.id}`,
			method: 'delete',
		}, (data) => {
			message.destroy()
			dispatch(fetchData('business_obj_del_data', {
				index
			}));
		})
	}
}


//停启用
const enable = (item, index,isEnable) => {//正在调试
	let status = isEnable ? 1 : 0;
	return (dispatch, getState) => {
		reqwest({
			url: `${baseDir}sys/biztypes/${item.data.id}/status`,
			method: 'PUT',
			data:{
				param:{status:status}
			}
		}, (data) => {
			dispatch(fetchData('business_obj_enable_data', {
				index,
				status
			}));
		})
	}
}

//弹出框-添加业务类型
const showModalAdd = () => {
	return {
		type: "business_obj_add_showModal",
		val: "",
	}
}

//弹出框-编辑业务类型
const showModalEdit = (item, index,flag) => {
	if(flag) {return}
	return {
		type: "business_obj_edit_showModal",
		content: {
			item,
			index
		}
	}
}

//弹出框-改变编辑业务类型数据
const editBusinessObj = (keyName, val) => {
	return {
		type: "business_obj_change_data",
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
	//列表增删改
	getBusinessObjList,
	getRolesList,
	saveAddBusinessObj,
	saveEditBusinessObj,
	delBusinessObj,
	
	//添加编辑框本地操作
	showModalAdd,
	showModalEdit,
	editBusinessObj,
	handleCancel,
	enable,
}




