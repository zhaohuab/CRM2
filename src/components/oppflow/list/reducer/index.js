import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	editData: {},
	data: {
		data: []
	},
	visible: false,
	enumData: {
		dimension: []
	},
	allStage: [],
	allDimension: [],
	allAction: [],
	step: 1,
	result: [],
	searchMap: {},
	isEdit:false
};

function pageAdd(page, item) {
	debugger
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
				data: action.content.data,
				searchMap: action.content.searchMap
			})
		case 'OPPFLOW_LIST_SHOWFORM':
			return $$state.merge({
				visible: action.content.visible,
				step: action.content.visible ? 1 : $$state.get("step")
			})
		case 'OPPFLOW_LIST_SAVEADD':
		debugger
			return $$state.merge({
				visible: false,
				data: pageAdd($$state.get("data").toJS(), action.content)
			})
		case 'OPPFLOW_LIST_SAVEEDIT':
			return $$state.merge({
				visible: false,
				data: pageEdit($$state.get("data").toJS(), action.content)
			})
		case 'OPPFLOW_LIST_GETENUMDATA':
			return $$state.merge({ enumData: action.content.enumData })

		case 'OPPFLOW_LIST_GETALLOPPSTAGE':
			return $$state.merge({
				allStage: action.content.voList,
			})
		case 'OPPFLOW_LIST_GETALLOPPDIMENSION':
			return $$state.merge({
				allDimension: action.content.voList,
			})
		case 'OPPFLOW_LIST_GETACTIONSUCCESS':
			return $$state.merge({
				allAction: action.content.action,
				step: 2
			})
		case 'OPPFLOW_LIST_SAVEEDITDATA':
			return $$state.merge({
				editData: action.content
			})
		case 'OPPFLOW_LIST_CHANGESTEP':
			return $$state.merge({
				step: action.content
			})
		case 'OPPFLOW_LIST_SAVERESULT':
			return $$state.merge({
				result: action.content
			})
		case 'OPPFLOW_LIST_SAVELISTDATA':
			return $$state.merge({
				data: action.content,
			})
		case 'OPPFLOW_LIST_GETEDITDATA':
			return $$state.merge({
				editData: action.content.flowData,
				result: action.content.stageData,
			})
		case 'OPPFLOW_LIST_SETISEDIT':
			return $$state.merge({
				isEdit: action.content
			})
			

		default:
			return $$state;
	}
};
