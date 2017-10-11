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
    return searchMap
}

const appendAddress = (data) =>{
    for(let i=0;i<data.length;i++){
        data[i].address = data[i].provinceName+data[i].city+ data[i].districtName+data[i].street
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
            debugger
            dispatch(fetchData('CUSTOMER_LIST_GETDATA', {data: appendAddress(data)}));
        })
	   
	}
}

const listAddSave = (data) =>{
    return(dispatch)=>{
        reqwest({
            url: url.customer,
            method:'post',
            data:{
                param: transData(data)
            }
        }, (data) => {
            dispatch(fetchData('CUSTOMER_LIST_ADDSAVE',data));
        })
    }
}

const listEditSave = (data) =>{
    return(dispatch)=>{
        reqwest({
            url: url.customer+"/"+data.id,
            
            method:'put',
            data:{
                param: transData(data)
            }
        }, (data) => {
            dispatch(fetchData('CUSTOMER_LIST_EDITSAVE', {data: appendAddress(data)}));
            
        })
    }

}

const closeForm=()=>{
    return{
        type:'CUSTOMER_LIST_CLOSEFORM'
    }
 }

 const closePanel=()=>{
    return{
        type:'CUSTOMER_LIST_CLOSEPANEL'
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

const showFormEdit=(visible)=>{
    return fetchData('CUSTOMER_LIST_SHOWFORM', {visible});
}
const showViewForm=(visible,record)=>{
    return fetchData('CUSTOMER_LIST_SHOWVIEWFORM',{visible,record})
}

const deleteData=(ids,searchMap,pagination)=>{
    return (dispatch) => {
        reqwest({
            url:url.customer+'/batch',
            method: "DELETE",
            data:{
                param: JSON.stringify({
                    ids:ids.join(","),
                    ...pagination,
                    searchMap:searchMap
                }),
            }
        }
        ,(data) => {
            dispatch(fetchData('CUSTOMER_LIST_GETDATA', {data: appendAddress(data)}));
        })
    }
}
//启停用功能
const setEnableState=(ids,state,page,searchMap)=>{
    debugger
    return (dispatch) => {
		reqwest({
			url: url.customer+'/state',
			method: "PUT",
			data: {
				param: {
					ids: ids.join(","),
					...page,
                    searchMap:searchMap,
                    enableState: String(state),
				},
			}
		},(dataResult) => {
                const listData=dataResult;
                dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', {data: listData.data.data}));
        })
	}
}

//输出 type 与 方法
export {
    getListData,
    changeVisible,
    selectRow,
    showForm,
    showFormEdit,
    listAddSave,
    listEditSave,
    showViewForm,
    closePanel,
    deleteData,
    setEnableState
}