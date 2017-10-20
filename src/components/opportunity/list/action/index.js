import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { opportunity as url } from 'api';

const data1 ={
    data:[
        {
            name:"1"
        }
    ]
}

const showForm = (flag, editData = {}, index) => {
    return (dispatch) => {
        dispatch(fetchData('OPPORTUNITY_LIST_SHOWFORM', { visible: flag, editData }));
    }
}

const getListData = (params) => {

    return (dispatch) => {
        // reqwest({
        // 	url: url.opportunity,
        // 	method: "GET",
        // 	data: {
        // 	},
        // },result => {
        // 	dispatch(fetchData('OPPORTUNITY_LIST_GETLISTSUCCESS', { ...result }));
        // })
        dispatch(fetchData('OPPORTUNITY_LIST_GETLISTSUCCESS', data1));
    }
}

const onSave4Add = (data) => {
    data.enableState = "1";
    return (dispatch) => {
        reqwest({
            url: url.opportunity,
            method: "POST",
            data: {
                param: data
            }
        }, result => {
            dispatch(fetchData('OPPORTUNITY_CARD_SAVEADD', { ...result }));
        })
    }
}

const onSave4Edit = (data) => {
    return (dispatch) => {
        reqwest({
            url: `${url.opportunity}/${data.id}`,
            method: "PUT",
            data: {
                param: data
            }
        }, result => {
            dispatch(fetchData('OPPORTUNITY_CARD_SAVEEDIT', { ...result }));
        })
    }
}

const onDelete = (ids) => {
    return (dispatch) => {
        reqwest({
            url: url.opportunity+"/batch",
            method: "DELETE",
            data: {
                param: {
                    ids: ids.join(","),
                },
            }
        }, result => {
                dispatch(fetchData('OPPORTUNITY_LIST_DELETESUCCESS', {...result}));
        })
    }
}

const onSetState = (ids, enable) => {
	return (dispatch) => {
		reqwest({
			url: url.opportunity+"/state",
			method: "PUT",
			data: {
				param: {
					ids: ids.join(","),
					enableState: enable
				},
			}
		}, result => {
			dispatch(fetchData('OPPORTUNITY_LIST_SETSTATESUCCESS', { ...result }));
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