import Immutable from 'immutable'

let $$initialState = {
    data: {//左侧上班部分信息列表；注：所有的初始化数据结构均要和真实数据保持一致，即使为空，也一定要保持循环到的那一级同结构
        list:[]
    }, 
    customerItem:{//左侧下半部分客户列表
        data:[]
    },
    itemFlag:false,//左侧上半部分显示部门还是人员
    departmentName:'',//当前客户数量前面的名称
};


export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {		
        case "CUSTOMER_DEPARTMENT_LIST_GETLISTSUCCESS": //获取到左侧上半部分详情地址数据   
        let ss = action;
        let name = action.content.name ? action.content.name+'|' : '';
        let flag = action.content.flag=='user'? false : true;   
        //debugger
            return $$state.merge({
                data: action.content,
                itemFlag: flag,
                departmentName: name,
            });
        case "CUSTOMER_ITEM_LIST_GETLISTSUCCESS": //获取到左侧下半部分详情地址数据
        //debugger
            return $$state.merge({
                customerItem: action.content,          
            });	
            					
	  default: 
	    return $$state;
	}
};
