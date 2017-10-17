import Immutable from 'immutable'

let $$initialState = {
	listData:[],
	treeData:[],
	tabelLoading:false,
	formVisitable:false,
	treeLoading:false,
	tableListCheckbox:[],
	treeSelect:undefined,
	editData:[],
	searchFilter:undefined,
};

export default function prdtypeReducers($$state = Immutable.fromJS($$initialState), action){

	switch (action.type) {
		case 'PRDTYPE_LIST_GETLISTSTART':
			return $$state.merge({tabelLoading:true})
			
		case 'PRDTYPE_LIST_GETLISTSUCCESS':
			return  $$state.merge({
				listData:action.payload.data,
				tabelLoading:false,
				formVisitable:false
			})
			case 'PRDTYPE_LIST_GETLISTSUCCESSBYCLICKTREE':
			return  $$state.merge({
				listData:action.payload.data,
				tabelLoading:false,
				treeSelect:action.payload.treeSelect,
				formVisitable:false,
				searchFilter:''
			})
			case 'PRDTYPE_LIST_GETLISTSUCCESSBYCLICKSEARCH':
			return  $$state.merge({
				listData:action.payload.data,
				tabelLoading:false,
				treeSelect:'',
				formVisitable:false,
				searchFilter:action.payload.searchFilter
			})
			
		case 'PRDTYPE_LIST_SHOWFORM':
			return $$state.merge({
				formVisitable : action.payload.visible,
				editData : action.payload.editData,
			})
		case 'PRDTYPE_LIST_CHANGEADDCLOSE':
			return $$state.merge({formVisitable:false})
		   
		case 'PRDTYPE_LIST_LISTADDSUCCESS':
		debugger
		    let  $$list=Immutable.fromJS(action.payload.data);
			return $$state.merge({
				listData:$$state.get('listData').unshift($$list),
				formVisitable:false
		});
		  
		case 'PRDTYPE_LIST_LISTDELSUCCESS':	
			let newAry=$$state.get('listData').filter((item)=>{
				 return item.get('id')!==action.record.id	
			})
			return 	$$state.set('listData',newAry)

		case 'PRDTYPE_LIST_GETTREELISTSTART':
		    return 	$$state.merge({treeLoading:true})
	
		case 'PRDTYPE_LIST_GETTREELISTSUCCESS':
		    let treeNew=$$state.set('treeData',Immutable.fromJS(action.data))
			return treeNew.merge({treeLoading:false})

		case 'PRDTYPE_LIST_SHOWBUTTONSTART':
			return $$state.set('tableListCheckbox',Immutable.fromJS(action.rows)) 
			 
	    default: 
	        return $$state;
    }
}
