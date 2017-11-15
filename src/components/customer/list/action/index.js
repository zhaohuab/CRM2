import reqwest from "utils/reqwest";
import { message } from "antd";

import { cum as url, doc } from "api";
const fetchData = (type, payload) => {
    return {
        type,
        payload
    };
};

function transData(searchMap) {
    if (searchMap == null) {
        return searchMap;
    }
    searchMap.level =
        searchMap.level == undefined ? undefined : searchMap.level.key;
    searchMap.saleArea =
        searchMap.saleArea == undefined ? undefined : searchMap.saleArea.key;
    searchMap.industry =
        searchMap.industry == undefined ? undefined : searchMap.industry.key;
    searchMap.cannelType =
        searchMap.cannelType == undefined
            ? undefined
            : searchMap.cannelType.key;
    searchMap.lifecycle =
        searchMap.lifecycle == undefined ? undefined : searchMap.lifecycle.key;
    searchMap.enableState =
        searchMap.enableState == undefined
            ? undefined
            : searchMap.enableState.key;
    searchMap.province_city_district =
        searchMap.province_city_district == undefined
            ? undefined
            : searchMap.province_city_district.join("_");
    if (searchMap.province_city_district != undefined) {
        searchMap.province = searchMap.province_city_district.split("_")[0];
        searchMap.city = searchMap.province_city_district.split("_")[1];
        searchMap.district = searchMap.province_city_district.split("_")[2];
    }
    return searchMap;
}

const appendAddress = data => {
    for (let i = 0; i < data.data.length; i++) {
        data.data[i].address =
            String(data.data[i].provinceName) +
            String(data.data[i].cityName) +
            String(data.data[i].districtName) +
            String(data.data[i].street);
    }
    return data;
};
const appendAddressOne = data => {
    data.address =
        String(data.provinceName) +
        String(data.cityName) +
        String(data.districtName) +
        String(data.street);
    return data;
};
//定义方法 action
const getListData = (pagination, searchMap) => {
    return dispatch => {
        dispatch(fetchData("CUSTOMER_LIST_SAVESEARCHMAP", searchMap));
        reqwest(
            {
                url: url.customer,
                method: "get",
                data: {
                    param: {
                        ...pagination,
                        searchMap: transData(searchMap)
                    }
                }
            },
            data => {
                debugger;
                dispatch(
                    fetchData("CUSTOMER_LIST_GETDATA", {
                        data: appendAddress(data),
                        pagination
                    })
                );
            }
        );
    };
};

const listAddSave = data => {
    return dispatch => {
        reqwest(
            {
                url: url.customer,
                method: "post",
                data: {
                    param: transData(data)
                }
            },
            data => {
                dispatch(
                    fetchData("CUSTOMER_LIST_ADDSAVE", appendAddressOne(data))
                );
            }
        );
    };
};

const listEditSave = data => {
    return dispatch => {
        reqwest(
            {
                url: url.customer + "/" + data.id,
                method: "put",
                data: {
                    param: transData(data)
                }
            },
            data => {
                dispatch(
                    fetchData("CUSTOMER_LIST_EDITSAVE", appendAddressOne(data))
                );
            }
        );
    };
};

const closeForm = () => {
    return {
        type: "CUSTOMER_LIST_CLOSEFORM"
    };
};

const closePanel = () => {
    return {
        type: "CUSTOMER_LIST_CLOSEPANEL"
    };
};

const changeVisible = () => {
    return {
        type: "CUSTOMER_LIST_CHANGEVISIBLE"
    };
};

const selectRow = (selectedRows, selectedRowKeys) => {
    debugger;
    return {
        type: "CUSTOMER_LIST_SELECTROW",
        payload: { selectedRows, selectedRowKeys }
    };
};

const showForm = (visible, isEdit) => {
    return fetchData("CUSTOMER_LIST_SHOWFORM", { visible, isEdit });
};

const showViewForm = (visible, record) => {
    return fetchData("CUSTOMER_LIST_SHOWVIEWFORM", { visible, record });
};

const deleteData = (ids, searchMap, pagination) => {
    return dispatch => {
        reqwest(
            {
                url: url.customer + "/batch",
                method: "DELETE",
                data: {
                    param: {
                        ids: ids.join(","),
                        ...pagination,
                        searchMap: transData(searchMap)
                    }
                }
            },
            data => {
                dispatch(
                    fetchData("CUSTOMER_LIST_DELETE", {
                        data: appendAddress(data)
                    })
                );
            }
        );
    };
};
//启停用功能
const setEnableState = (ids, state, page, searchMap) => {
    return dispatch => {
        reqwest(
            {
                url: url.customer + "/state",
                method: "PUT",
                data: {
                    param: {
                        ids: ids.join(","),
                        ...page,
                        searchMap: transData(searchMap),
                        enableState: String(state)
                    }
                }
            },
            dataResult => {
                dispatch(
                    fetchData("CUSTOMER_LIST_GETDATA", {
                        data: appendAddress(dataResult),
                        pagination: page
                    })
                );
            }
        );
    };
};

const getEnumData = () => {
    return dispatch => {
        reqwest(
            {
                url: url.doc,
                method: "get",
                data: {
                    param: { ids: "1,2,3,4,5,6" }
                }
            },
            data => {
                dispatch(
                    fetchData("CUSTOMER_LIST_GETENUMDATA", {
                        enumData: data.enumData
                    })
                );
            }
        );
    };
};
//输出 type 与 方法
export {
    getListData,
    changeVisible,
    selectRow,
    showForm,
    listAddSave,
    listEditSave,
    showViewForm,
    closePanel,
    deleteData,
    setEnableState,
    getEnumData
};
