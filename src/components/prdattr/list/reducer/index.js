import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	data:{},//列表数据
	visible:false,
	attrValue:[],//属性值
	formData:{},//新增|编辑form值
//	valueList:[],
	addNum:0,//属性值列表新增行数
	changeData:[],//本次新增|编辑 属性值的变更值
	detailVisible:false,//是否显示详情界面
	AttrVaSelectedKeys:[],//新增|编辑 选中的属性值
	lessFormData:{},//查询form
	isRefered:false,//属性是否被引用
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

function setCiteFlag(checkedids,data){
	if(checkedids !== undefined && checkedids !== null &&
		 checkedids.ids !== undefined && checkedids.ids.length>0){	
		for(let item of data){
			for(let checked of checkedids.ids){
				if(checked == item.id){
					Object.assign(item, {isRefered:true});
					break;
				}
			}		
		}
	}
	return data;
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
				attrValue:setCiteFlag(action.content.checkedids, action.content.data.valueList)
			})
		case 'PRDATTR_LIST_SHOWFORMDETAIL':
			return $$state.merge({
				detailVisible : action.content.visible,
				formData : action.content.data,
				attrValue:action.content.data.valueList
			})
		case 'PRDATTR_LIST_ADDSHOWFORM':
			return $$state.merge({
				visible : action.content.visible,
			})
		case 'PRDATTR_CARD_SAVEADD' : 
			return $$state.merge({
				visible : false,
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
		case 'PRDATTR_ATTRVA_AADDROW' : 
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
		// case 'PRDATTR_DETAIL_GETSUCCESS' : 
		// 	return $$state.merge({
		// 		attrValue:action.content,
		// 		visible:true
		// 	})
		case 'PRDATTR_FORM_SETFORM' : 
			return $$state.merge({
				formData:action.content
			})   	
		case 'PRDATTR_ATTRVA_SETSECROWKEYS' : 
			return $$state.merge({
				AttrVaSelectedKeys:action.content
			}) 
		case 'PRDATTR_FORM_SETLESSFORM' : 
			return $$state.merge({
				lessFormData:action.content
			}) 														
	  default: 
	    return $$state;
	}
};
