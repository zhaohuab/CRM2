import fetchData from 'utils/fetchdata';
import reqwest from "utils/reqwest";
import {baseDir} from 'api';
import { browserHistory } from 'react-router';
import { approved as url } from 'api/zhb';

const approvedClosed = () => {//关闭审批流
    return dispatch => {
		dispatch(fetchData('HEADER_APPROVED_SHOW',{ approval: false }))
	}
}
const approvedChange = (key, flag) => {//切换审批
    return dispatch => {
		dispatch(fetchData('HEADER_APPROVED_CHANGE',{ tableState: key, myState: flag }))
	}
}

const getUnfinished = (data) => {
    return dispatch => {
        reqwest(
            {
                url: url.notfinished,
                method: "GET",
                data: {
                    param: data
                }
            },
            dataResult => {//我提交--未完成
                debugger;
                dispatch(fetchData('HEADER_NOTFINISHED_SUCCESS',{ unfinishedData: dataResult }))
            }
        )
    }
}

const getFinished = (data) => {
    return dispatch => {
        reqwest(
            { 
                url: url.finished,
                method: "GET",
                data: {
                    param: data
                }
            },
            dataResult => {//我提交--已完成
                debugger;
                dispatch(fetchData('HEADER_FINISHED_SUCCESS',{ finishedData: dataResult }))
            }
        )
    }
}

const getTodo = (data) => {
    return dispatch => {
        reqwest(
            {
                url: url.todo,
                method: "GET",
                data: {
                    param: data
                }
            },
            dataResult => {//我审批--待办
                debugger;
                dispatch(fetchData('HEADER_TODO_SUCCESS',{ todoData: dataResult }))
            }
        );
    }
}

const getDone = (data) => {
    return dispatch => {
        reqwest(
            { 
                url: url.done,
                method: "GET",
                data: {
                    param: data
                }
            },
            dataResult => {//我审批--已办
                debugger;
                dispatch(fetchData('HEADER_DONE_SUCCESS',{ doneData: dataResult }))
            }
        );
    }
}

const setPagination = (data) => {
    return dispatch => {
		dispatch(fetchData('HEADER_SETPAGINATION_SUCCESS',{ pagination: data }))
	}
}

const tableStateChange = (value) => {
    return dispatch => {
		dispatch(fetchData('HEADER_TABLESTATECHANGE_SUCCESS',{ tableState: value }))
	}
}





export {
    approvedClosed,
    approvedChange,
    getUnfinished,
    getFinished,
    getTodo,
    getDone,
    setPagination,
    tableStateChange,
}


/* 更换页码请求数据时候返回的数据没有表格头部 */