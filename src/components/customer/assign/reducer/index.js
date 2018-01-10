import Immutable from "immutable";


let $$initialState = {
    loading: false,//存放
    data: {},//存放分配列表数据
    editData: {},//存放编辑一条客户数据
    rowKey:[],//存放保存已选列表keys值
    lessForm:{},//存放lessForm表单
};

function pageAdd(page, item){
    page.total += 1;
    page.data.unshift(item);
    page.page = Math.ceil(page.total / page.pageSize);
    return page;
}

export default function cusAssignReducers($$state = Immutable.fromJS($$initialState),action) {
    switch (action.type){
        case 'CUSTOMER_ASSIGNMENT_SAVELESSFORM':
            return $$state.merage({
                lessForm:action.value
            })
        default:
        return $$state
    }
}