import Immutable from 'immutable'

let $$initialState = {
	listData: [],
	treeData: [],
	tabelLoading: false,
	formVisitable: false,
	treeLoading: false,
	tableListCheckbox: [],
	treeSelect: undefined,
	editData: [],
	searchFilter: undefined,
};
function pageAdd(page,item) {
	page.data.unshift(item)
	return page;
}

export default function orgReducers($$state = Immutable.fromJS($$initialState), action) {

	switch (action.type) {
		case 'ORG_LIST_GETLISTSTART':
			return $$state.merge({ tabelLoading: true })

		case 'ORG_LIST_GETLISTSUCCESS':
			return $$state.merge({
				listData: action.payload,
				tabelLoading: false,
				formVisitable: false
			})
		case 'ORG_LIST_GETLISTSUCCESSBYCLICKTREE':
			return $$state.merge({
				listData: action.payload,
				tabelLoading: false,
				treeSelect: action.payload.treeSelect,
				formVisitable: false,
				searchFilter: undefined,
				tableListCheckbox:[]
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
			})
		case 'ORG_LIST_CHANGEADDCLOSE':
			return $$state.merge({ formVisitable: false })

		case 'ORG_LIST_LISTADDSUCCESS':
			debugger
			return $$state.merge({
				listData : pageAdd($$state.get("listData").toJS(),action.payload.data),
				formVisitable: false,
				treeData:action.payload.treeData
			});

		case 'ORG_LIST_LISTDELSUCCESS':
			let newAry = $$state.get('listData').filter((item) => {
				return item.get('id') !== action.record.id
			})
			return $$state.set('listData', newAry)

		case 'ORG_LIST_GETTREELISTSTART':
			return $$state.merge({ treeLoading: true })

		case 'ORG_LIST_GETTREELISTSUCCESS':
			let treeNew = $$state.set('treeData', Immutable.fromJS(action.data))
			return treeNew.merge({ treeLoading: false,tableListCheckbox:[] })

		case 'ORG_LIST_SHOWBUTTONSTART':
			return $$state.set('tableListCheckbox', Immutable.fromJS(action.rows))

		default:
			return $$state;
	}
}
