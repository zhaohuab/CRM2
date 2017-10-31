import reqwest from "utils/reqwest";
import { contacts } from "api";

export function getCollaps() {
    return {
        type: "COMMON_MENU_COLLAPSED"
    };
}

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
                debugger;
                dispatch({ type: "CONTACTS_LIST_GETLIST", data: result });
            }
        );
    };
}

export function showForm(data) {
    return dispatch => {
        dispatch({ type: "CONTACTS_LIST_SHOWFORM", data });
    };
}

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

export function selectData(data) {
    return {
        type: "CONTACTS_LIST_SELECTDATA",
        data
    };
}

export function onDelete(delKey, pagination, searchMap) {
    debugger;
    return dispatch => {
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
                debugger;
                dispatch({
                    type: "CONTACTS_LIST_UPDATELIST",
                    data: result
                });
            }
        );
    };
}
