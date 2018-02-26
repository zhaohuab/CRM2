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
        if (data.data[i].followTime) {
            data.data[i].followTime = transDate(new Date(data.data[i].followTime.time))
        }
    }
    return data;
}

//转换时间对象为字符串格式
const transReceiveDataOne = (data) => {
    if (data.createdTime) {
        data.createdTime = transDate(new Date(data.createdTime.time))
    }
    if (data.followTime) {
        data.followTime = transDate(new Date(data.followTime.time))
    }
    return data;
}
//拼接省市县
const appendAddress = data => {
    ////debugger
    let province=data.provinceName;
    let city=data.cityName;
    let distric=data.districtName;
   data.addCity =province+city+distric  
    return data;
};

//获取数据、基础查询数据、扩展查询数据
export function getListData(pagination, searchMap){
    return dispatch => {
        dispatch(fetchData("CLUE_LIST_SAVESEARCHMAP", searchMap));
        //debugger
        reqwest(
            {
                url: url.lead,
                method: "get",
                data: {
                    param: {
                        ...pagination,
                        searchMap:transData(searchMap)
                    }
                }
            },
            data => {
               //debugger
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
                //debugger
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
export function saveSearchMap(data){
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
export function  deleteData(ids, searchMap, pagination) {
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
                       data:transReceiveData(data)
                    })
                );
            }
        );
    };
};

//控制查询显隐
export function formMore(){
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
export function edit(edit,show){
    //debugger
    return {
       type: "CLUE_LIST_EDIT",
       edit,
       show
}
}


//编辑已选择（确定按钮）
export function onEdit(values) {

   //debugger
    return dispatch => {
        reqwest(
            {
                url:url.lead + "/" + values.id,
                method: "PUT",
                data: {
                  param: transData(values)
                }
            },
            result => {
                //debugger
                dispatch({
                    type: "CLUE_LIST_UPDATELIST",
                    data: transReceiveDataOne(result)
                });
            }
        );
    };
}

//点击新建按钮清空数据
export function addClue(data){
   // //debugger
    return dispatch => {
        dispatch({
            type: "CLUE_LIST_EMPTY",
            data
        });
    };
};

//保存新增联系人
export function onSave(oneData) {
    //debugger;
    return dispatch => {
        reqwest(
            {
                url: url.lead,
                method: "POST",
                data: {
                    param: oneData
                }
            },
            data => {
                //debugger;
                dispatch({
                    type: "CLUE_CARD_SAVEADD",
                    data:transReceiveDataOne(data)
                });
            }
        );
    };

}
//往redux中存放编辑新增修改条件
export function editCardFn(changeData) {
    return {
        type: "CLUE_LIST_CARDEDITCHANGE",
        changeData
    }
}

//展示面板，把点击某个客户的所有值，放在redux中
export function showViewForm(visible, id){
    return dispatch => {
         //debugger
        reqwest(
            {
                url: url.lead + "/" + id,
                method: "GET",
                data: {
                }
            },
            data => {
                //debugger
                        dispatch({
                            type: "CLUE_LIST_SHOWVIEWFORM",
                            visible,
                            data:transReceiveDataOne(appendAddress(data))
                        });
       
            }
        );
    };
};

export function hideViewForm(visible) {
    return fetchData("CLUE_LIST_HIDEVIEWFORM", {visible});
};