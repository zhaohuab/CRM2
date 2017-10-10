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
    for(let i=0;i<data.length;i++){
        data[i].address = data[i].provinceName+data[i].city+ data[i].districtName+data[i].street
    }
    // debugger
    return data;
}

//定义方法 action
const getListData = (pagination,searchMap) => {
	return (dispatch) => {
        dispatch(fetchData('CUSTOMER_LIST_SAVESEARCHMAP',  searchMap));
        debugger
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
            dispatch(fetchData('CUSTOMER_LIST_GETDATA', {data: appendAddress(data.data)}));
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

const listEditSave = (data,pagination,searchMap) =>{
    const param = transData(data)
    param.page = String(pagination.page);
    param.pageIndex = String(pagination.pageIndex);
    param.searchMap = String(searchMap);
        return(dispatch)=>{
            reqwest({
                url: url.customer+"/"+data.id,
                
                method:'put',
                data:{
                    param: param
                }
            }, (data) => {
               
                    dispatch(fetchData('CUSTOMER_LIST_EDITSAVE', {data: appendAddress(data.data)}));
             
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

const showFormEdit=(visible)=>{
    return fetchData('CUSTOMER_LIST_SHOWFORM', {visible});
}
const showViewForm=(visible,record)=>{
    return fetchData('CUSTOMER_LIST_SHOWVIEWFORM',{visible,record})
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
    showViewForm
}