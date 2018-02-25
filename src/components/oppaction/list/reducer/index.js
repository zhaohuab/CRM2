import Immutable from 'immutable'
import { pageAdd, pageEdit } from 'utils/busipub'

let $$initialState = {
	loading: false,
	editData: {},
	data: [],
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

export default function reducer($$state = Immutable.fromJS($$initialState), action) {
	switch (action.type) {
		case 'OPPACTION_LIST_GETLIST':
			return $$state.merge({
				loading: true
			})
		case 'OPPACTION_LIST_GETLISTSUCCESS':
			return $$state.merge({
				loading: false,
				data: action.content,
				visible: action.content.visible,
				selectedRows:[],
				selectedRowKeys:[]
			})
		case 'OPPACTION_LIST_SHOWFORM':
			return $$state.merge({
				visible: action.content.visible,
				editData: action.content.editData,
			})
		case 'OPPACTION_CARD_SAVEADD':
	
			return $$state.merge({
				visible: action.content.visible,
				data: pageAdd($$state.get("data").toJS(), action.content),
				selectedRows:[],
				selectedRowKeys:[]
			})
		case 'OPPACTION_CARD_SAVEEDIT':
			return $$state.merge({
				visible: action.content.visible,
				data: pageEdit($$state.get("data").toJS(), action.content),
				selectedRows:[],
				selectedRowKeys:[]
			})
		case 'OPPACTION_LIST_GETENUMDATA':
			return $$state.merge({ enumData: action.content.enumData })

		case 'OPPACTION_LIST_SETDATA':
			return $$state.merge({
				selectedRows: action.content.selectedRows,
				selectedRowKeys: action.content.selectedRowKeys
			})
		default:
			return $$state;
	}
};
