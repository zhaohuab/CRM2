import reqwest from "utils/reqwest";
import { message } from "antd";
import { finishtask as url, baseDir } from "api";
//包装发给redux的对象
const fetchData = (type, payload) => {
    return {
        type,
        payload
    };
};

export function workVisible(visible){
    debugger
    return dispatch => {
        dispatch({
            type: "WORK_LIST_EMPTY",
            visible
        });
    };
}

//获取数据、基础查询数据、扩展查询数据
export function getListData(pagination, searchMap){
    debugger
    return dispatch => {
       // dispatch(fetchData("CLUE_LIST_SAVESEARCHMAP", searchMap));
        // debugger
        reqwest(
            {
                url: url.finishtask,
                method: "GET",
                data: {
                    param: {
                        ...pagination
                        // searchMap:searchMap
                    }
                }
            },
            result => {
               debugger
                dispatch(
                    fetchData("WORK_LIST_GETDATA", {
                        data:result,
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
                url: url.finishtask+'/docs',
                method: "GET",
                data: {

                }
            },
            data => { //level source
                debugger
                dispatch(
                    fetchData("WORK_LIST_GETENUMDATA", {
                        enumData: data.enumData.state
                    })
                );
            }
        );
    };
};

//显示modal
export function showForm(data) {
    return dispatch => {
        dispatch({ type: "WORK_LIST_SHOWFORM", data });
    };
}

//保存已选择的数据
export function selectFinishTask(selectedRows, selectedRowKeys) {
    ////debugger;
    return {
        type: "WORK_LIST_SELECTCLUE",
        payload: { selectedRows, selectedRowKeys }
    };
}
//点击编辑获取数据
export function edit(edit,show){
    //debugger
    return {
       type: "WORK_LIST_EDIT",
       edit,
       show
}
}

//编辑已选择（确定按钮）
export function onEdit(values) {

    debugger
     return dispatch => {
         reqwest(
             {
                url: url.finishtask,
                 method: "PUT",
                 data: {
                   param:values
                 }
             },
             result => {
                debugger
                 dispatch({
                     type: "WORK_LIST_UPDATELIST",
                     data: result
                 });
             }
         );
     };
 }



 //保存新增联系人
export function onSave(oneData) {
    debugger;
    return dispatch => {
        reqwest(
            {
                url: url.finishtask,
                method: "POST",
                data: {
                    param: oneData
                }
            },
            data => {
                debugger;
                dispatch({
                    type: "WORK_CARD_SAVEADD",
                    data
                });
            }
        );
     };

}


//删除已选择的线索 ids, searchMap, pagination
export function  deleteData(ids, pagination) {
    //debugger
    return dispatch => {
        reqwest(
            {
                url: url.finishtask,
                method: "DELETE",
                data: {
                    param: {
                        ids: ids.join(","),
                        ...pagination,
                       // searchMap: transData(searchMap)
                    }
                }
            },
            data => {   //返回的是没有删除的data
               // //debugger
                dispatch(
                    fetchData("WORK_LIST_GETLISTUPDATE", {
                       data:data
                    })
                );
            }
        );
    };
};
//往redux中存放编辑新增修改条件
export function editCardFn(changeData) {
    return {
        type: "WORK_LIST_CARDEDITCHANGE",
        changeData
    }
}