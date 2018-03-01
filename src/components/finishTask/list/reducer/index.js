import Immutable from "immutable";
import { pageAdd, pageEdit } from 'utils/busipub'

let $$initialState = {
    pagination: {//分页信息
        pageSize: 10,
        page: 1
    },
    selectedRows: [],
    selectedRowKeys: [],
    modalVisible: false,
    data: [],
    editData: {},
    enumData: []
};


function clearObject(obj) {
    //debugger
    for (let key in obj) {

        obj[key] = undefined
    }
    return obj
}

export default function reducer($$state = Immutable.fromJS($$initialState),
    action) {
    switch (action.type) {
        case "WORK_LIST_VISIBLE": //查询各种table数据
            ////debugger
            return $$state.merge({
                modalVisible: action.visible,
            });
        case "WORK_LIST_GETDATA": //查询各种table数据
            debugger
            return $$state.merge({
                data: action.payload.data,
                pagination: action.payload.pagination
            });
        case "WORK_LIST_GETENUMDATA": //获取查询条件基础显示内容
            debugger
            return $$state.merge({ enumData: action.payload.enumData });
        case "WORK_LIST_UPDATELIST": //更改一条数据
            debugger
            let newData = action.data;
            return $$state.merge({
                modalVisible: false,
                data: pageEdit($$state.get("data").toJS(), action.data),
                editData: newData
            });

        //点击新建，清空数据
        case "WORK_LIST_EMPTY":
            debugger
            return $$state.merge({
                editData: clearObject($$state.get('editData').toJS()),
                modalVisible: action.visible,
            });

        case "WORK_CARD_SAVEADD": //新增一条数据

            return $$state.merge({
                modalVisible: false,
                data: pageAdd($$state.get("data").toJS(), action.data)
            });
        case "WORK_LIST_GETLISTUPDATE": //删除一到多条数据
            return $$state.merge({
                data: action.payload.data,
                selectedRows: [],
                selectedRowKeys: []
            });

        case "WORK_LIST_SELECTCLUE": //保存已选择的数据
            return $$state.merge({
                selectedRows: Immutable.fromJS(action.payload.selectedRows),
                selectedRowKeys: Immutable.fromJS(
                    action.payload.selectedRowKeys
                )
            });

        //点击编辑获取数据
        case "WORK_LIST_EDIT":
            //debugger
            let getData = action.edit;
            return $$state.merge({
                editData: getData,
                modalVisible: true
            });
        case "WORK_LIST_CARDEDITCHANGE": //存放新增修改表单数据
            return $$state.merge({
                editData: action.changeData,
            });
        default:
            return $$state;
    }
}
