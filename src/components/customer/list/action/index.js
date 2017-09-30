import reqwest from 'utils/reqwest'
import { message} from 'antd';

import { cum as url } from 'api';

const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
    }

function transData  (searchMap) {
    if(searchMap == null){
        return searchMap
    }
    searchMap.level = searchMap.level == undefined?undefined: searchMap.level.key;
    searchMap.saleArea =searchMap.saleArea == undefined?undefined: searchMap.saleArea.key;
    searchMap.industry =searchMap.industry == undefined?undefined: searchMap.industry.key;
    searchMap.cannelType =searchMap.cannelType == undefined?undefined:searchMap.cannelType.key;
    searchMap.lifecycle =searchMap.lifecycle == undefined?undefined:searchMap.lifecycle.key;
    searchMap.enableState =searchMap.enableState == undefined?undefined:searchMap.enableState.key;
    searchMap.province_city_district =searchMap.province_city_district == undefined?undefined: searchMap.province_city_district.join('_');
    debugger
    return searchMap
}

const appendAddress = (data) =>{
    for(let i=0;i<data.data.length;i++){
        data.data[i].address = data.data[i].provinceName+data.data[i].city+ data.data[i].districtName+data.data[i].street
    }
    return data;
}

//定义方法 action
const getListData = (pagination,searchMap) => {
	return (dispatch) => {
        dispatch(fetchData('CUSTOMER_LIST_SAVESEARCHMAP',  searchMap));
        reqwest({
            url:url.customer,
            method:'get',
            data:{
                param: JSON.stringify({
                    ...pagination,
                    searchMap:transData(searchMap)
                })
            }
        },(data) => {
            
            dispatch(fetchData('CUSTOMER_LIST_GETDATA', {data: appendAddress(data.data)}));
        })
	   
	}
}

const listAddSave = (list) =>{

    return(dispatch,getState)=>{
        debugger
        reqwest({
            url: url.customer,
            
            method:'post',
            data:"param="+JSON.stringify(transData(list))
        }, (data) => {
            dispatch(fetchData('CUSTOMER_LIST_ADDSAVE',data));
        })
    }

}


const closeForm=()=>{
    return{
        type:'CUSTOMER_LIST_CLOSEFORM'
    }
 }


//启停用功能
export function setEnablestate(rows,state,page,searchMap){
    var ids = [];
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

const showForm=(visible)=>{
    return fetchData('CUSTOMER_LIST_SHOWFORM', {visible});
}

//输出 type 与 方法
export {
    getListData,
    changeVisible,
    selectRow,
    showForm,
    listAddSave
}