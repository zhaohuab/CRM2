import Immutable from 'immutable'

let $$initialState = {
	listData:[],
	treeData:[],
	tabelLoading:false,
	addFormVisitable:false,
	treeLoading:false,
};
export default function orgReducers($$state = Immutable.fromJS($$initialState), action){

	switch (action.type) {
		case 'ORG_LIST_GETLISTSTART':
			return $$state.merge({tabelLoading:true})
			
		case 'ORG_LIST_GETLISTSUCCESS':
			return  $$state.merge({listData:action.payload.data,tabelLoading:false})
			
		case 'ORG_LIST_CHANGEADDSTART':
			return $$state.merge({addFormVisitable:true})

		case 'ORG_LIST_CHANGEADDCLOSE':
			return $$state.merge({addFormVisitable:false})
		   
		case 'ORG_LIST_LISTADDSUCCESS':
		    let  $$list=Immutable.fromJS(action.payload.data);
			return $$state.merge({listData:$$state.get('listData').unshift($$list),addFormVisitable:false});
		  
		case 'ORG_LIST_LISTDELSUCCESS':	
			let newAry=$$state.get('listData').filter((item)=>{
				 return item.get('id')!==action.record.id	
			})
			return 	$$state.set('listData',newAry)

		case 'ORG_LIST_GETTREELISTSTART':
		    return 	$$state.merge({treeLoading:true})
	
		case 'ORG_LIST_GETTREELISTSUCCESS':
		    let treeNew=$$state.set('treeData',Immutable.fromJS(action.data))
			return treeNew.merge({treeLoading:false})
		
	    default: 
	        return $$state;
    }
}



















//    let changeNew = $$state.toJS();
//    let changekey=changeNew.listData[action.index].key
//    changeNew.listData[action.index]=action.value;
//    changeNew.listData[action.index].key=changekey