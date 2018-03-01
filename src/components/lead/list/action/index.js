import reqwest from "utils/reqwest";
import { message } from "antd";
import { lead as url, doc, baseDir } from "api";
//包装发给redux的对象
const fetchData = (type, payload) => {
    return {
        type,
        payload
    };
};
let changeSearchData = (data) => {
    for (let key in data) {
        if (key == 'isGroup'|| key == 'cannelType'|| key == 'enableState'|| key == 'level'|| key == 'state'|| key == 'type') {
            if(data[key] && data[key].key){
                data[key] = data[key].key
            }
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
    if (searchMap.signTime) {
        searchMap.followTimeStart = searchMap.signTime[0].format('YYYY-MM-DD HH:mm:ss');
        searchMap.followTimeEnd = searchMap.signTime[1].format('YYYY-MM-DD HH:mm:ss');
        searchMap.signTime = undefined;
    }
    if (searchMap.industryId) {
        //debugger
        searchMap.industryId= searchMap.industryId.id; //这会直接影响searchMap里industry的值，所以要先在不改变原先对象的基础上 改变原对象的id  进行原对象inmutable拷贝对象
    }
    if(searchMap.ownerDeptId){
        searchMap.ownerDeptId=searchMap.ownerDeptId.key;
    }
    if(searchMap.ownerUserId){
        searchMap.ownerUserId=searchMap.ownerUserId.id;
    }
    return searchMap;
}

function transDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "-" + month + "-" + day + "   " + hour + ":" + minute + ":" + second;
}

//转换时间对象为字符串格式
const transReceiveData = (data) => {
    for (let i = 0; i < data.data.length; i++) {

        if (data.data[i].createdTime) {
            data.data[i].createdTime = transDate(new Date(data.data[i].createdTime.time))
        }
        if (data.data[i].modifiedTime) {
            data.data[i].modifiedTime = transDate(new Date(data.data[i].modifiedTime.time))
        }
        if (data.data[i].assignTime) {
            data.data[i].assignTime = transDate(new Date(data.data[i].assignTime.time))
        }
    }
    return data;
}

//转换时间对象为字符串格式
const transReceiveDataOne = (data) => {
    
    debugger
    if (data.createdTime) {
        data.createdTime = transDate(new Date(data.createdTime.time))
    }
    if (data.followTime) {
        data.followTime = transDate(new Date(data.followTime.time))
    }
    if (data.assignTime) {
        data.assignTime = transDate(new Date(data.assignTime.time))
    }
    if(data.modifiedTime){
        data.modifiedTime = transDate(new Date(data.modifiedTime.time))
    }
    // if(data.related){
    //     let relate=data.related;
    //     if(relate.bizopps){
    //         let bizopps=relate.bizopps;
    //        if(bizopps.expectSignTime){

    //        }
    //     }
    // }
    return data;
}
//拼接省市县
const appendAddress = data => {
    ////debugger
    let province = data.provinceName;
    let city = data.cityName;
    let distric = data.districtName;
    data.addCity = province + city + distric
    return data;
};

export function closeLeadShow(visible) {
    return {
        type: "CLUE_LIST_CLOSELEADSHOW",
        visible
    };
}

export function assiginLead(visible){
    return {
        type: "CLUE_LIST_ASSIGNLEADSHOW",
        visible
    };

}
export function saveUserCardName(name){
    debugger
	return (dispatch) => {
		dispatch(fetchData("CLUE_LIST_SAVEUSERCARDNAME", name))
	}
};
export function closeUserCard () {
	return (dispatch) => {
		dispatch(fetchData("CLUE_LIST_CLOSEUSERCARD", ))
	}
};


export function assignPeople(pagination,ids,selectedUserRows,searchMap){

    debugger
    return dispatch => {
        reqwest(
            {
                url: url.lead + "/assign",
                method: "POST",
                data: {
                    param: {
                        ids:ids.join(","),
                        id:selectedUserRows[0].id,
                        orgId:selectedUserRows[0].orgId,
                        deptId:selectedUserRows[0].deptId
                    }
                }
            },
            data => {  
                reqwest(
                    {
                        url: url.lead,
                        method: "get",
                        data: {
                            param: {
                                ...pagination,
                                searchMap: transData(searchMap),
                            }
                        }
                    },
                    data => {
                        debugger
                        dispatch(
                            fetchData("CLUE_LIST_GETDATA", {
                                data: transReceiveData(data),
                                pagination
                            })
                        );
                    }
                );
            }
        );
    };
}
//选中人员列表
export function selectUserRow (selectedRows, selectedRowKeys){

	return (dispatch) => {
        debugger
        
		dispatch(fetchData("CLUE_LIST_SELECTUSERROW", { selectedRows, selectedRowKeys }))
	}
};

// 线索分配数据 列表数据
export function assignListData(pagination,name) {
    debugger
    return dispatch => {
        reqwest(
            {
                url: url.lead + "/user/list",
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                     name     
                    }
                }
            },
            data => {  
                debugger
                dispatch(
                    fetchData("CLUE_LIST_ASSIGNLISTDATE", {
                        data: data
                    })
                );
            }
        );
    };
};



//启停用功能 暂时不做
export function setEnableState(ids, state, page, searchMap) {
    return dispatch => {
        reqwest(
            {
                url: url.lead + "/state",
                method: "PUT",
                data: {
                    param: {
                        ids,
                        ...page,
                        searchMap:transData(searchMap),
                        enableState: String(state)
                    }
                }
            },
            dataResult => {
                debugger
                dispatch(
                    fetchData("CLUE_LIST_GETDATA", {
                        data: dataResult,
                        pagination: page
                    })
                );
            }
        );
    };
};


//获取数据、基础查询数据、扩展查询数据
export function getListData(pagination, searchMap,option) {
    debugger
    return dispatch => {
        dispatch(fetchData("CLUE_LIST_SAVESEARCHMAP", searchMap));
       // dispatch(fetchData("CLUE_LIST_SAVESOPTION", option))
        debugger
        reqwest(
            {
                url: url.lead,
                method: "get",
                data: {
                    param: {
                        ...pagination,
                        searchMap: transData(searchMap),
                        option
                    }
                }
            },
            data => {
                debugger
                dispatch(
                    fetchData("CLUE_LIST_GETDATA", {
                        data: transReceiveData(data),
                        pagination
                    })
                );
            }
        );
    };
};

//获取查询条件初始值
export function getEnumData() {
    return dispatch => {
        reqwest(
            {
                url: url.doc,
                method: "get",
                data: {

                }
            },
            data => { //level source
                debugger
                dispatch(
                    fetchData("CLUE_LIST_GETENUMDATA", {
                        enumData: data.enumData
                    })
                );
            }
        );
    };
};


//往redux中存基础、扩展查询条件
export function saveSearchMap(data) {
    debugger
    return {
        type: "CLUE_LIST_SEARCHMAP",
        data
    };
};

//保存已选择的数据
export function selectClue(selectedRows, selectedRowKeys) {
    ////debugger;
    return {
        type: "CLUE_LIST_SELECTCLUE",
        payload: { selectedRows, selectedRowKeys }
    };
}

//删除已选择的线索
export function deleteData(ids, searchMap, pagination) {
    //debugger
    return dispatch => {
        reqwest(
            {
                url: url.lead + "/batch",
                method: "DELETE",
                data: {
                    param: {
                        ids: ids.join(","),
                        ...pagination,
                        searchMap: transData(searchMap)
                    }
                }
            },
            data => {   //返回的是没有删除的data
                // //debugger
                dispatch(
                    fetchData("CLUE_LIST_GETLISTUPDATE", {
                        data: transReceiveData(data)
                    })
                );
            }
        );
    };
};

//控制查询显隐
export function formMore() {
    return {
        type: "CLUE_LIST_CHANGEVISIBLE"
    };
};

//显示modal
export function showForm(data) {
    return dispatch => {
        dispatch({ type: "CLUE_LIST_SHOWFORM", data });
    };
}

//点击编辑获取数据
export function edit(edit, show) {
    debugger
    return {
        type: "CLUE_LIST_EDIT",
        edit,
        show
    }
}


//编辑已选择（确定按钮）
let onEdit=(values,dispatch)=>{
    debugger
        reqwest(
            {
                url: url.lead + "/" + values.id,
                method: "PUT",
                data: {
                    param: values
                }
            },
            result => {
                debugger
                dispatch({
                    type: "CLUE_LIST_UPDATELIST",
                    data: transReceiveDataOne(result)
                });
            }
        );
}

//点击新建按钮清空数据
export function addClue(data) {
    // //debugger
    return dispatch => {
        dispatch({
            type: "CLUE_LIST_EMPTY",
            data
        });
    };
};

//保存新增联系人
let onSave=(oneData,dispatch)=>{
    
        reqwest(
            {
                url: url.lead,
                method: "POST",
                data: {
                    param: oneData
                }
            },
            data => {
                debugger;
                dispatch({
                    type: "CLUE_CARD_SAVEADD",
                    data: transReceiveDataOne(data)
                });
            }
        );
}
//往redux中存放编辑新增修改条件
export function editCardFn(changeData) {
    debugger
    return {
        type: "CLUE_LIST_CARDEDITCHANGE",
        changeData
    }
}
//动态数据
export function getDynamic(id) {
    return dispatch => {
        debugger
        reqwest(
            {
                url: url.lead + "/" + id+'/dynamic',
                method: "GET",
                data: {
                }
            },
            data => {
                debugger
                dispatch({
                    type: "CLUE_LIST_GETDYNAMIC",
                    data: data && data.dynamiclist?data.dynamiclist:[]
                });

            }
        );
    };

}
//详情展示面板，把点击某个客户的所有值，放在redux中
export function showViewForm(visible, id) {
    return dispatch => {
        //debugger
        reqwest(
            {
                url: url.lead + "/" + id,
                method: "GET",
                data: {
                }
            },
            result => {
                debugger
                dispatch({
                    type: "CLUE_LIST_SHOWVIEWFORM",
                    visible,
                    data: transReceiveDataOne(result.data)
                });

            }
        );
    };
};

//详情页编辑 
export function showFormEdit(visible){
    return{
        type:'CLUE_DETAILLIST_SHOWEDITFORM',
        visible
    }
}



export function hideViewForm(visible) {
    return fetchData("CLUE_LIST_HIDEVIEWFORM", { visible });
};


//根据名称获取行业id,返回promise
let getIndustry = (industry)=>{
    return new Promise(function(resolve, reject) {
        
        reqwest(
            {
                url: baseDir + 'base/industrys/list',
                method: "GET",
                data: {
                    param: {
                        searchMap:{
                            searchKey:industry
                        }
                    }
                }
            },
            indastry => {
                
                resolve(indastry)
            }
        );
    });
}

//新增、修改客户保存,行业处理 
export function listFormSave(data) {
    
  //  data = trancFn(data);
 
    return dispatch => {
       debugger
        if(data.industryId && data.industryId.name && (!data.industryId.id)){
            getIndustry(data.industryId.name).then((industryId)=>{
                
                if(industryId && industryId.data.length){
                    data.industryId = industryId.data[0].id;
                }else{
                    data.industryId = 'undefined'
                }
                //然后再发送编辑Request请求
                //如果!data.id存在代表是新增
                debugger
                if(!data.id){
                    onSave(data,dispatch)
                }else{
                    onEdit(data,dispatch)
                } 
            })
        }else{
            //有行业id没有行业name
            //debugger
            if( data.industryId&& (!data.industryId.name) && data.industryId.id){
                data.industryId = data.industryId.id
            //都有的情况下只获取行业id    
            }else if(data.industryId&& data.industryId.name && data.industryId.id){
                data.industryId = data.industryId.id
            //都没有获取undefined    
            }else{
                data.industryId= 'undefined'
            }
            //然后再发送编辑Request请求
            //如果!data.id存在代表是新增
            // debugger
            if(!data.id){
                debugger
                onSave(data,dispatch)
            }else{
                onEdit(data,dispatch)
            }
        }
    };
};


//-------导入导出 1.30号 余春梅
export function viewLeadShow(leadVisible) {
    debugger
    return {
        type: "CLUE_LIST_VIEWLEADSHOW",
        payload: { leadVisible }
    };
}

export function leadShow(leadVisible) {
    return {
        type: "CLUE_LIST_LEADSHOW",
        payload: { leadVisible }
    };
};

export function leadEndShow(leadVisible) {
    return {
        type: "CLUE_LIST_LEADENDSHOW",
        payload: { leadVisible }
    };
};
export function leadEndView(leadVisible, leadStep) {
    
    return {
        type: "CLUE_LIST_LEADENDVIEW",
        payload: { leadVisible, leadStep }
    };

}
export function changeStep(leadStep) {
   // debugger
    return {
        type: "CLUE_LIST_CHANGESTEP",
        payload: {leadStep }
    };

}
export function leadEndIngShow(leadVisible) {
    return {
        type: "CLUE_LIST_LEADINGSHOW",
        payload: { leadVisible }
    };
}

export function saveFiles(files) {
    
    return {
        type: "CLUE_LIST_SAVEFILES",
        payload: { files }
    };
}
export function fileSuccess(filesSuccess, result, show, leadStep) {
    return {
        type: "CLUE_LIST_FILESUCCESS",
        payload: { filesSuccess, result, show, leadStep }
    };
}
export function fileFail(filesFail) {
    return {
        type: "CLUE_LIST_FILEFAIL",
        payload: { filesFail }
    };
}