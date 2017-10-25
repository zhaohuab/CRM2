import reqwest from "utils/reqwest";
import { contacts } from "api";
console.log();
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
                let data = result.data;
                let newData = [];
                data.forEach(item => {
                    let singleObj = {};
                    for (var key in item) {
                        if (key == "id") {
                            singleObj.id = item[key];
                        } else if (key == "name") {
                            singleObj.name = item[key];
                        } else if (key == "gender") {
                            singleObj.gender = item[key];
                        } else if (key == "mobile") {
                            singleObj.mobile = item[key];
                        } else if (key == "address") {
                            singleObj.address = item[key];
                        } else if (key == "wechat") {
                            singleObj.wechat = item[key];
                        } else if (key == "qq") {
                            singleObj.qq = item[key];
                        } else if (key == "supContactId") {
                            singleObj.supContactId = item[key];
                        } else if (key == "enableState") {
                            singleObj.enableState = item[key];
                        } else if (key == "enableTime") {
                            singleObj.enableTime = item[key];
                        }
                    }
                    newData.push(singleObj);
                });
                dispatch({ type: "CONTACTS_LIST_GETLIST", data: newData });
            }
        );
    };
}
