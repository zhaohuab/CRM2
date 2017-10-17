import Immutable from 'immutable'

let initialState = {
   
    data:[],
    loading: false,
	editData:{},
	visible:false,
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
		if(data[i].code == item.code) {
			data[i] = item;
			break;
		}
	}
	page.data = data;
	return page;
}
function reducer ($$state = Immutable.fromJS(initialState), action){
   debugger
    switch(action.type){
        case 'PRODUCT_LIST_GETLISTSUCCESS': 
	        return $$state.merge({
	        	loading: false,
				data: action.content,
				visible : action.content.visible,
			})
        case 'PRODUCT_LIST_SHOWFORM':
            return $$state.merge({
				visible : action.content.visible,
				editData : action.content.editData,
            })
        case 'PRODUCT_CARD_SAVEADD':
            return $$state.merge({
				visible : action.content.visible,
				data : pageAdd($$state.get("data").toJS(),action.content),
            })
        case 'PRODUCT_CARD_SAVEEDIT' : 
			return $$state.merge({
				visible : action.content.visible,
				data : pageEdit($$state.get("data").toJS(),action.content),
			})     
        default: 
            return $$state;
    }
    
}

export default reducer;