/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:34 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-22 14:25:27
 */

import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';

import cookie from "utils/cookie";
const baseDir = cookie("basedir"); // host:ip/crm_web/
import {
	message
} from 'antd';

//请求列表布局列表
const getListConfigList = () => {
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: `${baseDir}sys/modules/5/listLayouts`,
			method: 'get',
		}, (data) => {
			message.destroy()
			dispatch(fetchData('list_config_data', {
				data: data.data
			}));
		})
	}
}

//删除模板布局
const delListConfig = (item, index, moduleType) => {
	return (dispatch, getState) => {
		message.destroy()
		message.loading('删除中..', 0);
		reqwest({
			url: `${baseDir}sys/listLayouts/${item.id}`,
			method: 'delete',
		}, (data) => {
			message.destroy()
			dispatch(fetchData('list_config_del_data', {
				index,
				moduleType
			}));
		})
	}
}

//存数据库-添加PC列表布局
const savePcAddTpl = (param) => {
	let nameFlag , listFlag;
	if(!param.name||!param.rows.length){//非空验证
		nameFlag = param.name ? false : true;
		listFlag = param.rows.length ? false : true;
		return {
			type: "list_config_error_show",
			content: {
				nameFlag,
				listFlag
			}
		}
	}
	
	let newParam = Object.assign({}, param);

	newParam.rows = [param.rows];
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: `${baseDir}sys/modules/5/listLayouts`,
			method: 'post',
			data: {
				param: newParam
			}
		}, (data) => {
			message.destroy()
			dispatch(fetchData('list_config_pc_save_add_data', {
				data: data.data
			}));
		})
	}
}


//存数据库-编辑PC列表布局
const savePcEditTpl = (param) => {
	let nameFlag , listFlag;
	if(!param.name||!param.rows.length){//非空验证
		nameFlag = param.name ? false : true;
		listFlag = param.rows.length ? false : true;
		return {
			type: "list_config_error_show",
			content: {
				nameFlag,
				listFlag
			}
		}
	}
	

	let newParam = Object.assign({}, param);

	newParam.rows = [param.rows];

	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		reqwest({
			url: `${baseDir}sys/listLayouts/${param.id}`,
			method: 'put',
			data: {
				param: newParam
			}
		}, (data) => {
			message.destroy()
			dispatch(fetchData('list_config_pc_save_edit_data', {
				data: data.data
			}));
		})
	}
}

const  packagingData = (param) => {
	let groupArr = [];
	let tempArr = [];
	let newParam = Object.assign({}, param);

	newParam.rows.forEach((element, index) => {
		if (element.apiName == "") {
			element.name = "";
		};

		if (element.width == 1) {
			tempArr.push(element);
			groupArr.push(tempArr);
			tempArr = [];
		} else {
			tempArr.push(element);
			if (newParam.rows[index + 1] && newParam.rows[index + 1].width == 1) {
				groupArr.push(tempArr);
				tempArr = [];
			} else {
				if (tempArr.length == 2) {
					groupArr.push(tempArr);
					tempArr = [];
				} else if (!newParam.rows[index + 1]) {
					groupArr.push(tempArr);
					tempArr = [];
				}
			}
		}
	});

	newParam.rows = groupArr;
	return newParam;
}

//存数据库-添加Mobile列表布局
const saveMobileAddTpl = (param) => {
	let nameFlag , listFlag;
	if(!param.name||!param.rows.length){//非空验证
		nameFlag = param.name ? false : true;
		listFlag = param.rows.length ? false : true;
		return {
			type: "list_config_error_show",
			content: {
				nameFlag,
				listFlag
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
			url: `${baseDir}sys/modules/5/listLayouts`,
			method: 'post',
			data: {
				param
			}
		}, (data) => {
			message.destroy()
			dispatch(fetchData('list_config_mobile_save_add_data', {
				data: data.data
			}));
		})
	}
}


//存数据库-编辑Mobile列表布局
const saveMobileEditTpl = (param) => {
	let nameFlag , listFlag;
	if(!param.name||!param.rows.length){//非空验证
		nameFlag = param.name ? false : true;
		listFlag = param.rows.length ? false : true;
		return {
			type: "list_config_error_show",
			content: {
				nameFlag,
				listFlag
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
			url: `${baseDir}sys/listLayouts/${param.id}`,
			method: 'put',
			data: {
				param
			}
		}, (data) => {
			message.destroy()
			dispatch(fetchData('list_config_mobile_save_edit_data', {
				data: data.data
			}));
		})
	}
}



//添加业务类型-弹出框
const addListConfigData = (moduleType) => {
	return (dispatch, getState) => {

		//获取最新字段后弹框
		reqwest({
			url: `${baseDir}sys/modules/5/fields`,
			method: 'get',
		}, (data) => {
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

			//databak = mainModuleData.concat(itemModuleData);
			databak = mainModuleData;
			dispatch(fetchData('list_config_field_setting_data', {
				data: databak
			}));


			if (moduleType == "pcListData") {
				dispatch(fetchData('list_config_add_pc', {
					moduleType
				}));
			}else{
				dispatch(fetchData('list_config_add_mobile', {
					moduleType
				}));
			};
			
			message.destroy()
		})

	}
}

//编辑布局-弹出框
const editListConfigData = (item, index, moduleType) => {
	return (dispatch, getState) => {
		message.destroy()
		message.loading('搜索中..', 0);
		
		//获取最新字段
		reqwest({
			url: `${baseDir}sys/modules/5/fields`,
			method: 'get',
		}, (data) => {
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
			dispatch(fetchData('list_config_field_setting_data', {
				data: databak
			}));
			message.destroy()
		})
		
		//获取编辑信息
		reqwest({
			url: `${baseDir}sys/listLayouts/${item.id}`,
			method: 'get'
		}, (data) => {
			message.destroy()
			if (moduleType == "pcListData") {
				dispatch(fetchData('list_config_pc_edit_showModal', {
					index,
					moduleType,
					data: data.data
				}));
			} else {
				dispatch(fetchData('list_config_mobile_edit_showModal', {
					index,
					moduleType,
					data: data.data
				}));
			};

		})
	}
}

//隐藏-弹出框
const pcListConfigCancel = () => {
	return {
		type: "list_config_pc_hideModal"
	}
}

//隐藏-弹出框
const mobileListConfigCancel = () => {
	return {
		type: "list_config_mobile_hideModal"
	}
}


//改变编辑模板数据
const changeListConfig = (name, targetList) => {
	return {
		type: "list_config_change_tpl_list",
		content: {
			name,
			targetList
		}
	}
}


//分配-弹出框
const distribute = (moduleType) => {
	let obj = {
		pcListData: {
			clientType: 1
		},
		mobileListData: {
			clientType: 2
		}
	}
	return (dispatch, getState) => {
		message.destroy()
		message.loading('保存中..', 0);
		reqwest({
			url: `${baseDir}sys/modules/5/listLayouts/assignmentTemplate`,
			method: 'get',
			data: {
				param: {
					clientType: obj[moduleType]["clientType"],
				}
			}
		}, (data) => {
			message.destroy()
			dispatch(fetchData('list_config_distribute_showModal', {
				data,
				clientType: obj[moduleType]["clientType"],
				moduleType
			}));
		})
	}
}

//分配-隐藏弹出框
const distributeCancel = (moduleType) => {
	return {
		type: "list_config_distribute_hideModal",
	}
}

//分配-存数据库
const savaDistribute = (param) => {
	return (dispatch, getState) => {
		message.destroy()
		message.loading('保存中..', 0);
		reqwest({
			url: `${baseDir}sys/modules/5/listLayouts/assignment`,
			method: 'post',
			data: {
				param
			}
		}, (data) => {
			message.destroy()
			message.success('保存成功！');
			dispatch(fetchData('list_config_distribute_hideModal', {}));
		})
	}
}


//分配-改变本地数据
const changeAssignments = (key, val) => {
	return {
		type: "list_config_change_assignments",
		content: {
			key,
			val
		}
	}
}


//输出方法
export {
	//列表增删改
	getListConfigList,
	delListConfig,
	savePcAddTpl,
	savePcEditTpl,
	saveMobileAddTpl,
	saveMobileEditTpl,
	
	//列表弹框
	addListConfigData,
	editListConfigData,
	pcListConfigCancel,
	mobileListConfigCancel,
	changeListConfig,
	
	//分配
	distribute,
	distributeCancel,
	savaDistribute,
	changeAssignments
}