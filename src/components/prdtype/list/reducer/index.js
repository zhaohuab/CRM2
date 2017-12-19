import Immutable from 'immutable'

let $$initialState = {
	page:{},
	listData:[],
	treeData:[],
	tabelLoading:false,
	formVisitable:false,
	treeLoading:false,
	tableListCheckbox:[],
	treeSelect:undefined,
	editData:{},//新增|编辑form数据
	searchFilter:undefined,
	attrgrpRef:[],
	selectedKeys:[],
	//fieldsChangeData:{},
	selectedTreeData:{},
	classattrGrpValue:"",//
	list:[],
	detail:{},
	lessFormData:{},//查询form数据
};

function getFormData(target, source){
	Object.assign(target,source);
	return target;
}

function listAdd(page,item) {	
	page.total+=1;
	page.data.unshift(item.data)
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

export default function prdAttrReducers($$state = Immutable.fromJS($$initialState), action){

	switch (action.type) {
		case 'PRDTYPE_LIST_GETLISTSTART':
			return $$state.merge({tabelLoading:true})			
		case 'PRDTYPE_LIST_GETLISTSUCCESS':
			return  $$state.merge({
				listData:action.payload.data,
				tabelLoading:false,
				formVisitable:false,
				page:action.payload.data,
				list:action.payload.data.data
			})
		case 'PRDTYPE_EDIT_GETLISTSUCCESS':
			return  $$state.merge({
				tabelLoading:false,
				formVisitable:false,
				page:pageEdit($$state.get("page").toJS(),action.payload.data),
			})
		case 'PRDTYPE_LIST_GETLISTSUCCESSBYCLICKTREE':
			return  $$state.merge({
				listData:action.payload.data,
				tabelLoading:false,
				treeSelect:action.payload.treeSelect,
				formVisitable:false,
				searchFilter:'',
				page:action.payload.data
			})
		case 'PRDTYPE_LIST_GETLISTSUCCESSBYCLICKSEARCH':
		debugger
			return  $$state.merge({
				listData:action.payload.data,
				tabelLoading:false,
				treeSelect:'',
				formVisitable:false,
				searchFilter:action.payload.searchFilter
			})
			
		case 'PRDTYPE_LIST_SHOWFORM':
			return $$state.merge({
				formVisitable : action.payload.visible,
				editData : action.payload.editData,
			})
		case 'PRDTYPE_LIST_CHANGEADDCLOSE':
			return $$state.merge({formVisitable:false})
		   
		case 'PRDTYPE_LIST_LISTADDSUCCESS':
			return $$state.merge({
				formVisitable:false,
				page:listAdd($$state.get('page').toJS(),action.payload)
		});
		  
		case 'PRDTYPE_LIST_LISTDELSUCCESS':	
			let newAry=$$state.get('listData').filter((item)=>{
				 return item.get('id')!==action.record.id	
			})
			return 	$$state.set('listData',newAry)

		case 'PRDTYPE_LIST_GETTREELISTSTART':
		  return 	$$state.merge({treeLoading:true})
	
		case 'PRDTYPE_LIST_GETTREELISTSUCCESS':
		  let treeNew=$$state.set('treeData',Immutable.fromJS(action.data))
			return treeNew.merge({treeLoading:false})

		case 'PRDTYPE_LIST_SHOWBUTTONSTART':
			return $$state.set('tableListCheckbox',Immutable.fromJS(action.rows)) 
		case 'PRDTYPE_LIST_DELETELISTSUCCESS':
	    	return $$state.merge({tableListCheckbox:action.payload.tableListCheckbox}) 
		case 'PRODUCTCLASS_ATTRGROUP_GETREFLIST' : 
				return $$state.merge({
					attrgrpRef : action.payload,
				})
		case 'PRDCLASS_FORM_GETSECL' : 
				return $$state.merge({
					selectedKeys : action.sel,
				})	
		// case 'PRDCLASS_FORM_FIELDSCHANGE' : 
		// 		return $$state.merge({
		// 		editData:getFormData($$state.get('editData').toJS(),action.content),
		// 		})  
		case 'PRDCLASS_FORM_SETFORM' : 
				return $$state.merge({
					editData:action.content
				})  
		case 'PRDCLASS_FORM_SETSELECTNODE' : 
				return $$state.merge({
					selectedTreeData:action.content
				})
		case 'PRDCLASS_ATTRGRP_VALUE' : 
				return $$state.merge({
					classattrGrpValue:action.content
				})  
		case 'PRDTYPE_LIST_GETTDETAIL' : 
				return $$state.merge({
					selectedTreeData:action.data.detail,
					formVisitable:action.data.visible,				
				})
			case 'PRDTYPE_FORM_SETLESSFORM' : 
				return $$state.merge({
					lessFormData:action.content
				}) 
		// case 'PRDCLASS_FORM_SETVISIBLE' : 
		// 		return $$state.merge({			
		// 			formVisitable:action.content,				
		// 		}) 								
	  default: 
	      return $$state;
    }
}
