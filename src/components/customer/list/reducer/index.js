import Immutable from "immutable";

let $$initialState = {
    data: [], //tabel展示数据
    enumData: {
        //查询条件数据
        level: [],
        cannelType: [],
        type: [],
        state: []
    },
    selectedRows: [],
    selectedRowKeys: [],
    formVisitable: false, //新增、修改modal显隐
    searchMap: {}, //存放查询条件
    //viewFormVisible: false,
    viewData: {}, //获取当前客户信息，view面板使用数据
    pagination: {
        //分页信息
        pageSize: 20,
        page: 1
    },
    moreShow: false, //查询条件显隐,
    viewState: false, //滑动面板显隐,
    icbcInfo: [], //根据客户工商id查询出来的所有详情信息,用在编辑和新增中
    icbcInfo2: [], //根据客户工商id查询出来的所有详情信息,用在详情中
    icbcSelect: {}, //存放选中模糊查询条件后获取的客户工商id,在详情中使用
    icbcVisible: false, //工商信息查询新增编辑时面板显隐控制
    icbcVisible2: false //工商信息查询详情面板显隐
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
        case "CUSTOMER_LIST_GETDATA": //查询各种table数据
            return $$state.merge({
                data: action.payload.data,
                pagination: action.payload.pagination
            });
        case "CUSTOMER_LIST_SHOWFORM": //新增、修改编辑菜单显示
            return $$state.merge({
                formVisitable: action.payload.visible
            });
        case "CUSTOMER_LIST_CHANGEVISIBLE": //查询功能显示
            let visit = $$state.get("moreShow");
            return $$state.merge({ moreShow: !visit });

        case "CUSTOMER_LIST_SELECTROW": //保存table已选择条件
            return $$state.merge({
                selectedRows: Immutable.fromJS(action.payload.selectedRows),
                selectedRowKeys: Immutable.fromJS(
                    action.payload.selectedRowKeys
                )
            });
        case "CUSTOMER_LIST_DELECTVIEWPANEL": //点击新建按钮时，清空viewPanel数据
            return $$state.merge({
                viewData: {},
                formVisitable: action.data
            });
        case "CUSTOMER_LIST_ICBCDETAILINFO": //保存客户工商id
            return $$state.merge({
                icbcInfo: action.data,
                icbcVisible: action.visible
            });
        case "CUSTOMER_LIST_MODALSHOW1": //显示关闭新增修改modal
            return $$state.merge({
                //编辑中的modal显示、关闭
                icbcVisible: action.visible
            });

        case "CUSTOMER_LIST_SEARCHMAP": //存放扩展、基础查询条件
            return $$state.merge({
                searchMap: action.data
            });
        case "CUSTOMER_LIST_CARDEDITCHANGE": //存放新增修改表单数据
            return $$state.merge({
                viewData: action.data
            });
        case "CUSTOMER_LIST_SAVESEARCHMAP": //每次根据查询条件进行获取table数据
            return $$state.merge({
                searchMap: action.payload == undefined ? {} : action.payload
            });

        case "CUSTOMER_LIST_ADDSAVE": //增加客户
            return $$state.merge({
                formVisitable: false,
                data: pageAdd($$state.get("data").toJS(), action.payload)
            });
        case "CUSTOMER_LIST_EDITSAVE": //修改客户
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

        case "CUSTOMER_LIST_DELETE": //删除客户
            return $$state.merge({
                data: action.payload.data
            });

        case "CUSTOMER_LIST_GETENUMDATA": //获取查询条件基础显示内容
            return $$state.merge({ enumData: action.payload.enumData });
        default:
            return $$state;
    }
}
