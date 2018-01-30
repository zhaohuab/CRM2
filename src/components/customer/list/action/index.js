import reqwest from "utils/reqwest";
import { message } from "antd";
import { cum as url, doc, baseDir, oppstage, opportunity, contacts } from "api";


//包装发给redux的对象
export function fetchData(type, payload) {
    return {
        type,
        payload
    };
};

let changeSearchData = (data) => {
    for (let key in data) {
        if (key == 'isGroup' && data[key] || key == 'cannelType' && data[key] || key == 'enableState' && data[key] || key == 'level' && data[key] || key == 'state' && data[key] || key == 'type' && data[key]) {
            data[key] = data[key].key
        }
        if (key == 'province_city_district' && data[key]) {
            data.province = data[key][0];
            data.city = data[key][1];
            data.district = data[key][2];
            delete data.province_city_district;
        }
        if (key == 'industry' && data[key]) {
            data[key] = data[key].id; //这会直接影响searchMap里industry的值，所以要先在不改变原先对象的基础上 改变原对象的id  进行原对象inmutable拷贝对象
        }
    }
    return data

}
//遍历表单更改为可传数据
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

//-------导入导出
export function viewLeadShow(leadVisible) {
    debugger
    return {
        type: "CUSTOMER_LIST_VIEWLEADSHOW",
        payload: { leadVisible }
    };
}

export function leadShow(leadVisible) {
    return {
        type: "CUSTOMER_LIST_LEADSHOW",
        payload: { leadVisible }
    };
};

export function leadEndShow(leadVisible) {
    return {
        type: "CUSTOMER_LIST_LEADENDSHOW",
        payload: { leadVisible }
    };
};
export function leadEndView(leadVisible, leadStep) {
    debugger
    return {
        type: "CUSTOMER_LIST_LEADENDVIEW",
        payload: { leadVisible, leadStep }
    };

}
export function leadEndIngShow(leadVisible) {
    return {
        type: "CUSTOMER_LIST_LEADINGSHOW",
        payload: { leadVisible }
    };
}

export function saveFiles(files) {
    debugger
    return {
        type: "CUSTOMER_LIST_SAVEFILES",
        payload: { files }
    };
}
export function fileSuccess(file) {
    
    return {
        type: "CUSTOMER_LIST_FILESUCCESS",
        payload: file,
    };
}
export function fileFail(filesFail) {
    return {
        type: "CUSTOMER_LIST_FILEFAIL",
        payload: { filesFail }
    };
}


//控制查询显隐
export function changeVisible() {
    return {
        type: "CUSTOMERCOMPANY_LIST_CHANGEVISIBLE"
    };
};

//保存table已选择行数据
export function selectedRowKeys(selectedRowKeys) {
    return {
        type: "CUSTOMERCOMPANY_LIST_SELECTROW",
        payload: { selectedRowKeys }
    };
};

//控制新增修改表单显隐
export function showForm(visible) {
    return fetchData("CUSTOMERCOMPANY_LIST_SHOWFORM", { visible });
};

//删除客户
export function deleteData(ids, searchMap, pagination) {
    //debugger
    return dispatch => {
        reqwest(
            {
                url: url.customer + "/batch",
                method: "DELETE",
                data: {
                    param: {
                        ids: ids.join(","),
                        ...pagination,
                        searchMap: changeSearchData(searchMap)
                    }
                }
            },
            data => {
                // debugger
                dispatch(
                    fetchData("CUSTOMERCOMPANY_LIST_DELETE", {
                        data: data
                    })
                );
            }
        );
    };
};
//启停用功能
export function setEnableState(ids, state, page, searchMap) {
    return dispatch => {
        reqwest(
            {
                url: url.customer + "/state",
                method: "PUT",
                data: {
                    param: {
                        ids,
                        ...page,
                        searchMap: changeSearchData(searchMap),
                        enableState: String(state)
                    }
                }
            },
            dataResult => {
                dispatch(
                    fetchData("CUSTOMERCOMPANY_LIST_GETDATA", {
                        data: dataResult,
                        pagination: page
                    })
                );
            }
        );
    };
};

//详情器停用
export function setDetailEnableState(ids, state, page, searchMap) {
    debugger
    return dispatch => {
        reqwest(
            {
                url: url.customer + "/state",
                method: "PUT",
                data: {
                    param: {
                        ids,
                        ...page,
                        searchMap: changeSearchData(searchMap),
                        enableState: String(state)
                    }
                }
            },
            dataResult => {
                debugger
                dispatch({
                    type: "CUSTOMERCOMPANY_LIST_DETAILENABLESTATE",
                    data: dataResult,
                    pagination: page,
                    state
                });
            }
        );
    };
};

//拼接一堆地址
export function appendAddress(data) {
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
export function getListData(pagination, searchMap) {
    debugger
    return dispatch => {
        dispatch(fetchData("CUSTOMERCOMPANY_LIST_SAVESEARCHMAP", searchMap));
        debugger
        reqwest(
            {
                url: url.customer,
                method: "get",
                data: {
                    param: {
                        ...pagination,
                        searchMap: changeSearchData(searchMap)
                    }
                }
            },
            data => {
                debugger
                dispatch(
                    fetchData("CUSTOMERCOMPANY_LIST_GETDATA", {
                        data: data,
                        pagination
                    })
                );
            }
        );
    };
};

//获取查询条件初始值
export function getEnumData() {
    debugger
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
                debugger
                dispatch(
                    fetchData("CUSTOMERCOMPANY_LIST_GETENUMDATA", {
                        enumData: data.enumData
                    })
                );
            }
        );
    };
};

//修改客户保存
export function listEditSave(data) {
    return dispatch => {
        reqwest(
            {
                url: url.customer + "/" + data.id,
                method: "put",
                data: {
                    param: changeSearchData(data)
                }
            },
            data => {
                dispatch({
                    type: "CUSTOMERCOMPANY_LIST_EDITSAVE",
                    data
                });
            }
        );
    };
};

//新增客户保存
export function listAddSave(data, newTypeId) {
    data.biztypeId = newTypeId
    debugger
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
                debugger
                dispatch({
                    type: "CUSTOMERCOMPANY_LIST_ADDSAVE",
                    data
                });
            }
        );
    };
};

//展示面板，把点击某个客户的所有值，放在redux中
export function showViewForm(visible, id) {
    debugger
    return dispatch => {
        reqwest(
            {
                url: url.customer + "/" + id,
                method: "GET"
            },
            data => {
                debugger
                reqwest(
                    {
                        url: baseDir + `cum/customers/${id}/isfollow`,
                        method: "GET"
                    },
                    state => {
                        dispatch({
                            type: "CUSTOMERCOMPANY_LIST_SHOWVIEWFORM",
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

export function hideViewForm(visiable) {
    return fetchData("CUSTOMERCOMPANY_LIST_HIDEVIEWFORM", { visiable });
};

//客户升级
export function cumUpgrade(id) {
    debugger
    return dispatch => {
        reqwest(
            {
                url: baseDir + `/cum/customers/${id}/submit`,
                method: "POST"
            },
            data => {
                debugger
                reqwest(
                    {
                        url: baseDir + 'cum/customers/rel',
                        method: "GET",
                        data: {
                            param: {
                                pageSize: 50,
                                page: 1,
                                searchMap: {
                                    cumId: id
                                }
                            }
                        }
                    },
                    result => {
                        debugger
                        dispatch({
                            type: 'CUSTOMERCOMPANY_VIEWPANEL_PANELLEFT_LIST',
                            index: 2,
                            data: result.data
                        });
                    }
                );
            }
        );
    };
}


/**
 * 
 * @param {*} data 存放工商信息详细数据
 * @param {*} viewData  存储表单数据
 * @param {*} visiable 显示modal
 */

export function customerListInfo(data, visiable) {
    debugger
    return {
        type: "CUSTOMERCOMPANY_LIST_ICBCDETAILINFO",
        data,
        visiable
    };
};

//在新增时保存客户工商名称，工商详情的时候,保存名字
export function saveIcbcName(viewData, visiable) {
    debugger
    return {
        type: 'CUSTOMERCOMPANY_LIST_SAVEICBCNAME',
        viewData,
        visiable
    }
}
//在新增时关闭工商详情
export function saveIcbcNameCancel(visiable) {
    return {
        type: 'CUSTOMERCOMPANY_LIST_SAVEICBCNAMECANCEL',
        visiable
    }
}


//保存工商核实详情数据
export function icbcDetailInfo(data, visiable) {
    debugger
    return {
        type: "CUSTOMERCOMPANY_LIST_ICBCINFODETAIL",
        data,
        visiable
    };
};

export function changeStateFn(visiable) {
    return {
        type: "CUSTOMERCOMPANY_LIST_CHANGESTATEEDIT",
        visiable
    };
};
//详情中工商核实
export function checkedFn(viewData, select, id, visiable) {
    debugger
    return dispatch => {
        reqwest(
            {
                url: baseDir + `cum/customers/${id}/identifications`,
                method: "PUT",
                data: {
                    param: {
                        status: "Y",
                        companyid: select.companyid,
                        verifyFullname: select.companyname,
                        data: viewData
                    }
                }
            },
            result => {
                debugger
                // reqwest(
                //     {
                //         url: url.customer + "/" + id,
                //         method: "put",
                //         data: {
                //             param: viewData
                //         }
                //     },
                //     data => {
                //         debugger
                //          dispatch({
                //             type: "CUSTOMER_LIST_CLEANSELECT",
                //             data,
                //             visiable
                //         });
                //     }
                // );
            }
        );
    };
};
//详情中取消工商核实
export function checkedCancelFn(id, visiable) {
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
                debugger
                dispatch({
                    type: "CUSTOMERCOMPANY_LIST_CLEANVERIFYID",
                    visiable
                });
            }
        );
    };
};

export function hasIcbc(verifyId, visiable) {
    return dispatch => {
        debugger
        reqwest(
            {
                url: baseDir + "cum/customers/identifications/" + verifyId,
                method: "GET"
            },
            result => {
                debugger
                dispatch({
                    type: "CUSTOMERCOMPANY_LIST_ICBCDETAILMODAL",
                    visiable,
                    data: result.data,
                });

            }
        );
    }
}

//详情中工商核实详情modal
// export function icbcDetailModal(icbcInfo1,visiable){
//     return {
//         type: "CUSTOMER_LIST_ICBCDETAILMODAL",
//         visiable
//     }
// }



//点击关注按钮
export function attentionFn(id, state) {
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
                    type: "CUSTOMERCOMPANY_LIST_FOLLOWSTATECHANGE",
                    state
                });
            }
        );
    };
};

//控制modal2状态显隐的
export function modalDetalVisiable(visiable, verifyId) {
    return dispatch => {
        reqwest(
            {
                url: baseDir + "cum/customers/identifications/" + verifyId,
                method: "GET"
            },
            result => {
                dispatch({
                    type: "CUSTOMERCOMPANY_LIST_MODALDETALSHOW",
                    visiable,
                    data: result.data
                });
            }
        );
    };
};

export function modalDetalVisiableFalse(visiable) {
    return {
        type: "CUSTOMERCOMPANY_LIST_MODALDETALHIDE",
        visiable
    };
};

//控制modal1状态显隐的
export function customerModal1Show(visible) {
    return {
        type: "CUSTOMERCOMPANY_LIST_MODALSHOW1",
        visible
    };
};

//关闭modal1
export function closeIcbcVisible1(visible) {
    return {
        type: "CUSTOMERCOMPANY_LIST_MODALCLOSE1",
        visible
    };
};

//点击新建按钮清空viewPanel面板数据
export function addCustomer(data, typeId) {
    return dispatch => {
        dispatch({
            type: "CUSTOMERCOMPANY_LIST_ADDCUSTOMER",
            data,
            typeId
        });
    };
};


//点击新增按钮获取业务类型
export function addNewType() {
    return dispatch => {
        debugger
        reqwest(
            {
                url: baseDir + 'cum/customers/roles/biztypes',
                method: "GET",
            },
            result => {
                debugger
                dispatch({
                    type: "CUSTOMERCOMPANY_LIST_NEWEDITTYPE",
                    typeItem: result.biztypeList,
                });
            }
        );
    };
}

//往redux中存基础、扩展查询条件
export function saveSearchMap(data) {
    return {
        type: "CUSTOMERCOMPANY_LIST_SEARCHMAP",
        data
    };
};

//往redux中存放编辑新增修改条件
export function editCardFn(changeData) {
    return {
        type: "CUSTOMERCOMPANY_LIST_CARDEDITCHANGE",
        data: changeData
    };
};

//点击分配改变负责人信息
export function assignChangeViewData(viewData) {
    return {
        type: "CUSTOMERCOMPANY_VIEWPANEL_ASSIGN_CHANGEVIEWPANEL",
        viewData
    }
}

//点击获取右侧面板相关list
export function getRightPaneltList(id, JoinPagination, index) {
    return dispatch => {
        reqwest(
            {
                url: baseDir + 'cum/customer/relusers',
                method: "GET",
                data: {
                    param: {
                        ...JoinPagination,
                        searchMap: {
                            cumId: id
                        }
                    }
                }
            },
            result => {
                ;
                dispatch({
                    type: "CUSTOMERCOMPANY_VIEWPANEL_PANELRIGHT_LIST",
                    data: result,
                    index
                });
            }
        );
    };
}
//改变详情面板点击左侧tab时切换index
export function changeLeftPanel(index) {
    return {
        type: 'CUSTOMERCOMPANY_VIEWPANEL_CHANGEPANELLEFT',
        index
    }
}

//点击获取左侧面板相关list
export function getLeftPaneltList(id, JoinPagination, index) {
    debugger
    return dispatch => {
        reqwest(
            {
                url: baseDir + 'cum/customers/rel',
                method: "GET",
                data: {
                    param: {
                        ...JoinPagination,
                        searchMap: {
                            cumId: id
                        }
                    }
                }
            },
            result => {
                debugger
                dispatch({
                    type: 'CUSTOMERCOMPANY_VIEWPANEL_PANELLEFT_LIST',
                    index,
                    data: result.data
                });
            }
        );
    };
}

//添加参与人
export function setRightPaneltList(data) {
    return {
        type: 'CUSTOMERCOMPANY_VIEWPANEL_PANELLEFT_SETLIST',
        data
    }
}

//删除参与人
export function delRightPaneltList(id) {
    return {
        type: 'CUSTOMERCOMPANY_VIEWPANEL_PANELLEFT_DELLIST',
        id
    }
}

//保存联系人相关对象表单值
export function refContactForm(changeData) {
    return {
        type: "CUSTOMERCOMPANY_VIEWPANEL_PANELLEFT_CONTACTSFORM",
        data: changeData
    };
}

export function refContactFormAdd(data) {
    return {
        type: "CUSTOMERCOMPANY_VIEWPANEL_PANELLEFT_CONTACTSFORMADD",
        data
    };
}

//新增联系人相关对象
export function clearRefContactsForm() {
    return {
        type: "CUSTOMERCOMPANY_VIEWPANEL_PANELLEFT_CLEARCONTACTSFORM",
    };
}


//获取最新商机列表
export function getOppList(JoinPagination, id, index) {
    return dispatch => {
        reqwest(
            {
                url: baseDir + 'cum/customers/rel',
                method: "GET",
                data: {
                    param: {
                        ...JoinPagination,
                        searchMap: {
                            cumId: id
                        }
                    }
                }
            },
            result => {
                ;
                dispatch({
                    type: 'CUSTOMERCOMPANY_VIEWPANEL_PANELLEFT_LIST',
                    data: result.data,
                    index
                });
            }
        );
    };
}

//删除一条商机
export function delOpp(ids, pagination) {
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
                type: 'CUSTOMERCOMPANY_VIEWPANEL_DELOPP',
                ids
            });
        })
    }
}

//删除一条联系人
export function delContacts(id, pagination) {
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
                    type: "CUSTOMERCOMPANY_VIEWPANEL_DELCONTACTS",
                    id
                });
            }
        );
    }
}

//删除某个附件
export function onDeleteFile(file) {
    return (dispatch) => {
        reqwest(
            {
                url: baseDir + `sys/upload/${file.objType}/${file.objId}/${file.name}/${file.id}`,
                method: "DELETE",
            },
            result => {
                dispatch({
                    type: "CUSTOMER_LIST_DELETEFILE",
                    file
                });
            }
        );
    }
}