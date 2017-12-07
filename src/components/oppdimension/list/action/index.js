import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { oppdimension as url } from 'api';

const showForm = (flag, editData = {}, index) => {
	return (dispatch) => {
		dispatch(fetchData('OPPDIMENSION_LIST_SHOWFORM', { visible: flag, editData }));
	}
}

const getListData = (pagination) => {
	return (dispatch) => {
		reqwest({
			url: url.oppdimension,
			method: "GET",
			data: {
				param: {
					...pagination,
				}
			},
		},result => {
			dispatch(fetchData('OPPDIMENSION_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}


const onSave4Add = (data, index) => {
	return (dispatch) => {

		reqwest({
			url: url.oppdimension,
			method: "POST",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('OPPDIMENSION_LIST_SAVEADD', { ...result, visible: false }));
		})
	}
}

const onSave4Edit = (data, index) => {
	return (dispatch) => {

		reqwest({
			url: `${url.oppdimension}/${data.id}`,
			method: "PUT",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('OPPDIMENSION_LIST_SAVEEDIT', { ...result, visible: false }));
		})
	}
}

const onDelete = (rowKeys, pagination) => {
	return (dispatch) => {
		reqwest({
			url: url.oppdimension+"/batch",
			method: "DELETE",
			data: {
				param: {
					ids: rowKeys.join(","),
					...pagination
				},
			}
		}, result => {
			dispatch(fetchData('OPPDIMENSION_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const onEnable = (rowKeys, enable, pagination) => {
	return (dispatch) => {
		reqwest({
			url: url.oppdimension+"/state",
			method: "PUT",
			data: {
				param: {
					ids: rowKeys.join(","),
					enableState: enable,
					...pagination,
				},
			}
		}, result => {
			dispatch(fetchData('OPPDIMENSION_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const getEnumData = () =>{
    return (dispatch)=>{
        reqwest({
            url:url.doc,
            method:"get",
        },(data)=>{
            dispatch(fetchData('OPPDIMENSION_LIST_GETENUMDATA', {enumData:data.enumData}));
        })
    }
}

const selectData = (params ) => {
    return (dispatch)=>{
        dispatch(fetchData('OPPDIMENSION_LIST_SETDATA',params ))
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
	getEnumData,
	selectData
}