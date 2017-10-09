import Immutable from 'immutable'

let $$initialState = {
	collapsed:false
};

export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
        case 'COMMON_MENU_COLLAPSED':
            let col=$$state.get('collapsed')
	        return  $$state.set('collapsed',!col)
	    default: 
	        return $$state;
	}
};
