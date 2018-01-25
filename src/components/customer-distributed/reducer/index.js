import Immutable from 'immutable'

let $$initialState = {
    data: {
        list:[]
    }, //
    searchMap: {}, //存放查询条件
    customerItem:{},
    itemFlag:false,
    roleId:0,
};


export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {		
        case "CUSTOMER_DEPARTMENT_LIST_GETLISTSUCCESS": //查询各种table数据    
            return $$state.merge({
                data: action.content,
            });
        case "CUSTOMER_ITEM_LIST_GETLISTSUCCESS": //获取到左侧下半部分详情地址数据         
            return $$state.merge({
                customerItem: action.content,
            });	
            					
	  default: 
	    return $$state;
	}
};

















































/* import Immutable from "immutable";

let $$initialState = {
    data: [], //
    searchMap: {}, //存放查询条件
    customerItem:[],
    itemFlag:false,
    pagination: {//分页信息
        pageSize: 5,
        page: 1
    },
};





export default function reducer($$state = Immutable.fromJS($$initialState),action) {
    switch (action.type) {
        case "CUSTOMER_LIST_GETDATA": //查询各种table数据
        
            return $$state.merge({
                data: action.payload.data,
                pagination: action.payload.pagination
            });
        case "CUSTOMER_DEPARTMENT_LIST_GETLISTSUCCESS ": //查询各种table数据
        debugger
            
                return $$state.merge({
                    data: action.payload.result,
                });
        case "CUSTOMER_ITEM_LIST_GETLISTSUCCESS ": //获取到左侧下半部分详情地址数据   
        debugger;        
                return $$state.merge({
                    customerItem: action.payload.result,
                    });
                
        default:
            return $$state;
    }
}
 */