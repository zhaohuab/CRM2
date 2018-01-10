import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { role as url, func } from 'api';
import funcTreeData from '../container/data'

const showRoleForm = (flag, editData = {}, index) => {
	return (dispatch) => {
		dispatch(fetchData('ROLE_LIST_SHOWFORM', { visible: flag, editData }));
	}
}

const transData = (data) => {
	if (data.orgId) {
		data.orgId = data.orgId.key
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

const getFuncTreeData = (roleId) => {
	
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
			dispatch(fetchData("ROLE_LIST_GETFUNCTREESUCCESS", { funcData, roleId }))
		})

	}

}
const selectRow = (selectedRows, selectedRowKeys) => {
	return (dispatch) => {
		dispatch(fetchData("ROLE_LIST_SELECTROW", { selectedRows, selectedRowKeys }))
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
				param: transData(data)
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
				// param: {
				// 	ids: ids.join(","),
				// },
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
					funcperIds:funcIds,
					checked
				},
			}
		}, () => {
			dispatch(fetchData('ROLE_LIST_SELECTFUNC', funcData));
		})
	}
}


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
	selectFunc
}