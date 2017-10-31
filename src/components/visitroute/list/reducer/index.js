import Immutable from "immutable";

let $$initialState = {
    loading: false,
    editData: {},
    data: {},
    visible: false
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
            let newData = $$state
                .getIn(["data", "data"])
                .unshift(Immutable.fromJS(action.data));
            $$state = $$state.setIn(["data", "data"], newData);
            return $$state.update("visible", value => {
                return false;
            });
        case "VISITROUTE_LIST_SELECTDATA": //把选择的数据保存在redux中
            return $$state.update("editData", value => {
                return action.data;
            });
        case "VISITROUTE_LIST_DELETELIST": //删除一到多条数据
            $$state = $$state.update("data", value => {
                return Immutable.fromJS(action.data);
            });
            let c = $$state.getIn(["editData", "selectedRowKeys"]);
            debugger;
        default:
            return $$state;
    }
}
