import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { product as url } from 'api';

const getListData = (params) => {
	return (dispatch) => {
		reqwest({
			url: url.product,
			method: "GET",
			data: {
				param: {
					...params.pagination,
					searchMap: params.searchMap,
				}
			},
		},result => {
			dispatch(fetchData('PRODUCT_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
	
}

const onDelete = (rowKeys, params) => {
	return (dispatch) => {
		reqwest({
			url: url.productBatch,
			method: "DELETE",
			data: {
				param: {
					codes: rowKeys.join(","),
					...params.pagination,
					searchMap: params.searchMap,
				},
			}
		}, result => {
			dispatch(fetchData('PRODUCT_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const showForm = (flag, editData = {}, index) => {	
    return {
         type:'PRODUCT_LIST_SHOWFORM',
         content:{visible:flag, editData}   
    }    
}


const onSave4Add = (data, index) => {
debugger
	return (dispatch) => {
		reqwest({
			url: url.product,
			method: "POST",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('PRODUCT_CARD_SAVEADD', { ...result, visible: false }));
		})
	}
}

const onSave4Edit = (data, originCode) => {
	debugger
	return (dispatch) => {

		reqwest({
			url: `${url.product}/${originCode}`,
			method: "PUT",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('PRODUCT_CARD_SAVEEDIT', { ...result, visible: false }));
		})
	}
}


export {showForm, onDelete, getListData, onSave4Add,onSave4Edit}