import request from 'reqwest'
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
            let data=JSON.parse(dataResult.response);
            dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', {data: data.data.data}));
            message.success('获取数据成功');
        })
        .fail(function (err, msg) {
            message.error('获取数据失败');
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
            type:"application/x-www-form-urlencoded",
            method:'post',
            data:"param="+JSON.stringify(list)
        })
        .then(function (dataResult) {
            let {data} = JSON.parse(dataResult.response);
            dispatch(fetchData('ORG_LIST_LISTADDSUCCESS',{data:data})) 
            message.success('增加数据成功');
        })
        .fail(function (err, msg) {
            message.success('增加数据失败');
        }) 
    }
}


//根据id查一条数据
export function getDetailSingle(id,fn){
    return(dispatch,getState)=>{
        request({
            url: `${url.org}+${id}`,
            type:"application/x-www-form-urlencoded",
            method:'get',
            data:{
                param: JSON.stringify({
                    condMap:typeof(params) == "undefined"?{}:JSON.stringify(params)
                })
            }
        })
        .then(function (dataResult) {
            let {data} = JSON.parse(dataResult.response);
            fn(data)
        })
        .fail(function (err, msg) {
            message.error('查询数据失败');
        }) 
    }
}


//改变一条数据
export function listchange(value){
    return(dispatch,getState)=>{
        let id=value.id
        request({
            url: `${url.org}+${id}`,
            type:"application/x-www-form-urlencoded",
            method:'put',
            data:"param="+JSON.stringify(value)
        })
        .then(function (dataResult) {
            request({
                url: url.org,
                type:"application/x-www-form-urlencoded",
                method:'get',
                data:{
                    param: JSON.stringify({
                        pageSize:20,
                        page:1,
                        condMap:typeof(params) == "undefined"?{}:JSON.stringify(params)
                    })
                }
            })
            .then(function (dataResult) {
                let {data} = JSON.parse(dataResult.response);
                dispatch(fetchData('ORG_LIST_GETLISTSUCCESS',{data:data.data})) 
                message.success('修改数据成功');
            })
            .fail(function (err, msg) {
                message.error('修改数据失败');
            }) 
        })
        .fail(function (err, msg) {
            message.error('修改数据失败');
        }) 
    }
}


//删除一条数据
export function listdel(record){
    return(dispatch,getState)=>{
        let id=record.id
        request({
            url: `${url.org}+${id}`,
            type:"application/x-www-form-urlencoded",
            method:'delete',
            data:{}
        })
        .then(function (dataResult) {
            dispatch({type:'ORG_LIST_LISTDELSUCCESS',record})
            message.success('删除数据成功');
        })
        .fail(function (err, msg) {
            message.error('删除数据失败');
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
            type:"application/x-www-form-urlencoded",
            method:'get',
            data:{}
        })
        .then(function (dataResult){
            debugger
            let {data} = JSON.parse(dataResult.response);
            dispatch({type:'ORG_LIST_GETTREELISTSUCCESS',data})
        })
        .fail(function (err, msg) {
            debugger
        }) 
    }
}


//获取一个部门tree信息，变换表格数据
export function listTreeChange(id){
    return(dispatch,getState)=>{
        
        request({
            url: url.org,
            type:"application/x-www-form-urlencoded",
            method:'get',
            data:{
                param: JSON.stringify({
                    pageSize:20,
                    page:1,
                    searchMap:{id}
                })
            }
        })
        .then(function (dataResult){
            let {data} = JSON.parse(dataResult.response);
            dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', {data: data.data}));
        })
        .fail(function (err, msg) {
            debugger
        }) 
    }
}