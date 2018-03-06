import reqwest from "utils/reqwest";
import { contacts } from "api";
import Immutable from "immutable";
export function getCollaps() {
    return {
        type: "COMMON_MENU_COLLAPSED"
    };
}

//获取联系人列表
export function getContactList(pagination, searchMap) {
    return dispatch => {
       // debugger
        dispatch({ type: "CONTACTS_LIST_GETLISTSUCCESS" });
        reqwest(
            {
                url: contacts.contacts,
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                        searchMap: {
                            ...searchMap
                        }
                    }
                }
            },
            result => {
               //debugger;
                dispatch({ type: "CONTACTS_LIST_GETLIST", data: result, pagination });
            }
        );
    };
}

//显示/关闭modal，在index中仅关闭时引用了一次
export function showForm(data) {
    return dispatch => {
        dispatch({ type: "CONTACTS_LIST_SHOWFORM", data });
    };
}

//新增、编辑时转换参数结构
function translate(data,arr){
    //debugger;
    let dataCopy = Immutable.fromJS(data).toJS();
    if(typeof(arr)=='undefined'){
        for(let key in dataCopy){
            if(key!='ownerUserId'&&key!='deptid'){
                if(key=='customer'||key=='post'){
                    dataCopy[key]=dataCopy[key].value.id
                }else{
                    dataCopy[key]=dataCopy[key].value
                }
            }
        }
    }else if(arr.length==0){
        dataCopy=dataCopy
   }else if(arr&&arr.length){
        arr.forEach(item=>{
            for(let key2 in data){
                if(item==key2&&item!='ownerUserId'&&item!='deptid'){
                    if(item=='customer'||item=='post'){
                        dataCopy[item]=dataCopy[item].value.id
                    }else{
                        dataCopy[item]=dataCopy[item].value
                    }
                }
            }
        })      
    } 
   // debugger
    return dataCopy
}
//保存新增联系人
export function cardSaved(data, pagination, searchMap) {
    let saveData=translate(data)
    pagination={
        pageSize: 10,
        page: 1
    };
    searchMap={enableState:1};
    //debugger
    return dispatch => {
        //dispatch({ type: "CONTACTS_LIST_GETLISTSUCCESS" });
        reqwest(
            {
                url: contacts.contacts,
                method: "POST",
                data: {
                    param: {
                        ...saveData
                    }
                }
            },
            result => {  
               //debugger  
               reqwest(
                {
                    url: contacts.contacts,
                    method: "GET",
                    data: {
                        param: {
                            ...pagination,
                            searchMap: {
                                ...searchMap
                            }
                        }
                    }
                },
                result => {
                   // debugger;
                    dispatch({ type: "CONTACTS_LIST_GETLIST", data: result, pagination });
                }
            );       
               // dispatch({ type: "CONTACTS_CARD_SAVEADD", data: result});
            }
        );
     
    };
}
//保存已选择的数据
export function selectData(data) {
    //debugger;
    return {
        type: "CONTACTS_LIST_SELECTDATA",
        data
    };
}
//删除已选择的数据
export function onDelete(delKey, pagination, searchMap, fn) {
    return (dispatch, getState) => {
       // dispatch({ type: "CONTACTS_LIST_GETLISTSUCCESS" });
        reqwest(
            {
                url: `${contacts.contacts}/batch`,
                method: "DELETE",
                data: {
                    param: {
                        ...pagination,
                        searchMap: {
                            enableState: searchMap.enableState
                        },
                        ids: delKey.join(",")
                    }
                }
            },
            result => {
                dispatch({
                    type: "CONTACTS_LIST_GETLISTUPDATE",
                    data: result,
                    del: delKey
                });
            }
        );
    };
}
//保存编辑
export function onEdit(arr, values, pagination, searchMap) {
    //debugger
    let saveData = translate(values,arr)
  // debugger
    return dispatch => {
        dispatch({ type: "CONTACTS_LIST_GETLISTSUCCESS" });
        reqwest(
            {
                url: `${contacts.contacts}/${values.id}`,
                method: "PUT",
                data: {
                    param: {
                        ...saveData
                    }
                }
            },
            result => {
                dispatch({
                    type: "CONTACTS_LIST_UPDATELIST",
                    data: values
                });
                reqwest(
                    {
                        url: contacts.contacts,
                        method: "GET",
                        data: {
                            param: {
                                ...pagination,
                                 searchMap: {
                                    ...searchMap
                                } 
                            }
                        }
                    },
                    result => {
                        //debugger;
                        dispatch({ type: "CONTACTS_LIST_GETLIST", data: result, pagination });
                    }
                ); 
            }
        );
    };
}


//新增、编辑按钮
export function edit(data, show, name) {
   // debugger
    /* if (isEmpty(edit)) { */
        return dispatch => {
            dispatch({ type: "CONTACTS_LIST_GETLISTSUCCESS" });
            reqwest(
                {
                    url: contacts.ref,
                    method: "get",
                    // data: {
                    //     param: {
                    //         ...values
                    //     }
                    // }
                },
                result => {
                    dispatch({
                        type: "CONTACTS_LIST_EDIT",
                        result,
                        show,
                        name
                    });
                },
              /*   ()=>{
                    dispatch({
                        type: "CONTACTS_LIST_FAIL"
                    });
                } */
            );
            if(name=='edit'){
                 reqwest(
                    {
                        url: `${contacts.contacts}/${data.id}`,
                        method: "GET",
                    },
                    result => {  
                      //  debugger;        
                        dispatch({ type: "CONTACTS_EDIT_DETAIL", result, data});
                    }
                ); 
            }        
        };
   
}
function isEmpty(obj) {
    //debugger
    for (var name in obj) {
       // debugger
        return false;
    }
    return true;
}; 


//往redux中存基础、扩展查询条件
export function saveSearchMap(data){
   // debugger;
    return {
        type: "CONTACTS_LIST_SEARCHMAP",
        data
    };
};

//往redux中储存modal值
export function saveAddCard(data,arr){
    return {
        type: "CONTACTS_ADD_CARD",
        data,
        arr
    }
}

//往redux中储存职务
export function choosed(data){
    //debugger;
    return {
        type: "CONTACTS_CHOOSED_CARD",
        data
    }
}

//展开详情
export function slideShow(data){
    return dispatch => {
        //dispatch({ type: "CONTACTS_LIST_GETLISTSUCCESS" });
        reqwest(
            {
                url: contacts.dynamic,
                method: "GET",
                data:{
                    param:{
                        id: data.id
                    }
                }
            },
            result => {  //动态
               //debugger         
                dispatch({ type: "CONTACTS_SLIDESHOW_CARD", result, data});
            }
        );
        reqwest(
            {
                url: `${contacts.contacts}/${data.id}`,
                method: "GET",
            },
            result => {  //该联系人全部数据
                //debugger;        
                dispatch({ type: "CONTACTS_EDIT_DETAIL", result, data});
            }
        ); 
    };
    //debugger;
}


