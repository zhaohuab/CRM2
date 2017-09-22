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
export function getlist(fn){
    return(dispatch,getState)=>{
       
        dispatch({type:'ORG_LIST_GETLISTSTART'})
        request({
            url: url.org,
            method:'get',
            data:{
                param: JSON.stringify({
                    pageSize:20,
                    page:1
                })
            }
        },(data) => {
            dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', {data: data.data.data}));
        })
    }
}


export function changeAdd(){
   return{
       type:'ORG_LIST_CHANGEADDSTART'
   }
}

export function listaddclose (){
    return{
        type:'ORG_LIST_CHANGEADDCLOSE'
    }
}

export function listadd(list){
    return(dispatch,getState)=>{
        request({
            url: url.org,
            
            method:'post',
            data:"param="+JSON.stringify(list)
        }, (dataResult) => {
            let {data} = JSON.parse(dataResult.response);
            dispatch(fetchData('ORG_LIST_LISTADDSUCCESS',{data:data})) 
        })
    }
}


//根据id查一条数据
export function getDetailSingle(id,fn){
    return(dispatch,getState)=>{
        console.log(url.org)
        
        request({
            url: `${url.org}+${id}`,
            
            method:'get',
            data:{
                param: JSON.stringify({
                    condMap:typeof(params) == "undefined"?{}:JSON.stringify(params)
                })
            }
        },(dataResult) => {
            let {data} = JSON.parse(dataResult.response);
            fn(data)
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
            data:"param="+JSON.stringify(value)
        },(dataResult) => {
            request({
                url: url.org, 
                method:'get',
                data:{
                    param: JSON.stringify({
                        pageSize:20,
                        page:1,
                        condMap:typeof(params) == "undefined"?{}:JSON.stringify(params)
                    })
                }
            },(data) => {
                dispatch(fetchData('ORG_LIST_GETLISTSUCCESS',{data:data.data})) 
            })
        })
    }
}


//删除一条数据
export function listdel(record){
    return(dispatch,getState)=>{
        let id=record.id
        request({
            url: `${url.org}+${id}`,
            
            method:'delete',
            data:{}
        }, (dataResult) => {
            dispatch({type:'ORG_LIST_LISTDELSUCCESS',record})
            message.success('删除数据成功');
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
                    pageSize:20,
                    page:1,
                    searchMap:{id}
                })
            }
        },(data) => {
            dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', {data: data.data}));
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

