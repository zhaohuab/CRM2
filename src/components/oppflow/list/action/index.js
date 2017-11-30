import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { oppflow as url, oppstage,oppdimension,oppaction } from 'api';

const showForm = (flag, editData = {}, index) => {
	if (flag) {
		return (dispatch) => {
			reqwest({
				url: oppstage.all,
				method: "GET",

			}, result => {
				dispatch(fetchData('OPPFLOW_LIST_GETALLOPPSTAGE', { ...result }));
				reqwest({
					url: oppdimension.all,
					method: "GET",
				}, result => {
					dispatch(fetchData('OPPFLOW_LIST_GETALLOPPDIMENSION', { ...result }));
					dispatch(fetchData('OPPFLOW_LIST_SHOWFORM', { visible: flag, editData }));
				})
			})
		}
	}

	return (dispatch) => {
		dispatch(fetchData('OPPFLOW_LIST_SHOWFORM', { visible: flag, editData }));
	}
}

const getOppaction = (dimension) => {
	console.log(oppaction)
	return (dispatch) => {
		reqwest({
			url: oppaction.oppaction+'/dimension',
			method: "GET",
			data: {
				param: {
					dimension:dimension
				}
			},
		}, result => {
			dispatch(fetchData('OPPFLOW_LIST_GETACTIONSUCCESS', { ...result }));
		})
	}
}

const getListData = (pagination) => {
	return (dispatch) => {
		reqwest({
			url: url.oppflow,
			method: "GET",
			data: {
				param: {
					...pagination,
				}
			},
		}, result => {
			dispatch(fetchData('OPPFLOW_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}



function transData(data) {
	data.flowState = data.flowState.key;
	return data;
}

const onSave4Add = (flowData, stageData) => {
	return (dispatch) => {

		reqwest({
			url: url.oppflow,
			method: "POST",
			data: {
				param:{flowData,
				stageData}
			}
		}, result => {
			dispatch(fetchData('OPPACTION_CARD_SAVEADD', { ...result, visible: false }));
		})
	}
}

const onSave4Edit = (data, index) => {
	return (dispatch) => {

		reqwest({
			url: `${url.oppflow}/${data.id}`,
			method: "PUT",
			data: {
				param: transData(data)
			}
		}, result => {
			dispatch(fetchData('OPPACTION_CARD_SAVEEDIT', { ...result, visible: false }));
		})
	}
}

const onDelete = (rowKeys) => {
	return (dispatch) => {
		reqwest({
			url: url.oppflow + "/batch",
			method: "DELETE",
			data: {
				param: {
					id: id
				},
			}
		}, result => {
			dispatch(fetchData('OPPFLOW_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const onEnable = (rowKeys, enable, pagination) => {
	return (dispatch) => {
		reqwest({
			url: url.oppflow + "/state",
			method: "PUT",
			data: {
				param: {
					ids: rowKeys.join(","),
					enableState: enable,
					...pagination,
				},
			}
		}, result => {
			dispatch(fetchData('OPPFLOW_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const getEnumData = () => {
	return (dispatch) => {
		reqwest({
			url: url.doc,
			method: "get",
		}, (data) => {
			dispatch(fetchData('OPPFLOW_LIST_GETENUMDATA', { enumData: data.enumData }));
		})
	}
}

const selectData = (params) => {
	return (dispatch) => {
		dispatch(fetchData('OPPFLOW_LIST_SETDATA', params))
	}
}
const saveEditData = (params) => {
	return (dispatch) => {
		dispatch(fetchData('OPPFLOW_LIST_SAVEEDITDATA', params))
	}
}


const changeStep = (index) => {
	return (dispatch) => {
		dispatch(fetchData('OPPFLOW_LIST_CHANGESTEP', index))
	}
}

const saveResult = (result) => {
	return (dispatch) => {
		dispatch(fetchData('OPPFLOW_LIST_SAVERESULT', result))
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
	selectData,
	getOppaction,
	saveEditData,
	changeStep,
	saveResult
}