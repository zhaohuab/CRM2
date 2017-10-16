import Immutable from 'immutable'

let $$initialState = {
    data: [],
    editData: {},
	roleCardVisible: false,
	funcData:[]
};

function pageAdd(page,item) {
	page.total+=1;
	page.data.unshift(item)
	page.page = Math.ceil(page.total / page.pageSize);
	return page;
}
function pageEdit(page,item) {
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

function pageDelete(page,id) {
    let {data} = page;
	for(let i=0,len=data.length;i<len;i++) {
		if(data[i].id == id) {
			data.splice(i,1);
			break;
		}
	}
	page.data = data;
	return page;
}

export default function reducer($$state = Immutable.fromJS($$initialState), action) {
    switch (action.type) {
        
        case 'ROLE_LIST_GETROLELISTSUCCESS':
            return $$state.merge({
                data: action.content,
            })
        case 'ROLE_LIST_SHOWFORM':
            return $$state.merge({
                roleCardVisible : action.content.visible,
				editData : action.content.editData,
            }) 
            
        case 'ROLE_CARD_SAVEADD' : 
			return $$state.merge({
				roleCardVisible : false,
				data : pageAdd($$state.get("data").toJS(),action.content),
			})
        case 'ROLE_CARD_SAVEEDIT' : 
			return $$state.merge({
				roleCardVisible : false,
				data : pageEdit($$state.get("data").toJS(),action.content),
            })
            
        case 'ROLE_LIST_DELETESUCCESS' : 
			return $$state.merge({
				data : pageDelete($$state.get("data").toJS(),action.content),
			})

		case 'ROLE_LIST_GETFUNCTREESUCCESS' : 
			return $$state.merge({
				funcData : action.content,
			})
        default:
            return $$state;
    }
};
