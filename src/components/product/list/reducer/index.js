import Immutable from 'immutable'

let initialState = {   
  data:{}, //table数据
  loading: false,
	editData:{},//编辑表单数据
	visible:false,//新增|编辑表单是否可见
	classRefTree:{},//产品分类参照树
	meaunitRefList:[],//计量单位参照列表
	brandRefList:[],//品牌参照列表
	attrgrpRefList:[],//属性组参照列表
	orgRefTree:[],//组织参照列表
	salesunitTable:[],//销售单位table数据
	salesUnitVisible:false,//销售单位table是否可见
	addNum:0,//销售单位新增行数
	changedData:[],//销售单位变更数据
	suSelectedRowKeys:[],//销售单位选中行
	fieldsChangeData:{},	//销售单位变更数据
	lessFormData:{},//查询form数据
	moreFormData:{},//展开查询form数据
	//assignData:[],//分配
	orgTree:[],//组织树
	//isDelete:false,
	isRefered:2,//产品是否被引用 1被引用 2未被引用
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
			Object.assign(data[i] , item);
			break;
		}
	}
	page.data = data;
	return page;
}

function addRow (salesunitTable, item) {
	salesunitTable.push(item);
	return salesunitTable;
}

function addNum(addNum){
	addNum++;
	return addNum;
}

function getFormData(target, source){
	Object.assign(target,source);
	return target;
}

function reducer ($$state = Immutable.fromJS(initialState), action){
  switch(action.type){
    case 'PRODUCT_LIST_GETLISTSUCCESS': 
	    return $$state.merge({
	      loading: false,
				data: action.content,
				visible : action.content.visible,
			})
    case 'PRODUCT_LIST_SHOWFORM':
      return $$state.merge({
				visible : action.content.visible,
				editData : action.content.editData,
      })
    case 'PRODUCT_CARD_SAVEADD':
      return $$state.merge({
				visible : action.content.visible,
				data : pageAdd($$state.get("data").toJS(),action.content),
      })
    case 'PRODUCT_CARD_SAVEEDIT' : 
			return $$state.merge({
				visible : action.content.visible,
				data : pageEdit($$state.get("data").toJS(),action.content),
			})
		case 'PRODUCT_CLASS_GETREFTREE' :
			return $$state.merge({
				classRefTree : action.content,
			}) 
		case 'PRODUCT_MEAUNIT_GETREFLIST' : 
			return $$state.merge({
				meaunitRefList : action.content,
			})  
		case 'PRODUCT_BRAND_GETREFLIST' : 
			return $$state.merge({
				brandRefList : action.content,
			})
		case 'PRODUCT_ATTRGROUP_GETREFLISTDATA' : 
			return $$state.merge({
				attrgrpRefList : action.content,
			})
		case 'PRODUCT_ORG_GETREFLISTDATA' : 
			return $$state.merge({
				orgRefTree : action.content,
			})
		// case 'ADDROW' : 
		// 	return $$state.merge({
		// 		salesunitTable : addRow($$state.get("salesunitTable").toJS(),action.content),
		// 		salesUnitVisible:true
		// 	})   
		case 'PRODUCT_SALESUNIT_VISIBLE' : 
			return $$state.merge({
				salesUnitVisible:action.content
			}) 
		case 'PRODUCT_SALESUNIT_ADDROW' : 
			return $$state.merge({
				salesunitTable: addRow($$state.get("salesunitTable").toJS(),action.content),
				addNum:addNum($$state.get('addNum'))
			}) 
		case 'PRODUCT_SALESUNIT_CHANGEDATA' : 
			return $$state.merge({
				changedData:action.content
			}) 
		case 'PRODUCT_SALESUNIT_SETSECROWKEYS' : 
			return $$state.merge({
				suSelectedRowKeys:action.content
			}) 
		case 'PRODUCT_SALESUNIT_SETSUTABLE' : 
			return $$state.merge({
				salesunitTable:action.content
			})  
		case 'PRODUCT_FORM_SETFORM' : 
			return $$state.merge({
				editData:action.content
			})   
		case 'PRODUCT_FORM_FIELDSCHANGE' : 
			return $$state.merge({
				fieldsChangeData:getFormData($$state.get('fieldsChangeData').toJS(),action.content),
			})  
		// case 'PRODUCT_FORM_RESETFIELDSCHANGE' : 
		// 	return $$state.merge({
		// 		fieldsChangeData:action.content,
		// 	})  
		case 'PRODUCT_FORM_SETADDNUM' : 
			return $$state.merge({
				addNum:action.content
			}) 		
		case 'PRODUCT_LIST_SHOWEDITFORM':
			return $$state.merge({
				visible : action.content.visible,
				editData : action.content.formdata,
				salesunitTable:action.content.formdata.saleUnits,
				isRefered : action.content.isRefered
			})  
		case 'PRODUCT_FORM_SETLESSFORM' : 
			return $$state.merge({
				lessFormData:action.content
			}) 
		case 'PRODUCT_FORM_SETMOREFORM' : 
			return $$state.merge({
				moreFormData:action.content
			})
		// case 'PRODUCT_LIST_DISTRIBUTION' : 
		// 	return $$state.merge({
		// 		assignData:action.content
		// 	})  
		case 'PRODUCT_LIST_GETORGTREE' : 
			return $$state.merge({
				orgTree:action.content
			})	
		case 'PRODUCT_LIST_ASSIGN' : 
			return $$state.merge({
				data : pageEdit($$state.get("data").toJS(),action.content),
			})
		case 'PRODUCT_FORM_SETISREFERED' : 
			return $$state.merge({
				isRefered : action.content,
			})		
												
		default: 
      return $$state;
    }    
}

export default reducer;