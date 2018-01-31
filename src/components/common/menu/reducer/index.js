import Immutable from 'immutable'

let $$initialState = {
	data: [],
	cssCode:""
};

export default function reducer($$state = Immutable.fromJS($$initialState), action) {
	switch (action.type) {
		case 'COMMON_MENU_GETDATA':
			return $$state.merge({
				data: action.content.data
			})
		case 'SAVECSSCODE':
			return $$state.merge({
				cssCode: action.content.code
			})
		default:
			return $$state;
	}
};
