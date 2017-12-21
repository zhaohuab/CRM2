import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { product as url, measure, prdtype, brand ,prdattrgroup, org} from 'api';

//获取产品列表
const getListData = (params) => {
	return (dispatch) => {
		reqwest({
			url: url.product,
			method: "GET",
			data: {
				param: {
					...params.pagination,
					searchMap: params.searchMap,
				}
			},
		},result => {
			dispatch(fetchData('PRODUCT_LIST_GETLISTSUCCESS', { ...result }));
		})
	}	
}

//产品停启用
const changeEnableState = (enableState,selectedRowKeys,pagination,searchMap) => {
	return (dispatch) => {
		reqwest({
			url: url.product + '/state',
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
			dispatch(fetchData('PRODUCT_LIST_GETLISTSUCCESS', { ...result }));
		})
	}	
}

//批量删除
const onDelete = (rowKeys, params) => {
	return (dispatch) => {
		reqwest({
			url: url.productBatch,
			method: "DELETE",
			data: {
				param: {
					ids: rowKeys.join(),
					...params.pagination,
					searchMap: params.searchMap,
				},
			}
		}, result => {
			dispatch(fetchData('PRODUCT_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

//显示新增/编辑form
const showForm = (flag, editData = {}, index) => {	
    return {
         type:'PRODUCT_LIST_SHOWFORM',
         content:{visible:flag, editData}   
    }    
}

//新增保存
const onSave4Add = (data) => {
	return (dispatch) => {
		reqwest({
			url: url.product,
			method: "POST",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('PRODUCT_CARD_SAVEADD', { ...result, visible: false }));
		})
	}
}

//编辑保存
const onSave4Edit = (data ,id) => {
	return (dispatch) => {
		reqwest({
			url: `${url.product}/${id}`,
			method: "PUT",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('PRODUCT_CARD_SAVEEDIT', { ...result, visible: false }));
		})
	}
}

//获取产品分类参照
const getProdClassRef = () => {
	return (dispatch) => {
		reqwest({
			url: prdtype.prdtype + '/reftree',
			method: "GET",
			data: {
				param: ""
			}
		}, result => {
			dispatch(fetchData('PRODUCT_CLASS_GETREFTREE', { ...result}));
		})
	}
}

//获取计量单位参照
const getMeaUnitRef = () => {
	return (dispatch) => {
		reqwest({
			url: measure.measure+'/ref',
			method: "GET",
			data: {
				param: {}
			}
		}, result => {
			dispatch(fetchData('PRODUCT_MEAUNIT_GETREFLIST', { ...result}));
		})
	}
}

//获取品牌参照
const getBrandRef = () => {
	return (dispatch) => {
		reqwest({
			url: brand.brand+'/ref',
			method: "GET",
			data: {
				// param: {page: param.page,
				// 				pageSize: param.pageSize}
				param:{}
			}
		}, result => {		
			dispatch(fetchData('PRODUCT_BRAND_GETREFLIST', { ...result}));
		})
	}
}

//获取属性组参照
const getAttrsGrpRef = (param) => {
	return (dispatch) => {
		reqwest({
			url: prdattrgroup.prdattrgroup + '/ref',
			method: "GET",
			data: {
				param: {searchMap:param.searchMap}
			}
		}, result => {
			//debugger
			dispatch(fetchData('PRODUCT_ATTRGROUP_GETREFLISTDATA', { ...result}));
		})
	}
} 

//获取组织参照
const getOrgRefTree = () => {
	return (dispatch) => {
		reqwest({
			url: org.orgTree,
			method: "GET",
			data: {param:{orgType: 1}}
		}, result => {
			dispatch(fetchData('PRODUCT_ORG_GETREFLISTDATA', { ...result}));
		})
	}
}

const setBrandValue = (value) => {
	return {
		type:"PRODUCT_BRAND_VALUE",
		content:value
	}
}

const setPrdClassValue = (value) => {
	return {
		type:"PRODUCT_CLASS_GETREFTREE",
		content:value
	}
}

const setAttrGrpValue = (value) => {
	return {
		type:"PRODUCT_ATTRGRP_VALUE",
		content:value
	}
}

const setMeaUnitValue = (value) => {
	return {
		type:"PRODUCT_MEAUNIT_VALUE",
		content:value
	}
}
// //销售单位table新增行
// const addRow = (item) => {
// 	return {
// 		type:"ADDROW",
// 		content:item
// 	}
// }

// //
// const showSalesUnit = (flag) => {
// 	return {
// 		type:"PRODUCT_SALESUNIT_VISIBLE",
// 		content:flag
// 	}
// }

//销售单位新增行
const addSaleUnitRow = (item) => {
	return {
		type:"PRODUCT_SALESUNIT_ADDROW",
		content:item
	}
}

//销售单位变更
const onChangeSuVa = (changedData) => {
	return {
		type:"PRODUCT_SALESUNIT_CHANGEDATA",
		content:changedData
	}
}

//设置销售单位table选中值
const setSecRowKeys = (secRowKeys) => {
	return {
		type:"PRODUCT_SALESUNIT_SETSECROWKEYS",
		content:secRowKeys
	}
}

//销售单位table变更,只传给后台改变的数据(新增、删除、改变)
const onChangeAttrVa = (changeData) => {
	return {
		type:"PRDATTR_CARD_CHANGEATTRVA",
		content:changeData
	}
}

//销售单位table赋值
const setSuTableData = (suData) => {
	return {
		type:"PRODUCT_SALESUNIT_SETSUTABLE",
		content:suData
	}
}

//给form赋值
const setFormData = (fields) => {	
	return {
			 type:'PRODUCT_FORM_SETFORM',
			 content:fields
	}    
}

//查询form赋值
const setLessFormData = (fields) => {	
	return {
			 type:'PRODUCT_FORM_SETLESSFORM',
			 content:fields
	}    
}

//查询form赋值
const setMoreFormData = (fields) => {	
	return {
			 type:'PRODUCT_FORM_SETMOREFORM',
			 content:fields
	}    
}

const setFieldsChangeData = (fields) => {	
	return {
			 type:'PRODUCT_FORM_FIELDSCHANGE',
			 content:fields
	}    
}

const setAddNum = (addNum) => {	
	return {
			 type:'PRODUCT_FORM_SETADDNUM',
			 content:addNum
	}    
}

const showEditForm = (id,flag) => {
	return (dispatch) => {
		reqwest({
			url: url.product + "/" +id + "/cited",
			method: "GET",
			data: {				
			}
		}, citeresult => {
			reqwest({
				url: url.product + "/" +id,
				method: "GET",
				data: {				
				}
			}, result => {
				dispatch(fetchData('PRODUCT_LIST_SHOWEDITFORM', { formdata:result, visible: flag ,isRefered:citeresult.flag}));
			})
		})
	}
}

//产品分配
const prdAssign = ( prdId,ids,names) => {
	return (dispatch) => {
		reqwest({
			url: url.product + "/" +prdId +'/allocation',
			method: "PUT",
			data: {param:{orgIds: ids}}
		}, result => {
			dispatch(fetchData('PRODUCT_LIST_ASSIGN', { orgName:names, orgId: ids, id: prdId }));
		})
	}
}

//获取组织树
const getOrgTree = () => {
	return (dispatch) => {
		reqwest({
			url: org.orgTree ,
			method: "GET",
			data: {param:{orgType: 1}}
		//	data: {orgType: 1}
		}, result => {
			dispatch(fetchData('PRODUCT_LIST_GETORGTREE', { ...result }));
		})
	}
}

const setIsRefered = (flag) => {	
	return {
			 type:'PRODUCT_FORM_SETISREFERED',
			 content:flag
	}    
}

export {
	showForm, 
	onDelete, 
	getListData, 
	onSave4Add, 
	onSave4Edit,
	getProdClassRef, 
	getMeaUnitRef, 
	getBrandRef, 
	getOrgRefTree,
	addSaleUnitRow,
	onChangeSuVa,
	setSecRowKeys,
	setSuTableData,
	setFormData,
	setFieldsChangeData,
	getAttrsGrpRef,
	setAddNum,
	showEditForm,
	changeEnableState,
	setLessFormData,
	setMoreFormData,
	prdAssign,
	getOrgTree,
	setBrandValue,
	setPrdClassValue,
	setAttrGrpValue,
	setMeaUnitValue,
	setIsRefered,
}