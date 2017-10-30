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
function pageEdit(page, item) {
    debugger;
    let { data } = page;
    for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].id == item.id) {
            data[i] = item;
            break;
        }
    }
    page.data = data;
    return page;
}
export default function reducer(
    $$state = Immutable.fromJS($$initialState),
    action
) {
    switch (action.type) {
        case "CONTACTS_LIST_GETLISTSUCCESS":
            return $$state.update("loading", val => {
                return true;
            });
        case "CONTACTS_LIST_GETLIST":
            $$state = $$state.update("loading", val => {
                return false;
            });
            return $$state.set("data", Immutable.fromJS(action.data));
        case "CONTACTS_LIST_SHOWFORM":
            return $$state.update("visible", val => {
                return action.data;
            });
        case "CONTACTS_CARD_SAVEADD":
            debugger;
            $$state = $$state.update("visible", val => {
                return false;
            });
            let newData = $$state.toJS();
            newData.data.data.unshift(action.data);

            return $$state.update("data", val => {
                return Immutable.fromJS(newData.data);
            });
        case "CONTACTS_LIST_SELECTDATA":
            return $$state.update("editData", val => {
                return Immutable.fromJS(action.data);
            });
        case "CONTACTS_LIST_GETLISTUPDATE":
            $$state = $$state.set("data", Immutable.fromJS(action.data)).toJS();
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

        case "CONTACTS_LIST_UPDATELIST":
            debugger;
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
