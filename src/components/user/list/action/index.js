import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { user as url, role } from 'api';



const getListTpl = (params) => {

	return (dispatch) => {
		dispatch(fetchData('USER_LIST_GETLIST'))
		reqwest({
			url: url.listTpl,
			method: "GET",
			data: {
				param: {
					enableState: params.searchMap.enableState
				}
			}
		}, result => {
			reqwest({
				url: url.user,
				method: "GET",
				data: {
					param: {
						...params.pagination,
						searchMap: params.searchMap,
					}
				},
			}, result1 => {
				dispatch(fetchData('USER_LIST_TEMPLATE', { tpl: result, data: result1, searchMap: params.searchMap, pagination: params.pagination }));
			})
		})

	}
}
const getAddTpl = () => {
	return (dispatch) => {
		reqwest({
			url: url.addTpl,
			method: "GET",
		}, result => {
			dispatch(fetchData('USER_ADD_TEMPLATE', { ...result }));
		})
	}
}

const getEditTpl = () => {
	return (dispatch) => {
		reqwest({
			url: url.editTpl,
			method: "GET",
		}, result => {
			dispatch(fetchData('USER_EDIT_TEMPLATE', { ...result }));
		})
	}
}


const showForm = (flag, editData = {}, isEdit) => {
	if (flag) {
		return (dispatch) => {
			dispatch(fetchData('USER_LIST_SHOWFORM', { editData, isEdit }));
			reqwest({
				url: role.role + "/ref",
				method: "GET",
				data: {
				}
			}, result => {
				let roleEnum = []
				for (let i = 0; i < result.data.length; i++) {
					let role = {}
					role.key = result.data[i].id;
					role.title = result.data[i].name;
					roleEnum.push(role);
				}
				dispatch(fetchData('USER_LIST_GETENUMDATA', { roleEnum }));
			})
		}
	} else {
		return (dispatch) => {
			dispatch(fetchData('USER_LIST_CLOSEFORM', { editData, isEdit }));
		}
	}
}

const getListData = (params) => {
	
	return (dispatch) => {
		dispatch(fetchData('USER_LIST_GETLIST'))
		reqwest({
			url: url.user,
			method: "GET",
			data: {
				param: {
					...params.pagination,
					searchMap: params.searchMap,
				}
			},
		}, result => {
			dispatch(fetchData('USER_LIST_GETLISTSUCCESS', { data: result, searchMap: params.searchMap, pagination: params.pagination }));
		})
	}
}


const onUserChange = (data) => {
	return (dispatch) => {

		dispatch(fetchData('USER_PAGE_USERCHANGE', { formFields: data }));
	}
}
const transData = (data) => {
	return data;
}
const onSave4Add = (data) => {
	return (dispatch) => {
		dispatch(fetchData('USER_LIST_SAVEADDSTART'))
		reqwest({
			url: url.user,
			method: "POST",
			data: {
				param: transData(data)
			}
		}, result => {
			dispatch(fetchData('USER_CARD_SAVEADD', { ...result, visible: false }));
		},()=>{
			dispatch(fetchData('USER_LIST_LOADOVER'));
		})
	}
}

const onSave4Edit = (data) => {
	return (dispatch) => {
		dispatch(fetchData('USER_LIST_SAVEEDITSTART'))
		reqwest({
			url: `${url.user}/${data.id}`,
			method: "PUT",
			data: {
				param: transData(data)
			}
		}, result => {
			dispatch(fetchData('USER_CARD_SAVEEDIT', { ...result, visible: false }));
		},()=>{
			dispatch(fetchData('USER_LIST_LOADOVER'));
		})
	}
}

const onDelete = (rowKeys, params) => {

	return (dispatch) => {
		dispatch(fetchData('USER_LIST_GETLIST'))
		reqwest({
			url: url.userBatch,
			method: "DELETE",
			data: {
				param: {
					ids: rowKeys.join(","),
					...params.pagination,
					searchMap: params.searchMap,
				},
			}
		}, result => {
			dispatch(fetchData('USER_LIST_GETLISTSUCCESS', { data: result, searchMap: params.searchMap, pagination: params.pagination }));
		},()=>{
			dispatch(fetchData('USER_LIST_LOADOVER'));
		})
	}
}

const onEnable = (rowKeys, enable, params) => {
	return (dispatch) => {
		dispatch(fetchData('USER_LIST_GETLIST'))
		reqwest({
			url: `${url.enable}`,
			method: "PUT",
			data: {
				param: {
					ids: rowKeys.join(","),
					enableState: enable,
					...params.pagination,
					searchMap: params.searchMap,
				},
			}
		}, result => {
			dispatch(fetchData('USER_LIST_GETLISTSUCCESS', { data: result, searchMap: params.searchMap, pagination: params.pagination }));
		},()=>{
			dispatch(fetchData('USER_LIST_LOADOVER'));
		})
	}
}


const showAssign = () => {
	return (dispatch) => {
		// dispatch(fetchData('USER_LIST_SHOWASSIGN', ));
		console.log(role.role + "/ref")
		reqwest({
			url: role.role + "/ref",
			method: "GET",
			data: {
			}
		}, result => {
			dispatch(fetchData('USER_LIST_SHOWASSIGN', { ...result }));
		})
	}
}


const selectRow = (selectedRows, selectedRowKeys) => {
	return (dispatch) => {
		dispatch(fetchData("USER_LIST_SELECTROW", { selectedRows, selectedRowKeys }))
	}
};


const AssignRole = (roleId, userIds, pagination, searchMap) => {
	return (dispatch) => {
		dispatch(fetchData('USER_LIST_GETLIST'))
		reqwest({
			url: url.user + "/allocation",
			method: "PUT",
			data: {
				param: {
					roleId,
					userIds: userIds.join(","),
					...pagination,
					searchMap
				}
			}
		}, result => {
			dispatch(fetchData('USER_LIST_ASSIGNROLE', result));
		},()=>{
			dispatch(fetchData('USER_LIST_LOADOVER'));
		})
	}
}


const closeAssign = () => {
	return (dispatch) => {
		dispatch(fetchData('USER_LIST_CLOSEASSIGN'));
	}
}
const selectRole = (selectedRole) => {
	return (dispatch) => {
		dispatch(fetchData("USER_LIST_SELECTROLE", { selectedRole }))
	}
};


const getEnumData = () => {
	return (dispatch) => {
		reqwest({
			url: role.role + "/ref",
			method: "GET",
			data: {
			}
		}, result => {
			let roleEnum = []
			for (let i = 0; i < result.data.length; i++) {
				let role = {}
				role.key = result.data[i].id;
				role.title = result.data[i].name;
				roleEnum.push(role);
			}
			dispatch(fetchData('USER_LIST_GETENUMDATA', { roleEnum }));
		})
	}
}

//重新保存模板tpl
const saveTpl = (tpl) => {
	return (dispatch) => {
		dispatch(fetchData("USER_LIST_SAVETEMPLATE", tpl))
	}
};

const resetState = () => {
	return (dispatch) => {
		dispatch(fetchData("USER_LIST_RESETSTATE"))
	}
}

//输出 type 与 方法
export {
	getListTpl,
	getAddTpl,
	getEditTpl,
	getListData,
	onUserChange,
	onDelete,
	showForm,
	onSave4Add,
	onSave4Edit,
	onEnable,
	showAssign,
	selectRow,
	AssignRole,
	closeAssign,
	selectRole,
	getEnumData,
	saveTpl,
	resetState
}