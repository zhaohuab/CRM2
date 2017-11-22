import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	editData: {},
	data: [],
	visible: false,
	selectedRowKeys: [],
};

function pageAdd(page, item) {
	page.data.unshift(item)
	return page;
}
function pageEdit(page, item) {
	let { data } = page;
	for (let i=0, len=data.length; i<len; i++) {
		if (data[i].id == item.id) {
			data[i] = item;
			break;
		}
	}
	page.data = data;
	return page;
}
export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
	    case 'TASKCARD_LIST_GETLIST':
	        return $$state.merge({
                loading: true
            })
		case 'TASKCARD_LIST_GETLISTSUCCESS': 
	        return $$state.merge({
	        	loading: false,
				data: action.content,
				visible: action.content.visible,
			})
		case 'TASKCARD_LIST_SHOWFORM':
			return $$state.merge({
				visible: action.content.visible,
				editData: action.content.editData,
			})
		case 'TASKCARD_CARD_SAVEADD': 
			return $$state.merge({
				visible: action.content.visible,
				data: pageAdd($$state.get("data").toJS(),action.content),
			})
		case 'TASKCARD_CARD_SAVEEDIT': 
			return $$state.merge({
				visible: action.content.visible,
				data: pageEdit($$state.get("data").toJS(),action.content),
			})
		case 'TASKCARD_HEADER_SHOW': 
			return $$state.merge({
				selectedRowKeys:action.content.rowKeys,
			})			
	    default: 
	        return $$state;
	}
};
