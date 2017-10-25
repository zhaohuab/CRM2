import Immutable from "immutable";

let $$initialState = {
    loading: false,
    editData: {},
    data: [],
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
        default:
            return $$state;
    }
}
