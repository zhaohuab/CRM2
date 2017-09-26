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
	}
};
export default function orgReducers($$state = Immutable.fromJS($$initialState), action){

	switch (action.type) {
		case 'CUSTOMER_LIST_GETDATA':
			return $$state.merge({data:action.payload.data})

			case 'CUSTOMER_LIST_SHOWADDFORM':
			return $$state.merge({addFormVisitable:true})

			case 'CUSTOMER_LIST_CLOSEADDFORM':
			return $$state.merge({addFormVisitable:false})
	    default: 
	        return $$state;
    }
}
