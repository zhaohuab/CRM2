import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { sysinit as url } from 'api'

const transOrg = (data) => {

	data.createTime = data.createTime.format("YYYY-MM-DD hh:mm:ss");
	data.orgType = data.orgType.key;
	return data;
}
const onOrgSave = (data, index) => {
	return (dispatch) => {
		
		 reqwest({
		 	url: url.org,
		 	method: "PUT",
		 	data: {
		 		param: transOrg(data)
		 	}
		 }, result => {
			 debugger
			dispatch(fetchData('SYSINIT_PAGE_ORGSAVE', { orgInfo:result }));
		 })
	}
}

const transAdmin = (data) => {
	//如果是新增态，去除id属性
	if(data.editState == "ADD") {
		let {id,...others} = data;
		data = others;
	}
}
const onAdminListChange = (newData) => {
	return (dispatch) => {
		dispatch(fetchData('SYSINIT_PAGE_ADMINLISTCHANGE', { newData }));
	}
}

const onAdminListSave = (data) => {
	debugger
	return (dispatch) => {

		 reqwest({
		 	url: url.adminList,
		 	method: "POST",
		 	data: {
		 		param: transAdmin(data)
		 	}
		 }, result => {
			dispatch(fetchData('SYSINIT_PAGE_ADMINLISTSAVE', { adminList:data }));
		 })
	}
}


//输出 type 与 方法
export {
	onOrgSave,
	onAdminListChange,
	onAdminListSave,
}