import fetchData from 'utils/fetchData';
import reqwest from 'utils/reqwest';
import fail from 'utils/reqwest/fail.js';


let url = "http://10.11.112.46:8081/crm_web/sys/users/";
const showForm = (flag, editData={}, index) => {
    return (dispatch) => {
        dispatch(fetchData('USER_LIST_SHOWFORM',{visible:flag, editData}));
    }
}
//定义方法 action
const getListData = (params) => {
	return (dispatch) => {
		reqwest({
			url:url,
			method: "GET",
			data:{
                param: JSON.stringify({
                    pageSize:20,
                    page:1
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

const onDelete = (record,index) => {
    const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
	}
	debugger
    mockData.splice(index,1);
	return (dispatch) => {
	    //dispatch(fetchData('GET_LIST_DATA', {}))
	    setTimeout(()=>{
	  	    dispatch(fetchData('PROJECT_LIST_GETDATA_SUCCESS', {data: mockData}))
	    }, 300)
	}
}

const onEdit = (data, index) => {
	return (dispatch) => {
	    //dispatch(fetchData('GET_LIST_DATA', {}))
	    setTimeout(()=>{
	  	    dispatch(fetchData('PROJECT_LIST_GETDATA_SUCCESS', {data : mockData}))
	    }, 300)
	}
}

const onSave4Add = (data, index) => {
	return (dispatch) => {
        debugger
		reqwest({
			url:url,
			method: "POST",
			data:{
                param: JSON.stringify(data)
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


//输出 type 与 方法
export {
    getListData,
    onDelete,
    onEdit,
    showForm,
    onSave4Add,
}