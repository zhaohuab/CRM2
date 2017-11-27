import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { product as url, measure, prdtype, brand } from 'api';

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

const onSave4Edit = (data) => {
	return (dispatch) => {
		reqwest({
			url: `${url.product}/${data.id}`,
			method: "PUT",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('PRODUCT_CARD_SAVEEDIT', { ...result, visible: false }));
		})
	}
}

const getProdClassRef = () => {
	return (dispatch) => {
		reqwest({
			url: prdtype.prdtype + '/reftree',
			method: "GET",
			data: {
				param: ""
			}
		}, result => {
			dispatch(fetchData('PRODUCT_CLASS_GETREFTREE', { ...result}));
		})
	}
}

const getMeaUnitRef = (param) => {
	return (dispatch) => {
		reqwest({
			url: measure.measure+'/ref',
			method: "GET",
			data: {
				param: {page: param.page,
								pageSize: param.pageSize}
			}
		}, result => {
			dispatch(fetchData('PRODUCT_MEAUNIT_GETREFLIST', { ...result}));
		})
	}
}

const getBrandRef = (param) => {
	return (dispatch) => {
		reqwest({
			url: brand.brand+'/ref',
			method: "GET",
			data: {
				param: {page: param.page,
								pageSize: param.pageSize}
			}
		}, result => {
			dispatch(fetchData('PRODUCT_BRAND_GETREFLIST', { ...result}));
		})
	}
}

const addRow = (item) => {
	return {
		type:"ADDROW",
		content:item
	}
}

const showSalesUnit = (flag) => {
	return {
		type:"PRODUCT_SALESUNIT_VISIBLE",
		content:flag
	}
}
export {showForm, onDelete, getListData, onSave4Add, onSave4Edit, getProdClassRef, 
	getMeaUnitRef, getBrandRef, addRow, showSalesUnit}