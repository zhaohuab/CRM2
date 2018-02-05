import fetchData from 'utils/fetchdata';
import reqwest from "utils/reqwest";

import { browserHistory } from 'react-router';

import { approval as url, doc, baseDir } from "api";


function transDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "-" + month + "-" + day + "   " + hour + ":" + minute + ":" + second;
}

//转换时间对象为字符串格式
const transReceiveDataOne = (data) => {
    if (data.approvalTime
    ) {
        data.approvalTime = transDate(new Date(data.approvalTime.time))
    }
    if (data.commitTime
    ) {
        data.commitTime = transDate(new Date(data.commitTime.time))
    }
    return data;
}
const transReceiveData = (data) => {
    for (let i = 0; i < data.data.length; i++) {

        if (data.data[i].completeTime
        ) {
            data.data[i].completeTime
                = transDate(new Date(data.data[i].completeTime
                    .time))
        }
        if (data.data[i].createTime) {
            data.data[i].createTime = transDate(new Date(data.data[i].createTime.time))
        }

        if (data.data[i].commitTime) {
            data.data[i].commitTime = transDate(new Date(data.data[i].commitTime.time))
        }
        if (data.data[i].approvalTime
        ) {
            data.data[i].approvalTime
                = transDate(new Date(data.data[i].approvalTime
                    .time))
        }
    }
    return data;
}

const initstate=(initstate)=>{
    return dispatch => {
        dispatch(fetchData('APPROVED_INITSTATE', {initstate }))
    }
}


const approvalHomeVisible = (visible) => {

    return dispatch => {
        dispatch(fetchData('HEADER_APPROVED_HOMEVISIBLE', { approvalHomeVisible: visible }))
    }
}
const onRemind = (personlist, id, type
) => {
    debugger
    return dispatch => {
        reqwest(
            {
                url: url.remind,
                method: "POST",
                data: {
                    param: {
                        personlist,
                        id,
                        type
                    }
                }
            },
            dataResult => {

            }
        )
    }


}


const approvalFlag = (flag) => {
    return dispatch => {
        dispatch(fetchData('HOME_APPROVED_FLAG', { approvalFlag: flag }))
    }
}


const approvalHomeData = () => {
    let pagination = {
        pageSize: 5,
        page: 1
    }

    return dispatch => {
        reqwest(
            {
                url: url.notfinished,
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                    }
                }
            },
            dataResult => {//我提交--未完成
                ;
                dispatch(fetchData('HOME_NOTFINISHED_DATA', { commitData: dataResult.datalist }))
            }
        ),
            reqwest(
                {
                    url: url.todo,
                    method: "GET",
                    data: {
                        param: { ...pagination }
                    }
                },
                dataResult => {//我审批--待办
                    ;
                    dispatch(fetchData('HOME_TODO_DATA', { approvalData: dataResult.datalist }))
                }
            );
    }
}


const approvedClosed = () => {//关闭审批流

    return dispatch => {
        dispatch(fetchData('HEADER_APPROVED_SHOW', { approvalHomeShow: false }))
    }
}

const approvedChange = (key, flag) => {//切换审批
    return dispatch => {
        dispatch(fetchData('HEADER_APPROVED_CHANGE', { tableState: key, myState: flag }))
    }
}

const viewState = (viewState) => {


    return dispatch => {
        dispatch(fetchData('APPROVED_VIEWSTATE', { viewState }))
    }

}

//审批状态显隐
const statusShow = (lineState, djId, djType) => {

    return dispatch => {
        dispatch(fetchData('APPROVED_STATUSSHOW', { lineState }));

        reqwest(
            {
                url: url.historyStatus,
                method: "GET",
                data: {
                    param: {
                        id: djId,
                        type: djType
                    }
                }
            },
            data => {

                dispatch(fetchData(
                    "APPROVAL_LIST_HISTORY",
                    {
                        data: data.historylist
                    }
                ));

            }
        );
    }
}
const statusHide = (lineState) => {

    return dispatch => {
        dispatch(fetchData('APPROVED_STATUSHIDE', { lineState }))
    }
}
const approvedShow = () => {
    return dispatch => {
        dispatch(fetchData('HEADER_APPROVED_SHOW', { approvalHomeShow: true }))
    }
}
//往redux中存基础、扩展查询条件
const saveSearchMap = (data) => {

    return fetchData("APPROVE_LIST_SEARCHMAP", { data });
};
const savesearchMapApproval = (data) => {

    return fetchData("APPROVE_LIST_SEARCHMAPAPPROVAL", { data });
}
const saveDetailData = (data) => {
    return fetchData("APPROVE_LIST_DETAILDATA", { data });
};
const mentionVisible = (visible, action) => {

    return fetchData("APPROVE_LIST_MENTIONVISIBLE", { visible, action });
}
const mentionVisibleClose = (visible) => {
    return fetchData("APPROVE_LIST_MENTIONCLOSE", { visible });
}
//展示面板，把点击某个客户的所有值，放在redux中
const showViewForm = (visible, djId, djType, instanceId, taskId, record) => {
    return dispatch => {
        reqwest(
            {
                url: url.details,
                method: "GET",
                data: {
                    param: {
                        id: djId,
                        type: djType
                    }
                }
            },
            data => {
                dispatch(fetchData(
                    "APPROVAL_LIST_SHOWVIEWFORM",
                    {
                        visible,
                        data: transReceiveDataOne(data),
                        record
                    }
                ));
            }
        );
        reqwest(
            {
                url: url.histories,
                method: "GET",
                data: {
                    param: {
                        id: djId,
                        type: djType
                    }
                }
            },
            data => {

                dispatch(fetchData(
                    "APPROVAL_LIST_SHOWVIEWAPPROVAL",
                    {
                        data //审批状态数据
                    }
                )
            );
            }
        );
        reqwest(
            {
                url: url.actions,
                method: "GET",
                data: {
                    param: {
                        taskid: taskId,
                        instanceid: instanceId
                    }
                }
            },
            data => {

                dispatch(fetchData(
                    "APPROVAL_LIST_APPROVALBUTTON",
                    {
                        data //审批状态数据
                    }
                ));

            }
        );
    };
};

const hideViewForm = visiable => {

    return fetchData("APPROVAL_LIST_HIDEVIEWFORM", { visiable });
};

const allButtons = (id, type, taskid, instanceid, notes, action) => {

    return dispatch => {
        reqwest(
            {
                url: url.actions,
                method: "POST",
                data: {
                    param: {
                        id, type, taskid, instanceid, notes, action
                    }
                }
            },
            dataResult => {

            }
        )
    }
}


const getUnfinished = (pagination, searchMap) => {

    return dispatch => {
        reqwest(
            {
                url: url.notfinished,
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                        searchMap
                    }
                }
            },
            dataResult => {//我提交--未完成
                debugger
                dispatch(fetchData('HEADER_NOTFINISHED_DATA', { unfinishedData: dataResult.datalist }))
            }
        )
    }
}

const getDateUnfinished = (pagination, searchMap, queryDateKey) => {
debugger
    return dispatch => {
        reqwest(
            {
                url: url.notfinished,
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                        ...searchMap,
                        queryDateKey
                    }
                }
            },
            dataResult => {//我提交--未完成
                ;
                dispatch(fetchData('HEADER_DATENOTFINISHED_DATA', { unfinishedData: dataResult.datalist }))
            }
        )
    }
}


const getFinished = (pagination, searchMap) => {

    return dispatch => {
        reqwest(
            {
                url: url.finished,
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                        searchMap
                    }
                }
            },
            dataResult => {//我提交--已完成
                ;
                dispatch(fetchData('HEADER_FINISHED_SUCCESS', { finishedData: transReceiveData(dataResult.datalist) }))
            }
        )
    }
}
const getDateFinish = (pagination, searchMap, queryDateKey) => {
    return dispatch => {
        reqwest(
            {
                url: url.finished,
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                        ...searchMap,
                        queryDateKey
                    }
                }
            },
            dataResult => {//我提交--已完成
                ;
                dispatch(fetchData('HEADER_DATEFINISHED_SUCCESS', { finishedData: transReceiveData(dataResult.datalist) }))
            }
        )
    }
}
const getDateTodo = (pagination, searchMap, queryDateKey) => {
    return dispatch => {

        reqwest(
            {
                url: url.todo,
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                        ...searchMap,
                        queryDateKey
                    }
                }
            },
            dataResult => {//我审批--待办
                ;
                dispatch(fetchData('HEADER_DATETODO_SUCCESS', { todoData: transReceiveData(dataResult.datalist) }))
            }
        );
    }
}

const getTodo = (data, searchMapApproval) => {
    return dispatch => {

        reqwest(
            {
                url: url.todo,
                method: "GET",
                data: {
                    param: {
                        ...data,
                        searchMapApproval
                    }
                }
            },
            dataResult => {//我审批--待办
                debugger
                dispatch(fetchData('HEADER_TODO_SUCCESS', { todoData: transReceiveData(dataResult.datalist) }))
            }
        );
    }
}

const getDone = (data, searchMapApproval) => {

    return dispatch => {
        reqwest(
            {
                url: url.done,
                method: "GET",
                data: {
                    param: {
                        ...data,
                        searchMapApproval
                    }
                }
            },
            dataResult => {//我审批--已办
                ;
                dispatch(fetchData('HEADER_DONE_SUCCESS', { doneData: transReceiveData(dataResult.datalist) }))
            }
        );
    }
}

const getDateDone = (pagination, searchMap, queryDateKey) => {
    return dispatch => {
        reqwest(
            {
                url: url.done,
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                        ...searchMap,
                        queryDateKey
                    }
                }
            },
            dataResult => {//我审批--已办
                ;
                dispatch(fetchData('HEADER_DATEDONE_SUCCESS', { doneData: transReceiveData(dataResult.datalist) }))
            }
        );
    }


}

export {
    approvedClosed,
    approvedChange,
    getUnfinished,
    getFinished,
    getTodo,
    getDone,
    approvedShow,
    saveSearchMap,
    getDateUnfinished,
    statusShow,
    statusHide,
    viewState,
    hideViewForm,
    showViewForm,
    getDateTodo,
    getDateDone,
    getDateFinish,
    savesearchMapApproval,
    mentionVisible,
    mentionVisibleClose,
    allButtons,
    approvalHomeData,
    approvalHomeVisible,
    approvalFlag,
    onRemind,
    initstate
}





