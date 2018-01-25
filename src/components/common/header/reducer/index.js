import Immutable from 'immutable'
import Mention from 'antd/lib/mention';

let $$initialState = {
	title: "首页",
	data: {},//提交表单数据
	approveData: {},//审批表单数据
	phoneBook: false,//通讯录显隐
	searchState: false,
	dataSource: [],//组织树
	department: [],//我的部门
	searchData: {},//搜索结果
	approvalShow: false,//审批显隐未完成
	myState: false,//"提交/审批"转换
	tableState: 1,//确定显示哪个表格

	unfinishedData: [],//"我提交"数据源--未完成
	finishedData: [],//"我提交"数据源--已完成
	todoData: [],//"我审批"数据源--待办
	doneData: [],//"我审批"数据源--已办

	historyStatus:[],//审批历史数据


		pagination: {//分页信息
			pageSize: 10,
			page: 1
	},
	searchMap: {}, //存储查询表单数据
	searchMapApproval: {},
	finishState: false,// 完成表头控制完成未完成
	viewState: false,
	detailData: {}, //详情form表单数据数据
	detailapproval: {},
	lineState: false, //审批显隐
	commit: {},
	done: [],
	todo: [],
	mentionVisible: false,
	showMention: false,
	showAction: '',
	approvalButtons: [],
	currentRecord: {} //详情数据
};
function clearObject(obj) {
	 
	for (let key in obj) {

		obj[key] = undefined
	}
	return obj
}

export default function reducer($$state = Immutable.fromJS($$initialState), action) {
	switch (action.type) {
		case 'HEADER_CHANGE':
			return $$state.merge({
				title: action.content.title
			})
		case 'APPROVAL_LIST_SHOWVIEWFORM'://详情展示面板
			return $$state.merge({
				viewState: action.content.visible,
				detailData: action.content.data,
				currentRecord: action.content.record
			})
		case 'APPROVE_LIST_MENTIONVISIBLE':
			
			return $$state.merge({
				mentionVisible: action.content.visible,
				showAction: action.content.action
			})
		case 'APPROVE_LIST_MENTIONCLOSE':
			
			return $$state.merge({
				mentionVisible: action.content.visible,
				showAction: ''
			})
		case 'APPROVAL_LIST_SHOWVIEWAPPROVAL':
			
			return $$state.merge({
				detailapproval: action.content.data,
				commit: action.content.data.commit,
				todo: action.content.data.todo,
				done: action.content.data.done
			});
		case 'APPROVAL_LIST_APPROVALBUTTON':
			
			return $$state.merge({
				approvalButtons: action.content.data.actionlist
			})
		case 'APPROVED_VIEWSTATE'://详情展示面板
			return $$state.merge({
				viewState: action.content.viewState
			})
		case 'APPROVED_STATUSSHOW': //详情展示 
			return $$state.merge({
				lineState: action.content.lineState

			})
		case 'APPROVED_STATUSHIDE':
			return $$state.merge({
				lineState: action.content.lineState,
				currentRecord:{}
			})
		case 'APPROVAL_LIST_HISTORY':
			return $$state.merge({
				historyStatus:action.content.data
			})
		case 'APPROVAL_LIST_HIDEVIEWFORM':
			
			return $$state.merge({
				viewState: action.content.visiable
			})
		case 'APPROVE_LIST_SEARCHMAP':
			
			return $$state.merge({
				searchMap: action.content.data
			});
		case 'APPROVE_LIST_SEARCHMAPAPPROVAL':
			
			return $$state.merge({
				searchMapApproval: action.content.data
			});
		case 'APPROVE_LIST_DETAILDATA':
			return $$state.merge({
				detailData: action.content.detailData
			});

		case 'HEADER_NOTFINISHED_DATA':
			 
			return $$state.merge({
				unfinishedData: action.content.unfinishedData,
				data: action.content.unfinishedData
			});
		case 'HEADER_DATENOTFINISHED_DATA':
			 
			return $$state.merge({
				data: action.content.unfinishedData,
				unfinishedData: action.content.unfinishedData
			});
		case 'HEADER_DATEFINISHED_SUCCESS':
			return $$state.merge({
				data: action.content.finishedData,
				finishedData: action.content.finishedData
			});
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
				approvalShow: action.content.approvalShow
			})
		case 'HEADER_APPROVED_SHOWDATE':

			return $$state.merge({
				approvalShow: action.payload.approvalShow
			})
		case 'HEADER_APPROVED_CHANGE':
			return $$state.merge({
				myState: action.content.myState,
				tableState: action.content.tableState,
				searchMap: clearObject($$state.get('searchMap').toJS()),
				searchMapApproval: clearObject($$state.get('searchMapApproval').toJS())
			})
		case 'HEADER_NOTFINISHED_SUCCESS':
			 
			return $$state.merge({
				unfinishedData: action.payload.unfinishedData,
				data: action.payload.unfinishedData
			})
		case 'HEADER_FINISHED_SUCCESS':
			 
			return $$state.merge({
				finishedData: action.content.finishedData,
				data: action.content.finishedData
			})
		case 'HEADER_TODO_SUCCESS':
			return $$state.merge({
				todoData: action.content.todoData,
				approveData: action.content.todoData
			})
		case 'HEADER_DATETODO_SUCCESS':
			return $$state.merge({
				todoData: action.content.todoData,
				approveData: action.content.todoData
			})
		case 'HEADER_DONE_SUCCESS':
			return $$state.merge({
				doneData: action.content.doneData,
				approveData: action.content.doneData
			})
		case 'HEADER_DATEDONE_SUCCESS':
			return $$state.merge({
				doneData: action.content.doneData,
				approveData: action.content.doneData
			})
		case 'HEADER_SETPAGINATION_SUCCESS':
			return $$state.merge({
				pagination: action.content.pagination
			})
		case 'HEADER_TABLESTATECHANGE_SUCCESS':
			return $$state.merge({
				tableState: action.content.tableState
			})





















		case 'HEADER_PHONEBOOK_CHANGE':
			return $$state.merge({
				phoneBook: action.content.phoneBook
			})
		case 'HEADER_PHONEBOOK_CLOSED':
			return $$state.merge({
				phoneBook: action.content.phoneBook
			})
		default:
			return $$state;
	}
};
