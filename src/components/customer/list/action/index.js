import reqwest from 'utils/reqwest'
import { message} from 'antd';

import { cum as url } from 'api';
//定义key， type

//定义方法 action
const getListData = (params) => {
	const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
    }
	return (dispatch) => {
        //dispatch(fetchData('GET_LIST_DATA', {}))
        console.log(url)
        reqwest({
            url:url.customer,
            method:'get',
            data:{
                param: JSON.stringify({
                    page:1,
                    pageSize:20
                })
            }
        },(data) => {
            dispatch(fetchData('CUSTOMER_LIST_GETDATA', {data: data.data}));
        })
	   
	}
}

const showAddForm=()=>{
   return{
       type:'CUSTOMER_LIST_SHOWADDFORM'
   }
}

const closeAddForm=()=>{
    return{
        type:'CUSTOMER_LIST_CLOSEADDFORM'
    }
 }

const testFunc = () => {
    reqwest({
        url: "http://10.1.204.74:8081/crm_web/sys/org/",
        type:"application/x-www-form-urlencoded",
        method:'get',
        data:{
            param: JSON.stringify({
                pageSize:20,
                page:1
            })
        }
    })
    .then(function (dataResult) {
        debugger
        let data=JSON.parse(dataResult.response);
        // dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', {data: data.data.data}));
        message.success('获取数据成功');
    })
    .fail(function (err, msg) {
        debugger
        message.error('获取数据失败');
    })
}


//输出 type 与 方法
export {
    getListData,
    showAddForm,
    testFunc
}