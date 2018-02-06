import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { message } from "antd";
import { distributed as url } from 'api/zhb';

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
            console.log('左上角部门人员详情==========',result)
            dispatch(fetchData('CUSTOMER_DEPARTMENT_LIST_GETLISTSUCCESS', { ...result, name }));
        })
    }
}

const getCustomerItem = (str,id,num) => {//获取左侧下半部分公司部门或者业务员数据
    let page={ pageSize: 5, page: num}, search={  deptId :'', userId :''  }
    if(str){
        search[str]=id
    } 
    return (dispatch) => {
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
            console.log('左下角地址详情----------------',result)
			dispatch(fetchData('CUSTOMER_ITEM_LIST_GETLISTSUCCESS', { ...result }));
        });
	}
}

export {
    getCustomerList,
    getCustomerItem,
};
