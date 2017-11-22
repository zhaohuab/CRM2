import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { taskcard as url } from 'api';

const showForm = (flag, editData = {}) => {
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
			dispatch(fetchData('TASKCARD_CARD_SAVEADD', {result:result, visible: false }));
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
			dispatch(fetchData('TASKCARD_CARD_SAVEEDIT', { result:result, visible: false }));
		})
	}
}

const onDelete = (rowKeys) => { //删除
	return (dispatch) => {
		reqwest({
			url: url.taskcardBatch,
			method: "DELETE",
			data: {
				param: {
					ids: rowKeys.join(","),
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

const onSelected = (rowKeys) =>{
    return (dispatch) => {
		dispatch(fetchData('TASKCARD_HEADER_SHOW', { rowKeys }));
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
	onSelected
}