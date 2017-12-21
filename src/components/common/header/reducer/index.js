import Immutable from 'immutable'

let $$initialState = {
	title:"首页",
	phoneBook:false,//通讯录显隐
	searchState:false,
	dataSource: [],//组织树
	department: [],//我的部门
	searchData: {},//搜索结果
	approval: false,//审批显隐
	myState: false,//"提交/审批"转换
	tableState: 1,//确定显示哪个表格
	unfinishedData: [],//"我提交"数据源--未完成
	finishedData: [],//"我提交"数据源--已完成
	todoData: [],//"我审批"数据源--待办
	doneData: [],//"我审批"数据源--已办
	pagination: {//分页信息
		pageSize: 10,
		page: 1
	},

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
		case 'HEADER_APPROVED_CHANGE':
			return $$state.merge({
				myState: action.content.myState,
				tableState: action.content.tableState,
			})
		case 'HEADER_NOTFINISHED_SUCCESS':
			return $$state.merge({
				unfinishedData: action.content.unfinishedData
			})
		case 'HEADER_FINISHED_SUCCESS':
			return $$state.merge({
				finishedData: action.content.finishedData
			})
		case 'HEADER_TODO_SUCCESS':
			return $$state.merge({
				todoData: action.content.todoData
			})
		case 'HEADER_DONE_SUCCESS':
			return $$state.merge({
				doneData: action.content.doneData
			})
		case 'HEADER_SETPAGINATION_SUCCESS':
			return $$state.merge({
				pagination: action.content.pagination
			})
		case 'HEADER_TABLESTATECHANGE_SUCCESS':
			return $$state.merge({
				tableState: action.content.tableState
			})

			
	    default: 
	        return $$state;
	}
};
