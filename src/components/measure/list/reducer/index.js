import Immutable from 'immutable'
import { pageAdd, pageEdit } from 'utils/busipub'

let $$initialState = {
	loading: false,
	editData:{},
	data:[],
	visible:false,
	lessFormData:{},
};

export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
	    case 'MEASURE_LIST_GETLIST':
	        return $$state.merge({
                loading: true
            })
		case 'MEASURE_LIST_GETLISTSUCCESS': 
		debugger
	        return $$state.merge({
	        	loading: false,
				data: action.content,
				visible : action.content.visible,
			})
		case 'MEASURE_LIST_SHOWFORM':
			return $$state.merge({
				visible : action.content.visible,
				editData : action.content.editData,
			})
		case 'MEASURE_CARD_SAVEADD' : 
			return $$state.merge({
				visible : action.content.visible,
				data : pageAdd($$state.get("data").toJS(),action.content),
			})
		case 'MEASURE_CARD_SAVEEDIT' : 
			return $$state.merge({
				visible : action.content.visible,
				data : pageEdit($$state.get("data").toJS(),action.content),
			})
		case 'MEASURE_FORM_SETLESSFORM' : 
			return $$state.merge({
				lessFormData:action.content
			}) 
	    default: 
	        return $$state;
	}
};