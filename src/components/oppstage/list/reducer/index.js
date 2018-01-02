 import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	editData: {},
	data: [],
	visible: false,
	enumData: {
		dimension: []
	},
	selectedRows: [],
	selectedRowKeys: [],
	pagination: {
		pageSize: 10,
		page: 1,
	},
};


function listAdd(data,item) {	
	data.voList.unshift(item);
	return data;
}

function listEdit(data,item) {
	for(let i=0,len=data.voList.length;i<len;i++) {
		if(data.voList[i].id == item.id) {
			data.voList[i] = item;
			break;
		}
	}
	return data;
}
export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
	    case 'OPPSTAGE_LIST_GETLIST':
	        return $$state.merge({
                loading: true
            })
		case 'OPPSTAGE_LIST_GETLISTSUCCESS': 
	        return $$state.merge({
	        	loading: false,
				data: action.content,
				visible : action.content.visible,
				selectedRows:[],
				selectedRowKeys:[]
			})
		case 'OPPSTAGE_LIST_SHOWFORM':
			return $$state.merge({
				visible : action.content.visible,
				editData : action.content.editData,
			})
		case 'OPPSTAGE_CARD_SAVEADD' : 
			return $$state.merge({
				visible : action.content.visible,
				data : listAdd($$state.get('data').toJS(),action.content),
				selectedRows:[],
				selectedRowKeys:[]
			})
		case 'OPPSTAGE_CARD_SAVEEDIT' : 
			return $$state.merge({
				visible : action.content.visible,
				data : listEdit($$state.get("data").toJS(),action.content),
				selectedRows:[],
				selectedRowKeys:[]
			})
			case 'OPPSTAGE_LIST_GETENUMDATA':
			return $$state.merge({ enumData: action.content.enumData })

		case 'OPPSTAGE_LIST_SETDATA':
			return $$state.merge({
				selectedRows: action.content.selectedRows,
				selectedRowKeys: action.content.selectedRowKeys
			})
	    default: 
	        return $$state;
	}
};
