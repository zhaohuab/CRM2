import request from 'utils/reqwest'
import { message} from 'antd';
import { prdtype as url } from 'api';


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
    return (dispatch, getState) => {//这个getState干什么用的，没看到传实参的地方？？？       
        dispatch({ type: 'PRDTYPE_LIST_GETLISTSTART' })
        request({
            url: url.prdtype,
            method: 'get', 
            data: {
                param: {
                    ...params.pagination,
					searchMap: params.searchMap,
                }
            }          
        },(data) => {
            dispatch(fetchData('PRDTYPE_LIST_GETLISTSUCCESS', { data: data.data }));
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
                param:  searchMap 
            }
        },(data) => {
            dispatch(fetchData('PRDTYPE_LIST_GETLISTSUCCESSBYCLICKSEARCH', { data: data.data, searchFilter: searchMap.searchKey }));
        })
    }
}

//打开新增/编辑页面
export function showForm(flag, editData = {}) {
    return (dispatch) => {
		dispatch(fetchData('PRDTYPE_LIST_SHOWFORM', { visible: flag, editData }));
	}
}

const transData = (data) => {//这个transData的作用是？？
	data.fatherTypeId = data.fatherTypeId.key
	return data;
}

//新增数据
export function listadd(list) {
 
    list.fatherTypeId = list.fatherTypeId.key
    return (dispatch, getState) => {
        request({
            url: url.prdtype,   
            method: 'post',
            data: {
                param: list
            }
        }, (dataResult) => {
            const listData = dataResult;
            request({
                url: url.prdtypeTree,
                method: 'get',
                data: {}
            }
            ,(data) => {
                dispatch({ type: 'PRDTYPE_LIST_GETTREELISTSUCCESS', data: data.data })
                dispatch(fetchData('PRDTYPE_LIST_LISTADDSUCCESS', { data: listData }));
            })
        })
    }
}


//改变一条数据
export function listchange(value) {
    return (dispatch, getState) => {
        let id = value.id
        value.fatherTypeId = value.fatherTypeId.key;
        request({
            url: url.prdtype+'/'+id,
            method: 'put',
            data: { param: value }
        },(dataResult) => {    
            let listData = dataResult;
            let arr = []; 
            arr.push(listData);  
            request({
                url: url.prdtype, 
                method: 'get',
                data: {
                    param: {//这里的params是个什么意思？没有定义直接使用？作用是什么？
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
export function listdel(record, treeId, searchFilter) {
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
					searchMap: searchMap
				},
			}
        }
        ,(dataResult) => {
            dispatch({ type:'PRDTYPE_LIST_DELETELISTSUCCESS', tableListCheckbox: [] })
            const listData = dataResult;
            request({
                url: url.prdtypeTree,
                method: 'get',
                data: {}
            }
            ,(data) => {
                dispatch({ type:'PRDTYPE_LIST_GETTREELISTSUCCESS', data: data.data })
                dispatch(fetchData('PRDTYPE_LIST_GETLISTSUCCESS', { data: listData.data }));
            })
        })
    }
}


//启停用功能
export function setEnablestate(treeId, searchFilter, data, state) {

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
			url: url.prdtype+'enable',
			method: "PUT",
			data: {
				param: {
					ids: ids.join(","),
					enablestate: state,
					searchMap: searchMap
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


//获取一个部门tree信息，变换表格数据
export function listTreeChange(id) {
    return (dispatch, getState) => {
        request({
            url: url.prdtype,           
            method: 'get',
            data: {
                param: {
                    searchMap: { id }
                }
            }
        },(data) => {
            dispatch(fetchData('PRDTYPE_LIST_GETLISTSUCCESSBYCLICKTREE', { data: data.data, treeSelect: id }));
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

