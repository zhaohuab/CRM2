import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { measure as url } from 'api'

const onAdminListAdd = (newData) => {
	return (dispatch) => {

		// reqwest({
		// 	url: url.user,
		// 	method: "POST",
		// 	data: {
		// 		param: transData(data)
		// 	}
		// }, result => {
		 	dispatch(fetchData('SYSINIT_PAGE_ADMINLISTADD', { newData }));
		// })
	}
}

const onAdminListSave = (data) => {
	return (dispatch) => {

		// reqwest({
		// 	url: url.user,
		// 	method: "POST",
		// 	data: {
		// 		param: transData(data)
		// 	}
		// }, result => {
		 	dispatch(fetchData('SYSINIT_PAGE_ADMINLISTSAVE', { adminList:data }));
		// })
	}
}

const onSave4Add = (data, index) => {
	return (dispatch) => {

		// reqwest({
		// 	url: url.user,
		// 	method: "POST",
		// 	data: {
		// 		param: transData(data)
		// 	}
		// }, result => {
		 	dispatch(fetchData('SYSINIT_PAGE_SAVEADD', { orgInfo:data }));
		// })
	}
}


const adminChange = (data) => {
	return (dispatch) => {

		// reqwest({
		// 	url: url.user,
		// 	method: "POST",
		// 	data: {
		// 		param: transData(data)
		// 	}
		// }, result => {
		 	dispatch(fetchData('SYSINIT_PAGE_ADMINCHANGE', { adminList:data }));
		// })
	}
}

//输出 type 与 方法
export {
	onSave4Add,
	adminChange,
	onAdminListAdd,
	onAdminListSave,
}