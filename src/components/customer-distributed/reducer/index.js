import Immutable from "immutable";

let $$initialState = {
    data: [], //
    searchMap: {}, //存放查询条件
    itemFlag:false,
    pagination: {//分页信息
        pageSize: 5,
        page: 1
    },
};





export default function orgReducers($$state = Immutable.fromJS($$initialState),action) {
    switch (action.type) {
        case "CUSTOMER_LIST_GETDATA": //查询各种table数据
        
            return $$state.merge({
                data: action.payload.data,
                pagination: action.payload.pagination
            });
        case "CUSTOMER_DEPARTMENT_LIST_GETLISTSUCCESS ": //查询各种table数据
            
                return $$state.merge({
                    data: action.payload.result,
                });
            
        default:
            return $$state;
    }
}
