import reqwest from 'utils/reqwest'
import { message } from 'antd';
import { quartz as url, doc, baseDir } from "api";


const fetchData = (type, payload) => {
    return {
        type,
        payload
    }
}

const pagination = {//分页信息
    pageSize: 20,
    page: 1
}


//获取数据
// const hostIp = '10.11.112.22';
// const hostPort = '8081';
const searchMap = { groupid: '', searchKey: '' };

//控制表单显隐
const showForm = visible => {
    debugger
    return dispatch => {
        dispatch(
            fetchData("QUARTZLIST_SHOWFORM", { visible })
        );
    };

};
const showTask= visible => {
    debugger
    return dispatch => {
        dispatch(
            fetchData("QUARTZLIST_SHOWTASK", { visible })
        );
    };

};
const showOver=visible => {
    debugger
    return dispatch => {
        dispatch(
            fetchData("QUARTZLIST_SHOWOVER", { visible })
        );
    };

};

//获取任务分组
const getTaskgroups = (pagination) => {
    debugger

    return (dispatch) => {
        reqwest({
            url: url.taskgroup,
            method: 'get',
            data: {
                param: {
                    ...pagination
                }
            }
        },
            data => {
                debugger
                dispatch(
                    fetchData("QUARTZ_LIST_GETDATA", {
                        data: data.taskGroupList,
                        pagination
                    })
                );
            }
        );
    };
};

//点击新建按钮清空面板数据
const addTask = (visible) => {
    debugger
    return dispatch => {
        dispatch(
            fetchData("QUARTZ_LIST_ADDTASK", {
                visible
            })
        );
    };
}
//浏览获取数据
const onView = (record, id,visible) => {
    debugger
    return dispatch => {
        dispatch(
            fetchData('QUARTZ_LIST_ONVIEW', {record,visible})
        );
    };

}
const onOver = (record, id,visible) => {
    debugger
    return dispatch => {
        dispatch(
            fetchData('QUARTZ_LIST_ONOVER', {record,visible})
        );
    };

}

//新建任务点击确定按钮
const onAdd = (value, visible) => {
    debugger
    if (value.taskName.groupid) {
        value.groupid = value.taskName.groupid
        delete value.taskName
    }

    return (dispatch) => {
        debugger
        reqwest({
            url: url.quartz,
            method: 'post',
            data: { param: { ...value } }
        },
            data => {
                debugger
                dispatch(
                    fetchData("QUARTZ_LIST_ONEDATA", {
                        data: data,
                        visible,
                        pagination
                    })
                );
            }
        );
    };
};

//新建分组点击确定按钮
const onAddTaskGroup = (value) => {
    debugger
    return (dispatch) => {
        debugger
        reqwest({
            url: url.taskgroup,
            method: 'post',
            data: {
                param: value

            }
        },
            data => {
                debugger
                dispatch(
                    fetchData("QUARTZ_TASKGROUPS_GETDATA_SUCCESS", {
                        data
                    })
                );
            }
        );
    };
};

//点击一个任务显示列表，或者搜索字段
const onSearchGroup = (id, name, pagination) => {
    debugger
    let searchMap = {};
    if (id != '') {
        searchMap.groupid = id;
        searchMap.searchKey = '';
    }
    else { searchMap.searchKey = name };
    return (dispatch) => {
        debugger
        reqwest({
            url: url.quartz,
            method: 'get',
            data: {
                param: {
                    ...pagination,
                    searchMap: searchMap
                }
            }
        },
            data => {
                debugger
                dispatch(
                    fetchData("QUARTZ_LIST_GETDATA_SUCCESS", {
                        data: data,
                        pagination
                    })
                );
            }
        );
    };
};

//获取右侧列表数据
const getListData = (pagination) => {

    // debugger
    return (dispatch) => {
        reqwest({
            url: url.quartz,
            method: 'get',
            data: {
                param: {
                    ...pagination,
                }
            }
        }, data => {
            debugger
            dispatch(
                fetchData("QUARTZ_LIST_GETDATA_SUCCESS", {
                    data: data,
                    pagination
                })
            );
        }
        )
    }
}

//删除
const onDelete = (data) => {
    debugger
    return (dispatch) => {
        reqwest({
            url: url.quartz + '/' + data.id,
            method: 'delete',
            data: {
                param: {
                    ids: data.id,
                    ...pagination,
                }
            }
        },
            data => {
                debugger
                dispatch(
                    fetchData('QUARTZ_LIST_DELETE', { data: data })
                );
            }
        );
    };
}


//编辑任务列表
const onEdit = (values,visible) => {
    debugger
    return (dispatch) => {
        reqwest({
            url: url.quartz + '/' + values.id,
            method: 'put',
            data: {
                param: {
                    ...values,
                    ...pagination,
                }
            }
        },
            data => {
                debugger
                dispatch(
                    fetchData('QUARTZ_LIST_EDITDATA', { data: data,visible})
                );
            }
        );
    };
}

//停启用 
const onOpen = (record) => {
    debugger
    return (dispatch) => {
        reqwest({
            url: url.quartz + '/' + record.id + '/state',
            method: 'put',
            data: {
                param: {
                    enableStatus: record.enableStatus,
                    ...pagination
                }
            }
        },
            data => {
                debugger
                dispatch(
                    fetchData('QUARTZ_LIST_OPEN', { data: data })
                );
            }
        );
    };
}
//执行
const onExecute = (record) => {
    debugger
    return (dispatch) => {
        reqwest({
            url: url.quartz + '/' + record.id + '/triggerJob',
            method: 'put',
            data: {
                param: {
                    enableStatus: record.enableStatus,
                    ...pagination,
                }
            }
        },

            data => {
                debugger
                dispatch(
                    fetchData('QUARTZ_LIST_EXECUTE', { data: data })
                );
            }
        );
    }
};

//往redux中存放编辑新增修改条件
const editCardFn = (changeData) => {
    return {
        type: "QUARTZ_LIST_CARDEDITCHANGE",
        changeData
    }
}

export {
    getTaskgroups,
    onAdd,
    showForm,
    onAddTaskGroup,
    onSearchGroup,
    getListData,
    onDelete,
    onEdit,
    onOpen,
    onExecute,
    editCardFn,
    addTask,
    onView,
    onOver,
    showTask,
    showOver
}