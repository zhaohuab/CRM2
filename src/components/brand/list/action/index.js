import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { brand as url } from 'api';



const showForm = (flag, editData = {}, index) => {
    return (dispatch) => {
        dispatch(fetchData('BRAND_LIST_SHOWFORM', { visible: flag, editData }));
    }
}

const getListData = (params) => {

    return (dispatch) => {
        reqwest({
        	url: url.brand,
        	method: "GET",
        	data: {
        	},
        },result => {
        	dispatch(fetchData('BRAND_LIST_GETLISTSUCCESS', { ...result }));
        })
        // dispatch(fetchData('BRAND_LIST_GETLISTSUCCESS', brandData));
    }
}

const onSave4Add = (data) => {
    debugger
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

const onDelete = (ids) => {
    return (dispatch) => {
        reqwest({
            url: url.brand+"/batch",
            method: "DELETE",
            data: {
                param: {
                    ids: ids.join(","),
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

//输出 type 与 方法
export {
    getListData,
    showForm,
    onSave4Add,
    onSave4Edit,
    onDelete,
    onSetState
}