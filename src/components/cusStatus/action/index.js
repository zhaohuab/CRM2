import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { message } from "antd";
import { cusStatus as url } from 'api/zhb';

const getCustomerList = (str,id,name) => {//获取左侧上半部分客户数据
   
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
            dispatch(fetchData('CUSTOMER_DEPARTMENT_LIST_GETLISTSUCCESS', { ...result, str, search, name }));
        })
    }
}

const getCustomerItem = (str,id,num) => {//获取左侧下半部分公司部门或者业务员数据
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
			dispatch(fetchData('CUSTOMER_ITEM_LIST_GETLISTSUCCESS', { ...result, num }));
        },()=>{
            dispatch(fetchData('CUSTOMER_ITEM_LIST_FAIL', {}));
        }
    );
	}
}

const getStatusData = (str, id) => {
   
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


export {
    getCustomerList,
    getCustomerItem,
    getStatusData,
};
