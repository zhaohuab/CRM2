import Immutable from 'immutable'
import { transToFields,transToValues } from 'utils/template/form/Transfer.js'
let $$initialState = {
	loading: false,
	formData:{},
	formFields:{},
	data:[],
	visible:false,
	isEdit:false,
	template:{
		add:undefined,
		edit:undefined,
		list:undefined,
		view:undefined,
	}
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
		case 'USER_LIST_TEMPLATE':
	        return $$state.mergeDeep({
                template: {
					list : action.content.columns,
				}
			})
		case 'USER_ADD_TEMPLATE':
	        return $$state.mergeDeep({
                template: {
					add : action.content.fields,
				}
			})
		case 'USER_EDIT_TEMPLATE':
	        return $$state.mergeDeep({
                template: {
					edit : action.content.fields,
				}
            })
	    case 'USER_LIST_GETLIST':
	        return $$state.merge({
                loading: true
            })
		case 'USER_LIST_GETLISTSUCCESS': 
	        return $$state.merge({
	        	loading: false,
				data: action.content,
				visible : action.content.visible,
			})
		case 'USER_LIST_SHOWFORM':
		
			return $$state.merge({
				visible : action.content.visible,
				formFields : transToFields(action.content.editData),
				formData : action.content.editData,
				isEdit : action.content.isEdit,
			})
		case 'USER_PAGE_USERCHANGE':
		
			return $$state.mergeDeep({
				formData : transToValues(action.content.formFields),
				formFields : action.content.formFields,
			})
		case 'USER_CARD_SAVEADD' : 
			return $$state.merge({
				visible : action.content.visible,
				data : pageAdd($$state.get("data").toJS(),action.content),
			})
		case 'USER_CARD_SAVEEDIT' : 
			return $$state.merge({
				visible : action.content.visible,
				data : pageEdit($$state.get("data").toJS(),action.content),
			})
	    default: 
	        return $$state;
	}
};
