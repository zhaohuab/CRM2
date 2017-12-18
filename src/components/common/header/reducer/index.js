import Immutable from 'immutable'

let $$initialState = {
	title:"首页",
	phoneBook:false,//通讯录显隐
	searchState:false,
	dataSource: [],//组织树
	department: [],//我的部门
	searchData: {},//搜索结果
	approval: false,//审批显隐
	submitData: [],//"我提交"数据源
	approvedData: [],//"我审批"数据源

};

export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
	        case 'HEADER_CHANGE':
			return $$state.merge({
				title: action.content.title
			})
		case 'HEADER_PHONEBOOK_CHANGE':
			return $$state.merge({
				phoneBook: action.content.phoneBook
			})
		case 'HEADER_PHONEBOOK_CLOSED':
			return $$state.merge({
				phoneBook: action.content.phoneBook
			})
		case 'HEADER_GETORGLIST_SUCCESS':
			return $$state.merge({
				dataSource: action.content.dataSource
			})
		case 'HEADER_GETDEPARTMENT_SUCCESS':
			return $$state.merge({
				department: action.content.department
			})
		case 'HEADER_SEARCH_SUCCESS':
			return $$state.merge({
				searchData: action.content.searchData
			})
		case 'HEADER_SEARCH_CHANGE':
			return $$state.merge({
				searchState: action.content.searchState
			})
		case 'HEADER_APPROVED_SHOW':
			return $$state.merge({
				approval: action.content.approval
			})
			
	    default: 
	        return $$state;
	}
};
