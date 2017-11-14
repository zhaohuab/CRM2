import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { oppstage as url } from 'api';

const showForm = (flag, editData = {}, index) => {
	return (dispatch) => {
		dispatch(fetchData('OPPSTAGE_LIST_SHOWFORM', { visible: flag, editData }));
	}
}

const getListData = (params,) => {
	let ur = url.oppstage;
	return (dispatch) => {
		reqwest({
			url: url.oppstage,
			method: "GET",
			data: {
				param: {

				}
			},
		},result => {
			debugger
			dispatch(fetchData('OPPSTAGE_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const onSave4Add = (data) => {
debugger
	return (dispatch) => {
		reqwest({
			url: url.oppstage,
			method: "POST",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('OPPSTAGE_CARD_SAVEADD', { ...result, visible: false }));
		})
	}
}

const onSave4Edit = (data, index) => {
	return (dispatch) => {
		reqwest({
			url: `${url.oppstage}/${data.id}`,
			method: "PUT",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('OPPSTAGE_CARD_SAVEEDIT', { ...result, visible: false }));
		})
	}
}

const onDelete = (rowKeys, params) => {
	return (dispatch) => {
		reqwest({
			url: url.oppstage+"/batch",
			method: "DELETE",
			data: {
				param: {
					ids: rowKeys.join(","),
					searchMap:{}
				},
			}
		}, result => {
			dispatch(fetchData('OPPSTAGE_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const onEnable = (rowKeys, enable, params) => {
	return (dispatch) => {
		reqwest({
			url: url.oppstage+"/state",
			method: "PUT",
			data: {
				param: {
					ids: rowKeys.join(","),
					enableState: enable,
					...params.pagination,
				},
			}
		}, result => {
			dispatch(fetchData('OPPSTAGE_LIST_GETLISTSUCCESS', { ...result }));
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