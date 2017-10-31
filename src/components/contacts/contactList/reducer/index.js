import Immutable from "immutable";

let $$initialState = {
    loading: false,
    editData: {},
    data: {},
    visible: false
};

function pageAdd(page, item) {
    page.total += 1;
    page.data.unshift(item);
    page.page = Math.ceil(page.total / page.pageSize);
    return page;
}

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
            $$state = $$state.update("loading", val => {
                return false;
            });
            return $$state.set("data", Immutable.fromJS(action.data));
        case "CONTACTS_LIST_SHOWFORM": //显示、关闭modal层
            return $$state.update("visible", val => {
                return action.data;
            });
        case "CONTACTS_CARD_SAVEADD": //新增一条数据
            return $$state.merge({
                visible: false,
                data: pageAdd($$state.get("data").toJS(), action.data)
            });

        case "CONTACTS_LIST_SELECTDATA": //保存已选择的数据
            return $$state.update("editData", val => {
                return Immutable.fromJS(action.data);
            });
        case "CONTACTS_LIST_GETLISTUPDATE": //删除一到多条数据
            $$state = $$state.set("data", Immutable.fromJS(action.data)).toJS();
            //selectedRows中删除已选择的
            $$state.editData["selectedRows"] = $$state.editData[
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
            $$state.editData["selectedRowKeys"] = $$state.editData[
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

            return Immutable.fromJS(upList);
        default:
            return $$state;
    }
}
