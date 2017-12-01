import request from 'utils/reqwest'
import { message} from 'antd';
import { prdtype as url,prdattrgroup } from 'api';
import { debug } from 'util';


const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
}

//获取所有数据
export function getlist(params) {
    if (typeof params == 'undefined') {
        params = {
            searchMap:{}
        }
    }
    return (dispatch, getState) => {  
        dispatch({ type: 'PRDTYPE_LIST_GETLISTSTART' })
        request({
            url: url.prdtype,
            method: 'get', 
            data: {
                param: {
                    page:params.pagination.page,
                    pageSize:params.pagination.pageSize,
					searchMap: params.searchMap,
                }
            }          
        },(data) => {
            dispatch(fetchData('PRDTYPE_LIST_GETLISTSUCCESS', { data: data }));
        })
    }
}

//点击查询按钮获取所有数据
export function getlistByClickSearch(searchMap) {
    return (dispatch, getState) => {       
        dispatch({ type: 'PRDTYPE_LIST_GETLISTSTART' })
        request({
            url: url.prdtype,
            method: 'get',
            data: {
                param: searchMap
            }
        },(data) => {
            dispatch(fetchData('PRDTYPE_LIST_GETLISTSUCCESSBYCLICKSEARCH', { data: data.data, searchFilter: searchMap.searchKey }));
        })
    }
}

//打开新增/编辑页面
export function showForm(flag, editData ) {
    return (dispatch) => {
		dispatch(fetchData('PRDTYPE_LIST_SHOWFORM', { visible: flag, editData }));
	}
}

const transData = (data) => {
    let fatherTypeId = data.fatherTypeId.key;
    let fatherTypeName = data.fatherTypeId.title;
    let path = data.fatherTypeId.path;
    data.fatherTypeId = fatherTypeId;
    data.fatherTypeName = fatherTypeName;
    data.path = path;
    data.attrGroupId = 0;
	return data;
}

//新增数据
export function listadd(list) {
    debugger
   // list.fatherTypeId = list.fatherTypeId.key
    return (dispatch, getState) => {
        request({
            url: url.prdtype,   
            method: 'post',
            data: {
                param:list
            }
        }, (dataResult) => {
            const listData = dataResult;
            request({
                url: url.prdtypeTree,
                method: 'get',
                data: {}
            }
            ,(data) => {
                debugger
                dispatch({ type: 'PRDTYPE_LIST_GETTREELISTSUCCESS', data: data.data })
                dispatch(fetchData('PRDTYPE_LIST_LISTADDSUCCESS', { data: listData }));
            })
        })
    }
}


//改变一条数据
export function listchange(value,id) {
    return (dispatch, getState) => {
        //let id = value.id
       // value.fatherTypeId = value.fatherTypeId.key;
        request({
            url: url.prdtype+'/'+id,
            method: 'put',
            data: { param: transData(value) }
        },(dataResult) => {    
            let listData = dataResult;
            let arr = []; 
            arr.push(listData);  
            request({
                url: url.prdtype, 
                method: 'get',
                data: {
                    param: {
                        condMap: typeof(params) == "undefined" ? {} : params
                    }           
                }
            },(data) => {            
                dispatch(fetchData('PRDTYPE_EDIT_GETLISTSUCCESS', { tableListCheckbox: arr, data: data.data })) ;
            });
           
            request({
                url: url.prdtypeTree,
                method: 'get',
                data: {}
            }
            ,(data) => {
                dispatch({ type: 'PRDTYPE_LIST_GETTREELISTSUCCESS', data: data.data })
            })
        });

    }
}


//删除数据
export function listdel(record, treeId, searchFilter,pagination) {
    var ids = [];
    let searchMap = {};
    if (treeId!=null && treeId!=undefined && treeId!="") {
        searchMap.id = treeId;
    }
    // treeId ? searchMap.id = treeId : null;用这行代码代替

    if (searchFilter!=null && searchFilter!=undefined && searchFilter!="") {
        searchMap.searchKey = searchFilter;
    }
    for (let i = 0; i<record.length; i++) {
        ids.push(record[i].id);
    }
    return (dispatch, getState) => {
        let id = record[0].id
        request({
            url: url.prdtype+'/batch',//这里我们约定的与组织的
			method: "DELETE",
			data: {
				param: {
					ids: ids.join(","),
                    searchMap: searchMap,
                    page:pagination.page,
                    pageSize:pagination.pageSize,
				},
			}
        }
        ,(dataResult) => {           
            const listData = dataResult;
            request({
                url: url.prdtypeTree,
                method: 'get',
                data: {}
            }
            ,(data) => {
                dispatch(fetchData('PRDTYPE_LIST_DELETELISTSUCCESS', { tableListCheckbox: []}))
                dispatch({ type:'PRDTYPE_LIST_GETTREELISTSUCCESS', data: data.data })
                dispatch(fetchData('PRDTYPE_LIST_GETLISTSUCCESS', { data: listData.data }));
            })
        })
    }
}


//启停用功能
export function setEnablestate(treeId, searchFilter, data, state,pagination) {
    var ids = [];
    let searchMap = {};
    if (treeId!=null && treeId!=undefined && treeId!="") {
        searchMap.id = treeId;
    }
    if (searchFilter!=null && searchFilter!=undefined && searchFilter!="") {
        searchMap.searchKey = searchFilter;
    }
    for (let i = 0; i<data.length; i++) {
        ids.push(data[i].id);
    }
    return (dispatch) => {
		request({
			url: url.prdtype+'/state',
			method: "PUT",
			data: {
				param: {
					ids: ids.join(","),
					enableState: state,
                    searchMap: searchMap,
                    page:pagination.page,
                    pageSize:pagination.pageSize
				},
			}
		},(dataResult) => {
                const listData = dataResult;
                dispatch(fetchData('PRDTYPE_LIST_GETLISTSUCCESS', { data: listData.data }));
        })
			
	}
}

//获取tree数据
export function getTreeList() {
    return (dispatch, getState) => {
        dispatch({ type: 'PRDTYPE_LIST_GETTREELISTSTART' })
        request({
            url: url.prdtypeTree,
            method: 'get',
            data: {}
        },(data) => {        
            dispatch({ type: 'PRDTYPE_LIST_GETTREELISTSUCCESS', data: data.data })
        })
        
    }
}


//获取一个产品分类信息，变换表格数据
export function listTreeChange(pagination,id) {
    return (dispatch, getState) => {
        request({
            url: url.prdtype,           
            method: 'get',
            data: {
                param: {
                    page:pagination.page,
                    pageSize:pagination.pageSize,
                    searchMap: { id }
                }
            }
        },(data) => {
            dispatch(fetchData('PRDTYPE_LIST_GETLISTSUCCESSBYCLICKTREE', { data: data, treeSelect: id }));
        })       
    } 
}


//点击操作按钮方法
export function buttonEdit(rows) {
    return {
        type: 'PRDTYPE_LIST_SHOWBUTTONSTART',
        rows
    }
}

//获取属性组参照
export function getAttrsGrpRef  (param)  {
    
    let url =  prdattrgroup.prdattrgroup + '/ref';
	return (dispatch) => {
		request({
			url: url ,
			method: "GET",
			data: {
				param: {page: param.page,
					    pageSize: param.pageSize}
			}
		}, result => {
			dispatch(fetchData('PRODUCTCLASS_ATTRGROUP_GETREFLIST', { ...result}));
		})
	}
} 

//获取当前选中树节点
export function setSelTreeNode(sel) {
    return {
        type: 'PRDCLASS_FORM_GETSECL',
        sel
    }
}

export function setFieldsChangeData(fields)  {	
	return {
			 type:'PRDCLASS_FORM_FIELDSCHANGE',
			 content:fields
	}    
}

export function setFormData  (fields)  {	
	return {
			 type:'PRDCLASS_FORM_SETFORM',
			 content:fields
	}    
}
