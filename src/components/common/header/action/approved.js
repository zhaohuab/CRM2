import fetchData from 'utils/fetchdata';
import reqwest from "utils/reqwest";
//import {baseDir} from 'api';
import { browserHistory } from 'react-router';
//import { approved as url } from 'api/zhb';
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


const approvedClosed = () => {//关闭审批流
    debugger
    return dispatch => {
        dispatch(fetchData('HEADER_APPROVED_SHOW', { approvalShow: false }))
    }
}

const approvedChange = (key, flag) => {//切换审批
    return dispatch => {
        dispatch(fetchData('HEADER_APPROVED_CHANGE', { tableState: key, myState: flag }))
    }
}

const viewState = (viewState) => {

    debugger
    return dispatch => {
        dispatch(fetchData('APPROVED_VIEWSTATE', { viewState }))
    }

}


//审批状态显隐
const statusShow = (lineState, djId, djType) => {
    debugger
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
                debugger
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
    debugger
    return dispatch => {
        dispatch(fetchData('APPROVED_STATUSHIDE', { lineState }))
    }
}
const approvedShow = () => {
    return dispatch => {
        dispatch(fetchData('HEADER_APPROVED_SHOW', { approvedShow: true }))
    }
}
//往redux中存基础、扩展查询条件
const saveSearchMap = (data) => {
    debugger
    // return dispatch => {
    //     dispatch(fetchData("APPROVE_LIST_SEARCHMAP", { data }))
    // };
    return fetchData("APPROVE_LIST_SEARCHMAP", { data });
};
const savesearchMapApproval = (data) => {
    debugger
    return fetchData("APPROVE_LIST_SEARCHMAPAPPROVAL", { data });
}
const saveDetailData = (data) => {
    debugger

    return fetchData("APPROVE_LIST_DETAILDATA", { data });
};
const mentionVisible = (visible, action) => {
    debugger
    return fetchData("APPROVE_LIST_MENTIONVISIBLE", { visible, action });
}
const mentionVisibleClose = (visible) => {
    return fetchData("APPROVE_LIST_MENTIONCLOSE", { visible });
}
//展示面板，把点击某个客户的所有值，放在redux中
const showViewForm = (visible, djId, djType, instanceId, taskId, record) => {
    return dispatch => {
        debugger
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
                debugger
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
                debugger
                dispatch(fetchData(
                    "APPROVAL_LIST_SHOWVIEWAPPROVAL",
                    {
                        data //审批状态数据
                    }
                ));

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
                debugger
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
    debugger
    return fetchData("APPROVAL_LIST_HIDEVIEWFORM", { visiable });
};

const allButtons = (id, type, taskid, instanceid, notes, action) => {
    debugger
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
    debugger
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
                debugger;
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
                debugger;
                dispatch(fetchData('HEADER_DATENOTFINISHED_DATA', { unfinishedData: dataResult.datalist }))
            }
        )
    }
}


const getFinished = (pagination, searchMap) => {
    debugger
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
                debugger;
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
                debugger;
                dispatch(fetchData('HEADER_DATEFINISHED_SUCCESS', { finishedData: transReceiveData(dataResult.datalist) }))
            }
        )
    }
}
const getDateTodo = (pagination, searchMap, queryDateKey) => {
    return dispatch => {
        debugger
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
                debugger;
                dispatch(fetchData('HEADER_DATETODO_SUCCESS', { todoData: transReceiveData(dataResult.datalist) }))
            }
        );
    }
}

const getTodo = (data) => {
    return dispatch => {
        debugger
        reqwest(
            {
                url: url.todo,
                method: "GET",
                data: {
                    param: { ...data }
                }
            },
            dataResult => {//我审批--待办
                debugger;
                dispatch(fetchData('HEADER_TODO_SUCCESS', { todoData: transReceiveData(dataResult.datalist) }))
            }
        );
    }
}

const getDone = (data) => {
    debugger
    return dispatch => {
        reqwest(
            {
                url: url.done,
                method: "GET",
                data: {
                    param: { ...data }
                }
            },
            dataResult => {//我审批--已办
                debugger;
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
                debugger;
                dispatch(fetchData('HEADER_DATEDONE_SUCCESS', { doneData: transReceiveData(dataResult.datalist) }))
            }
        );
    }

}

const tableStateChange = (value) => {
    return dispatch => {
        dispatch(fetchData('HEADER_TABLESTATECHANGE_SUCCESS', { tableState: value }))
    }
}

const getApprovalData = () => {//获取审批流数据
    debugger;
    return dispatch => {
        reqwest(
            {
                url: url.notfinished,
                method: "GET",
                data: {}
            },
            dataResult => {//我提交--未完成
                debugger;
                dispatch(fetchData('HEADER_NOTFINISHED_SUCCESS', { unfinishedData: dataResult.data }))
            }
        );
        reqwest(
            {
                url: url.finished,
                method: "GET",
                data: {}
            },
            dataResult => {//我提交--已完成
                debugger;
                dispatch(fetchData('HEADER_FINISHED_SUCCESS', { finishedData: dataResult.data }))
            }
        );
        reqwest(
            {
                url: url.todo,
                method: "GET",
                data: {}
            },
            dataResult => {//我审批--待办
                debugger;
                dispatch(fetchData('HEADER_TODO_SUCCESS', { todoData: dataResult.data }))
            }
        );
        reqwest(
            {
                url: url.done,
                method: "GET",
                data: {}
            },
            dataResult => {//我审批--已办
                debugger;
                dispatch(fetchData('HEADER_DONE_SUCCESS', { doneData: dataResult.data }))
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
    tableStateChange,


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
    allButtons
}






/* 
const getData = (path1,path2) => {//获取人员组织信息
    return dispatch => {
        reqwest(
            {
                url: path1,
                method: "GET",
                data: {}
            },
            dataResult => {//请求部门
                dispatch(fetchData('HEADER_GETDEPARTMENT_SUCCESS',{ department: dataResult.data }))
            }
        );
           reqwest(
            { 
                url: path2,
                method: "GET",
                data: {}
            },
            dataResult => {//请求组织树
                dispatch(fetchData('HEADER_GETORGLIST_SUCCESS',{ dataSource: dataResult.data }))
            }
        );
    }
};

const phoneBookChange = () => {//打开通讯录
    return dispatch => {
		dispatch(fetchData('HEADER_PHONEBOOK_CHANGE',{ phoneBook: true }))
	}
}

const phoneBookClosed = () => {//关闭通讯录
    return dispatch => {
		dispatch(fetchData('HEADER_PHONEBOOK_CLOSED',{ phoneBook: false }))
	}
}

const searchStateChange = (flag) => {
    return dispatch => {
		dispatch(fetchData('HEADER_SEARCH_CHANGE',{ searchState: flag }))
	}
}
 
const searchData = (path,data) => {//搜索
    return dispatch => {
        reqwest(
            {
                url: path,
                method: "GET",
                data: {
                    param: data
                }
            },
            dataResult => {
                dispatch(fetchData('HEADER_SEARCH_SUCCESS',{ searchData: dataResult }))
            }
        )
    }
}

/* 更换页码请求数据时候返回的数据没有表格头部 */