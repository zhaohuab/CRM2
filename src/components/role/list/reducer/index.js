import Immutable from 'immutable'

let $$initialState = {
    data: [],
    visible: false,
};

export default function reducer($$state = Immutable.fromJS($$initialState), action) {
    switch (action.type) {
        case 'USER_LIST_GETLIST':
            return $$state.merge({
                loading: true
            })
        default:
            return $$state;
    }
};
