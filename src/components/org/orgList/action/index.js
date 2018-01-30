import request from 'utils/reqwest'
import { message } from 'antd';
import { org as url } from 'api';

const fetchData = (type, payload) => {
    return {
        type,
        payload
    }
}

//获取所有数据
export function getlist(searchMap = {}) {
    return (dispatch, getState) => {
        dispatch({ type: 'ORG_LIST_GETLISTSTART' })
        request({
            url: url.org,
            method: 'get',
            data: {
                param: { searchMap }
            }
        }, (data) => {
            dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', { data: data.data }));
        })
    }
}

//点击查询按钮获取所有数据
export function getlistByClickSearch(searchMap) {
    return (dispatch, getState) => {

        dispatch({ type: 'ORG_LIST_GETLISTSTART' })
        request({
            url: url.org,
            method: 'get',
            data: {
                param: { searchMap }
            }
        }, (data) => {
            dispatch(fetchData('ORG_LIST_GETLISTSUCCESSBYCLICKSEARCH', { data: data.data, searchFilter: searchMap.searchKey }));
        })
    }
}

//打开新增/编辑页面
export function showForm(flag, editData = {}, isEdit) {
    return (dispatch) => {
        dispatch(fetchData('ORG_LIST_SHOWFORM', { visible: flag, editData, isEdit }));
    }
}


const transData = (data) => {

    if (data.path && data.path != "") {
        data.path = data.path + "," + data.fatherorgId;
    } else {
        data.path = data.fatherorgId
    }
    return data;
}

//新增数据
export function listadd(list) {

    return (dispatch, getState) => {
        request({
            url: url.org,
            method: 'post',
            // data:"param="+JSON.stringify(transData(list)),
            data: {
                param: transData(list)
            }
        }, (result) => {

            // dispatch(fetchData('ORG_LIST_LISTADDSUCCESS',{data:data.data})) 
            request({
                url: url.orgTree,
                method: 'get',
                data: {
                    param: {
                        type: 1
                    }
                }
            }
                , (data) => {
                    dispatch(fetchData('ORG_LIST_LISTADDSUCCESS', { data: result, treeData: data.data }));
                })
        })
    }
}


//改变一条数据
export function listchange(data) {
    return (dispatch) => {
        let id = data.id
        request({
            url: `${url.org}/${id}`,
            method: 'put',
            data: {
                param: transData(data)
            }
        }, (result) => {
            request({
                url: url.org,
                method: 'get',
                data: {
                    param: {
                        condMap: typeof (params) == "undefined" ? {} : params
                    }
                }
            }, (data) => {
                dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', { data: result }))
            })
        })
    }
}


//删除数据
export function listdel(record, treeId, searchFilter) {
    var ids = [];
    let searchMap = {};
    if (treeId != null && treeId != undefined && treeId != "") {
        searchMap.id = treeId;
    }
    if (searchFilter != null && searchFilter != undefined && searchFilter != "") {
        searchMap.searchKey = searchFilter;
    }
    for (let i = 0; i < record.length; i++) {
        ids.push(record[i].id);
    }
    return (dispatch, getState) => {
        let id = record.id
        request({
            url: url.org + '/batch',
            method: "DELETE",
            data: {
                param: {
                    ids: ids.join(","),
                    searchMap: searchMap
                },
            }
        }
            , (dataResult) => {
                const listData = dataResult;
                request({
                    url: url.orgTree,
                    method: 'get',
                    data: {
                        param: {
                            type: 1
                        }
                    }
                }
                    , (data) => {
                        dispatch({ type: 'ORG_LIST_GETTREELISTSUCCESS', data: data.data })
                        dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', { data: listData.data }));
                    })
            })
    }
}


//启停用功能
export function setEnablestate(treeId, data, state) {
    var ids = [];
    let searchMap = {};
    if (treeId != null && treeId != undefined && treeId != "") {
        searchMap.id = treeId;
    }
    for (let i = 0; i < data.length; i++) {
        ids.push(data[i].id);
    }
    return (dispatch) => {
        request({
            url: url.org + '/enable',
            method: "PUT",
            data: {
                param: {
                    ids: ids.join(","),
                    enablestate: state,
                    searchMap: searchMap
                },
            }
        }, (dataResult) => {
            const listData = dataResult;
            dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', { data: listData.data }));
        })

    }
}

//获取tree数据
export function getTreeList() {
    return (dispatch, getState) => {
        dispatch({ type: 'ORG_LIST_GETTREELISTSTART' })
        request({
            url: url.orgTree,
            method: 'get',
            data: {
                param: {
                    type: 1
                }
            }
        }, (data) => {
            dispatch({ type: 'ORG_LIST_GETTREELISTSUCCESS', data: data.data })
        })

    }
}


//获取一个部门tree信息，变换表格数据
export function listTreeChange(id) {
    return (dispatch, getState) => {
        request({
            url: url.org,

            method: 'get',
            data: {
                param: {
                    searchMap: { id }
                }
            }
        }, (data) => {
            dispatch(fetchData('ORG_LIST_GETLISTSUCCESSBYCLICKTREE', { data: data.data, treeSelect: id }));
        })

    }
}


export function selectData(data) {
    return (dispatch) => {
        dispatch(fetchData('ORG_LIST_SELECTDATA', data))
    }
}

export function setFormData(data) {
    return (dispatch) => {
        dispatch(fetchData('ORG_LIST_SETFORMDATA', data))
    }
}


