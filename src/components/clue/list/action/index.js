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



//获取数据、基础查询数据、扩展查询数据
export function getListData(pagination, searchMap){
    return dispatch => {
        dispatch(fetchData("CLUE_LIST_SAVESEARCHMAP", searchMap));
        debugger
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
               debugger
                dispatch(
                    fetchData("CLUE_LIST_GETDATA", {
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
export function saveSearchMap(data){
    return {
        type: "CLUE_LIST_SEARCHMAP",
        data
    };
};

//保存已选择的数据
export function selectClue(selectedRows, selectedRowKeys) {
    //debugger;
    return {
        type: "CLUE_LIST_SELECTCLUE",
        payload: { selectedRows, selectedRowKeys }
    };
}

//删除已选择的线索
export function  deleteData(ids, searchMap, pagination) {
    debugger
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
                console.log(1111)
               // debugger
                dispatch(
                    fetchData("CLUE_LIST_GETLISTUPDATE", {
                       data:data
                    })
                );
            }
        );
    };
};

//控制查询显隐
export function changeVisible(){
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


//编辑已选择
export function onEdit(values, pagination, searchMa) {

   debugger
    return dispatch => {
        reqwest(
            {
                url:url.lead + "/" + values.id,
                method: "PUT",
                data: {
                    param: {
                        ...values
                    }
                }
            },
            result => {
                debugger
                dispatch({
                    type: "CLUE_LIST_UPDATELIST",
                    data: result
                });
            }
        );
    };
}
// //编辑已选择
// export function onEdit(values) {
//     return dispatch => {
//         dispatch({
//             type: "CLUE_LIST_UPDATELIST",
//             data: values
//         });
//     }
// }




//点击新建按钮清空数据
export function addClue(data){
   // debugger
    return dispatch => {
        dispatch({
            type: "CLUE_LIST_EMPTY",
            data
        });
    };
};



//保存新增联系人????有问题
export function cardSaved(oneData) {
    debugger;
    // return {
    //     type: "CLUE_CARD_SAVEADD",
    //     oneData
    // }
    //console.log('aaaaa'+url.lead)
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
                debugger;
                dispatch({
                    type: "CLUE_CARD_SAVEADD",
                    data
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
         debugger
        reqwest(
            {
                url: url.lead + "/" + id,
                method: "GET"
            },
            data => {
                debugger
                        dispatch({
                            type: "CLUE_LIST_SHOWVIEWFORM",
                            visible,
                            data,
                        });
       
            }
        );
    };
};

export function hideViewForm(visible) {
    return fetchData("CLUE_LIST_HIDEVIEWFORM", {visible});
};