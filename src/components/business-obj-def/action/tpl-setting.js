/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:34 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-22 14:26:06
 */

import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';

import cookie from "utils/cookie";
const baseDir = cookie("basedir"); // host:ip/crm_web/
import {
	message
} from 'antd';


//请求布局列表
const getTplConfigList = () => {
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: `${baseDir}sys/modules/5/layouts`,
			method: 'get',
		}, (data) => {

			message.destroy()
			dispatch(fetchData('tpl_setting_data', {
				data: data.data
			}));
		})
	}
}

//删除页面模板布局
const delTplConfig = (item, index, moduleType) => {
	return (dispatch, getState) => {
		// dispatch(fetchData('tpl_setting_del_data', {
		// 	index,
		// 	moduleType
		// }));
		message.destroy()
		message.loading('删除中..', 0);
		reqwest({
			url: `${baseDir}sys/layouts/${item.id}`,
			method: 'delete',
		}, (data) => {
			message.destroy()
			dispatch(fetchData('tpl_setting_del_data', {
				index,
				moduleType
			}));
		})
	}
}


const  packagingData = (param) => {
	let groupArr = [];
	let tempArr = [];
	let newParam = Object.assign({}, param);
	newParam.mainLayout.forEach((element, index) => {
		if (element.apiName == "") {
			element.name = "";
		};

		if (element.elementType == "group") {
			groupArr.push({
				name: element.name,
				rows: []
			});
			tempArr = [];
		} else {
			if (element.width == 1) {
				tempArr.push(element);
				groupArr[groupArr.length - 1].rows.push(tempArr);
				tempArr = [];
			} else {
				tempArr.push(element);
				if (param.mainLayout[index + 1] && param.mainLayout[index + 1].elementType == "group" || param.mainLayout[index + 1] && param.mainLayout[index + 1].width == 1) {
					groupArr[groupArr.length - 1].rows.push(tempArr);
					tempArr = [];
				} else {
					if (tempArr.length == 2) {
						groupArr[groupArr.length - 1].rows.push(tempArr);
						tempArr = [];
					} else if (!param.mainLayout[index + 1]) {
						groupArr[groupArr.length - 1].rows.push(tempArr);
						tempArr = [];
					}
				}
			}
		};
	});

	newParam.mainLayout = groupArr;
	return newParam;
}

//存数据库-添加布局
const saveAddTpl = (param) => {
	debugger;
	let nameFlag;
	if(!param.name){//非空验证
		nameFlag = true;
		return {
			type: "tpl_setting_error_show",
			content: {
				nameFlag
			}
		}
	}

	//组装提交三维数据格式start
    param = packagingData(param)
	//组装提交三维数据格式end
	
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: `${baseDir}sys/modules/5/layouts`,
			method: 'post',
			data: {
				param
			}
		}, (data) => {
			message.destroy()
			dispatch(fetchData('tpl_setting_save_add_data', {
				data: data.data
			}));
		})
	}
}


//存数据库-编辑布局
const saveEditTpl = (param) => {
	let nameFlag;
	if(!param.name){//非空验证
		nameFlag = true;
		return {
			type: "tpl_setting_error_show",
			content: {
				nameFlag
			}
		}
	}
	//组装提交三维数据格式start
    param = packagingData(param)
	//组装提交三维数据格式end
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: `${baseDir}sys/layouts/${param.id}`,
			method: 'put',
			data: {
				param
			}
		}, (data) => {
			message.destroy()
			dispatch(fetchData('tpl_setting_save_edit_data', {
				data: data.data
			}));
		})
	}
}

//添加布局-弹出框
const addTplData = (clientType, type, moduleType, flag) => {
	
	return (dispatch, getState) => {
		dispatch(fetchData('related_objects', {flag:flag}))
		//获取最新字段
		let p1 = reqwest({
			url: `${baseDir}sys/modules/5/fields`,
			method: 'get',
		}, (data) => {
			let mainModule = data.data.mainModule.fields,
				/* itemModule = data.data.itemModule.fields, */
				mainModuleData,
				// itemModuleData,
				databak;

	        mainModuleData = mainModule.map((item, index) => {
				return {
					name: item.data.name,
					apiName: item.data.apiName,
					isRequired: item.data.isRequired,
					isReadonly: 0,
					isBlank: 0,
					width: "0.5",
					height: "1",
				}
			});

		/* 	itemModuleData = itemModule.map((item, index) => {
				return {
					name: item.data.name,
					apiName: item.data.apiName,
					isRequired: item.data.isRequired,
					isReadonly: 0,
					isBlank: 0,
					width: "0.5",
					height: "1",
				}
			}); */

			databak = mainModuleData;
			dispatch(fetchData('tpl_setting_field_setting_data', {
				data: databak
			}));
			message.destroy()
		})
		
		//获取最新相关对象
		let p2 = reqwest({
			url: `${baseDir}sys/modules/5/relatedObjects`,
			method: 'get',
		}, (data) => {
			let databak = data.data.map((item) => {
				return {
					label: item.name,
					value: item.relObjId
				}
			});

			dispatch(fetchData('tpl_setting_relativeObj_data', {
				data: databak
			}));
		});

		Promise.all([p1, p2]).then(function (data) {
			dispatch(fetchData('tpl_setting_add_showModal', {
				clientType,
				type,
				moduleType
			}));
		});
	}
}

//编辑布局-弹出框
const editTplData = (item, index, moduleType,flag) => {
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		dispatch(fetchData('related_objects', {flag:flag}))
		//获取最新字段
		reqwest({
			url: `${baseDir}sys/modules/5/fields`,
			method: 'get',
		}, (data) => {
			//debugger
			let mainModule = data.data.mainModule.fields,
				/* itemModule = data.data.itemModule.fields, */
				mainModuleData,
				itemModuleData,
				databak;

			mainModuleData = mainModule.map((item, index) => {
				return {
					name: item.data.name,
					apiName: item.data.apiName,
					isRequired: item.data.isRequired,
					isReadonly: 0,
					isBlank: 0,
					width: "0.5",
					height: "1",
				}
			});

		/* 	itemModuleData = itemModule.map((item, index) => {
				return {
					name: item.data.name,
					apiName: item.data.apiName,
					isRequired: item.data.isRequired,
					isReadonly: 0,
					isBlank: 0,
					width: "0.5",
					height: "1",
				}
			}); */

			databak = mainModuleData;
			dispatch(fetchData('tpl_setting_field_setting_data', {
				data: databak
			}));
			message.destroy()
		})
		
		//获取最新相关对象
		reqwest({
			url: `${baseDir}sys/modules/5/relatedObjects`,
			method: 'get',
		}, (data) => {
			
			let databak = data.data.map((item) => {
				return {
					label: item.name,
					value: item.relObjId
				}
			});

			dispatch(fetchData('tpl_setting_relativeObj_data', {
				data: databak
			}));
		});
		
		//获取编辑信息并弹框
		reqwest({
			url: `${baseDir}sys/layouts/${item.id}`,
			method: 'get'
		}, (data) => {
			message.destroy()
			dispatch(fetchData('tpl_setting_edit_showModal', {
				index,
				moduleType,
				data: data.data
			}));
		})
	}
}



//隐藏-弹出框
const handleTplCancel = () => {
	return {
		type: "tpl_setting_hideModal"
	}
}


//改变模板
const changeTplList = (name, targetList, selectRelativeObj) => {
	return {
		type: "tpl_setting_change_tpl_list",
		content: {
			name,
			targetList,
			selectRelativeObj,
		}
	}
}


//分配-弹出框
const distribute = (moduleType) => {

	let obj = {
		pcEditData: {
			clientType: 1,
			type: 2
		},
		pcViewData: {
			clientType: 1,
			type: 1
		},
		mobileEditData: {
			clientType: 2,
			type: 2
		},
		mobileViewData: {
			clientType: 2,
			type: 1
		}
	}
	return (dispatch, getState) => {
		message.destroy()
		message.loading('保存中..', 0);
		reqwest({
			url: `${baseDir}sys/modules/5/layouts/assignmentTemplate`,
			method: 'get',
			data: {
				param: {
					clientType: obj[moduleType]["clientType"],
					layoutType: obj[moduleType]["type"],
				}
			}
		}, (data) => {
			message.destroy()
			dispatch(fetchData('tpl_setting_distribute_showModal', {
				data,
				clientType: obj[moduleType]["clientType"],
				type: obj[moduleType]["type"],
				moduleType
			}));
		})
	}
}

//分配-隐藏弹出框
const distributeCancel = (moduleType) => {
	return {
		type: "tpl_setting_distribute_hideModal",
	}
}

//分配-存数据库
const savaDistribute = (param) => {
	return (dispatch, getState) => {
		message.destroy()
		message.loading('保存中..', 0);
		reqwest({
			url: `${baseDir}sys/modules/5/layouts/assignment`,
			method: 'post',
			data: {
				param
			}
		}, (data) => {
			message.destroy()
			message.success('保存成功！');
			dispatch(fetchData('tpl_setting_distribute_hideModal', {}));
		})
	}
}


//分配-改变本地数据
const changeAssignments = (key, val) => {
	return {
		type: "tpl_setting_change_assignments",
		content: {
			key,
			val
		}
	}
}



//输出方法
export {
	//列表增删改
	getTplConfigList,
	delTplConfig,
	saveAddTpl,
	saveEditTpl,
	
	//弹框
	addTplData,
	editTplData,
	handleTplCancel,
	changeTplList,
	
	//分配
	distribute,
	distributeCancel,
	savaDistribute,
	changeAssignments
}