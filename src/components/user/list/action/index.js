import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { user as url } from 'api';

const showForm = (flag, editData = {}, index) => {
	return (dispatch) => {
		dispatch(fetchData('USER_LIST_SHOWFORM', { visible: flag, editData }));
	}
}

const getListData = (params) => {
	return (dispatch) => {
		reqwest({
			url: url.user,
			method: "GET",
			data: {
				param: JSON.stringify({
					...params.pagination,
					searchMap: params.searchMap,
				})
			},
		},result => {
			dispatch(fetchData('USER_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}
const transData = (data) => {
	
	let { gender,orgId, deptId,job } = data;
	data.gender = gender.key;
	data.genderName = gender.title;
	data.orgId = orgId.key;
	data.orgName = orgId.title;
	data.deptId = deptId.key;
	data.deptName = deptId.title;
	data.job = job.key;
	data.jobName = job.title;
	return data;
}
const onSave4Add = (data, index) => {
	return (dispatch) => {

		reqwest({
			url: url.user,
			method: "POST",
			data: {
				param: JSON.stringify(transData(data))
			}
		}, result => {
			dispatch(fetchData('USER_CARD_SAVEADD', { ...result, visible: false }));
		})
	}
}

const onSave4Edit = (data, index) => {
	return (dispatch) => {

		reqwest({
			url: `${url.user}/${data.id}`,
			method: "PUT",
			data: {
				param: JSON.stringify((transData(data)))
			}
		}, result => {
			dispatch(fetchData('USER_CARD_SAVEEDIT', { ...result, visible: false }));
		})
	}
}

const onDelete = (rowKeys, params) => {
	return (dispatch) => {
		reqwest({
			url: url.userBatch,
			method: "POST",
			data: {
				param: JSON.stringify({
					ids: rowKeys.join(","),
					...params.pagination,
					searchMap: params.searchMap,
				}),
				_method: "DELETE"
			}
		}, result => {
			dispatch(fetchData('USER_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const onEnable = (rowKeys, enable, params) => {
	return (dispatch) => {
		reqwest({
			url: `${url.enable}`,
			method: "PUT",
			data: {
				param: JSON.stringify({
					ids: rowKeys.join(","),
					enableState: enable,
					...params.pagination,
					searchMap: params.searchMap,
				}),
			}
		}, result => {
			debugger
			dispatch(fetchData('USER_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}




//输出 type 与 方法
export {
	getListData,
	onDelete,
	showForm,
	onSave4Add,
	onSave4Edit,
	onEnable,
}