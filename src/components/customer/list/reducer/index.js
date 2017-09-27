import Immutable from 'immutable'

let $$initialState = {
	data:{
		data:[],
	},
	selectedRows:[],
	formVisitable:false,
	toolVisible:{
		btnPanel:false,
		simForm:true,
		milForm:false
	},
	searchMap:[]
};
export default function orgReducers($$state = Immutable.fromJS($$initialState), action){

	switch (action.type) {
		case 'CUSTOMER_LIST_GETDATA':
			return $$state.merge({data:action.payload.data})

			case 'CUSTOMER_LIST_SHOWADDFORM':
			return $$state.merge({addFormVisitable:true})

			case 'CUSTOMER_LIST_CLOSEADDFORM':
			return $$state.merge({addFormVisitable:false})

			case 'CUSTOMER_LIST_CHANGEVISIBLE':
			return $$state.merge({toolVisible:action.payload.toolVisible})
			
			case 'CUSTOMER_LIST_SELECTROW':
			return $$state.merge({selectedRows:Immutable.fromJS(action.payload.rows),toolVisible:action.payload.toolVisible})
			
	    default: 
	        return $$state;
    }
}
