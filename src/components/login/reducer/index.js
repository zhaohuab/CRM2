import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	data:[],
	logined:false,
	errorMessage:''
};

export default function reducer($$state = Immutable.fromJS($$initialState), action){
	
	switch (action.type) {
	    case 'LOGIN_MAIN_LOGIN_START':
	        return $$state.merge({
                loading: true
            })
		case 'LOGIN_MAIN_LOGIN_START_SUCCESS': 
	        return $$state.merge({
				logined:true
			});
		case 'LOGIN_MAIN_LOGIN_START_FAIL': 
	        return $$state.merge({
				logined:false,
				errorMessage:action.content
			});
		case 'LOGIN_MAIN_SETLOGOUT':
			return $$state.merge({
				logined:false
			});
	    default: 
	        return $$state;
	}
};
