import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	editData: {},
	data: {
		data:[]
	},
	visible: false,
	enumData: {
		dimension: []
	},
	selectedRows: [],
	selectedRowKeys: [],
	pagination: {
		pageSize: 10,
		page: 1,
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
export default function reducer($$state = Immutable.fromJS($$initialState), action) {
	switch (action.type) {
		case 'OPPFLOW_LIST_GETLIST':
			return $$state.merge({
				loading: true
			})
		case 'OPPFLOW_LIST_GETLISTSUCCESS':
			return $$state.merge({
				loading: false,
				data: action.content,
				visible: action.content.visible,
				selectedRows:[],
				selectedRowKeys:[]
			})
		case 'OPPFLOW_LIST_SHOWFORM':
			return $$state.merge({
				visible: action.content.visible,
				editData: action.content.editData,
			})
		case 'OPPFLOW_CARD_SAVEADD':
			return $$state.merge({
				visible: false,
				data: pageAdd($$state.get("data").toJS(), action.content),
				selectedRows:[],
				selectedRowKeys:[]
			})
		case 'OPPFLOW_CARD_SAVEEDIT':
			return $$state.merge({
				visible: false,
				data: pageEdit($$state.get("data").toJS(), action.content),
				selectedRows:[],
				selectedRowKeys:[]
			})
		case 'OPPFLOW_LIST_GETENUMDATA':
			return $$state.merge({ enumData: action.content.enumData })

		case 'OPPFLOW_LIST_SETDATA':
			return $$state.merge({
				selectedRows: action.content.selectedRows,
				selectedRowKeys: action.content.selectedRowKeys
			})
		default:
			return $$state;
	}
};
