import Immutable from 'immutable'

let initialState = {
    initialData:[],
    data:{voList:[{
        id:'1',
        orgName:'用友股份',
        cumEnumValueName:'重点客户',
        enableStateName: '启用',
        taskcardList:[{taskcardId:1,orderNum:1,required:1,taskcardName:'s'},
            {taskcardId:2,orderNum:2,required:1,taskcardName:'n'}]
    }]},
    loading: false,
	selectedData:[
        // //{taskcardId:1,orderNum:1,required:1,taskcardName:'s'},
        // {taskcardId:2,orderNum:2,required:1,taskcardName:'n'},       
    ],
    leftData:[
        // {taskcardId:4,orderNum:4,required:1,taskcardName:'left4'},
        // {taskcardId:3,orderNum:3,required:1,taskcardName:'left3'}
    ],
    visible:false,  
    editData:[],
   
};


export default function reducer ($$state = Immutable.fromJS(initialState), action) {

    switch(action.type){

        case 'VISITRULES_LIST_GETLISTSUCCESS' :
            return $$state.merge({
	        	loading: false,
				data: action.content,
			})         
        case 'VISITRULES_LIST_SHOWFORM':        
            return $$state.merge({
                visible : action.content.visible,
                editData:action.content.editData,
            })
        case 'VISITRULES_CARD_CHANGESELECTED'://新增or删除选中卡片
            return $$state.merge({
                leftData: action.content.leftData,
                selectedData: action.content.selectedData
            })
        case 'VISITRULES_CARD_HANDLECHANGE'://排序 是否必输
            return $$state.merge({
                selectedData: action.content.selectedData
            })  
        case 'VISITRULES_CARD_SAVEDSUCCESS'://保存
            return $$state.merge({
                data: action.content.data,
                visible : action.content.visible,
            })     
        default:
            return $$state;
      
    }
}

