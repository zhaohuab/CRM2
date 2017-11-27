import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	editData: {},//编辑时返回的数据
	data: [],//全部列表数据
	searchKey:'',//搜索时input中的值
	enableState:1,//搜索时停启用状态
	visible: false,
	isEdit: false,//是否为编辑状态
	enable:false,//停启用
	more:false,//点击显示更多
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

function more(data){
  if(data.voList.length>12) return true;
  return false;
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
				more: more(action.content),
			})
		case 'VISITRULES_LIST_SHOWFORM':
			return $$state.merge({
				isEdit: action.content.isEdit,
				visible: action.content.visible,
				editData: action.content.editData,
				bizTypes: action.content.bizTypes,
			})
		case 'VISITRULES_CARD_SAVEADD': 
			return $$state.merge({
				isEdit: action.content.isEdit,
				visible: action.content.visible,
				data: pageAdd($$state.get("data").toJS(),action.content),
			})
		case 'VISITRULES_CARD_SAVEEDIT': 
			return $$state.merge({
				isEdit: action.content.isEdit,
				visible: action.content.visible,
				data: pageEdit($$state.get("data").toJS(),action.content),
			})
		case 'VISITRULES_ORDER_ENABLE': 
			return $$state.merge({
				enable:action.content.enable
			})		
		case 'VISITRULES_INPUT_CHANGE': 
			return $$state.merge({
				searchKey:action.content.searchKey
			})	
		case 'VISITRULES_SELECT_CHANGE': 
			return $$state.merge({
				enableState:action.content.enableState
			})		
			
					
	    default: 
	        return $$state;
	}
};
