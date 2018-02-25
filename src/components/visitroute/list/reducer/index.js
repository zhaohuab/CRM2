import Immutable from "immutable";
import { pageAdd, pageEdit } from 'utils/busipub'

let $$initialState = {
    loading: false,
    rowKeys: {},
    data: {},
    visible: false,
    editData: {}
};

export default function reducer(
    $$state = Immutable.fromJS($$initialState),
    action
) {
    switch (action.type) {
        case "VISITROUTE_LIST_GETLISTSUCCESS": //显示加载动画
            return $$state.update("loading", value => {
                return true;
            });
        case "VISITROUTE_LIST_GETLIST": //添加查询获取的数据，关闭加载动画
            $$state = $$state.update("data", value => {
                return Immutable.fromJS(action.data);
            });
            return $$state.update("loading", value => {
                return false;
            });
        case "VISITROUTE_LIST_SHOWFORM": //显示、关闭modal层
            return $$state.update("visible", value => {
                return action.data;
            });
        case "VISITROUTE_LIST_ADDLIST": //增加一条数据
            return $$state.merge({
                visible: false,
                data: pageAdd($$state.get("data").toJS(), action.data)
            });
        case "CONTACTS_LIST_EDIT":
            $$state = $$state.update("visible", val => {
                return action.show;
            });
            return $$state.update("editData", val => {
                return action.edit;
            });
        case "VISITROUTE_LIST_SELECTDATA": //把选择的数据保存在redux中
            return $$state.update("rowKeys", value => {
                return Immutable.fromJS(action.data);
            });
        case "VISITROUTE_LIST_DELETELIST": //删除一到多条数据
            $$state = $$state.update("data", value => {
                return Immutable.fromJS(action.data);
            });
            $$state = $$state.setIn(
                ["rowKeys", "selectedRowKeys"],
                Immutable.fromJS(
                    $$state
                        .getIn(["rowKeys", "selectedRowKeys"])
                        .filter(item => {
                            for (var i = 0; i < action.del.length; i++) {
                                if (action.del[i] == item) {
                                    return false;
                                }
                            }
                            return true;
                        })
                )
            );

            $$state = $$state.setIn(
                ["rowKeys", "selectedRows"],
                Immutable.fromJS(
                    $$state.getIn(["rowKeys", "selectedRows"]).filter(item => {
                        for (var i = 0; i < action.del.length; i++) {
                            if (action.del[i] == item.get("id")) {
                                return false;
                            }
                        }
                        return true;
                    })
                )
            );
            return $$state;

        case "VISITROUTE_LIST_UPDATELIST":
            let id = action.data.id;
            $$state = $$state.setIn(
                ["data", "data"],
                $$state.getIn(["data", "data"]).map(item => {
                    if (item.get("id") == id) {
                        return Immutable.fromJS(action.data);
                    }
                    return item;
                })
            );
            $$state = $$state.set("visible", false);
            return $$state;
        default:
            return $$state;
    }
}
