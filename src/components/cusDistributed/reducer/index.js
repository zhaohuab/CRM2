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
    deptId :'', //当前请求左下角数据时的部门id
    userId :'', //当前请求左下角数据时的人员id
    userName:'',//切换页码时确定当前请求的左下角数据是哪个角色下客户；包括部门和人员两种情况
    loadingFlag: false,//左侧下半部分加载画面控制
    page: 1,//当前选中页码
    customerListBack:[],//返回时左上部分请求参数
    customerItemBack:[],//返回时左下部分请求参数
};


export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {		
        case "CUSTOMER_DEPARTMENT_LIST_GETLISTSUCCESS": //获取到左侧上半部分详情地址数据   
        debugger
            let name = action.content.name ? action.content.name+'|' : '';
            let flag = action.content.flag=='user'? false : true;  
            if(action.content.back){
                return $$state.merge({
                    data: action.content,
                    itemFlag: flag,
                    departmentName: name,
                    userName:action.content.str,
                    deptId:action.content.search.deptId,
                    userId:action.content.search.userId,
                });
            }else{
                let backArr=[];
                    backArr.push(action.content.str);
                    backArr.push(action.content.id);
                    backArr.push(action.content.name);
                let customerListArr = $$state.get('customerListBack').toJS();
                    customerListArr.push(backArr);
                return $$state.merge({
                    data: action.content,
                    itemFlag: flag,
                    departmentName: name,
                    userName:action.content.str,
                    deptId:action.content.search.deptId,
                    userId:action.content.search.userId,
                    customerListBack: customerListArr,
                });
            }
        
        case "CUSTOMER_ITEM_LIST_GETLISTSUCCESS": //获取到左侧下半部分详情地址数据
        debugger
            let cc=action;
            if(action.content.back){
                return $$state.merge({
                    customerItem: action.content,  
                    loadingFlag: false,  
                    page: action.content.num,
                });
            }else{
                let backArr1=[];
                    backArr1.push(action.content.str);
                    backArr1.push(action.content.id);
                    backArr1.push(action.content.num);
                let customerItemArr = $$state.get('customerItemBack').toJS();
                    customerItemArr.push(backArr1);
                return $$state.merge({
                    customerItem: action.content,  
                    loadingFlag: false,  
                    page: action.content.num,
                    customerItemBack: customerItemArr,
                });	
            }
            
        case "CUSTOMER_ITEM_LIST_GETLIST": //左侧下半部分详情地址数据获取到之前先展示加载画面
            return $$state.merge({
                loadingFlag: true,          
            });	
        case "CUSTOMER_ITEM_LIST_FAIL": //左侧下半部分详情地址数据获取到之前先展示加载画面
            return $$state.merge({
                loadingFlag: false,          
            });	
        case "CUSTOMER_DEPARTMENT_LIST_POP": //
        debugger
            let customerList = $$state.get('customerListBack').toJS();
            let customerItem = $$state.get('customerItemBack').toJS();
                customerList.length>1 ? customerList.pop():null;
                customerItem.length>1 ? customerItem.pop():null;
            return $$state.merge({
                customerListBack: customerList, 
                customerItemBack: customerItem,       
            });	
                       					
	  default: 
	    return $$state;
	}
};
