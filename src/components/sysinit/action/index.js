import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { sysinit as url } from 'api'

const getMainEditTpl = () => {
	return (dispatch) => {
		
		 reqwest({
		 	url: url.mainEditTpl,
		 	method: "GET",
		 }, result => {
			 
			dispatch(fetchData('SYSINIT_EDIT_TEMPLATE', { ...result }));
		 })
	}
}
const getSysInitInfo = () => {
	return (dispatch) => {
		
		 reqwest({
		 	url: url.info,
		 	method: "GET",
		 }, result => {
			 
			dispatch(fetchData('SYSINIT_PAGE_INFO', { ...result }));
		 })
	}
}

const transOrg = (data) => {

	return data;
}
const onOrgSave = (data, index) => {
	debugger
	return (dispatch) => {
		
		 reqwest({
		 	url: url.org,
		 	method: "PUT",
		 	data: {
		 		param: transOrg(data)
		 	}
		 }, result => {
			 
			dispatch(fetchData('SYSINIT_PAGE_ORGSAVE', { tenantInfo:result }));
		 })
	}
}

const onOrgChange = (data, index) => {
	return (dispatch) => { 
		dispatch(fetchData('SYSINIT_PAGE_ORGCHANGE', { tenantFields:data }));
	}
}
const transAdmin = (data) => {
	//如果是新增态，去除id属性
	
	data.map((item) => {
		if(item.editState == "ADD") {
			//去掉ID属性
			let {id,...others} = item;
			item = others;
			return item;
		}
	})

	return data;
}
const onAdminListChange = (newData) => {
	return (dispatch) => {
		dispatch(fetchData('SYSINIT_PAGE_ADMINLISTCHANGE', { newData }));
	}
}

const onAdminListSave = (data) => {
	
	return (dispatch) => {

		 reqwest({
		 	url: url.adminList,
		 	method: "POST",
		 	data: {
		 		param: transAdmin(data)
		 	}
		 }, result => {
			 let { adminList } = result;
			 adminList = adminList.map((item) => {
				 item.editState = "NORMAL";
				 return item;
			 })
			dispatch(fetchData('SYSINIT_PAGE_ADMINLISTSAVE', { adminList:adminList }));
		 })
	}
}

const onEdit = (data) => {
	return (dispatch) => {
		dispatch(fetchData('SYSINIT_PAGE_ONEDIT', {}));
	}
}

//输出 type 与 方法
export {
	getMainEditTpl,
	getSysInitInfo,
	onOrgChange,
	onOrgSave,
	onAdminListChange,
	onAdminListSave,
	onEdit,
}