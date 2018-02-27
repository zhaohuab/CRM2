import Immutable from "immutable";
import { pageAdd, pageEdit } from 'utils/busipub'

let $$initialState = {
    loading: false,//列表页加载动画
    rowKeys: {},//选择
    data: {},//列表数据
    visible: false,//
    tags: {},//
    editData: {},//
    searchMap:[],//查询条件
};



export default function reducer(
    $$state = Immutable.fromJS($$initialState),
    action
) {
    switch (action.type) {
        case "CONTACTS_LIST_GETLISTSUCCESS": //table显示加载数据动画
            return $$state.update("loading", val => {
                return true;
            });
        case "CONTACTS_LIST_GETLIST": //获取查询的数据，关闭table加载动画
        debugger
            $$state = $$state.update("loading", val => {
                return false;
            });
            return $$state.set("data", Immutable.fromJS(action.data));

        case "CONTACTS_LIST_SHOWFORM": //显示、关闭modal层
            return $$state.update("visible", val => {
                return action.data;
            });

        case "CONTACTS_LIST_EDIT":
            $$state = $$state.update("visible", val => {
                return action.show;
            });
            return $$state.update("editData", val => {
                return action.edit;
            });
        case "CONTACTS_CARD_SAVEADD": //新增一条数据
            return $$state.merge({
                visible: false,
                data: pageAdd($$state.get("data").toJS(), action.data)
            });

        case "CONTACTS_LIST_SELECTDATA": //保存已选择的数据
            return $$state.update("rowKeys", val => {
                return Immutable.fromJS(action.data);
            });
        case "CONTACTS_LIST_GETLISTUPDATE": //删除一到多条数据
            $$state = $$state.set("data", Immutable.fromJS(action.data)).toJS();
            //selectedRows中删除已选择的
            $$state.rowKeys["selectedRows"] = $$state.rowKeys[
                "selectedRows"
            ].filter((item, index) => {
                for (var i = 0; i < action.del.length; i++) {
                    if (action.del[i] == item.id) {
                        return false;
                    }
                }
                return true;
            });
            //从selectedRowKeys中删除已选择的
            $$state.rowKeys["selectedRowKeys"] = $$state.rowKeys[
                "selectedRowKeys"
            ].filter((item, index) => {
                for (var i = 0; i < action.del.length; i++) {
                    if (action.del[i] == item) {
                        return false;
                    }
                }
                return true;
            });

            return Immutable.fromJS($$state);

        case "CONTACTS_LIST_UPDATELIST": //更改一条数据
            let id = action.data.id;
            let upList = $$state.toJS();
            upList.data.data = upList.data.data.map(item => {
                if (item.id == id) {
                    return action.data;
                }
                return item;
            });
            upList.visible = false;

            upList.editData = action.data;

            return Immutable.fromJS(upList);
        default:
            return $$state;
    }
}
