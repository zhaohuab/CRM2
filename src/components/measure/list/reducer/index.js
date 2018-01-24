import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	editData:{},
	data:[],
	visible:false,
	lessFormData:{},
};
function pageAdd(page,item) {
	page.total+=1;
	page.data.unshift(item)
	page.page = Math.ceil(page.total / page.pageSize);
	return page;
}
function pageEdit(page,item) {
	debugger
	let {data} = page;
	for(let i=0,len=data.length;i<len;i++) {
		if(data[i].id == item.id) {
			data[i] = item;
			break;
		}
	}
	page.data = data;
	return page;
}

export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
	    case 'MEASURE_LIST_GETLIST':
	        return $$state.merge({
                loading: true
            })
		case 'MEASURE_LIST_GETLISTSUCCESS': 
		debugger
	        return $$state.merge({
	        	loading: false,
				data: action.content,
				visible : action.content.visible,
			})
		case 'MEASURE_LIST_SHOWFORM':
			return $$state.merge({
				visible : action.content.visible,
				editData : action.content.editData,
			})
		case 'MEASURE_CARD_SAVEADD' : 
			return $$state.merge({
				visible : action.content.visible,
				data : pageAdd($$state.get("data").toJS(),action.content),
			})
		case 'MEASURE_CARD_SAVEEDIT' : 
			return $$state.merge({
				visible : action.content.visible,
				data : pageEdit($$state.get("data").toJS(),action.content),
			})
		case 'MEASURE_FORM_SETLESSFORM' : 
			return $$state.merge({
				lessFormData:action.content
			}) 
	    default: 
	        return $$state;
	}
};