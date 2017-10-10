import Immutable from 'immutable'

let $$initialState = {
	data:{
		data:[],
	},
	editData:{},
	selectedRows:[],
	formVisitable:false,
	toolVisible:{
		btnPanel:false,
		simForm:true,
		milForm:false
	},
	searchMap:[],
	viewFormVisible:false,
	viewData:{}
};

function pageAdd(page,item) {
	page.total+=1;
	page.data.unshift(item)
	page.page = Math.ceil(page.total / page.pageSize);
	return page;
}
export default function orgReducers($$state = Immutable.fromJS($$initialState), action){

	switch (action.type) {
		case 'CUSTOMER_LIST_GETDATA':
			return $$state.merge({data:{data:action.payload.data}})

			case 'CUSTOMER_LIST_SHOWFORM':
			return $$state.merge({formVisitable:action.payload.visible})

			case 'CUSTOMER_LIST_CHANGEVISIBLE':
			return $$state.merge({toolVisible:action.payload.toolVisible})
			
			case 'CUSTOMER_LIST_SELECTROW':
			return $$state.merge({selectedRows:Immutable.fromJS(action.payload.rows),toolVisible:action.payload.toolVisible})

			case 'CUSTOMER_LIST_SAVESEARCHMAP':
			return $$state.merge({searchMap:action.payload==undefined?[]:action.payload.searchMap})
			
			case 'CUSTOMER_LIST_ADDSAVE':
			return $$state.merge({
				formVisitable : false,
				data : pageAdd($$state.get("data").toJS(),action.payload.data),
			})
			case 'CUSTOMER_LIST_SHOWVIEWFORM':
			return $$state.merge({
				viewFormVisible : action.payload.visible,
				viewData :action.payload.record ,
			})
			
	    default: 
	        return $$state;
    }
}
