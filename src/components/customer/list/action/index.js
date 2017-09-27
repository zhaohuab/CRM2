import reqwest from 'utils/reqwest'
import { message} from 'antd';

import { cum as url } from 'api';
//定义key， type

//定义方法 action
const getListData = (pagination,searchMap) => {
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
                    ...pagination,
                    searchMap
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


//启停用功能
export function setEnablestate(rows,state,page,searchMap){
    debugger
    var ids = [];
    let searchMap = {};
    if(treeId!=null&&treeId!=undefined&&treeId!=""){
        searchMap.id = treeId;
    }
    for(let i=0;i<rows.length;i++){
        ids.push(rows[i].id);
    }
    return (dispatch) => {
		request({
			url: url.customer+'enable',
			method: "PUT",
			data: {
				param: JSON.stringify({
					ids: ids.join(","),
					...page,
					searchMap
				}),
			}
		},(dataResult) => {
                const listData=dataResult;
                dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', {data: listData.data.data}));
        })
			
	}
}

const changeVisible = (visible)=>{
    // dispatch(fetchData('CUSTOMER_LIST_CHANGEVISIBLE', {toolVisible: visible}));

    return{
        type:'CUSTOMER_LIST_CHANGEVISIBLE',payload:{toolVisible: visible}
    }
}

const selectRow=(rows,visible)=>{
    return{
        type:'CUSTOMER_LIST_SELECTROW',
        payload:{rows:rows,toolVisible:visible}
    }
}

//输出 type 与 方法
export {
    getListData,
    showAddForm,
    testFunc,
    changeVisible,
    selectRow
}