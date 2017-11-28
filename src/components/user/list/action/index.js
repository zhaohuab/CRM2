import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { user as url } from 'api';



const getListTpl = () => {
	return (dispatch) => {
		reqwest({
			url: url.listTpl,
			method: "GET",
		},result => {
			dispatch(fetchData('USER_LIST_TEMPLATE', { ...result }));
		})
	}
}
const getAddTpl = () => {
	return (dispatch) => {
		reqwest({
			url: url.addTpl,
			method: "GET",
		},result => {
			
			dispatch(fetchData('USER_ADD_TEMPLATE', { ...result }));
		})
	}
}

const getEditTpl = () => {
	return (dispatch) => {
		reqwest({
			url: url.addTpl,
			method: "GET",
		},result => {
			dispatch(fetchData('USER_EDIT_TEMPLATE', { ...result }));
		})
	}
}


const showForm = (flag, editData = {}, type) => {
	return (dispatch) => {
		
		dispatch(fetchData('USER_LIST_SHOWFORM', { visible: flag, editData ,isEdit:type=="EDIT"}));
	}
}

const getListData = (params) => {
	
	return (dispatch) => {
		reqwest({
			url: url.user,
			method: "GET",
			data: {
				param: {
					...params.pagination,
					searchMap: params.searchMap,
				}
			},
		},result => {
			dispatch(fetchData('USER_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const onUserChange = (data) => {
	return (dispatch) => { 
		
		dispatch(fetchData('USER_PAGE_USERCHANGE', { formFields:data }));
	}
}
const transData = (data) => {

	debugger
	return data;
}
const onSave4Add = (data) => {
	return (dispatch) => {

		reqwest({
			url: url.user,
			method: "POST",
			data: {
				param: transData(data)
			}
		}, result => {
			dispatch(fetchData('USER_CARD_SAVEADD', { ...result, visible: false }));
		})
	}
}

const onSave4Edit = (data) => {
	return (dispatch) => {

		reqwest({
			url: `${url.user}/${data.id}`,
			method: "PUT",
			data: {
				param: transData(data)
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
			method: "DELETE",
			data: {
				param: {
					ids: rowKeys.join(","),
					...params.pagination,
					searchMap: params.searchMap,
				},
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
				param: {
					ids: rowKeys.join(","),
					enableState: enable,
					...params.pagination,
					searchMap: params.searchMap,
				},
			}
		}, result => {
		
			dispatch(fetchData('USER_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}




//输出 type 与 方法
export {
	getListTpl,
	getAddTpl,
	getEditTpl,
	getListData,
	onUserChange,
	onDelete,
	showForm,
	onSave4Add,
	onSave4Edit,
	onEnable,
}