import Immutable from 'immutable'

let initialState = {
    initialData:[],
    data:[{name:'拜访卡1',
    orgName:'用友股份',
    refIndexName:'客户等级',
    cumLevelName:'重点客户',
    enableStateName: '启用',
    taskcardList:[{taskcardId:1,orderNum:1,required:1,taskcardName:'s'},{taskcardId:2,orderNum:2,required:1,taskcardName:'n'}]
    }],
    loading: false,
	editData:[],
    visible:false,
    editVisible:false,
    visitCardList:[{
        genderName:'02',
        orgName:'no'
    }],
    selectedVisitData:[],
    saveData:[],
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
		if(data[i].code == item.code) {
			data[i] = item;
			break;
		}
	}
	page.data = data;
	return page;
}

export default function reducer ($$state = Immutable.fromJS(initialState), action) {

    switch(action.type){

        case 'VISITRULES_LIST_GETLISTSUCCESS' :
            return $$state.merge({
	        	loading: false,
				data: action.content,
				//visible : action.content.visible,
			})
          
        case 'VISITRULES_LIST_SHOWFORM':
        
            return $$state.merge({
                visible : action.content.visible,
                editData:action.content.editData,
            })
        case 'EDITVISITRULES_LIST_SHOWFORM':
            return $$state.merge({
                editVisible:action.content.editVisible,
                editData: action.content.editData,               
            })
        case 'VISITRULES_CARD_SAVEADD': //新增保存
            return $$state.merge({
                visible : action.content.visible,
                data : pageAdd($$state.get('data').toJS(),action.content)
            })
        case 'VISITRULES_CARD_EDITADD': //编辑保存
       
            return $$state.merge({
                visible : action.content.visible,
                data : pageEdit($$state.get('data').toJS(),action.content)
            })            

        case 'VISITCARD_DATA_SAVE' ://拜访卡输入数据变更时保存
            return $$state.merge({
                visitCardList: action.content
            })

        case 'SELECTEDVISITCARD_DATA_SAVE'://保存选中拜访卡数据
            return $$state.merge({
                selectedVisitData: action.content
            })

        default:
            return $$state;
      
    }
}

