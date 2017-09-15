import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	editData:{},
	data:[],
	visible:false,
};

function pageAdd(page,item) {
	page.total+=1;
	page.data.unshift(item)
	debugger
	page.page = Math.ceil(page.total / page.pageSize);
	return page;
}
export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
	    case 'USER_LIST_GETLIST':
	        return $$state.merge({
                loading: true
            })
		case 'USER_LIST_GETLISTSUCCESS': 
	        return $$state.merge({
	        	loading: false,
				data: action.content.data,
				visible : action.content.visible,
			})
		case 'USER_LIST_SHOWFORM':
			return $$state.merge({
				visible : action.content.visible,
				editData : action.content.editData,
			})
		case 'USER_CARD_SAVEADD' : 
		debugger
			let page = $$state.get("data").toJS();
			return $$state.merge({
				visible : action.content.visible,
				data : pageAdd(page,action.content.data),
			})
	    default: 
	        return $$state;
	}
};
