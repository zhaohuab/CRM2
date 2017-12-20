import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	data:{},//列表数据
	visible:false,//新增|编辑界面是否可见
	attrData:[],//属性列表数据
	attrValueData:{},//属性值列表数据
	formData:{},//新增|编辑表单数据
	detailList:[],//详情数据
	name:{},//属性组名称，form里使用
	selectedAttrs:[],//已选属性id
	selectedAttrVas:[],//已选属性值id
	localAttrs:[],//已请求的属性及对应属性值列表
	attrId:"",//本次点击的属性id
	savedData:[],//已选的所有属性和对应的属性值
	isSelected:false,//属性值是否被选中
	attrGrpId:0,//属性组id
	status:"",//状态：新增 编辑  删除
	record:{},//当前编辑的属性数据
	lessFormData:{},//查询form
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

function addLocalAttrs(item, localValues){
	localValues.push(item);
	return localValues;
}

function addSelectedData(savedData, selectedRow){
	savedData.push(selectedRow);
	return savedData;
}

export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
		//获取列表 ok
		case 'PRDATTRGROUP_LIST_GETLISTSUCCESS':
	    return $$state.merge({
				data:action.content,
        loading: true
      })
		//新增显示界面 ok
		case 'PRDATTRGRP_CARD_SHOWADDFORM':
			return $$state.merge({
				visible : action.content.visible,
				status:"add"
			})
		//保存
		case 'PRDATTRGROUP_CARD_SAVEADD' : 
			return $$state.merge({
				visible : action.content.visible,
				data : listAdd($$state.get('data').toJS(),action.content),
			})
		//编辑
		case 'PRDATTRGROUP_CARD_SAVEEDIT' : 
			return $$state.merge({
				visible : action.content.visible,
				data : listEdit($$state.get('data').toJS(),action.content),
			})
		//新增界面获取属性列表	ok
		case 'PRDATTRGROUP_ATTR_GETLIST' : 
			return $$state.merge({
				attrData:action.content.voList,
			})
		//编辑界面form值
		case 'PRDATTRGRP_FORM_CHANGEDATA' : 
			return $$state.merge({
				formData:action.content,
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
		case 'PRDATTRGRP_LIST_ATTRSELEC' : 
			return $$state.merge({
				selectedAttrs:action.content,
			})
		//已选属性值列表 包含属性id ok	
		case 'PRDATTRGRP_LIST_ATTRVASELEC' : 
			return $$state.merge({
				selectedAttrVas:action.content.selectedRowKeys,
				attrId:action.content.id
			})	
		//获取其他属性值时 保存上一次的选择 ok
		case 'PRDATTRGRP_LIST_ADDATTRVASELEC' :
			return $$state.merge({
				savedData:addSelectedData($$state.get('savedData').toJS(),action.content)
			})
		//属性值是否被选中 ok
		case 'PRDATTRGRP_LIST_ATTRISSELEC' : 
			return $$state.merge({
				isSelected:action.content
			})	
		//设置当前选中属性值 ok
		case 'PRDATTRGRP_LIST_SETSELATTRVAS' : 
			return $$state.merge({
				selectedAttrVas:action.content.selectedRowKeys,
				attrId:action.content.id
			})

		// 编辑数据
		case 'PRDATTRGROUP_CARD_SHOWEDIT' : 
			return $$state.merge({
				attrData:action.content.data.allList,
				selectedAttrs:action.content.data.checkedList,
				visible:action.content.visible,
				attrGrpId:action.content.id,
				status:"edit",
				formData:{name:action.content.name}
			})
		//编辑界面获取属性值列表 本地有	ok
		case 'PRDATTRGROUP_ATTRVA_GETEDITLIST' : 
			return $$state.merge({
				attrValueData:action.content.allList,	
				localAttrs:addLocalAttrs(action.content.allList,$$state.get('localAttrs').toJS()),
				selectedAttrVas:action.content.checkedList,
				attrId:	action.content.attrid
			})
		//保存当前选中属性 ok
		case 'PRDATTRGRP_LIST_SAVERECORD' : 
			return $$state.merge({
				record:action.content
			})
		case 'PRDATTRGRP_FORM_SETLESSFORM' : 
			return $$state.merge({
				lessFormData:action.content
			})															
	  default: 
	    return $$state;
	}
};
