import fetchData from 'utils/fetchData';
import reqwest from 'utils/reqwest';
import fail from 'utils/reqwest/fail.js';
import { user as url } from 'api';

const showForm = (flag, editData={}, index) => {
    return (dispatch) => {
        dispatch(fetchData('USER_LIST_SHOWFORM',{visible:flag, editData}));
    }
}

const getListData = (params) => {
	return (dispatch) => {
		reqwest({
			url:url.user,
			method: "GET",
			data:{
                param: JSON.stringify({
					...params.pagination,
					searchMap:params.searchMap,
                })
            }
		})
		.then(result => {
            dispatch(fetchData('USER_LIST_GETLISTSUCCESS', {...result}));
		})
		.fail(result => {
            
		})
	}
}
const transData = (data) => {
	debugger
	let {orgId,deptId} = data;
	data.orgId = orgId.key;
	data.orgName = orgId.title;
	data.deptId = deptId.key;
	data.deptName = deptId.title;
	return data;
}
const onSave4Add = (data, index) => {
	return (dispatch) => {
        debugger
		reqwest({
			url:url.user,
			method: "POST",
			data:{
                param: JSON.stringify(transData(data))
            }
		})
		.then(result => {
            dispatch(fetchData('USER_CARD_SAVEADD', {...result ,visible:false}));
		})
		.fail(result => {
            fail(result);
		})
	}
}

const onSave4Edit = (data, index) => {
	return (dispatch) => {
        debugger
		reqwest({
			url:`${url.user}/${data.id}`,
			method: "PUT",
			data:{
                param: JSON.stringify((transData(data)))
            }
		})
		.then(result => {
            dispatch(fetchData('USER_CARD_SAVEEDIT', {...result ,visible:false}));
		})
		.fail(result => {
            fail(result);
		})
	}
}

const onDelete = (rowKeys,params) => {
	return (dispatch) => {
		reqwest({
			url:url.userBatch,
			method: "POST",
			data:{
				param: JSON.stringify({
					ids:rowKeys.join(","),
					...params.pagination,
					searchMap:params.searchMap,
				}),
				_method:"DELETE"
			}
		})
		.then(result => {
			dispatch(fetchData('USER_LIST_GETLISTSUCCESS', {...result}));
		})
		.fail(result => {
			
		})
	}
}

const onEnable = (rowKeys,enable,params) => {
	return (dispatch) => {
		debugger
		reqwest({
			url:`${url.enable}`  ,
			method: "PUT",
			data:{
				param: JSON.stringify({
					ids:rowKeys.join(","),
					enableState:enable,
					...params.pagination,
					searchMap:params.searchMap,
				}),
			}
		})
		.then(result => {
			dispatch(fetchData('USER_LIST_GETLISTSUCCESS', {...result}));
		})
		.fail(result => {
			
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