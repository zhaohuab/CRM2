import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { doc as url } from 'api';

const showForm = (flag, editData = {}) => {	
		return (dispatch) => {
		dispatch(fetchData('DOC_LIST_SHOWFORM', { visible: flag, editData }));
	}	
}

const getListData = (params) => {
	
	return (dispatch) => {
		reqwest({
			url: url.doc,
			method: "GET",
			data: {
				param: {
					...params.pagination,
					searchMap: params.searchMap,
				}
			},
		},result => {
			dispatch(fetchData('DOC_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const onSave4Add = (data, index) => {
	return (dispatch) => {
		reqwest({
			url: url.doc,
			method: "POST",
			data: {
				param:data
			}
		}, result => {
			dispatch(fetchData('DOC_CARD_SAVEADD', { ...result, visible: false }));
		})
	}
}

const onSave4Edit = (data, index) => {
	return (dispatch) => {

		reqwest({
			url: `${url.doc}/${data.id}`,
			method: "PUT",
			data: {
				param:data
			}
		}, result => {
			dispatch(fetchData('DOC_CARD_SAVEEDIT', { ...result, visible: false }));
		})
	}
}

const onDelete = (rowKeys, params) => {
	return (dispatch) => {
		reqwest({
			url: url.docBatch,
			method: "DELETE",
			data: {
				param: {
					ids: rowKeys.join(","),
					...params.pagination,
					searchMap: params.searchMap,
				},
			}
		}, result => {
			dispatch(fetchData('DOC_LIST_GETLISTSUCCESS', { ...result }));
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
			dispatch(fetchData('DOC_LIST_GETLISTSUCCESS', { ...result }));
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
	onEnable
}