import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { oppflow as url, oppstage, oppdimension, oppaction } from 'api';

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
					dispatch(fetchData('OPPFLOW_LIST_SHOWFORM', { visible: flag }));
				})
			})
		}
	} else {
		return (dispatch) => {
			dispatch(fetchData('OPPFLOW_LIST_SHOWFORM', { visible: flag }));
		}
	}
}

const getEditData = (id) => {

	return (dispatch) => {
		reqwest({
			url: url.oppflow + "/" + id,
			method: "GET",
			data: {
				param: {
					id
				}
			},
		}, result => {
			dispatch(fetchData('OPPFLOW_LIST_GETEDITDATA', { ...result }));
		})
	}
}


const getOppaction = (dimension) => {
	console.log(oppaction)
	return (dispatch) => {
		reqwest({
			url: oppaction.oppaction + '/dimension',
			method: "GET",
			data: {
				param: {
					dimension: dimension
				}
			},
		}, result => {
			dispatch(fetchData('OPPFLOW_LIST_GETACTIONSUCCESS', { ...result }));
		})
	}
}

const getListData = (searchMap) => {
	return (dispatch) => {
		reqwest({
			url: url.oppflow,
			method: "GET",
			data: {
				param: {
					searchMap,
				}
			},
		}, result => {
			dispatch(fetchData('OPPFLOW_LIST_GETLISTSUCCESS', { data: result, searchMap }));
		})
	}
}



function transData(data) {
	data.flowState = data.flowState.key;
	data.biztype = data.biztype.key;
	return data;
}

const onSave4Add = (flowData, stageData) => {
	return (dispatch) => {

		reqwest({
			url: url.oppflow,
			method: "POST",
			data: {
				param: {
					flowData:transData(flowData),
					stageData
				}
			}
		}, result => {
			dispatch(fetchData('OPPFLOW_LIST_SAVEADD', { ...result }));
		})
	}
}

const onSave4Edit = (flowData, stageData) => {
	return (dispatch) => {

		reqwest({
			url: `${url.oppflow}/${flowData.id}`,
			method: "PUT",
			data: {
				param: {
					flowData,
					stageData
				}
			}
		}, result => {
			dispatch(fetchData('OPPFLOW_LIST_SAVEEDIT', { ...result }));
		})
	}
}

const onDelete = (id, listData) => {
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
			dispatch(fetchData('OPPFLOW_LIST_SAVELISTDATA', { data: listData }));
		})
	}
}

const onEnable = (id, enable, listData) => {
	return (dispatch) => {
		reqwest({
			url: url.oppflow + "/state",
			method: "PUT",
			data: {
				param: {
					ids: id,
					enableState: enable,
				},
			}
		}, result => {
			dispatch(fetchData('OPPFLOW_LIST_SAVELISTDATA', { data: listData }));
		})
	}
}

const getEnumData = () => {
	return (dispatch) => {
		reqwest({
			url: url.doc,
			method: "get",
		}, (data) => {
			
			
			reqwest({
				url: url.oppflow+"/biztype",
				method: "get",
			}, (bizData) => {
				dispatch(fetchData('OPPFLOW_LIST_GETENUMDATA', { enumData: data.enumData ,biztype:bizData.biztypeList}));
			})
		})
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
const setIsEdit = (result) => {
	return (dispatch) => {
		dispatch(fetchData('OPPFLOW_LIST_SETISEDIT', result))
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
	getOppaction,
	saveEditData,
	changeStep,
	saveResult,
	getEditData,
	setIsEdit
}