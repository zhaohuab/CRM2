import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	editData:{},
	data:[],
	visible:false,
};

export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
	    case 'MEASURE_LIST_GETLIST':
	        return $$state.merge({
                loading: true
            })
        case 'MEASURE_LIST_GETLISTSUCCESS': 
	        return $$state.merge({
	        	loading: false,
				data: action.content,
				visible : action.content.visible,
			})
	    default: 
	        return $$state;
	}
};