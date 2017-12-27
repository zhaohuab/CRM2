import reqwest from 'utils/reqwest'
import { message } from 'antd';

import { opportunity as url, product, oppflow, oppstage } from 'api';


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
    if (data.actualSignTime&&typeof(data.actualSignTime) == 'object') {
        data.actualSignTime = data.actualSignTime.format('YYYY-MM-DD HH:mm:ss');
    }
    if (data.customerId) {
        data.customerId = data.customerId.id;
    }
    if (data.saleStage) {
        data.saleStage = data.saleStage.key;
    }
    return data
}
function transSearchMap(data) {
    if (data == null) {
        return data
    }
    if (data.type) {
        data.type = data.type.key==0?undefined:data.type.key;
    }
    if (data.saleStage) {
        data.saleStage = data.saleStage.key==0?undefined:data.saleStage.key;
    }
    if (data.signTime) {
        data.expectSignTimeStart = data.signTime[0].format('YYYY-MM-DD HH:mm:ss');
        data.expectSignTimeEnd = data.signTime[1].format('YYYY-MM-DD HH:mm:ss');
        data.signTime = undefined;
    }
    if (data.source) {
        data.source = data.source.key==0?undefined:data.source.key;
    }
    if (data.deptId) {
        data.deptId = data.deptId.key==0?undefined:data.deptId.key;
    }
    if (data.ownerUserId) {
        data.ownerUserId = data.ownerUserId.key==0?undefined:data.ownerUserId.key;
    }
    return data
}

const transReceiveData = (data) => {
    for (let i = 0; i < data.data.length; i++) {

        if (data.data[i].createdTime) {
            data.data[i].createdTime = transDate(new Date(data.data[i].createdTime.time))
        }
        if (data.data[i].expectSignTime) {
            data.data[i].expectSignTime = transDate(new Date(data.data[i].expectSignTime.time))
        }
        if (data.data[i].actualSignTime) {
            data.data[i].actualSignTime = transDate(new Date(data.data[i].actualSignTime.time))
        }
    }
    return data;
}

const transReceiveDataOne = (data) => {
    if (data.createdTime) {
        data.createdTime = transDate(new Date(data.createdTime.time))
    }
    if (data.expectSignTime) {
        data.expectSignTime = transDate(new Date(data.expectSignTime.time))
    }
    if (data.actualSignTime) {
        data.actualSignTime = transDate(new Date(data.actualSignTime.time))
    }
    if (data.customerName&&data.customerId) {
        data.customerId = {id:data.customerId,name:data.customerName}
    }
    return data;
}

//定义方法 action
const getListData = (pagination, searchMap) => {
    return (dispatch) => {
        searchMap = transSearchMap(searchMap)
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

//控制查询面板大小
const changeVisible = () => {
    return {
        type: "OPPORTUNITY_LIST_CHANGEVISIBLE"
    };
};



const showFormNew = (visible, editData) => {

    return (dispatch) => {
        if (visible) {
            reqwest({
                url: oppstage.oppstage + "/biztype",
                method: 'get',
                data: {
                    param: {
                        biztype: editData.type
                    }
                }
            }, (data) => {
                dispatch(fetchData('OPPORTUNITY_LIST_SHOWFORMNEW', { visible, editData, stageEnum: data.stageEnum }));
            })
        } else {
            dispatch(fetchData('OPPORTUNITY_LIST_SHOWFORMNEW', { visible, editData, stageEnum: [] }));
        }
    }


}

const showFormEdit = (visible, id) => {
    return (dispatch) => {
        reqwest({
            url: url.opportunity + "/" + id,
            method: 'get',
        }, (data) => {
            dispatch(fetchData('OPPORTUNITY_LIST_SHOWFORMEDIT', { visible, editData: transReceiveDataOne(data) }));
        })
    }
}


const showViewForm = (visible, record) => {
    return (dispatch) => {
        reqwest({
            url: url.opportunity + "/" + record.id,
            method: 'get',
        }, (data) => {
            dispatch(fetchData('OPPORTUNITY_LIST_SHOWVIEWFORM', { visible, record: transReceiveDataOne(data) }));
        })

        reqwest({
            url: url.opportunity + "/result/" + record.id,
            method: 'get',
        }, (data) => {
            dispatch(fetchData('OPPORTUNITY_LIST_GETSTAGERESULT', data));
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

//保存table已选择行数据
const selectRow = (selectedRows, selectedRowKeys) => {
    return {
        type: "OPPORTUNITY_LIST_SELECTROW",
        payload: { selectedRows, selectedRowKeys }
    };
};

//定义方法 action
const getFunnelData = (pagination, searchMap) => {
    return (dispatch) => {
        reqwest({
            url: url.opportunity + '/funnel',
            method: 'get',
            data: {
                param: {
                    searchMap: searchMap
                }
            }
        }, (data) => {
            dispatch(fetchData('OPPORTUNITY_LIST_GETFUNNELDATA', data));
        })
    }
}

const showProductCard = () => {
    return (dispatch) => {
        reqwest({
            url: product.product + '/ref',
            method: 'get',
        }, (data) => {
            dispatch(fetchData('OPPORTUNITY_LIST_SHOWPRODUCTCARD', { data }));
        })

    }
}

const closeProductCard = () => {
    return (dispatch) => {
        dispatch(fetchData('OPPORTUNITY_LIST_CLOSEPRODUCTCARD', {}));
    }
}

const selectProduct = (selectedProduct) => {
    return (dispatch) => {
        dispatch(fetchData('OPPORTUNITY_LIST_SELECTPRODUCT', { ...selectedProduct }));
    }
}

const saveOppBList = (oppBList) => {
    return (dispatch) => {
        dispatch(fetchData('OPPORTUNITY_LIST_SAVEOPPBLIST', { oppBList }));
    }
}

const selectOppB = (selectedOppB) => {
    return (dispatch) => {
        dispatch(fetchData('OPPORTUNITY_LIST_SELECTOPPB', { ...selectedOppB }));
    }
}

const setFormData = (data) => {
    return (dispatch) => {
        dispatch(fetchData('OPPORTUNITY_LIST_SETFORMDATA', data));
    }
}

const getbiztype = () => {
    return (dispatch) => {
        reqwest({
            url: oppflow.oppflow + '/biztype',
            method: 'get',
        }, (data) => {
            dispatch(fetchData('OPPORTUNITY_LIST_GETBIZTYPE', data));
        })

    }
}

const finishAction = (opportunity_id, oppstage_id, oppaction_id, is_finish, resultData) => {
    return (dispatch) => {
        reqwest({
            url: url.opportunity + '/finishaction',
            method: 'put',
            data: {
                param: {
                    paramMap: {
                        opportunity_id,
                        oppstage_id,
                        oppaction_id,
                        is_finish
                    }
                }
            }
        }, () => {
            dispatch(fetchData('OPPORTUNITY_LIST_FINISHACTION', { data: resultData }));
        })
    }
}

//保存table已选择行数据
const selectStage = (oppstage_id) => {
    return {
        type: "OPPORTUNITY_LIST_SELECTSTAGE",
        payload: oppstage_id
    };
};

const getEnumData = () => {
    return (dispatch) => {
        reqwest({
            url: url.opportunity + '/condition',
            method: 'get',
        }, (data) => {
            dispatch(fetchData('OPPORTUNITY_LIST_GETENUMDATA', data));
        })
    }
}

const saveEnum = (enumData) => {
    return (dispatch) => {
        dispatch(fetchData('OPPORTUNITY_LIST_SAVEENUMDATA', { enumData }));
    }
}

// 设为当前阶段
const setCurrentStage = (oppId, stageId) => {
    return (dispatch) => {
        reqwest({
            url: url.opportunity + "/setCurrentStage",
            method: 'put',
            data: {
                param: {
                    paramMap: {
                        oppId, stageId
                    }
                }
            }
        }, (data) => {
            dispatch(fetchData('OPPORTUNITY_LIST_SETCURRENTSTAGE', { stageId }));
        })
    }
}

const showWinCard = (visible) => {
    return (dispatch) => {
        dispatch(fetchData('OPPORTUNITY_LIST_SHOWWINCARD', { visible }));
    }
}

const showLostCard = (visible) => {
    return (dispatch) => {
        dispatch(fetchData('OPPORTUNITY_LIST_SHOWLOSTCARD', { visible }));
    }
}

const showRadarCard = (visible) => {
    return (dispatch) => {
        dispatch(fetchData('OPPORTUNITY_LIST_SHOWRADARCARD', { visible }));
    }
}

const winOpp = (id, data) => {
    return (dispatch) => {
        reqwest({
            url: url.opportunity + "/winOpp/" + id,
            method: 'put',
            data: {
                param: transData(data)
            }
        }, (data) => {
            dispatch(fetchData('OPPORTUNITY_LIST_SHOWWINCARD', { visible: false }));
        })
    }
}

const lostOpp = (id, data) => {
    return (dispatch) => {
        reqwest({
            url: url.opportunity + "/lostOpp/" + id,
            method: 'put',
            data: {
                param: transData(data)
            }
        }, (data) => {
            dispatch(fetchData('OPPORTUNITY_LIST_SHOWLOSTCARD', { visible: false }));
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
    showFormNew,
    showFormEdit,
    getFunnelData,
    showProductCard,
    closeProductCard,
    selectProduct,
    saveOppBList,
    selectOppB,
    setFormData,
    getbiztype,
    selectStage,
    finishAction,
    getEnumData,
    saveEnum,
    setCurrentStage,
    showWinCard,
    showLostCard,
    showRadarCard,
    winOpp,
    lostOpp,
    closeForm
}