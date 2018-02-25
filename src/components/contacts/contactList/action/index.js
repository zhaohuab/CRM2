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
        debugger
        dispatch({ type: "CONTACTS_LIST_GETLISTSUCCESS" });
        reqwest(
            {
                url: contacts.contacts,
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                        searchMap: {
                            enableState: searchMap.enableState
                        }
                    }
                }
            },
            result => {
                dispatch({ type: "CONTACTS_LIST_GETLIST", data: result });
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
                debugger;
                console.log(2, result);
                dispatch({ type: "CONTACTS_CARD_SAVEADD", data: result });
            }
        );
    };
}
//保存已选择的数据
export function selectData(data) {
    debugger;
    return {
        type: "CONTACTS_LIST_SELECTDATA",
        data
    };
}
//删除已选择的数据
export function onDelete(delKey, pagination, searchMap, fn) {
    return (dispatch, getState) => {
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
//编辑已选择
export function onEdit(values, pagination, searchMa) {
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
                dispatch({
                    type: "CONTACTS_LIST_UPDATELIST",
                    data: result
                });
            }
        );
    };
}

export function edit(edit, show) {
    if (isEmpty(edit)) {
        return dispatch => {
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
                        edit:{userList:result.userList},
                        show
                    });
                }
            );
        };
    }
    return {
        type: "CONTACTS_LIST_EDIT",
        edit,
        show
    };
}
function isEmpty(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
}; 
