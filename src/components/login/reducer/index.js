import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	data:[],
	user:undefined,
	token:undefined,
};

export default function reducer($$state = Immutable.fromJS($$initialState), action){
	
	switch (action.type) {
	    case 'LOGIN_MAIN_LOGIN_START':
	        return $$state.merge({
                loading: true
            })
		case 'LOGIN_MAIN_LOGIN_START_SUCCESS': 
			const { user , token} = action.payload.data;
	        return $$state.merge({
				loading: false,
				user: user,
                token: token,
            })
	    default: 
	        return $$state;
	}
};
