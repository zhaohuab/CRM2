import Immutable from 'immutable'
import { pageAdd, pageEdit } from 'utils/busipub'

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
	biztype:[],
	allStage: [],
	allDimension: [],
	allAction: [],
	step: 1,
	result: [],
	searchMap: {},
	isEdit:false
};

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
			return $$state.merge({ enumData: action.content.enumData,biztype:action.content.biztype })

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
