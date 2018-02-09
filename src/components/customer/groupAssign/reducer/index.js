import Immutable from "immutable";


let $$initialState = {
    loading: false,//存放
    data: {},//存放分配列表数据
    editData: {},//存放编辑一条客户数据
    selectedRowKeys:[],//存放保存已选列表keys值
    pagination: {//分页信息
        pageSize: 10,
        page: 1
    },
    searchMap:{},//存放头部查询条件-----获取列表时候应该只获取启用状态的，这里加一个初始状态  赵华冰2-2
    searchPlan:{},//保存查询方案条件
    preSearchMap:{},//存放头部查询条件预存参数
    preSearchPlan:[],//存放头部查询方案
    whitchSearch:'',//保存上次查询的是哪一个查询方式
};

function pageAdd(page, item){
    page.total += 1;
    page.data.unshift(item);
    page.page = Math.ceil(page.total / page.pageSize);
    return page;
}

export default function cusGroupAssignReducers($$state = Immutable.fromJS($$initialState),action) {
    switch (action.type){
        case 'CUSTOMER_GROUPASSIGNMENT_SEARCHMAP'://存储查询条件
            return $$state.merge({
                searchMap:action.value,
                whitchSearch:'searchMap'
            })
        case 'CUSTOMER_GROUPASSIGNMENT_SEARCHPLAN'://存储已查询的查询案后，更新列表数据
        let xx= action;
        debugger
            return $$state.merge({
                searchPlan:action.searchPlan,
                data:action.data,
                whitchSearch:'searchPlan'
            })
        case 'CUSTOMER_GROUPASSIGNMENT_LIST'://存储已查询的查询条件，更新列表数据
        let xx2= action;
        debugger
            return $$state.merge({
                data:action.data,
            })  
        case 'CUSTOMER_GROUPASSIGNMENT_SAVETABLEKEYS'://保存table已选择key
            return $$state.merge({
                selectedRowKeys:action.keys
            })  
        case "CUSTOMER_GROUPASSIGNMENT_PRESEARCHMAP"://获取查询条件表单初始条件
            return $$state.merge({
                preSearchMap:action.preSearchMap,
                preSearchPlan:action.preSearchPlan
            })
        case "CUSTOMER_GROUPASSIGNMENT__GETTABLELIST"://保存table数据   
        let xx6= action;
        debugger
            return $$state.merge({
                data:action.data
            })
        case 'CUSTOMER_GROUPASSIGNMENT__GETTABLELISTAGAIN'://集团分配后，再此从新请求列表，更新list数据，table的keys清空
        let xx9= action;
         debugger
            return $$state.merge({
                data:action.data,
                selectedRowKeys:[]
            })

        default:
            return $$state
    }
}