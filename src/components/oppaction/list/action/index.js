import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { oppaction as url } from 'api';

const showForm = (flag, editData = {}, index) => {
	return (dispatch) => {
		dispatch(fetchData('OPPACTION_LIST_SHOWFORM', { visible: flag, editData }));
	}
}

const getListData = (params) => {
	
	return (dispatch) => {
		reqwest({
			url: url.oppaction,
			method: "GET",
			data: {
				param: {
					...params.pagination,
				}
			},
		},result => {
			dispatch(fetchData('OPPACTION_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const onSave4Add = (data, index) => {
	return (dispatch) => {

		reqwest({
			url: url.oppaction,
			method: "POST",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('OPPACTION_CARD_SAVEADD', { ...result, visible: false }));
		})
	}
}

const onSave4Edit = (data, index) => {
	return (dispatch) => {

		reqwest({
			url: `${url.oppaction}/${data.id}`,
			method: "PUT",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('OPPACTION_CARD_SAVEEDIT', { ...result, visible: false }));
		})
	}
}

const onDelete = (rowKeys, params) => {
	return (dispatch) => {
		reqwest({
			url: url.oppaction+"/batch",
			method: "DELETE",
			data: {
				param: {
					ids: rowKeys.join(","),
					...params.pagination
				},
			}
		}, result => {
			dispatch(fetchData('OPPACTION_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const onEnable = (rowKeys, enable, params) => {
	return (dispatch) => {
		reqwest({
			url: url.oppaction+"/state",
			method: "PUT",
			data: {
				param: {
					ids: rowKeys.join(","),
					enableState: enable,
					...params.pagination,
				},
			}
		}, result => {
			dispatch(fetchData('OPPACTION_LIST_GETLISTSUCCESS', { ...result }));
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