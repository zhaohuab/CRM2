import Immutable from 'immutable'


// let $$initialState = {
// };

// export default function reducer($$state = Immutable.fromJS($$initialState), action){
// 	switch (action.type) {
// 	    default: 
// 	        return $$state;
// 	}
// };

import approval from './approval';

export default combineReducers({
    approval
})