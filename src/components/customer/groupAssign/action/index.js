import reqwest from "utils/reqwest";
import { message } from "antd";
import { cum, baseDir} from "api";
//查询条件表单发生值改变时，实时保存查询条件
export function saveSearchMap (value){
    return {
        type:'CUSTOMER_GROUPASSIGNMENT_SEARCHMAP',
        value
    }
}
//点击查询方案进行查询并保存查询方案条件
export function saveSearchPlan(pagination,searchPlan){
    //debugger
    return dispatch => {
        reqwest(
            {
                url:baseDir + 'cum/customersales',
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                        searchPlan:{
                            ...searchPlan
                        }
                    }
                }
            },
            data => {
                //debugger
                dispatch(
                    {
                        type:'CUSTOMER_GROUPASSIGNMENT_SEARCHPLAN',
                        data: data,//获取查询后的列表数据
                        searchPlan,//保存已点击的查询方案条件
                    }
                );
            }
        );
    };
}

//点击查询条件进行查询并保存查询条件
export function searchMapSearch(pagination,searchMap){
    debugger
    return dispatch => {
        reqwest(
            {
                url:baseDir + 'cum/customersales',
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                        searchMap:{
                            ...searchMap
                        }
                    }
                }
            },
            data => {
                //debugger
                dispatch(
                    {
                        type:'CUSTOMER_GROUPASSIGNMENT_SEARCHMAP',
                        data: data,//获取查询后的列表数据
                    }
                );
            }
        );
    };
}

//保存table选中keys值
export function saveTableKeys(keys){
    debugger
    return {
        type:'CUSTOMER_GROUPASSIGNMENT_SAVETABLEKEYS',
        keys
    }
}

//获取查询条件，查询方案的前置条件
export function getSearchList(pagination){
    debugger;
    return dispatch => {
        reqwest(
            {
                url:baseDir + 'cum/customersales/querytemplate',
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                        clientType:1//客户端类型1pc，2移动
                    }
                }
            },
            data => {
                
                dispatch(
                    {
                        type:"CUSTOMER_GROUPASSIGNMENT_PRESEARCHMAP", 
                        preSearchMap: data.condition,//有可能会改回condition
                        preSearchPlan:data.plan
                    }
                );
            }
        );
    };
}
//获取列表数据，包括根据各种查询信息返回列表数据
export function getList(pagination,search,keys){
    return dispatch => {
        reqwest(
            {
                url:baseDir + '/cum/groupcustomers',//url:baseDir + '/cum/groupcustomers','cum/customersales'
                //'/cum/groupcustomers'
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                        ...search
                    }
                }
            },
            data => {
                //点击分配时  从新查列表 再把tablekey过滤掉
                console.log('集团分配刷新时获取到数据==============',data)
                if(typeof keys == 'object'){
                    dispatch(
                        {
                            type:"CUSTOMER_GROUPASSIGNMENT__GETTABLELISTAGAIN", 
                            data: data
                        }
                    );
                }else{
                    dispatch(
                        {
                            type:"CUSTOMER_GROUPASSIGNMENT__GETTABLELIST", 
                            data: data
                        }
                    );
                }
            }
        );
    };
}
