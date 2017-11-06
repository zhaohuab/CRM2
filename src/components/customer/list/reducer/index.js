import Immutable from 'immutable'

let $$initialState = {
	data: [],
	selectedRows: [],
	selectedRowKeys:[],
	formVisitable: false,
	toolVisible: {
		btnPanel: false,
		simForm: true,
		milForm: false
	},
	searchMap: {},
	viewFormVisible: false,
	viewData: {},
	isEdit: false,
	pagination: {
		pageSize: 20,
		page: 1
	},
};

function pageAdd(page, item) {
	page.total += 1;
	page.data.unshift(item)
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
export default function orgReducers($$state = Immutable.fromJS($$initialState), action) {

	switch (action.type) {
		case 'CUSTOMER_LIST_GETDATA':
			return $$state.merge({ data: action.payload.data,pagination:action.payload.pagination })

		case 'CUSTOMER_LIST_SHOWFORM':
			return $$state.merge({ formVisitable: action.payload.visible, isEdit: action.payload.isEdit })

		case 'CUSTOMER_LIST_CHANGEVISIBLE':
			return $$state.merge({ toolVisible: action.payload.toolVisible })

		case 'CUSTOMER_LIST_SELECTROW':
			return $$state.merge({ 
				selectedRows: Immutable.fromJS(action.payload.selectedRows),
				selectedRowKeys: Immutable.fromJS(action.payload.selectedRowKeys),
				toolVisible: action.payload.toolVisible 
			})

		case 'CUSTOMER_LIST_SAVESEARCHMAP':
			return $$state.merge({ searchMap: action.payload == undefined ? {} : action.payload })

		case 'CUSTOMER_LIST_ADDSAVE':
			return $$state.merge({
				formVisitable: false,
				data: pageAdd($$state.get("data").toJS(), action.payload),
			})
		case 'CUSTOMER_LIST_EDITSAVE':
			return $$state.merge({
				formVisitable: false,
				data: pageEdit($$state.get("data").toJS(), action.payload),
				viewData: action.payload,
			})
		case 'CUSTOMER_LIST_SHOWVIEWFORM':
			return $$state.merge({
				viewFormVisible: action.payload.visible,
				viewData: action.payload.record,
			})
		case 'CUSTOMER_LIST_CLOSEPANEL':
			return $$state.merge({
				viewFormVisible: false,
			})
		case 'CUSTOMER_LIST_DELETE':
			return $$state.merge({ data: action.payload.data, viewFormVisible: false })
		default:
			return $$state;
	}
}
