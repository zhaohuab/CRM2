import reqwest from "utils/reqwest";
import { message } from "antd";
import { cum as url, doc, baseDir,oppstage ,opportunity,contacts} from "api";

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
                ;
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
    ;
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
                ;
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
                ;
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
    ;
    return dispatch => {
        //使用id获取详情发Request
        ;
        dispatch({
            type: "CUSTOMER_LIST_ICBCDETAILINFO",
            data,
            visible,
            viewData
        });
    };
};

const icbcDetailInfo = (data, id, visiable) => {
    ;
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
    ;
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
                ;
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
                ;
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
    ;
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
                ;
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
    ;
    return dispatch => {
        reqwest(
            {
                url: baseDir + "cum/customers/identifications/" + verifyId,
                method: "GET"
            },
            result => {
                ;

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
    
    return{
        type: "CUSTOMER_VIEWPANEL_ASSIGN_CHANGEVIEWPANEL",
        viewData
    }
}

//点击获取右侧面板相关list
const getRightPaneltList = (id,JoinPagination,index) =>{
    
    return dispatch => {
        reqwest(
            {
                url: baseDir + 'cum/customer/relusers',
                method: "GET",
                data: {
                    param: {
                        ...JoinPagination,
                        searchMap:{
                            cumId:id
                        } 
                    }
                }
            },
            result => {
                ;
                dispatch({
                    type: "CUSTOMER_VIEWPANEL_PANELRIGHT_LIST",
                    data: result,
                    index
                });
            }
        );
    };
}
//改变详情面板点击左侧tab时切换index
const changeLeftPanel = (index)=>{
    return{
        type:'CUSTOMER_VIEWPANEL_CHANGEPANELLEFT',
        index
    }
}

//点击获取左侧面板相关list
const getLeftPaneltList = (id,JoinPagination,index)=>{
    
    return dispatch => {
        reqwest(
            {
                url: baseDir + 'cum/customers/rel',
                method: "GET",
                data: {
                    param: {
                        ...JoinPagination,
                        searchMap:{
                            cumId:id
                        } 
                    }
                }
            },
            result => {
                ;
                dispatch({
                    type:'CUSTOMER_VIEWPANEL_PANELLEFT_LIST',
                    index,
                    data:result.data
                });
            }
        );
    };
}

//添加参与人
const setRightPaneltList = (data)=>{
    return{
        type:'CUSTOMER_VIEWPANEL_PANELLEFT_SETLIST',
        data
    }
}

//删除参与人
const delRightPaneltList = (id)=>{
    
    return{
        type:'CUSTOMER_VIEWPANEL_PANELLEFT_DELLIST',
        id
    }
}

//保存联系人相关对象表单值
const refContactForm = (changeData)=>{
    debugger
    return {
        type: "CUSTOMER_VIEWPANEL_PANELLEFT_CONTACTSFORM",
        data: changeData
    };
}

const refContactFormAdd = (data)=>{
    debugger
    return {
        type: "CUSTOMER_VIEWPANEL_PANELLEFT_CONTACTSFORMADD",
        data
    };
}

//新增联系人相关对象
const clearRefContactsForm = ()=>{
    debugger
    return {
        type: "CUSTOMER_VIEWPANEL_PANELLEFT_CLEARCONTACTSFORM",
    };
}


//获取最新商机列表
const getOppList = (JoinPagination,id,index)=>{
    
    return dispatch => {
        reqwest(
            {
                url: baseDir + 'cum/customers/rel',
                method: "GET",
                data: {
                    param: {
                        ...JoinPagination,
                        searchMap:{
                            cumId:id
                        } 
                    }
                }
            },
            result => {
                ;
                dispatch({
                    type:'CUSTOMER_VIEWPANEL_PANELLEFT_LIST',
                    data:result.data,
                    index
                });
            }
        );
    };
}

//删除一条商机
const delOpp = (ids,pagination)=>{
    
    return (dispatch) => {
        reqwest({
            url: opportunity.opportunity + '/batch',
            method: "DELETE",
            data: {
                param: {
                    ids,
                    ...pagination,
                    searchMap: {}
                },
            }
        }, (data) => {
            
            dispatch({
                type:'CUSTOMER_VIEWPANEL_DELOPP',
                ids
            });
        })
    }
}

//删除一条联系人
const delContacts = (id,pagination)=>{
    
    return (dispatch) => {
        reqwest(
            {
                url: `${contacts.contacts}/batch`,
                method: "DELETE",
                data: {
                    param: {
                        ...pagination,
                        searchMap: {},
                        ids: id
                    }
                }
            },
            result => {
                
                dispatch({
                    type: "CUSTOMER_VIEWPANEL_DELCONTACTS",
                    id
                });
            }
        );
    }
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
    getRightPaneltList,
    getLeftPaneltList,
    setRightPaneltList,
    delRightPaneltList,
    changeLeftPanel,
    refContactForm,
    refContactFormAdd,
    clearRefContactsForm,
    getOppList,
    delOpp,
    delContacts
};
