import Immutable from 'immutable'

let $$initialState = {
	taskVisible: false,
	groupVisible: false,
	viewVisible: false,
	overVisible: false,
	taskgroupdata: [{}],
	pagination: {//分页信息
		pageSize: 20,
		page: 1
	},
	data: {},
	viewData: {}
};

function pageAdd(page, item) {
	debugger;
	page.unshift(item);
	return page;
}
function listAdd(page, item) {
	debugger;
	page.total += 1;
	if (page.data) {
		page.data.unshift(item);
	} else {
		page.data = [item]
	}
	page.page = Math.ceil(page.total / page.pageSize);
	return page;
}
function pageEdit(page, item) {
	let { data } = page;
	for (let i = 0, len = data.length; i < len; i++) {
		if (data[i].id == item.id) {
			data[i] = item;
			break;
		}
	}
	page.data = data;
	return page;
}
function clearObject(obj) {
	for (let key in obj) {
		debugger
		obj[key] = undefined
	}
	return obj
}
export default function reducer($$state = Immutable.fromJS($$initialState), action) {
	switch (action.type) {


		case 'QUARTZLIST_SHOWFORM'://表单显隐
			debugger
			return $$state.merge({
				taskVisible: action.payload.visible,
			});
		case 'QUARTZLIST_SHOWTASK':
			return $$state.merge({
				viewVisible: action.payload.visible,
			});
		case 'QUARTZLIST_SHOWOVER':
			return $$state.merge({
				overVisible: action.payload.visible,
			});
		case 'QUARTZ_LIST_ONVIEW': //点击编辑,浏览按钮获取数据
			debugger
			return $$state.merge({
				viewData: action.payload.record,
				viewVisible: action.payload.visible
			});
		case 'QUARTZ_LIST_ONOVER'://点击浏览
			return $$state.merge({
				viewData: action.payload.record,
				overVisible: action.payload.visible
			});
		case 'QUARTZ_LIST_GETDATA': //获取分组数据
			//debugger
			return $$state.merge({
				taskgroupdata: action.payload.data,
				pagination: action.payload.pagination
			});
		case 'QUARTZ_LIST_EDITDATA': //编辑保存数据
			debugger
			return $$state.merge({
				data: pageEdit($$state.get("data").toJS(), action.payload.data.data[0]),
				viewData: action.payload.data.data[0],
				viewVisible: action.payload.visible
			});
		case 'QUARTZ_LIST_DELETE'://删除数据
			debugger
			return $$state.merge({
				data: action.payload.data
			});
			return
		case 'QUARTZ_LIST_GETDATA_SUCCESS': //获取任务数据
			debugger
			return $$state.merge({
				data: action.payload.data
			})

		case 'QUARTZ_LIST_EXECUTE'://执行
			debugger
			return $$state.merge({
				data: pageEdit($$state.get("data").toJS(), action.payload.data.data[0]),
				viewData: action.payload.data.data[0]
			});
		case 'QUARTZ_LIST_OPEN'://启用
			return $$state.merge({
				data: pageEdit($$state.get("data").toJS(), action.payload.data.data[0]),
				viewData: action.payload.data.data[0]
			});
		case "QUARTZ_LIST_ADDTASK": //点击新建按钮时,清空数据
			return $$state.merge({
				viewData: clearObject($$state.get('viewData').toJS()),
				taskVisible: action.payload.visible
			});

		case 'QUARTZ_LIST_ONEDATA'://新建一条任务
			debugger
			return $$state.merge({
				data: listAdd($$state.get("data").toJS(), action.payload.data),
				taskVisible: action.payload.visible
			})
		case 'QUARTZ_TASKGROUPS_GETDATA_SUCCESS'://新建一条分组
			debugger
			return $$state.merge({
				taskgroupdata: pageAdd($$state.get("taskgroupdata").toJS(), action.payload.data)
			})
		case "QUARTZ_LIST_CARDEDITCHANGE": //存放新增修改表单数据
			return $$state.merge({
				viewData: action.changeData,
			});
		default:
			return $$state;
	}
};
