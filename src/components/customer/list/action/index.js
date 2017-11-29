import reqwest from "utils/reqwest";
import { message } from "antd";
import { cum as url, doc } from "api";

//包装发给redux的对象
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

    // searchMap.level =
    //     searchMap.level == undefined ? undefined : searchMap.level;
    // searchMap.saleArea =
    //     searchMap.saleArea == undefined ? undefined : searchMap.saleArea;
    // searchMap.industry =
    //     searchMap.industry == undefined ? undefined : searchMap.industry.key;
    // searchMap.cannelType =
    //     searchMap.cannelType == undefined
    //         ? undefined
    //         : searchMap.cannelType.key;
    // searchMap.lifecycle =
    //     searchMap.lifecycle == undefined ? undefined : searchMap.lifecycle.key;
    // searchMap.enableState =
    //     searchMap.enableState == undefined
    //         ? undefined
    //         : searchMap.enableState.key;
    searchMap.province_city_district =
        searchMap.province_city_district == undefined
            ? undefined
            : searchMap.province_city_district.join("_");
    // if (searchMap.province_city_district != undefined) {
    //     searchMap.province = searchMap.province_city_district.split("_")[0];
    //     searchMap.city = searchMap.province_city_district.split("_")[1];
    //     searchMap.district = searchMap.province_city_district.split("_")[2];
    // }
    return searchMap;
}

// const closeForm = () => {
//     return {
//         type: "CUSTOMER_LIST_CLOSEFORM"
//     };
// };

// const closePanel = () => {
//     return {
//         type: "CUSTOMER_LIST_CLOSEPANEL"
//     };
// };

//控制查询显隐
const changeVisible = () => {
    return {
        type: "CUSTOMER_LIST_CHANGEVISIBLE"
    };
};

//保存table已选择行数据
const selectRow = (selectedRows, selectedRowKeys) => {
    return {
        type: "CUSTOMER_LIST_SELECTROW",
        payload: { selectedRows, selectedRowKeys }
    };
};

//控制新增修改表单显隐
const showForm = visible => {
    return fetchData("CUSTOMER_LIST_SHOWFORM", { visible });
};

//删除客户
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

//拼接一个地址
const appendAddressOne = data => {
    data.address =
        String(data.provinceName) +
        String(data.cityName) +
        String(data.districtName) +
        String(data.street);
    return data;
};

//拼接一堆地址
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

//获取数据、基础查询数据、扩展查询数据
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
//获取查询条件初始值
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

//修改客户保存
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

//新增客户保存
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

//展示面板，把点击某个客户的所有值，放在redux中
const showViewForm = (visible, record) => {
    // data.industry = data.industry.id;
    // data.parentId = data.parentId.id;
    // record.industry = {name}
    return fetchData("CUSTOMER_LIST_SHOWVIEWFORM", { visible, record });
};

//获取通过模糊匹配选择list后，点击list获取的工商信息id
// const icbcInfo = IcbcId => {
//     //客户name AJAX请求   获取data数据
//     return dispatch => {
//         dispatch({ type: "CUSTOMER_LIST_ICBCINFO", IcbcId });
//     };
// };

//存放工商信息详细数据
const customerListInfo = (data, viewData, visible, stateIcbc, isClose) => {
    return dispatch => {
        //使用id获取详情发Request

        dispatch({
            type: "CUSTOMER_LIST_ICBCDETAILINFO",
            data: data,
            visible,
            viewData,
            stateIcbc,
            isClose
        });
    };
};

const changeStateFn = visiable => {
    return {
        type: "CUSTOMER_LIST_CHANGESTATEEDIT",
        visiable
    };
};

//控制modal1状态显隐的
const customerModal1Show = visible => {
    return {
        type: "CUSTOMER_LIST_MODALSHOW1",
        visible
    };
};

//关闭modal1
const closeIcbcVisible1 = visible => {
    return {
        type: "CUSTOMER_LIST_MODALCLOSE1",
        visible
    };
};

//点击新建按钮清空viewPanel面板数据
const deletePanel = data => {
    return {
        type: "CUSTOMER_LIST_DELECTVIEWPANEL",
        data
    };
};

//往redux中存基础、扩展查询条件
const saveSearchMap = data => {
    return {
        type: "CUSTOMER_LIST_SEARCHMAP",
        data
    };
};

//往redux中存放编辑新增修改条件
const editCardFn = changeData => {
    return {
        type: "CUSTOMER_LIST_CARDEDITCHANGE",
        data: changeData
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
    deleteData,
    setEnableState,
    getEnumData,
    saveSearchMap,
    editCardFn,
    deletePanel,
    // icbcInfo,
    customerListInfo,
    customerModal1Show,
    changeStateFn
};
