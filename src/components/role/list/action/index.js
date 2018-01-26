import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { role as url, func,org } from 'api';
import funcTreeData from '../container/data'

const showRoleForm = (flag, editData = {}, isEdit) => {

	return (dispatch) => {
		if(isEdit){
			dispatch(fetchData('ROLE_LIST_SHOWFORM', { visible: flag, editData,isEdit }));
		}else{
			editData.
			reqwest({
			url: org.org+'/',
			method: "GET",
			data: {
			
			},
		}, result => {
			dispatch(fetchData('ROLE_LIST_GETROLELISTSUCCESS', {data:result,searchMap}));
		})
			dispatch(fetchData('ROLE_LIST_SHOWFORM', { visible: flag, editData,isEdit }));
		}
		
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

const getRoleListData = (searchMap) => {

	return (dispatch) => {
		reqwest({
			url: url.role,
			method: "GET",
			data: {
				param:{
					searchMap:transData(searchMap)
				}
			},
		}, result => {
			dispatch(fetchData('ROLE_LIST_GETROLELISTSUCCESS', {data:result,searchMap}));
		})
	}
}

const getFuncTreeData = (roleId,isPreseted) => {
	
	return (dispatch) => {
		reqwest({
			// `${url.user}/${data.id}`
			url: url.role+"/"+roleId+"/funcs",
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
			url: url.role+"/"+roleId+"/func/assign",
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
			// reqwest({
			// 		url: role.role+"/"+roleId+"/funcres",
			// 		method: 'GET',
			// 		data: {
			// 			param: { roleId },
			// 		}
			// 	}, (result) => {
			// 			debugger
			// 			const code = '.class2{border:1px solid #333; display:none;}'
			// 			var head = document.head || document.getElementsByTagName('head')[0];
			// 			var style = document.createElement('style');
			// 			style.rel = 'stylesheet';
			// 			style.type = 'text/css';
			// 			style.id = "sys_func"
			// 			style.appendChild(document.createTextNode(code));
			// 			head.appendChild(style);
			// 			// return style.sheet || style.styleSheet;
			// 			dispatch(fetchData('ROLE_LIST_SELECTFUNC', funcData));
			// 	})

		
		})
	}
}


const getUserListData = (roleId,pagination,isPreseted) => {
	return (dispatch) => {
		reqwest({
			url: url.role+"/"+roleId+"/users",
			method: "GET",
			data: {
				param:{
					roleId,
					...pagination
				}
			},
		}, result => {
			dispatch(fetchData('ROLE_LIST_GETUSERLISTSUCCESS', { data:result,roleId,isPreseted }));
		})
	}
}


const showUserCard = (roleId,name) => {
	return (dispatch) => {
		reqwest({
			url: url.role+"/"+roleId+"/add/users",
			method: "GET",
			data: {
				param:{
					roleId,
					name
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
			url: url.role+"/"+roleId+"/users/assign",
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
			dispatch(fetchData('ROLE_LIST_SAVEUSERSUCCESS', { ...result }));
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
			dispatch(fetchData('ROLE_LIST_DELETEUSERSUCCESS', { ...result }));
		})
	}
}



const closeUserCard = () => {
	return (dispatch) => {
		dispatch(fetchData("ROLE_LIST_CLOSEUSERCARD", ))
	}
};


const getRightData = (roleId,isPreseted) => {
	return (dispatch) => {
		reqwest({
			url: url.role+"/"+roleId+"/right",
			method: "GET",
			data: {
			},
		}, result => {
			dispatch(fetchData('ROLE_LIST_GETRIGHTDATA', { data:result.data,isPreseted }));
		})
	}
}


const selectRight = (roleId, rightId, rightData) => {
	return (dispatch) => {
		reqwest({
			url: url.role+"/"+roleId+"/right/assign",
			method: "POST",
			data: {
				param: {
					roleId,
					typeId:rightId
				},
			}
		}, () => {
			dispatch(fetchData('ROLE_LIST_SELECTRIGHTDATA', rightData));
		})
	}
}

const saveUserCardName =  (name) => {
	return (dispatch) => {
		dispatch(fetchData("ROLE_LIST_SAVEUSERCARDNAME",name ))
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
	deleteUser,
	getRightData,
	selectRight,
	saveUserCardName
}