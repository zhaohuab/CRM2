import reqwest from "utils/reqwest";
import { contacts } from "api";

export function getCollaps() {
    return {
        type: "COMMON_MENU_COLLAPSED"
    };
}

//获取联系人信息
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

//显示modal
export function showForm(data) {
    return dispatch => {
        dispatch({ type: "CONTACTS_LIST_SHOWFORM", data });
    };
}
//保存新增联系人
export function cardSaved(data, pagination, searchMap) {
    return dispatch => {
        //dispatch({ type: "CONTACTS_LIST_GETLISTSUCCESS" });
        reqwest(
            {
                url: contacts.contacts,
                method: "POST",
                data: {
                    param: {
                        ...data
                    }
                }
            },
            result => {  
               debugger         
                dispatch({ type: "CONTACTS_CARD_SAVEADD", data: result});
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
export function onEdit(values, pagination, searchMa) {
    dispatch({ type: "CONTACTS_LIST_GETLISTSUCCESS" });
    return dispatch => {
        reqwest(
            {
                url: `${contacts.contacts}/${values.id}`,
                method: "PUT",
                data: {
                    param: {
                        ...values
                    }
                }
            },
            result => {
               // debugger
                dispatch({
                    type: "CONTACTS_LIST_UPDATELIST",
                    data: values
                });
            }
        );
    };
}


//新增/编辑按钮
export function edit(data, show, name) {
    //debugger;
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
                   // debugger;
                    dispatch({
                        type: "CONTACTS_LIST_EDIT",
                        result,
                        data,
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

//往redux中储存弹框值
export function saveAddCard(data){
    return {
        type: "CONTACTS_ADD_CARD",
        data
    }
}

//往redux中储存客户/职务
export function choosed(name,data){
    //debugger;
    return {
        type: "CONTACTS_CHOOSED_CARD",
        name,
        data
    }
}

//展开详情
export function slideShow(data){
    //debugger;
    return {
        type: "CONTACTS_SLIDESHOW_CARD",
        data
    }
}


