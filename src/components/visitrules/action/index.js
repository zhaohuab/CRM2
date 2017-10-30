import {visitrules as url} from 'api'
import reqwest from 'utils/reqwest'
import fetchData from 'utils/fetchdata';


const onDelete = (rowKeys, params) => {
	return (dispatch) => {
		reqwest({
			url: url.visitrules+'/batch',
			method: "DELETE",
			data: {
				param: {
					ids: rowKeys.join(","),
					...params.pagination,
					searchMap: params.searchMap,
				},
			}
		}, result => {
			dispatch(fetchData('VISITRULES_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}
const getCardList = () => {
    return (dispatch) => {
        reqwest({
            url: url.visitrules,
            method: "POST",
            data: {
                param: data
            }
        }, result => {
            dispatch(fetchData('VISITRULES_CARD_GETCARDLISTSUCCESS', { ...result, visible: false }));
        })
    }
}

const getListData = (params) => {

    return (dispatch) => {
        reqwest({
            url: url.visitrules,
            method: "GET",
            data: {
                param: {
                    ...params.pagination,
                    searchMap: params.searchMap,
                }
            },
        },result => {
            dispatch(fetchData('VISITRULES_LIST_GETLISTSUCCESS', { ...result }));
        })
    }
}

const transData = (data)=> {
    let retData = {};
    const keys = data.keys;
    const taskcardList = [];
    let len = keys.length;
    let taskCardIds = data.taskCardId;
    for(let i = 0; i<len-1;i++){
        let k = keys[i];
        const id = taskCardIds[k]['taskCardId-'+k];
        const order = data['taskCardOrder-'+k];
        const required = data['isRequired-'+k];
        taskcardList[i] = {taskcardId:id,orderNum:order, required:required };
    }
    retData.name = data.name;
    retData.orgId = data.orgName;
    retData.refIndex = data.refIndexName;
    retData.cumEnumValue = data.cumEnumValueName;
    retData.taskcardList = taskcardList;    
    return retData; 
}

const onSave4Add = (data) => {
   
    return (dispatch) => {
        reqwest({
         url: url.visitrules,
         method: "POST",
         data: {
             param: transData(data)
         }
        }, result => {
       
         dispatch(fetchData('VISITRULES_CARD_SAVEADD', { ...result, visible: false }));
        })
    }
}

const onSave4Edit = (data) => {
	return (dispatch) => {
		
		reqwest({
			url: url.visitrules+'/'+data.id,
			method: "PUT",
			data: {
				param: transData(data)
			}
		}, result => {
			
			dispatch(fetchData('VISITRULES_CARD_SAVEEDIT', { ...result, visible: false }));
		})
	}
}

const transCardList= (rowData) =>{
    
    let editData = {};
   
    if(rowData !== null && rowData !== undefined && JSON.stringify(rowData) !=="{}"){
        editData.id = rowData.id;
    editData.name = rowData.name;
    editData.orgId = rowData.orgId;
    editData.orgName = rowData.orgName;
    editData.refIndex = rowData.refIndex;
    editData.refIndexName = rowData.refIndexName;
    editData.cumEnumValue = rowData.cumEnumValue;
    editData.cumEnumValueName = rowData.cumEnumValueName;
    editData.enableState = rowData.enableState;
    editData.enableStateName = rowData.enableStateName;
    const taskcardList = rowData.taskcardList;
    const len = taskcardList.length;
    for(let i=1;i<=len;i++){
		editData['taskCardId-'+i] = taskcardList[i-1].taskcardId; 
        editData['taskCardName-'+i] = taskcardList[i-1].taskcardName;
        editData['taskCardOrder-'+i] = taskcardList[i-1].orderNum;
        editData['isRequired-'+i] = taskcardList[i-1].required;
    }
    }
    return editData;
}
const showForm = (flag,content) => {
    
    return {
        type: 'VISITRULES_LIST_SHOWFORM',
        content: {visible : flag,editData:transCardList(content)}
    }
}

const showEditForm = (flag,content) => {
    
    return {
        type: 'EDITVISITRULES_LIST_SHOWFORM',
        content: {editVisible : flag, editData: transCardList(content)}
    }
} 

const handleCardDataChange = (data) => {
    return {
        type: 'VISITCARD_DATA_SAVE',
        content: data,
    }
}

const onSaveSelectedCard = (data) => {
    return {
        type: 'SELECTEDVISITCARD_DATA_SAVE',
        content:data
    }
}

export {getListData, onSave4Add, showForm, showEditForm, getCardList, handleCardDataChange, onSaveSelectedCard, onSave4Edit,onDelete}