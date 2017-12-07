import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	editData: {},//编辑时返回的数据
	data: [],//全部列表数据
	dataSource:[],//弹出框中所有任务卡
	checkedData:[],//已选任务卡
	searchKey:'',//搜索时input中的值
	enableState:1,//搜索时停启用状态
	visible: false,
	enable:false,//停启用
	initalState:{},//拖拽数据源

};
function pageAdd(page, item) {
	page.total+=1;
	page.voList.unshift(item)
	page.page = Math.ceil(page.total / page.pageSize);
	return page;
}
function pageEdit(page, item) {
	let  data  = page.voList;
	for (let i=0, len=data.length; i<len; i++) {
		if (data[i].id == item.id) {
			data[i] = item;
			break;
		}
	}
	page.voList = data;
	return page;
}



export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
	    case 'VISITRULES_LIST_GETLIST':
	        return $$state.merge({
                loading: true
            })
		case 'VISITRULES_LIST_GETLISTSUCCESS': 
	        return $$state.merge({
	        	loading: false,
				data: action.content,
				visible: action.content.visible,
			})
		case 'VISITRULES_LIST_SHOWFORM':
			return $$state.merge({
				visible: action.content.visible,
				editData: action.content.editData,
			})
		case 'VISITRULES_CARD_SAVEEDIT': 
			return $$state.merge({
				visible: action.content.visible,
			})	
		case 'VISITRULES_INPUT_CHANGE': 
			return $$state.merge({
				searchKey: action.content.searchKey
			})	
		case 'VISITRULES_SELECT_CHANGE': 
			return $$state.merge({
				enableState: action.content.enableState
			})		
		case 'VISITRULES_CARD_VALUE': 
			return $$state.merge({
				dataSource: action.content.dataSource
			})	
		case 'VISITRULES_CHECKED_TASKCARD': 
			return $$state.merge({
				checkedData: action.content.checkedData
			})	
		case 'VISITRULES_INITAL_STATE': 
			return $$state.merge({
				initalState: action.content.initalState
			})
		case 'VISITRULES_REQUIRED_CHANGE': 
			return $$state.merge({
				checkedData: action.content.checkedData
			})					
	    default: 
	        return $$state;
	}
};
