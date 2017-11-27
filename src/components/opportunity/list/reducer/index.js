import Immutable from 'immutable'

let $$initialState = {
	
	data:[],
	funnelData:[],
	selectedRows:[],
	selectedRowKeys:[],
	formVisitable:false,
	pagination: {
                pageSize: 20,
                page: 1
            },
	searchMap:{},
	viewFormVisible:false,
	editData:{},
	moreShow:false
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
export default function orgReducers($$state = Immutable.fromJS($$initialState), action){

	switch (action.type) {
			case 'OPPORTUNITY_LIST_GETDATA':
			return $$state.merge({data:action.payload.data})

			case 'OPPORTUNITY_LIST_SHOWFORM':
			return $$state.merge({
				editData:action.payload.editData,
				formVisitable:action.payload.visible,
			})
		
			case 'OPPORTUNITY_LIST_SHOWVIEWFORM':
			return $$state.merge({
				viewFormVisible : action.payload.visible,
				viewData :action.payload.record ,
			})

			case "OPPORTUNITY_LIST_CHANGEVISIBLE": //查询功能显示
            let visit = $$state.get("moreShow");
			return $$state.merge({ moreShow: !visit });
			
			case 'OPPORTUNITY_LIST_CLOSEFORM' :
			return $$state.merge({
				formVisitable:false,
				viewFormVisible:false,
			})
			case 'OPPORTUNITY_LIST_CHANGEVISIBLE':
			return $$state.merge({toolVisible:action.payload.toolVisible})
		
			case "OPPORTUNITY_LIST_SELECTROW": //保存table已选择条件
            return $$state.merge({
                selectedRows: Immutable.fromJS(action.payload.selectedRows),
                selectedRowKeys: Immutable.fromJS(action.payload.selectedRowKeys)
            });


			case 'OPPORTUNITY_LIST_SAVESEARCHMAP':
			return $$state.merge({searchMap:action.payload==undefined?{}:action.payload})
			
			case 'OPPORTUNITY_LIST_ADDSAVE':
			return $$state.merge({
				formVisitable : false,
				viewFormVisible : false,
				data : pageAdd($$state.get("data").toJS(),action.payload),
				viewData:{}
			})
			case 'OPPORTUNITY_LIST_EDITSAVE':
			return $$state.merge({
				formVisitable : false,
				viewFormVisible : false,
				data : pageEdit($$state.get("data").toJS(),action.payload),
				viewData : {},
			})
			
			case 'OPPORTUNITY_LIST_CLOSEPANEL':
			return $$state.merge({
				viewFormVisible : false,
				formVisitable : false,
			})
			case 'OPPORTUNITY_LIST_DELETE':
			return $$state.merge({data:action.payload.data,viewFormVisible:false})

			case 'OPPORTUNITY_LIST_GETFUNNELDATA':
			return $$state.merge({funnelData:action.payload.data})
	    default: 
	        return $$state;
    }
}
