import fetchData from 'utils/fetchdata';
import reqwest from "utils/reqwest";
import {baseDir} from 'api';
import { browserHistory } from 'react-router';
import { approved as url } from 'api/zhb'

 const loginOut = () => {
   return (dispatch)=>{
        reqwest({
            url: `${baseDir}logout`,
            method: "POST",
        }).then(result => {
            location.href = location.href
        })
   }
}
//通讯录中的方法
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

const getDeparment = (path,id) => {
    return dispatch => {
        reqwest(
            {
                url: path,
                method: "GET",
                data: {
                    deptId: id
                }
            },
            dataResult => {
                dispatch(fetchData('HEADER_SEARCH_SUCCESS',{ searchData: dataResult }))
            }
        )
    }
}

//审批流中的方法
const approvedShow = () => {//审批流显示
    return dispatch => {
		dispatch(fetchData('HEADER_APPROVED_SHOW',{ approval: true }))
    }
}

const getApprovalData = () => {//获取审批流数据
    let aa = url;
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
                dispatch(fetchData('HEADER_NOTFINISHED_SUCCESS',{ unfinishedData: dataResult.data }))
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
                dispatch(fetchData('HEADER_FINISHED_SUCCESS',{ finishedData: dataResult.data }))
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
                dispatch(fetchData('HEADER_TODO_SUCCESS',{ todoData: dataResult.data }))
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
                dispatch(fetchData('HEADER_DONE_SUCCESS',{ doneData: dataResult.data }))
            }
        );
    }
}

export {
    loginOut,
    getData,
    searchData,
    phoneBookChange,
    phoneBookClosed,
    searchStateChange,
    approvedShow,
    getApprovalData,
}