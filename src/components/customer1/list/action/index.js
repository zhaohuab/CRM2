import reqwest from "utils/reqwest";
import { message } from "antd";
import { cum as url, doc, baseDir } from "api";

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
    let change = searchMap.province_city_district;
    if (change) {
        searchMap.province = change[0];
        searchMap.city = change[1];
        searchMap.district = change[2];
        delete searchMap.province_city_district;
    }
    return searchMap;
}

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
    //debugger
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
                        data: data
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
                        data: dataResult,
                        pagination: page
                    })
                );
            }
        );
    };
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
               //debugger
                dispatch(
                    fetchData("CUSTOMER_LIST_GETDATA", {
                        data: data,
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
    //debugger
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
                dispatch({
                    type: "CUSTOMER_LIST_EDITSAVE",
                    data
                });
            }
        );
    };
};

//新增客户保存
const listAddSave = data => {
    //debugger;
    return dispatch => {
        reqwest(
            {
                url: url.customer,
                method: "POST",
                data: {
                    param: data
                }
            },
            data => {
                //debugger;
                dispatch({
                    type: "CUSTOMER_LIST_ADDSAVE",
                    data
                });
            }
        );
    };
};

//展示面板，把点击某个客户的所有值，放在redux中
const showViewForm = (visible, id) => {
    return dispatch => {
        reqwest(
            {
                url: url.customer + "/" + id,
                method: "GET"
            },
            data => {
                //debugger;
                reqwest(
                    {
                        url: baseDir + `cum/customers/${id}/isfollow`,
                        method: "GET"
                    },
                    state => {
                        dispatch({
                            type: "CUSTOMER_LIST_SHOWVIEWFORM",
                            visible,
                            data,
                            state
                        });
                    }
                );
            }
        );
    };
};

const hideViewForm = visiable => {
    return fetchData("CUSTOMER_LIST_HIDEVIEWFORM", { visiable });
};


//存放工商信息详细数据 viewData, visible, stateIcbc, isClose
const customerListInfo = (data, visible, viewData) => {
    //debugger;
    return dispatch => {
        //使用id获取详情发Request
        //debugger;
        dispatch({
            type: "CUSTOMER_LIST_ICBCDETAILINFO",
            data,
            visible,
            viewData
        });
    };
};

const icbcDetailInfo = (data, id, visiable) => {
    //debugger;
    return {
        type: "CUSTOMER_LIST_ICBCINFODETAIL",
        data,
        id,
        visiable
    };
};

const changeStateFn = visiable => {
    return {
        type: "CUSTOMER_LIST_CHANGESTATEEDIT",
        visiable
    };
};

const checkedFn = (id, visiable, verifyId) => {
    //debugger;
    return dispatch => {
        reqwest(
            {
                url: baseDir + `cum/customers/${id}/identifications`,
                method: "PUT",
                data: {
                    param: {
                        status: "Y",
                        companyid: verifyId
                    }
                }
            },
            result => {
                //debugger;
                dispatch({
                    type: "CUSTOMER_LIST_CLEANSELECT",
                    verifyId,
                    visiable
                });
            }
        );
    };
};

const checkedCancelFn = (id, visiable) => {
    return dispatch => {
        reqwest(
            {
                url: baseDir + `cum/customers/${id}/identifications`,
                method: "PUT",
                data: {
                    param: {
                        status: "N"
                    }
                }
            },
            result => {
                //debugger;
                dispatch({
                    type: "CUSTOMER_LIST_CLEANVERIFYID",
                    visiable
                });
            }
        );
    };
};

//点击关注按钮
const attentionFn = (id, state) => {
    //debugger;
    return dispatch => {
        reqwest(
            {
                url: baseDir + `cum/customers/${id}/follows`,
                method: "PUT",
                data: {
                    param: {
                        followState: state
                    }
                }
            },
            state => {
               // debugger;
                dispatch({
                    //followState
                    type: "CUSTOMER_LIST_FOLLOWSTATECHANGE",
                    state
                });
            }
        );
    };
};

//控制modal2状态显隐的
const modalDetalVisiable = (visiable, verifyId) => {
    //debugger;
    return dispatch => {
        reqwest(
            {
                url: baseDir + "cum/customers/identifications/" + verifyId,
                method: "GET"
            },
            result => {
                //debugger;

                dispatch({
                    type: "CUSTOMER_LIST_MODALDETALSHOW",
                    visiable,
                    data: result.data
                });
            }
        );
    };
};

const modalDetalVisiableFalse = visiable => {
    return {
        type: "CUSTOMER_LIST_MODALDETALHIDE",
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
const addCustomer = data => {
    return dispatch => {
        dispatch({
            type: "CUSTOMER_LIST_ADDCUSTOMER",
            data
        });
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

//点击分配改变负责人信息
const assignChangeViewData = (viewData) =>{
    //debugger
    return{
        type: "CUSTOMER_VIEWPANEL_ASSIGN_CHANGEVIEWPANEL",
        viewData
    }
}

//-------自定义新增模板--------------
const getLayout = (module) => {
    //debugger;
    return dispatch => {
        reqwest(
            {
                url: baseDir + `/*/${module}/templates`,
                method: "GET",
                data:{
                    param:{
                        layoutType:'编辑',
                        biztypeId:11,
                        clientType:'PC端',
                    }
                }
            },
            result => {
                //debugger;
                console.log('result=================',result)
                dispatch({
                    type: "CUSTOMER_CARD_ADD",
                    layoutFilds: result.mainObject
                });
            }
        );
    };
}

//--------------自定义table表头--------------------
const getTitle = (module) => {
    return dispatch => {
        reqwest({
            url:baseDir + `/*/${module}/templates`,
            method:'GET',
            data:{
                param:{
                    biztypeId:11,
                    clientType:'PC端',
                }
            }
        },
        result => {
            dispatch({
                type: "CUSTOMER_GETTITLE_SUCCESS",
                titleList: result.mainObject
            })
        }
        )
    }
}

const getDetailFilds = (module) => {//------------自定义详情模板
    return dispatch => {
        reqwest(
            {
                url: baseDir + `/*/${module}/templates`,
                method: "GET",
                data:{
                    param:{
                        layoutType:'查看',
                        biztypeId:11,
                        clientType:'PC端',
                    }
                }
            },
            result => {
                console.log('result====================',result)
                dispatch({
                    type: "CUSTOMER_GETDETAIL_SUCCESS",
                    detailFilds: result.mainObject,
                    relationObject: result.relationObject,
                });
            }
        );
    };
}

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
    addCustomer,
    // icbcInfo,
    customerListInfo,
    customerModal1Show,
    changeStateFn,
    hideViewForm,
    icbcDetailInfo,
    modalDetalVisiable,
    checkedFn,
    checkedCancelFn,
    modalDetalVisiableFalse,
    closeIcbcVisible1,
    attentionFn,
    assignChangeViewData,
    getLayout,
    getTitle,
    getDetailFilds,
};

//
