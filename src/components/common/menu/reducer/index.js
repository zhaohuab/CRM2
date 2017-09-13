import Immutable from 'immutable'

let $$initialState = {
	data:[]
};

export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
	    case 'COMMON_MENU_GETDATA':
	        return $$state.merge({
                data: action.payload.data
            })
	    default: 
	        return $$state;
	}
};
