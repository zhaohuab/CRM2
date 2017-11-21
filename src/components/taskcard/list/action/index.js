import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { taskcard as url } from 'api';

const showForm = (flag, editData = {}, index) => {//index的作用？
	return (dispatch) => {
		dispatch(fetchData('TASKCARD_LIST_SHOWFORM', { visible: flag, editData }));
	}
}

const getListData = (params) => { //获取列表	
	return (dispatch) => {
		reqwest({
			url: url.taskcard,
			method: "GET",
			data: {
				param: {}
			},
		},result => {
			debugger;
			dispatch(fetchData('TASKCARD_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}
const transData = (data) => {
	let { mtObjName, mtBiztypeName } = data;
	data.mtObjId = data.mtObjName;
	data.mtBiztypeId = data.mtBiztypeName;
	return data;
}
const onSave4Add = (data, index) => { //增加
	return (dispatch) => {
		reqwest({
			url: url.taskcard,
			method: "POST",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('TASKCARD_CARD_SAVEADD', { ...result, visible: false }));
		})
	}
}

const onSave4Edit = (data, index) => { //修改
	return (dispatch) => {
		reqwest({
			url: `${url.taskcard}/${data.id}`,
			method: "PUT",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('TASKCARD_CARD_SAVEEDIT', { ...result, visible: false }));
		})
	}
}

const onDelete = (rowKeys, params) => { //删除
	return (dispatch) => {
		reqwest({
			url: url.taskcardBatch,
			method: "DELETE",
			data: {
				param: {
					ids: rowKeys.join(","),
					...params.pagination,
					searchMap: params.searchMap,
				},
			}
		}, result => {
			dispatch(fetchData('TASKCARD_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}
const onEnable = (rowKeys, enable, params) => {
	return (dispatch) => {
		reqwest({
			url: `${url.enable}`,
			method: "PUT",
			data: {
				param: {
					ids: rowKeys.join(","),
					enableState: enable,
					...params.pagination,
					searchMap: params.searchMap,
				},
			}
		}, result => {
			debugger
			dispatch(fetchData('TASKCARD_LIST_GETLISTSUCCESS', { ...result }));
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