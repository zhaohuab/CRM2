/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:34 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-11 13:30:16
 */

import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';

import cookie from "utils/cookie";
const baseDir = cookie("basedir"); // host:ip/crm_web/
import {
	message
} from 'antd';

//添加业务类型-弹出框
const addTplData = () => {
	return {
		type: "tpl_setting_add_showModal"
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



//输出方法
export {
	addTplData,
	handleTplCancel,
	changeTplList,
}