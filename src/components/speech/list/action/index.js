import reqwest from "utils/reqwest";
import { message } from "antd";
//import { speech as url, doc, baseDir } from "api";
//包装发给redux的对象
const fetchData = (type, payload) => {
    return {
        type,
        payload
    };
};

export function speechVisible(visible){
    debugger
    return dispatch => {
        dispatch({
            type: "SPEECH_LIST_EMPTY",
            visible
        });
    };


}
//获取数据、基础查询数据、扩展查询数据
export function getListData(pagination, searchMap){
    return dispatch => {
       // dispatch(fetchData("CLUE_LIST_SAVESEARCHMAP", searchMap));
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
                    fetchData("SPEECH_LIST_GETDATA", {
                        //data: transReceiveData(data),
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
                    fetchData("SPEECH_LIST_GETENUMDATA", {
                        enumData: data.enumData
                    })
                );
            }
        );
    };
};

//显示modal
export function showForm(data) {
    return dispatch => {
        dispatch({ type: "SPEECH_LIST_SHOWFORM", data });
    };
}

//保存已选择的数据
export function selectSpeech(selectedRows, selectedRowKeys) {
    ////debugger;
    return {
        type: "SPEECH_LIST_SELECTCLUE",
        payload: { selectedRows, selectedRowKeys }
    };
}
//点击编辑获取数据
export function edit(edit,show){
    //debugger
    return {
       type: "SPEECH_LIST_EDIT",
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
                     type: "SPEECH_LIST_UPDATELIST",
                     data: transReceiveDataOne(result)
                 });
             }
         );
     };
 }



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
                    type: "SPEECH_CARD_SAVEADD",
                    data:transReceiveDataOne(data)
                });
            }
        );
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
                    fetchData("SPEECH_LIST_GETLISTUPDATE", {
                       data:transReceiveData(data)
                    })
                );
            }
        );
    };
};
//往redux中存放编辑新增修改条件
export function editCardFn(changeData) {
    return {
        type: "SPEECH_LIST_CARDEDITCHANGE",
        changeData
    }
}