import Immutable from "immutable";

let $$initialState = {
    data: [], //tabel展示数据
    enumData: {
        //查询条件数据
        level: [],
        cannelType: []
    },
    selectedRows: [],
    selectedRowKeys: [],
    formVisitable: false, //新增、修改modal显隐
    searchMap: {}, //存放查询条件
    //viewFormVisible: false,
    viewData: {}, //获取当前客户信息，view面板使用数据
    isEdit: false, //用来判断是新增还是修改，添加数据用的
    pagination: {
        //分页信息
        pageSize: 20,
        page: 1
    },
    moreShow: false, //查询条件显隐,
    viewState: false //滑动面板显隐
};

function pageAdd(page, item) {
    page.total += 1;
    page.data.unshift(item);
    page.page = Math.ceil(page.total / page.pageSize);
    return page;
}
function pageEdit(page, item) {
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
export default function orgReducers(
    $$state = Immutable.fromJS($$initialState),
    action
) {
    switch (action.type) {
        case "CUSTOMER_LIST_GETDATA":
            return $$state.merge({
                data: action.payload.data,
                pagination: action.payload.pagination
            });
        case "CUSTOMER_LIST_SHOWFORM":
            return $$state.merge({
                formVisitable: action.payload.visible,
                isEdit: action.payload.isEdit
            });
        case "CUSTOMER_LIST_CHANGEVISIBLE":
            let visit = $$state.get("moreShow");
            debugger;
            return $$state.merge({ moreShow: !visit });

        case "CUSTOMER_LIST_SELECTROW":
            debugger;
            return $$state.merge({
                selectedRows: Immutable.fromJS(action.payload.selectedRows),
                selectedRowKeys: Immutable.fromJS(
                    action.payload.selectedRowKeys
                )
            });

        case "CUSTOMER_LIST_SAVESEARCHMAP":
            return $$state.merge({
                searchMap: action.payload == undefined ? {} : action.payload
            });

        case "CUSTOMER_LIST_ADDSAVE":
            return $$state.merge({
                formVisitable: false,
                data: pageAdd($$state.get("data").toJS(), action.payload)
            });
        case "CUSTOMER_LIST_EDITSAVE":
            return $$state.merge({
                formVisitable: false,
                data: pageEdit($$state.get("data").toJS(), action.payload),
                viewData: action.payload
            });
        case "CUSTOMER_LIST_SHOWVIEWFORM": //显示面板时，获取数据
            return $$state.merge({
                viewState: action.payload.visible,
                viewData: action.payload.record
            });
        // case "CUSTOMER_LIST_CLOSEPANEL":
        //     return $$state.merge({
        //         viewFormVisible: false
        //     });
        case "CUSTOMER_LIST_DELETE": //面板中能删除该客户
            return $$state.merge({
                data: action.payload.data
                //viewFormVisible: false
            });

        case "CUSTOMER_LIST_GETENUMDATA":
            return $$state.merge({ enumData: action.payload.enumData });
        default:
            return $$state;
    }
}
