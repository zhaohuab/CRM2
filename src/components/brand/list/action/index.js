import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { brand as url } from 'api';



const showForm = (flag, editData = {}) => {
    return (dispatch) => {
        dispatch(fetchData('BRAND_LIST_SHOWFORM', { visible: flag, editData }));
    }
}

const showViewForm = (flag, editData = {}) => {
    return (dispatch) => {
        dispatch(fetchData('BRAND_LIST_SHOWVIEWFORM', { visible: flag, editData }));
    }
}

const selectData = (data) => {
    return (dispatch)=>{
        dispatch(fetchData('BRAND_LIST_SELECTDATA',data))
    }
}

const getListData = (params) => {
    return (dispatch) => {
        reqwest({
        	url: url.brand,
        	method: "GET",
        	data: {
                param: {
					...params.pagination,
					searchMap: params.searchMap,
				}
        	},
        },result => {
        	dispatch(fetchData('BRAND_LIST_GETLISTSUCCESS', { ...result }));
        })
        // dispatch(fetchData('BRAND_LIST_GETLISTSUCCESS', brandData));
    }
}

const changeEnableState = (enableState,selectedRowKeys,pagination,searchMap) => {
    debugger
	return (dispatch) => {
		reqwest({
			url:  url.brand + '/state',
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
            debugger
			dispatch(fetchData('BRAND_LIST_GETLISTSUCCESS', { ...result }));
		})
	}	
}

const onSave4Add = (data) => {
    data.enableState = "1";
    return (dispatch) => {
        reqwest({
            url: url.brand,
            method: "POST",
            data: {
                param: data
            }
        }, result => {
            dispatch(fetchData('BRAND_CARD_SAVEADD', { ...result }));
        })
    }
}

const onSave4Edit = (data) => {
    return (dispatch) => {
        reqwest({
            url: `${url.brand}/${data.id}`,
            method: "PUT",
            data: {
                param: data
            }
        }, result => {
            dispatch(fetchData('BRAND_CARD_SAVEEDIT', { ...result }));
        })
    }
}

const onDelete = (ids,pagination,searchMap) => {
    return (dispatch) => {
        reqwest({
            url: url.brand+"/batch",
            method: "DELETE",
            data: {
                param: {
                    ids: ids,
                    page:pagination.page,
                    pageSize:pagination.pageSize,
                    searchMap:searchMap
                },
            }
        }, result => {
                dispatch(fetchData('BRAND_LIST_DELETESUCCESS', {...result}));
        })
    }
}

const onSetState = (ids, enable) => {
	return (dispatch) => {
		reqwest({
			url: url.brand+"/state",
			method: "PUT",
			data: {
				param: {
					ids: ids.join(","),
					enableState: enable
				},
			}
		}, result => {
			dispatch(fetchData('BRAND_LIST_SETSTATESUCCESS', { ...result }));
		})
	}
}

//查询form赋值
const setLessFormData = (fields) => {	
	return {
		type:'BRAND_FORM_SETLESSFORM',
		content:fields
	}    
}
//输出 type 与 方法
export {
    getListData,
    showForm,
    showViewForm,
    onSave4Add,
    onSave4Edit,
    onDelete,
    onSetState,
    selectData,
    changeEnableState,
    setLessFormData,
}