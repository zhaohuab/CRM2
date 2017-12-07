import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { prdattrgroup ,prdattr} from 'api';

const changeEnableState = (enableState,selectedRowKeys,pagination,searchMap) => {
	return (dispatch) => {
		reqwest({
			url:  prdattrgroup.prdattrgroup + '/state',
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
			dispatch(fetchData('PRDATTRGROUP_LIST_GETLISTSUCCESS', { ...result }));
		})
	}	
}

const showForm = (flag, editData = {}, index) => {
	return (dispatch) => {
		dispatch(fetchData('PRDATTR_LIST_SHOWFORM', { visible: flag, editData }));
	}
}
//ok 新增显示界面
const showAddForm = (flag) => {
	return (dispatch) => {
		dispatch(fetchData('PRDATTRGRP_CARD_SHOWADDFORM', { visible: flag }));
	}
}
//ok  新增获取属性列表  本地没有存储的时候
const getAttrList = () => {
	let url = prdattr.prdattr;
	return (dispatch) => {
		reqwest({
			url: url + "/ref",
			method: "GET",
			data: {
			},
		},result => {
			dispatch(fetchData('PRDATTRGROUP_ATTR_GETLIST', { ...result }));
		})
	}
} 

//ok 新增获取属性值列表  本地存储
const getLocalAttrList = (data) => {
	return (dispatch) => {
		dispatch(fetchData('PRDATTRGROUP_ATTRVA_GETLISTLOCAL', { data }));
	}
}

//ok  新增点击属性获取属性值列表
const getAttrVaList = ( id) => {	
	//let url = prdattrgroup.prdattrgroup + "/" + id.toString() +"/attrs/" +attrid+ "/values/checked";
	let url = prdattr.prdattr + "/" +id + "/values/ref";
	return (dispatch) => {
		reqwest({
			url: url ,
			method: "GET",
			data: {
			},
		},result => {
			//debugger
			dispatch(fetchData('PRDATTRGROUP_ATTRVA_GETLIST', { ...result ,id:id}));
		})
	}
}

//ok  编辑点击属性获取属性值列表
const getAttrVaEditList = (id,attrid) => {	
	let url = prdattrgroup.prdattrgroup + "/" + id.toString() +"/attrs/" +attrid.toString()+ "/values/checked";
	//let url = prdattr.prdattr + "/" +id + "/values/ref";
	return (dispatch) => {
		reqwest({
			url: url ,
			method: "GET",
			data: {
			},
		},result => {
			dispatch(fetchData('PRDATTRGROUP_ATTRVA_GETEDITLIST', { ...result ,id:id,attrid:attrid}));
		})
	}
}

//获取属性组列表ok
const getListData = (pagination, searchMap) => {
	return (dispatch) => {
		reqwest({
			url: prdattrgroup.prdattrgroup,
			method: "GET",
			data: {
				param: {
					page: pagination.page,
					pageSize: pagination.pageSize,
					searchMap: searchMap
				}
			},
		},result => {
			dispatch(fetchData('PRDATTRGROUP_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}
//新增保存 ok
const onSave4Add = (data) => {
//	debugger
	return (dispatch) => {
		reqwest({
			url: prdattrgroup.prdattrgroup,
			method: "POST",
			data: {
				param: data
			}
		}, result => {
		//	debugger
			dispatch(fetchData('PRDATTRGROUP_CARD_SAVEADD', { ...result, visible: false }));
		})
	}
}

const onSave4Edit = (data,id) => {
	return (dispatch) => {
		reqwest({
			url: prdattrgroup.prdattrgroup + "/" +id,
			method: "PUT",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('PRDATTRGROUP_CARD_SAVEEDIT', { ...result, visible: false }));
		})
	}
}

const onDelete = (rowKeys,  pagination, searchMap) => {
	return (dispatch) => {
		reqwest({
			url: prdattrgroup.prdattrgroup +"/batch",
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
			 type:'PRDATTRGRP_FORM_CHANGEDATA',
			 content:fields
	}    
}

const addAttrVaRow = (item) => {
	return {
		type:"PRDATTR_CARD_AADDROW",
		content:item
	}
}

const onChangeAttrVa = (changeData) => {
	return {
		type:"PRDATTR_CARD_CHANGEATTRVA",
		content:changeData
	}
}

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

//编辑，获取一条数据，给属性表赋值 ok
const setAttrData = (attrData) => {
	return {
		type:"PRDATTR_CARD_SETATTRDATA",
		content:attrData
	}
}

//获取属性组详情ok
const getAttrGroupDetail = (id) => {
	return (dispatch) => {
		reqwest({
			url: prdattrgroup.prdattrgroup + "/" + id.toString(),
			method: "GET",
			data: {
				param:{}
			}
		}, result => {
			dispatch(fetchData('PRDATTRGROUP_CARD_SHOWDETAIL', { visible:true, data:result}));
		})
	}
} 

//属性组编辑 ok
const eidtAttrGroup = (id, name) => {
	let url = prdattrgroup.prdattrgroup + "/" + id.toString() +"/attrs/checked";
	return (dispatch) => {
		reqwest({
			url: url,
			method: "GET",
			data: {
				param:{}
			}
		}, result => {
			dispatch(fetchData('PRDATTRGROUP_CARD_SHOWEDIT', { visible:true, data:result, id: id, name:name}));
		})
	}
} 

//详情  ok
const getAttrDetails = (id) => {
	return (dispatch) => {
		reqwest({
			url: prdattr.prdattr + "/" + id.toString(),
			method: "GET",
			data: {
				param:{}
			}
		}, result => {
			dispatch(fetchData('PRDATTR_LIST_SHOWFORM', { detailVisible:true, data:result }));
		})
	}
} 

//已选属性列表 ok
const selecAttr = (selectedRowKeys,) => {
	return {
		type:"PRDATTR_LIST_ATTRSELEC",
		content:selectedRowKeys
	}
}

//已选属性值列表 ok
const selecAttrVa = (selectedRowKeys,attrId) => {
	return {
		type:"PRDATTR_LIST_ATTRVASELEC",
		content:{id:attrId,selectedRowKeys:selectedRowKeys}
	}
}

//将已选加入savedData ok
const addSelectedData = (selectedRowKeys,attrId) => {
	return {
		type:"PRDATTR_LIST_ADDATTRVASELEC",
		content:{id:attrId,selectedRowKeys:selectedRowKeys}
	}
}

//将已选加入savedData Map ok
const addSelectedDataMap = (selectedRowKeys,attrId) => {
	return {
		type:"PRDATTR_LIST_ADDATTRVASELECMAP",
		content:{id:attrId,selectedRowKeys:selectedRowKeys}
	}
} 

//根据当前选中行属性是否被选中设置状态isSelected ok
const attrIsSelected = (flag) => {
	return {
		type:"PRDATTR_LIST_ATTRISSELEC",
		content:flag
	}
}
//根据当前选中行属性是否被选中设置状态isSelected ok
const setSelAttrVas = (select) => {
	return {
		type:"PRDATTR_LIST_SETSELATTRVAS",
		content:select
	}
}

//保存 ok
const saveSelectedData = (selectedRowKeys,attrId) => {
	return {
		type:"PRDATTR_LIST_ADDSAVE",
		content:{id:attrId,selectedRowKeys:selectedRowKeys}
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
	getAttrGroupDetail,
	showAddForm,
	getAttrList,
	getAttrVaList,
	selecAttr,
	selecAttrVa,
	getLocalAttrList,
	addSelectedData,
	addSelectedDataMap,
	attrIsSelected,
	setSelAttrVas,
	saveSelectedData,
	eidtAttrGroup,
	getAttrVaEditList,
	changeEnableState
}