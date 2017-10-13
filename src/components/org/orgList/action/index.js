import request from 'utils/reqwest'
import { message} from 'antd';
import { org as url } from 'api';

const fetchData = (type, payload)=> {
        return {
            type,
            payload
        }
}

//获取所有数据
export function getlist(searchMap){
    return(dispatch,getState)=>{
        
        dispatch({type:'ORG_LIST_GETLISTSTART'})
        request({
            url: url.org,
            method:'get',
            data:{
                param: JSON.stringify({
                    searchMap
                })
            }
        },(data) => {
            dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', {data: data.data.data}));
        })
    }
}

//点击查询按钮获取所有数据
export function getlistByClickSearch(searchMap){
    return(dispatch,getState)=>{
        
        dispatch({type:'ORG_LIST_GETLISTSTART'})
        request({
            url: url.org,
            method:'get',
            data:{
                param: JSON.stringify({
                    searchMap
                })
            }
        },(data) => {
            dispatch(fetchData('ORG_LIST_GETLISTSUCCESSBYCLICKSEARCH', {data: data.data.data,searchFilter:searchMap.searchKey}));
        })
    }
}

//打开新增/编辑页面
export function showForm(flag, editData = {}){
    return (dispatch) => {
		dispatch(fetchData('ORG_LIST_SHOWFORM', { visible: flag, editData }));
	}
}


const transData = (data) => {
	data.fatherorgId = data.fatherorgId.key
	return data;
}

//新增数据
export function listadd(list){
    return(dispatch,getState)=>{
        request({
            url: url.org,
            
            method:'post',
            data:"param="+JSON.stringify(transData(list))
        }, (dataResult) => {
            // dispatch(fetchData('ORG_LIST_LISTADDSUCCESS',{data:data.data})) 
            const listData=dataResult;
            request({
                url: url.orgTree,
                method:'get',
                data:{}
            }
            ,(data) => {
                dispatch({type:'ORG_LIST_GETTREELISTSUCCESS',data:data.data})
                dispatch(fetchData('ORG_LIST_LISTADDSUCCESS', {data: listData.data}));
            })
        })
    }
}


//改变一条数据
export function listchange(value){
    return(dispatch,getState)=>{
        let id=value.id
        request({
            url: `${url.org}+${id}`,
            method:'put',
            data:"param="+JSON.stringify(transData(value))
        },(dataResult) => {
            request({
                url: url.org, 
                method:'get',
                data:{
                    param: JSON.stringify({
                        condMap:typeof(params) == "undefined"?{}:JSON.stringify(params)
                    })
                }
            },(data) => {
                dispatch(fetchData('ORG_LIST_GETLISTSUCCESS',{data:data.data.data})) 
            })
        })
    }
}


//删除数据
export function listdel(record,treeId,searchFilter){
    var ids = [];
    let searchMap = {};
    if(treeId!=null&&treeId!=undefined&&treeId!=""){
        searchMap.id = treeId;
    }
    if(searchFilter!=null&&searchFilter!=undefined&&searchFilter!=""){
        searchMap.searchKey = searchFilter;
    }
    for(let i=0;i<record.length;i++){
        ids.push(record[i].id);
    }
    return(dispatch,getState)=>{
        let id=record.id
        request({
            url:url.org+'/batch',
			method: "POST",
			data:{
				param: JSON.stringify({
					ids:ids.join(","),
					searchMap:searchMap
				}),
				_method:"DELETE"
			}
        }
        ,(dataResult) => {
            const listData=dataResult;
            request({
                url: url.orgTree,
                method:'get',
                data:{}
            }
            ,(data) => {
                dispatch({type:'ORG_LIST_GETTREELISTSUCCESS',data:data.data})
                dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', {data: listData.data.data}));
            })
        })
    }
}


//启停用功能
export function setEnablestate(treeId,searchFilter,data,state){
    debugger
    var ids = [];
    let searchMap = {};
    if(treeId!=null&&treeId!=undefined&&treeId!=""){
        searchMap.id = treeId;
    }
    if(searchFilter!=null&&searchFilter!=undefined&&searchFilter!=""){
        searchMap.searchKey = searchFilter;
    }
    for(let i=0;i<data.length;i++){
        ids.push(data[i].id);
    }
    return (dispatch) => {
		request({
			url: url.org+'enable',
			method: "PUT",
			data: {
				param: JSON.stringify({
					ids: ids.join(","),
					enablestate: state,
					searchMap:searchMap
				}),
			}
		},(dataResult) => {
                const listData=dataResult;
                dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', {data: listData.data.data}));
        })
			
	}
}

//获取tree数据
export function getTreeList(){
    return(dispatch,getState)=>{
        dispatch({type:'ORG_LIST_GETTREELISTSTART'})
        console.info(url.orgTree);
        request({
            url: url.orgTree,
            
            method:'get',
            data:{}
        },(data) => {
            
            dispatch({type:'ORG_LIST_GETTREELISTSUCCESS',data:data.data})
        })
        
    }
}


//获取一个部门tree信息，变换表格数据
export function listTreeChange(id){
    return(dispatch,getState)=>{
        request({
            url: url.org,
            
            method:'get',
            data:{
                param: JSON.stringify({
                    searchMap:{id}
                })
            }
        },(data) => {
            dispatch(fetchData('ORG_LIST_GETLISTSUCCESSBYCLICKTREE', {data: data.data.data,treeSelect:id}));
        })
        
    } 
}


//点击操作按钮方法

export function buttonEdit(rows){
    return{
        type:'ORG_LIST_SHOWBUTTONSTART',
        rows
    }
}

