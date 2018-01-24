import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { measure as url } from 'api'


const showForm = (flag, editData = {}, index) => {
	return (dispatch) => {
		
		dispatch(fetchData('MEASURE_LIST_SHOWFORM', { visible: flag, editData }));
	}
}

const getListData = (params) => {
	
	return (dispatch) => {
		reqwest({
		 	url: url.measure,
		 	method: "GET",
		 	data: {
		 		param: {
		 			...params.pagination,
		 			searchMap: params.searchMap,
		 		}
		 	},
		 },result => {
			 debugger
			dispatch(fetchData('MEASURE_LIST_GETLISTSUCCESS', { ...result }/*mockData*/));
		})
	}
}
const changeEnableState = (enableState,selectedRowKeys,pagination,searchMap) => {
	return (dispatch) => {
		reqwest({
			url:  url.measure + '/state',
			method: "PUT",
			data: {
				param: {
					enableState:enableState,
					ids:selectedRowKeys,
					page:pagination.page,
					pageSize:pagination.pageSize,
					searchMap:searchMap
				}
			},
		},result => {
			dispatch(fetchData('MEASURE_LIST_GETLISTSUCCESS', { ...result }));
		})
	}	
}
const transData = (data) => {
	return data;
}
const onSave4Add = (data, index) => {
	return (dispatch) => {
		reqwest({
			url: url.measure,
			method: "POST",
			data: {
				param: transData(data)
			}
		}, result => {
			dispatch(fetchData('MEASURE_CARD_SAVEADD', { ...result, visible: false }));
		})
	}
}

const onSave4Edit = (data, index) => {
	return (dispatch) => {
		reqwest({
			url: `${url.measure}/${data.id}`,
			method: "PUT",
			data: {
				param: transData(data)
			}
		}, result => {
			dispatch(fetchData('MEASURE_CARD_SAVEEDIT', { ...result, visible: false }));
		})
	}
}
const onDelete = (rowKeys, params) => {
	return (dispatch) => {
		reqwest({
			url: url.measureBatch,
			method: "DELETE",
			data: {
				param: {
					ids: rowKeys.join(","),
					...params.pagination,
					//searchMap: params.searchMap,
				},
			}
		}, result => {
			dispatch(fetchData('MEASURE_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

//查询form赋值
const setLessFormData = (fields) => {	
	return {
		type:'MEASURE_FORM_SETLESSFORM',
		content:fields
	}    
}

//输出 type 与 方法
export {
	getListData,
	onDelete,
	showForm,
	onSave4Add,
	onSave4Edit,
	changeEnableState,
	setLessFormData,
}