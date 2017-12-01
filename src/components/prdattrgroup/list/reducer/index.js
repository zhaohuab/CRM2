import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	data:{},
	visible:false,
	attrData:[],
	attrValueData:{},
	formData:{},
	valueList:[],
	addNum:0,
	changeData:[],
	detailVisible:false,
	detailList:[],
	name:{},
	selectedAttrs:[],
	selectedAttrVas:[],
	attrVaSelec:[],
	localAttrs:[],
	attrId:"",
	savedData:[],
	selectedMap:new Map(),
	isSelected:false
};

function listAdd(page,item) {	
	debugger
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

function addLocalAttrs(item, localValues){
//	debugger
	localValues.push(item);
	return localValues;
}

function addSelectedData(savedData, selectedRow){
	savedData.push(selectedRow);
	return savedData;
}

function addSelectedDataMap(savedData, selectedRow){
	savedData.push(selectedRow);
	return savedData;
}

function save (){

}
export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
		//获取列表 ok
		case 'PRDATTRGROUP_LIST_GETLISTSUCCESS':
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
			})
		//新增显示界面 ok
		case 'PRDATTRGRP_CARD_SHOWADDFORM':
			return $$state.merge({
				visible : action.content.visible,
			})
		//保存
		case 'PRDATTRGROUP_CARD_SAVEADD' : 
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
		//新增界面获取属性列表	ok
		case 'PRDATTRGROUP_ATTR_GETLIST' : 
			return $$state.merge({
				attrData:action.content.voList,
			})
		//新增界面获取属性值列表 本地有	ok
		case 'PRDATTRGROUP_ATTRVA_GETLISTLOCAL' : 
			return $$state.merge({
				attrValueData:action.content.data,				
			})
		//新增界面获取属性值列表 本地没有	ok
		case 'PRDATTRGROUP_ATTRVA_GETLIST' : 
			return $$state.merge({
				attrValueData:action.content,	
				localAttrs:addLocalAttrs(action.content,$$state.get('localAttrs').toJS()),			
			})
		//详情数据 ok
		case 'PRDATTRGROUP_CARD_SHOWDETAIL' : 
			return $$state.merge({
				detailList:action.content.data.attrList,
				name:action.content.data.name,
				visible:action.content.visible
			})
		//已选属性列表 ok
		case 'PRDATTR_LIST_ATTRSELEC' : 
			return $$state.merge({
				selectedAttrs:action.content,
			})
		//已选属性值列表 包含属性id ok	
		case 'PRDATTR_LIST_ATTRVASELEC' : 
			return $$state.merge({
				selectedAttrVas:action.content.selectedRowKeys,
				attrId:action.content.id
			})	
		//已选属性值列表 包含属性id ok	
		case 'PRDATTR_LIST_ATTRVASELECMAP' : 
			return $$state.merge({
				selectedMap:addSelectedDataMap($$state.get('selectedMap').toJS(),action.content)
			})	
		//获取其他属性值时 保存上一次的选择 ok
		case 'PRDATTR_LIST_ADDATTRVASELEC' :
			return $$state.merge({
				savedData:addSelectedData($$state.get('savedData').toJS(),action.content)
			})
		//属性值是否被选中 ok
		case 'PRDATTR_LIST_ATTRISSELEC' : 
			return $$state.merge({
				isSelected:action.content
			})	
		//设置当前选中属性值 ok
		case 'PRDATTR_LIST_SETSELATTRVAS' : 
			return $$state.merge({
				selectedAttrVas:action.content
			})
		//设置当前选中属性值 ok
		case 'PRDATTR_LIST_ADDSAVE' : 
			return $$state.merge({
				selectedAttrVas:action.content
			})
		//编辑数据
		case 'PRDATTRGROUP_CARD_SHOWEDIT' : 
			return $$state.merge({
				detailList:action.content.data.attrList,
				name:action.content.data.name,
				visible:action.content.visible
			})
																
	  default: 
	    return $$state;
	}
};
