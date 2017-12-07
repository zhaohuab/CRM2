import Immutable from 'immutable'

let $$initialState = {
	title:"首页",
};

export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
	    case 'HEADER_CHANGE':
	        return $$state.merge({
                title: action.content.title
            })
	    default: 
	        return $$state;
	}
};
