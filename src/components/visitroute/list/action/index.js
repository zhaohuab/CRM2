import reqwest from "utils/reqwest";
import { visitRouter } from "api";

//获取数据，第一加载，及分页获取
export function getVisitrouteList(pagination, searchMap) {
    return dispatch => {
        dispatch({ type: "VISITROUTE_LIST_GETLISTSUCCESS" });
        reqwest(
            {
                url: visitRouter.visit,
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                        searchMap: {
                            enableState: searchMap.enableState
                        }
                    }
                }
            },
            result => {
                dispatch({ type: "VISITROUTE_LIST_GETLIST", data: result });
            }
        );
    };
}

//显示modal
export function showForm(data) {
    return dispatch => {
        dispatch({ type: "VISITROUTE_LIST_SHOWFORM", data });
    };
}

//新增数据
export function cardSaved(values, pagination, searchMap) {
    return dispatch => {
        reqwest(
            {
                url: visitRouter.visit,
                method: "POST",
                data: {
                    param: {
                        ...values
                    }
                }
            },
            result => {
                dispatch({ type: "VISITROUTE_LIST_ADDLIST", data: result });
            }
        );
    };
}

//保存已选择数据

export function selectData(data) {
    return {
        type: "VISITROUTE_LIST_SELECTDATA",
        data
    };
}

//删除已选择数据

export function onDelete(selectedRowKeys, pagination, searchMap) {
    return dispatch => {
        reqwest(
            {
                url: `${visitRouter.visit}/batch`,
                method: "DELETE",
                data: {
                    param: {
                        ...pagination,
                        searchMap: {
                            enableState: searchMap.enableState
                        },
                        ids: selectedRowKeys.join(",")
                    }
                }
            },
            result => {
                dispatch({
                    type: "VISITROUTE_LIST_DELETELIST",
                    data: result,
                    del: selectedRowKeys
                });
            }
        );
    };
}
//编辑一条数据
export function onEdit(values, pagination, searchMa) {
    return dispatch => {
        reqwest(
            {
                url: `${visitRouter.visit}/${values.id}`,
                method: "PUT",
                data: {
                    param: {
                        ...values
                    }
                }
            },
            result => {
                dispatch({
                    type: "VISITROUTE_LIST_UPDATELIST",
                    data: result
                });
            }
        );
    };
}
