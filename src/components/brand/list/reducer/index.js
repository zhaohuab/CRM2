import Immutable from 'immutable'

let $$initialState = {
	editData: {},
	data: [],
	visible: false,
	viewVisible:false,
	selectedRows:[],
	selectedRowKeys:[],
	lessFormData:{},
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

		case 'BRAND_LIST_GETLISTSUCCESS':
			return $$state.merge({
				data: action.content,
			})
		case 'BRAND_LIST_SHOWFORM':
			return $$state.merge({
				visible: action.content.visible,
				editData: action.content.editData,
				viewVisible:false
			})
			case 'BRAND_LIST_SHOWVIEWFORM':
			return $$state.merge({
				viewVisible: action.content.visible,
				editData: action.content.editData
			})
		case 'BRAND_CARD_SAVEADD':
			return $$state.merge({
				visible: false,
				data: pageAdd($$state.get("data").toJS(), action.content),
			})
		case 'BRAND_CARD_SAVEEDIT':
			return $$state.merge({
				visible: false,
				data: pageEdit($$state.get("data").toJS(), action.content),
			})
		case 'BRAND_LIST_DELETESUCCESS':
			return $$state.merge({
				data: action.content,
			})
		case 'BRAND_LIST_SETSTATESUCCESS':
			return $$state.merge({
				data: action.content,
			})

		case 'BRAND_LIST_SELECTDATA':
			return $$state.merge({
				selectedRows: action.content.selectedRows,
				selectedRowKeys: action.content.selectedRowKeys,
			})
		case 'BRAND_FORM_SETLESSFORM' : 
			return $$state.merge({
				lessFormData:action.content
			}) 
		default:
			return $$state;
	}
};
