import request from 'reqwest'


//点击tree获取table数据
export function getClickList(fn,id){
    return(dispatch,getState)=>{
        debugger
        request({
            url: `http://10.11.112.40:8081/CRM_WEB/system/org/`,
            type:"application/x-www-form-urlencoded",
            // type:"application/json",
            method:'get',
            data:{
                param: JSON.stringify({
                    pageSize:20,
                    page:1,
                    seachMap:typeof(params) == "undefined"?{}:JSON.stringify(params)
                })
            }
        })
        .then(function (dataResult) {
            debugger
            let {data} = JSON.parse(dataResult.response);
            dispatch({type:'GETLIST',data,fn})
        })
        .fail(function (err, msg) {
            debugger
        }) 
        
    }
}


//获取所有数据
export function getlist(fn){
    return(dispatch,getState)=>{
        request({
            url: 'http://10.11.112.40:8081/CRM_WEB/system/org',
            type:"application/x-www-form-urlencoded",
            // type:"application/json",
            method:'get',
            data:{
                param: JSON.stringify({
                    pageSize:20,
                    page:1
                })
            }
        })
        .then(function (dataResult) {
            let {data} = JSON.parse(dataResult.response);
            dispatch({type:'GETLIST',data,fn})
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
            url: `http://10.11.112.40:8081/CRM_WEB/system/org/+${id}`,
            type:"application/x-www-form-urlencoded",
            // type:"application/json",
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

export function listadd(list,fn){
    return(dispatch,getState)=>{
        request({
            url: `http://10.11.112.40:8081/CRM_WEB/system/org/`,
            type:"application/x-www-form-urlencoded",
            method:'post',
            data:"param="+JSON.stringify(list)
        })
        .then(function (dataResult) {
            let {data} = JSON.parse(dataResult.response);
            dispatch({type:'LISTADD',data}) 
            fn()     
        })
        .fail(function (err, msg) {
            debugger
        }) 
    }
}

//删除一条数据
export function listdel(record,index,fn){
    return(dispatch,getState)=>{
        let id=record.pkOrg
        request({
            url: `http://10.11.112.40:8081/CRM_WEB/system/org/+${id}`,
            type:"application/x-www-form-urlencoded",
            method:'delete',
            data:{}
        })
        .then(function (dataResult) {
            dispatch({type:'LISTDEL',record})
            fn()
        })
        .fail(function (err, msg) {
            debugger
        }) 
    }
}

//改变一条数据
export function listchange(value,index,fn){
    return(dispatch,getState)=>{
        let id=value.pkOrg
        request({
            url: `http://10.11.112.40:8081/CRM_WEB/system/org/+${id}`,
            type:"application/x-www-form-urlencoded",
            method:'put',
            data:"param="+JSON.stringify(value)
        })
        .then(function (dataResult) {
            request({
                url: 'http://10.11.112.40:8081/CRM_WEB/system/org',
                type:"application/x-www-form-urlencoded",
                // type:"application/json",
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
                dispatch({type:'GETLIST',data,fn})
                //fn()
               
            })
            .fail(function (err, msg) {
                debugger
            }) 
        })
        .fail(function (err, msg) {
            debugger
        }) 


        // setTimeout(()=>{
        //    dispatch({type:'LISTCHANGE',value,index})
        //    fn()
        // },1000)
    }
}

//获取tree数据
export function getTreeList(fn){
    return(dispatch,getState)=>{
        request({
            url: `http://10.11.112.40:8081/CRM_WEB/system/orgTree`,
            type:"application/x-www-form-urlencoded",
            method:'get',
            data:{}
        })
        .then(function (dataResult){
            let {data} = JSON.parse(dataResult.response);
            dispatch({type:'GETTREELIST',data})
            fn()
        })
        .fail(function (err, msg) {
            debugger
        }) 
    }
}