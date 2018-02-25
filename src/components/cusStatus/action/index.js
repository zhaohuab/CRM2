import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { message } from "antd";
import { cusStatus as url } from 'api/zhb';

const getCustomerList = (str,id,name,back) => {//获取左侧上半部分客户数据
    debugger;
   
    let search = { deptId: '', userId: '' };
    if(str){
        search[str]=id
    } 
    return dispatch => {
        reqwest({
            url: url.department,
            method: "GET",
            data: {
                param: search
            }
        }, result=>{   
            debugger   
            dispatch(fetchData('CUSTOMER_DEPARTMENT_LIST_GETLISTSUCCESS', { ...result, str, id, search, name, back }));
        })
    }
}

const getCustomerItem = (str,id,num,back) => {//获取左侧下半部分公司部门或者业务员数据
    debugger
    let page={ pageSize: 5, page: num}, search={  deptId :'', userId :''  }
    if(str){
        search[str]=id
    } 
    return (dispatch) => {
        dispatch(fetchData('CUSTOMER_ITEM_LIST_GETLIST2', {}));
        reqwest({
			url: url.customer,
			method: "GET",
            data: {
                param: {
                    ...page,
                    searchMap: search
                }
            }
		},result => {
            debugger;
			dispatch(fetchData('CUSTOMER_ITEM_LIST_GETLISTSUCCESS', { ...result, str, id, num, back }));
        },()=>{
            dispatch(fetchData('CUSTOMER_ITEM_LIST_FAIL', {}));
        }
    );
	}
}

const getStatusData = (str, id) => {
   debugger;
    let search = { deptId: '', userId: '' };
    if(str){
        search[str]=id
    } 
    debugger;
    return dispatch => {
        reqwest({
            url: url.echarts,
            method: "GET",
            data: {
                param: search
            }
        }, result=>{       
            dispatch(fetchData('CUSTOMER_ECHARTS_LIST_GETLISTSUCCESS', { ...result }));
        })
    }
}

const listPop = () => {//点击返回按钮时删除 customerListBack和customerItemBack中的最后一项
    debugger;
    return dispatch => {
        dispatch(fetchData('CUSTOMER_DEPARTMENT_LIST_POP', {}));
    }
}

export {
    getCustomerList,
    getCustomerItem,
    getStatusData,
    listPop
};
