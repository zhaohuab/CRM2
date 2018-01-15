import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { role as url, func } from 'api';
import funcTreeData from '../container/data'

const showRoleForm = (flag, editData = {}, isEdit) => {
	return (dispatch) => {
		dispatch(fetchData('ROLE_LIST_SHOWFORM', { visible: flag, editData,isEdit }));
	}
}

const transData = (data) => {
	if (data.orgId) {
		data.orgId = data.orgId.key
	}
	if (data.type) {
		data.type = data.type.key
	}
	return data;
}

const getRoleListData = () => {

	return (dispatch) => {
		reqwest({
			url: url.role,
			method: "GET",
			data: {
			},
		}, result => {
			dispatch(fetchData('ROLE_LIST_GETROLELISTSUCCESS', { ...result }));
		})
	}
}

const getFuncTreeData = (roleId,isPreseted) => {
	
	return (dispatch) => {
	
		reqwest({
			// `${url.user}/${data.id}`
			url: func.func,
			method: "GET",
			data: {
				param: {
					roleId
				}
			},
		}, funcData => {
			dispatch(fetchData("ROLE_LIST_GETFUNCTREESUCCESS", { funcData, roleId,isPreseted }))
		})

	}

}
const selectRow = (selectedRows, selectedRowKeys) => {
	return (dispatch) => {
		dispatch(fetchData("ROLE_LIST_SELECTROW", { selectedRows, selectedRowKeys }))
	}
};

const selectUserRow = (selectedRows, selectedRowKeys) => {
	return (dispatch) => {
		dispatch(fetchData("ROLE_LIST_SELECTUSERROW", { selectedRows, selectedRowKeys }))
	}
};

const selectUserCardRow = (selectedRows, selectedRowKeys) => {
	return (dispatch) => {
		dispatch(fetchData("ROLE_LIST_SELECTUSERCARDROW", { selectedRows, selectedRowKeys }))
	}
};


const selectRowTab = (rowId, tabIndex) => {
	return (dispatch) => {
		reqwest({
			url: `${url.role}/${rowId}`,
			method: "GET",
			data: {
				tabIndex: tabIndex,
			},
		}, result => {
			// dispatch(fetchData('ROLE_LIST_SELECTROWTAB', { ...result }));
		})
	}
};
const onTabClick = (tabIndex) => {
	return (dispatch) => {
		dispatch(fetchData("ROLE_LIST_TABSELECT", { tabIndex }))
	}
};

const onSaveRole4Add = (data, index) => {
	return (dispatch) => {
		reqwest({
			url: url.role,
			method: "POST",
			data: {
				param: transData(data)
			}
		}, result => {
			dispatch(fetchData('ROLE_CARD_SAVEADD', { ...result }));
		})
	}
}

const onSaveRole4Edit = (data, index) => {
	return (dispatch) => {

		reqwest({
			url: `${url.role}/${data.id}`,
			method: "PUT",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('ROLE_CARD_SAVEEDIT', { ...result }));
		})
	}
}

const onDelete = (id) => {
	return (dispatch) => {
		reqwest({
			url: url.role + "/" + id,
			method: "DELETE",
			data: {
			}
		}, result => {
			if (result.flag) {
				dispatch(fetchData('ROLE_LIST_DELETESUCCESS', id));
			}

		})
	}
}


const selectFunc = (roleId, funcIds, checked, funcData) => {
	
	return (dispatch) => {
		// dispatch(fetchData('ROLE_LIST_SELECTFUNC', funcData));
		reqwest({
			url: func.func,
			method: "POST",
			data: {
				param: {
					roleId,
					funcperIds:funcIds.join(","),
					checked
				},
			}
		}, () => {
			dispatch(fetchData('ROLE_LIST_SELECTFUNC', funcData));
		})
	}
}


const getUserListData = (roleId,pagination) => {
	return (dispatch) => {
		reqwest({
			url: url.role+"/getPersonals",
			method: "GET",
			data: {
				param:{
					roleId,
					...pagination
				}
			},
		}, result => {
			dispatch(fetchData('ROLE_LIST_GETUSERLISTSUCCESS', { ...result }));
		})
	}
}


const showUserCard = (roleId,pagination) => {
	return (dispatch) => {
		reqwest({
			url: url.role+"/getPersonalsAddList",
			method: "GET",
			data: {
				param:{
					roleId,
					...pagination
				}
			},
		}, result => {
			dispatch(fetchData('ROLE_LIST_GETUSERCARDLISTSUCCESS', { ...result }));
		})
	}
}



const getEnumData = () => {
	return (dispatch) => {
		reqwest({
			url: url.role+"/roletypes",
			method: "GET",
			data: {
			},
		}, result => {
			dispatch(fetchData('ROLE_LIST_GETENUMDATA', { ...result }));
		})
	}
}


const saveUser = (roleId,userIds,pagination) =>{
	return (dispatch) => {
		reqwest({
			url: url.role+"/assign",
			method: "POST",
			data: {
				param:{
					roleId,
					userIds:userIds.join(","),
				...pagination
				}
				
			},
		}, result => {
			// dispatch(fetchData('ROLE_LIST_CLOSEUSERCARD', { ...result }));
			dispatch(fetchData('ROLE_LIST_GETUSERLISTSUCCESS', { ...result }));
		})
	}
}


const deleteUser = (roleId,userIds,pagination) =>{
	return (dispatch) => {
		reqwest({
			url: url.role+"/unassign",
			method: "DELETE",
			data: {
				param:{
					roleId,
					userIds:userIds.join(","),
				...pagination
				}
				
			},
		}, result => {
			// dispatch(fetchData('ROLE_LIST_CLOSEUSERCARD', { ...result }));
			dispatch(fetchData('ROLE_LIST_GETUSERLISTSUCCESS', { ...result }));
		})
	}
}



const closeUserCard = () => {
	return (dispatch) => {
		dispatch(fetchData("ROLE_LIST_CLOSEUSERCARD", ))
	}
};


//输出 type 与 方法
export {
	getRoleListData,
	showRoleForm,
	onSaveRole4Add,
	onSaveRole4Edit,
	onDelete,
	getFuncTreeData,
	selectRow,
	onTabClick,
	selectRowTab,
	selectFunc,
	getUserListData,
	showUserCard,
	getEnumData,
	saveUser,
	closeUserCard,
	selectUserRow,
	selectUserCardRow,
	deleteUser
}