import request from 'reqwest'

let urlPath=`http://10.11.112.40:8081/crm_web/sys/org/`


//获取所有数据
export function getlist(fn){
    const fetchData = (type, payload)=> {
        return {
            type,
            payload
        }
    }

    return(dispatch,getState)=>{
        dispatch({type:'ORG_LIST_GETLISTSTART'})
        request({
            url: urlPath,
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
        })
        .fail(function (err, msg) {
            debugger
        }) 
    }
}


export function changeAdd(){
   return{
       type:'ORG_LIST_CHANGEADD'
   }
}

export function listaddclose (){
    return{
        type:'ORG_LIST_CHANGEADDCLOSE'
    }
}

export function listadd(list){
    const fetchData = (type, payload)=> {
        return {
            type,
            payload
        }
    }
    return(dispatch,getState)=>{
        request({
            url: urlPath,
            type:"application/x-www-form-urlencoded",
            method:'post',
            data:"param="+JSON.stringify(list)
        })
        .then(function (dataResult) {
            let {data} = JSON.parse(dataResult.response);
            dispatch(fetchData('ORG_LIST_LISTADDSUCCESS',{data:data})) 
        })
        .fail(function (err, msg) {
            debugger
        }) 
    }
}


//根据id查一条数据
export function getDetailSingle(id,fn){
    return(dispatch,getState)=>{
        request({
            url: `${urlPath}+${id}`,
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
            debugger
        }) 
    }
}


//改变一条数据
export function listchange(value){
    const fetchData = (type, payload)=> {
        return {
            type,
            payload
        }
    }
    return(dispatch,getState)=>{
        let id=value.id
        request({
            url: `${urlPath}+${id}`,
            type:"application/x-www-form-urlencoded",
            method:'put',
            data:"param="+JSON.stringify(value)
        })
        .then(function (dataResult) {
            request({
                url: urlPath,
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
            })
            .fail(function (err, msg) {
                debugger
            }) 
        })
        .fail(function (err, msg) {
            debugger
        }) 
    }
}


//删除一条数据
export function listdel(record){
    return(dispatch,getState)=>{
        let id=record.id
        request({
            url: `${urlPath}+${id}`,
            type:"application/x-www-form-urlencoded",
            method:'delete',
            data:{}
        })
        .then(function (dataResult) {
            dispatch({type:'ORG_LIST_LISTDELSUCCESS',record})
        })
        .fail(function (err, msg) {
            debugger
        }) 
    }
}



//获取tree数据
export function getTreeList(fn){
    return(dispatch,getState)=>{
        request({
            url: urlPath,
            type:"application/x-www-form-urlencoded",
            method:'get',
            data:{}
        })
        .then(function (dataResult){
            let {data} = JSON.parse(dataResult.response);
            dispatch({type:'ORG_LIST_GETTREELIST',data})
            fn()
        })
        .fail(function (err, msg) {
            debugger
        }) 
    }
}