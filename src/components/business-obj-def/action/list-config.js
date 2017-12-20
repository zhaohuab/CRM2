/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:34 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-11 10:15:53
 */

import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';

import cookie from "utils/cookie";
const baseDir = cookie("basedir"); // host:ip/crm_web/
import {
	message
} from 'antd';

//添加业务类型-弹出框
const addListConfigData = (addType) => {

	if (addType == "pc") {
		return {
			type: "list_config_add_pc"
		}
	};

	return {
		type: "list_config_add_mobile"
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


//改变模板
const changeListConfig = (name, targetList) => {
	return {
		type: "list_config_change_tpl_list",
		content: {
			name,
			targetList
		}
	}
}



//输出方法
export {
	addListConfigData,
	pcListConfigCancel,
	mobileListConfigCancel,
	changeListConfig,
}