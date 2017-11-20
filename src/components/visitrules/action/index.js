import {visitrules as url} from 'api'
import reqwest from 'utils/reqwest'
import fetchData from 'utils/fetchdata';

const changeSelectedCard = (leftData,selectedData) => {//选择 删除 初始赋值
    return{
        type:'VISITRULES_CARD_CHANGESELECTED',
        content: {leftData:leftData,
            selectedData:selectedData}
    }
}

const handleSelectedCard = (selectedData) => { //是否必输项和顺序变化 
    return{
        type:'VISITRULES_CARD_HANDLECHANGE',
        content: {
            selectedData:selectedData}
    }
}

const getListData = () => {

    return (dispatch) => {
        reqwest({
            url: url.visitrules,
            method: "GET",
            data: {
            },
        },result => {
            dispatch(fetchData('VISITRULES_LIST_GETLISTSUCCESS', { ...result }));
        })
    }
}


const onSave4Edit = (id,selectedData,data) => {
	return (dispatch) => {
		
		reqwest({
			url: url.visitrules+'/'+id+'/taskcards',
			method: "POST",
			data: {
				param: selectedData
			}
		}, result => {            
			dispatch(fetchData('VISITRULES_CARD_SAVEDSUCCESS', { data:data, visible: false }));
		})
	}
}

const showCard = (flag,content) => {
    return {        
        type: 'VISITRULES_LIST_SHOWFORM',
        content: {visible : flag,editData:content}
    }
}

export {getListData,  showCard,  onSave4Edit, changeSelectedCard, handleSelectedCard}