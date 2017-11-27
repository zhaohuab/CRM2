import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	data:{},
	visible:false,
	attrValue:[],
	formData:{},
	valueList:[],
	addNum:0,
	changeData:[],
	detailVisible:false,
};

function listAdd(page,item) {	
	page.total+=1;
	page.data.unshift(item)
	page.page = Math.ceil(page.total / page.pageSize);
	return page;
}

function listEdit(data,item) {
	for(let i=0,len=data.data.length;i<len;i++) {
		if(data.data[i].id == item.id) {
			data.data[i] = item;
			break;
		}
	}
	return data;
}

function getFormData(target, source){
	Object.assign(target,source);
	return target;
}

function addRow (attrValue, item) {
	attrValue.push(item);
	return attrValue;
}

function addNum(addNum){
	addNum++;
	return addNum;
}

export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
		case 'PRDATTR_LIST_GETLISTSUCCESS':
	    return $$state.merge({
				data:action.content,
        loading: true
      })
		case 'PRDATTR_LIST_SHOWFORM':
			return $$state.merge({
				visible : action.content.visible,
				formData : action.content.data,
				attrValue:action.content.data.valueList
			})
		case 'PRDATTR_LIST_SHOWFORMDETAIL':
			return $$state.merge({
				detailVisible : action.content.visible,
				formData : action.content.data,
				attrValue:action.content.data.valueList
			})
		case 'PRDATTR_LIST_SHOWFORM_TEST':
			return $$state.merge({
				visible : action.content.visible,
				//editData : action.content.data,
				//attrValue:action.content.data.valueList
			})
		case 'PRDATTR_LIST_ADDSHOWFORM':
			return $$state.merge({
				visible : action.content.visible,
			})
		case 'PRDATTR_CARD_SAVEADD' : 
			return $$state.merge({
				visible : action.content.visible,
				data : listAdd($$state.get('data').toJS(),action.content),
			})
		case 'PRDATTR_CARD_SAVEEDIT' : 
			return $$state.merge({
				visible : action.content.visible,
				data : listEdit($$state.get("data").toJS(),action.content),
			})
		case 'PRDATTR_FORM_CHANGEDATA' : 
			return $$state.merge({
		    formData:getFormData($$state.get('formData').toJS(),action.content),
			})
		case 'PRDATTR_CARD_AADDROW' : 
			return $$state.merge({
				attrValue: addRow($$state.get("attrValue").toJS(),action.content),
				addNum:addNum($$state.get('addNum'))
			})
		case 'PRDATTR_CARD_CHANGEATTRVA' : 
			return $$state.merge({
				changeData:action.content
			})
		case 'PRDATTR_CARD_RESETADDNUM' : 
			return $$state.merge({
				addNum:action.content
			})
		case 'PRDATTR_CARD_EDITATTRVA' : 
			return $$state.merge({
				attrValue:action.content
			})		
		case 'PRDATTR_CARD_SETATTRDATA' : 
			return $$state.merge({
				attrValue:action.content,
			})
		case 'PRDATTR_DETAIL_GETSUCCESS' : 
			return $$state.merge({
				attrValue:action.content,
				visible:true
			})															
	  default: 
	    return $$state;
	}
};
