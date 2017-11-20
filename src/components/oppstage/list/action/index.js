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
			dispatch(fetchData('OPPSTAGE_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

function transData (data) {
	data.dimension = data.dimension.key;
	return data;
}

const onSave4Add = (data) => {
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

const getEnumData = () =>{
    return (dispatch)=>{
        reqwest({
            url:url.doc,
            method:"get",
        },(data)=>{
            dispatch(fetchData('OPPSTAGE_LIST_GETENUMDATA', {enumData:data.enumData}));
        })
    }
}

const selectData = (params ) => {
    return (dispatch)=>{
        dispatch(fetchData('OPPSTAGE_LIST_SETDATA',params ))
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