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

let change = data => {
    let newData = data.split(/;|,/g);
    let result = [];
    newData.forEach(item => {
        result.push({ title: item, select: false, disable: "disabled" });
    });
    return result;
};

//新增联系人

export function addPerson(show) {
    return dispatch => {
        let tags = {
            role: "决策人;商务决策人;技术决策人,财务决策人,项目决策人,审批者,评估者,影响人,使用人,普通人",
            attitude: "还不错,非常好,一般,恶略,无视",
            hobby: "踢球,跑步"
        };
        tags.role = change(tags.role);
        tags.attitude = change(tags.attitude);
        tags.hobby = change(tags.hobby);
        dispatch({ type: "CONTACTS_LIST_ADDPERSON", tags, show });
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
                dispatch({ type: "CONTACTS_CARD_SAVEADD", data: result });
            }
        );
    };
}
//保存已选择的数据
export function selectData(data) {
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
