import Immutable from 'immutable'

let $$initialState = {
	listData:[],
	treeData:[]
};
export default function orgReducers($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
		case 'GETLIST':
			let result=$$state.merge($$state.set('listData',action.data))
			action.fn()
			return result
		    break;
		case 'LISTADD':
			let newListAdd=$$state.toJS().listData;
			newListAdd.voList.push(action.data)
			return $$state.merge($$state.set('listData',newListAdd))	
			break;	
		case 'LISTDEL':		
			let {voList,total} =$$state.toJS().listData;
			let a=action.record
			voList=voList.filter((item)=>{
				return item.pkOrg!==a.pkOrg				
			})
			return 	$$state.merge($$state.set('listData',{voList,total}))
			break;
		case 'LISTCHANGE':
			return $$state.merge($$state)	
			break;	
		case 'GETTREELIST':
		//debugger
			return $$state.merge($$state.set('treeData',action.data))	
			break;
	    default: 
	        return $$state;
    }
}



















//    let changeNew = $$state.toJS();
//    let changekey=changeNew.listData[action.index].key
//    changeNew.listData[action.index]=action.value;
//    changeNew.listData[action.index].key=changekey