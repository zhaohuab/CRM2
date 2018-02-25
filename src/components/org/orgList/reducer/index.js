import Immutable from 'immutable'
import { pageAdd, pageEdit } from 'utils/busipub'

let $$initialState = {
	isEdit: false,
	listData: [],
	treeData: [],
	formVisitable: false,
	selectedRows: [],
	selectedRowKeys: [],
	treeSelect: undefined,
	editData: {},
	tabelLoading: false,
	cardLoading: false,
	treeLoading: false,
};

export default function orgReducers($$state = Immutable.fromJS($$initialState), action) {

	switch (action.type) {

		case 'ORG_LIST_GETLISTSUCCESS':
			return $$state.merge({
				listData: action.payload,
				tabelLoading: false,
				formVisitable: false,
				selectedRows: [],
				selectedRowKeys: [],
			})
		case 'ORG_LIST_GETLISTSUCCESSBYCLICKTREE':
			return $$state.merge({
				listData: action.payload,
				tabelLoading: false,
				treeSelect: action.payload.treeSelect,
				formVisitable: false,
				searchFilter: undefined,
				selectedRows: [],
				selectedRowKeys: [],
			})
		case 'ORG_LIST_GETLISTSUCCESSBYCLICKSEARCH':
			return $$state.merge({
				listData: action.payload,
				tabelLoading: false,
				treeSelect: undefined,
				formVisitable: false,
				searchFilter: action.payload.searchFilter
			})

		case 'ORG_LIST_SHOWFORM':
			return $$state.merge({
				formVisitable: action.payload.visible,
				editData: action.payload.editData,
				isEdit: action.payload.isEdit
			})
		case 'ORG_LIST_CHANGEADDCLOSE':
			return $$state.merge({ formVisitable: false })

		case 'ORG_LIST_LISTADDSUCCESS':
			return $$state.merge({
				listData: pageAdd($$state.get("listData").toJS(), action.payload.data),
				formVisitable: false,
				treeData: action.payload.treeData,
				tabelLoading: false,
				cardLoading: false,
				treeLoading: false
			});


		case 'ORG_LIST_LISTEDITSUCCESS':
			return $$state.merge({
				listData: pageEdit($$state.get("listData").toJS(), action.payload.data),
				formVisitable: false,
				treeData: action.payload.treeData,
				tabelLoading: false,
				cardLoading: false,
				treeLoading: false
			});

		case 'ORG_LIST_LISTDELSUCCESS':
			let newAry = $$state.get('listData').filter((item) => {
				return item.get('id') !== action.record.id
			})
			return $$state.set('listData', newAry)


		case 'ORG_LIST_GETTREELISTSUCCESS':
			let treeNew = $$state.set('treeData', Immutable.fromJS(action.data))
			return treeNew.merge({ treeLoading: false, selectedRows: [] })

		case 'ORG_LIST_SELECTDATA':
			return $$state.merge({
				selectedRows: action.payload.selectedRows,
				selectedRowKeys: action.payload.selectedRowKeys,
			})
		case 'ORG_LIST_SETFORM':
			return $$state.merge({
				editData: action.content
			})
		//页面状态重置
		case 'ORG_LIST_RESETSTATE':
			return $$state.merge($$initialState)

		case 'ORG_LIST_TABLELOADING':
			return $$state.merge({ tabelLoading: true })

		case 'ORG_LIST_CARDLOADING':
			return $$state.merge({ cardLoading: true })

		case 'ORG_LIST_TREELOADING':
			return $$state.merge({ treeLoading: true })

			case 'ORG_LIST_LOADOVER':
			return $$state.merge({
				tabelLoading: false,
				cardLoading: false,
				treeLoading: false,
			})
		default:
			return $$state;
	}
}
