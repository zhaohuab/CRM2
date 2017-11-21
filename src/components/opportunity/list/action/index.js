import reqwest from 'utils/reqwest'
import { message } from 'antd';

import { opportunity as url } from 'api';


const fetchData = (type, payload) => {
    return {
        type,
        payload
    }
}

function transDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "-" + month + "-" + day + "   " + hour + ":" + minute + ":" + second;
}

function transData(data) {
    if (data == null) {
        return data
    }
    
    if(data.createdTime){
        data.createdTime = data.createdTime.format('X')
    }
    if(data.expectSignTime){
        data.expectSignTime = data.expectSignTime.format('X');
    }
    return data
}

const transReceiveData = (data) => {
    for (let i = 0; i < data.data.length; i++) {
        
        if(data.data[i].createdTime){
            data.data[i].createdTime = transDate(new Date(data.data[i].createdTime.time))
        }
        if(data.data[i].expectSignTime){
            data.data[i].expectSignTime = transDate(new Date(data.data[i].expectSignTime.time))
        }
    }
    return data;
}

const transReceiveDataOne = (data) => {
    if(data.createdTime){
        data.createdTime = transDate(new Date(data.createdTime.time))
    }
    if(data.expectSignTime){
        data.expectSignTime = transDate(new Date(data.expectSignTime.time))
    }
    return data;
}
//定义方法 action
const getListData = (pagination, searchMap) => {
    return (dispatch) => {
        dispatch(fetchData('OPPORTUNITY_LIST_SAVESEARCHMAP', searchMap));
        reqwest({
            url: url.opportunity,
            method: 'get',
            data: {
                param: {
                    ...pagination,
                    searchMap: searchMap
                }
            }
        }, (data) => {
            dispatch(fetchData('OPPORTUNITY_LIST_GETDATA', { data: transReceiveData(data) }));
        })
    }
}

const listAddSave = (data) => {
    return (dispatch) => {
        reqwest({
            url: url.opportunity,
            method: 'post',
            data: {
                param: transData(data)
            }
        }, (data) => {
            dispatch(fetchData('OPPORTUNITY_LIST_ADDSAVE', transReceiveDataOne(data)));
        })
    }
}

const listEditSave = (data) => {

    return (dispatch) => {
        reqwest({
            url: url.opportunity + "/" + data.id,
            method: 'put',
            data: {
                param: transData(data)
            }
        }, (data) => {

            dispatch(fetchData('OPPORTUNITY_LIST_EDITSAVE', transReceiveDataOne(data)));
        })
    }
}

const closeForm = () => {
    return {
        type: 'OPPORTUNITY_LIST_CLOSEFORM'
    }
}

const closePanel = () => {
    return {
        type: 'OPPORTUNITY_LIST_CLOSEPANEL'
    }
}

const changeVisible = (visible) => {

    return {
        type: 'OPPORTUNITY_LIST_CHANGEVISIBLE', payload: { toolVisible: visible }
    }
}

const selectRow = (rows, visible) => {
    return {
        type: 'OPPORTUNITY_LIST_SELECTROW',
        payload: { rows: rows, toolVisible: visible }
    }
}

const showForm = (editData,visible) => {
    return fetchData('OPPORTUNITY_LIST_SHOWNEWFORM', { visible });
}



const showViewForm = (visible, record) => {
    return (dispatch) => {
        reqwest({
            url: url.opportunity+"/"+record.id,
            method: 'get',
            data: {
              
            }
        }, (data) => {
            dispatch(fetchData('OPPORTUNITY_LIST_SHOWVIEWFORM', { visible,record: transReceiveDataOne(data) }));
        })
    }
    
}

const deleteData = (ids, searchMap, pagination) => {
    return (dispatch) => {
        reqwest({
            url: url.opportunity + '/batch',
            method: "DELETE",
            data: {
                param: {
                    ids: ids.join(","),
                    ...pagination,
                    searchMap: searchMap
                },
            }
        }
            , (data) => {
                dispatch(fetchData('OPPORTUNITY_LIST_DELETE', { data: transReceiveData(data) }));
            })
    }
}


//输出 type 与 方法
export {
    getListData,
    changeVisible,
    selectRow,
    listAddSave,
    listEditSave,
    showViewForm,
    closePanel,
    deleteData,
    showForm
}