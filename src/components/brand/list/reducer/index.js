import Immutable from 'immutable'
import { pageAdd, pageEdit } from 'utils/busipub'

let $$initialState = {
	editData: {},
	data: [],
	visible: false,
	viewVisible:false,
	selectedRows:[],
	selectedRowKeys:[],
	lessFormData:{},
};


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
