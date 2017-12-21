import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { prdattr } from 'api';

const showForm = (flag, editData = {}, index) => {
	return (dispatch) => {
		dispatch(fetchData('PRDATTR_LIST_SHOWFORM', { visible: flag, editData }));
	}
}

const showAddForm = (flag) => {
	return (dispatch) => {
		dispatch(fetchData('PRDATTR_LIST_ADDSHOWFORM', { visible: flag }));
	}
}

const getListData = (pagination, searchMap) => {
	let url = prdattr.prdattr;
	return (dispatch) => {
		reqwest({
			url: prdattr.prdattr,
			method: "GET",
			data: {
				param: {
					page: pagination.page,
					pageSize: pagination.pageSize,
					searchMap: searchMap
				}
			},
		},result => {
			dispatch(fetchData('PRDATTR_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const changeEnableState = (enableState,selectedRowKeys,pagination,searchMap) => {
	return (dispatch) => {
		reqwest({
			url:  prdattr.prdattr + '/state',
			method: "PUT",
			data: {
				param: {
					enableState:enableState,
					ids:selectedRowKeys,
					page:pagination.page,
					pageSize:pagination.pageSize,
					searchMap:searchMap
				}
			},
		},result => {
			dispatch(fetchData('PRDATTR_LIST_GETLISTSUCCESS', { ...result }));
		})
	}	
}

const onSave4Add = (data) => {
	return (dispatch) => {
		reqwest({
			url: prdattr.prdattr,
			method: "POST",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('PRDATTR_CARD_SAVEADD', { ...result, visible: false }));
		})
	}
}

const onSave4Edit = (data) => {
	return (dispatch) => {
		let id = data.id;
		reqwest({
			url: prdattr.prdattr + "/" +id,
			method: "PUT",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('PRDATTR_CARD_SAVEEDIT', { ...result, visible: false }));
		})
	}
}

const onDelete = (rowKeys,  pagination, searchMap) => {
	return (dispatch) => {
		reqwest({
			url: prdattr.prdattr +"/batch",
			method: "DELETE",
			data: {
				param: {
					ids: rowKeys.join(","),
					searchMap:searchMap,
					page:pagination.page,
					pageSize:pagination.pageSize
				},
			}
		}, result => {
			dispatch(fetchData('PRDATTR_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const onEnable = (rowKeys, enable, params) => {
	return (dispatch) => {
		reqwest({
			url: prdattr.prdattr+"/state",
			method: "PUT",
			data: {
				param: {
					ids: rowKeys.join(","),
					enableState: enable,
					...params.pagination,
				},
			}
		}, result => {
			dispatch(fetchData('PRDATTR_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const changeFormData = (fields) => {	
	return {
			 type:'PRDATTR_FORM_CHANGEDATA',
			 content:fields
	}    
}

const addAttrVaRow = (item) => {
	return {
		type:"PRDATTR_ATTRVA_AADDROW",
		content:item
	}
}

const onChangeAttrVa = (changeData) => {
	return {
		type:"PRDATTR_CARD_CHANGEATTRVA",
		content:changeData
	}
}

//
const onEditAttrVa = (attrData) => {
	return {
		type:"PRDATTR_CARD_EDITATTRVA",
		content:attrData
	}
} 

//保存或取消新增编辑后，addNum置零
const resetAddNum = () => {
	return {
		type:"PRDATTR_CARD_RESETADDNUM",
		content:0
	}
}

//编辑，获取一条数据，给属性表赋值
const setAttrData = (attrData) => {
	return {
		type:"PRDATTR_CARD_SETATTRDATA",
		content:attrData
	}
}

const getAttrDetail = (id) => {
	return (dispatch) => {
		reqwest({
			url: prdattr.prdattr + "/" + id.toString() + "/cited",
			method: "GET",
			data: {
				param:{}
			}
		}, citeresult => {
			reqwest({
				url: prdattr.prdattr + "/" + id.toString(),
				method: "GET",
				data: {
					param:{}
				}
			}, result => {
				dispatch(fetchData('PRDATTR_LIST_SHOWFORM', { visible:true, data:result ,checkedids:citeresult}));
			})
		})
	}
} 


const setFormData = (formData) => {
	return {
		type:"PRDATTR_FORM_SETFORM",
		content:formData
	}
}

const setSecRowKeys = (secRowKeys) => {
	return {
		type:"PRDATTR_ATTRVA_SETSECROWKEYS",
		content:secRowKeys
	}
}

//查询form赋值
const setLessFormData = (fields) => {	
	return {
			 type:'PRDATTR_FORM_SETLESSFORM',
			 content:fields
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
	changeFormData,
	addAttrVaRow,
	onChangeAttrVa,
	resetAddNum,
	onEditAttrVa,
	setAttrData,
	getAttrDetail,
	showAddForm,
	setFormData,
	setSecRowKeys,
	setLessFormData,
}