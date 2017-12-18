import fetchData from 'utils/fetchdata';
import reqwest from "utils/reqwest";
import {baseDir} from 'api'
import { browserHistory } from 'react-router'

const approvedClosed = () => {//打开通讯录
    return dispatch => {
		dispatch(fetchData('HEADER_APPROVED_SHOW',{ approval: false }))
	}
}

export {
    approvedClosed,
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
*/