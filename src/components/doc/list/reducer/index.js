import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	editData:{},//单条主子数据
	data:[],//所有数据
	visible:false,
	isDefault:2,
	storage:[],//修改过要提交的数据
	dataSource:[],//档案明细数据
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
export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
	    case 'DOC_LIST_GETLIST':
	        return $$state.merge({
                loading: true
            })
		case 'DOC_LIST_GETLISTSUCCESS': 
	        return $$state.merge({
	        	loading: false,
				data: action.content,
				visible : action.content.visible,
			})
		case 'DOC_LIST_SHOWFORM':
			return $$state.merge({
				visible : action.content.visible,
				editData : action.content.editData,
				storage: action.content.storage,
			})
		case 'DOC_LIST_SHOWFORM_ADD':
			return $$state.merge({
				visible : action.content.visible,
				editData : action.content.editData,
				dataSource: action.content.dataSource,
				name: action.content.name,
				description:action.content.description,
			})	
		case 'DOC_LIST_SHOWFORM_EDIT':
			return $$state.merge({
				visible : action.content.visible,
				editData : action.content.editData,
				dataSource:action.content.editData.baseDocDetailList,
			  isDefault:action.content.isDefault
			})				
		case 'DOC_CARD_SAVEADD' : 
			return $$state.merge({
				visible: action.content.visible,
				storage: action.content.storage,
				editData:action.content.editData,
				data: pageAdd($$state.get("data").toJS(),action.content),
			})
		case 'DOC_CARD_SAVEEDIT' : 
			return $$state.merge({
				visible : action.content.visible,
				storage: action.content.storage,
				data : pageEdit($$state.get("data").toJS(),action.content),
			})
		case 'DOC_INPUT_CHANGE':
          return  $$state.merge({
			dataSource : action.content.dataSource
		})	
		case 'DOC_FORM_CHANGE':
		  return  $$state.merge({
        editData : action.content.editData
      })
		case 'DOC_SELECT_CHANGE':
		  return  $$state.merge({
		    dataSource : action.content.dataSource
	      })
		case 'DOC_DETAIL_STORAGE':
		  return  $$state.merge({
			storage : action.content.storage
		  })
	    case 'DOC_DETAIL_DELETE':
		  return  $$state.merge({
			dataSource : action.content.dataSource
		  })
		case 'DOC_DETAIL_ADD':
		  return  $$state.merge({
			dataSource : action.content.dataSource
		  })						
	    default: 
	        return $$state;
	}
};
