import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { doc as url } from 'api';

const langChange = (lan='zh') =>{
    return (dispatch)=>{
		dispatch(fetchData('DOC_LANG_CHANGE', { lang:lan }))
	}
}
const showForm = (flag,editData={}) =>{
	return (dispatch)=>{
		dispatch(fetchData('DOC_LIST_SHOWFORM', { visible: flag, editData, storage:[] }))
	}
}
const showFormAdd = (flag, editData = {}) => {	
		return (dispatch) => {
			let obj = {};
			let arr = [];
			obj.name='';
			obj.editState='ADD';
			obj.enableState=1;
			obj.key='add'+Math.random().toFixed(5);
			arr.push(obj)
		dispatch(fetchData('DOC_LIST_SHOWFORM_ADD', { visible: flag, editData, dataSource: arr,name:false, description:false }));
	}	
}
const showFormEdit = (flag, editData = {}) => {	
	return (dispatch) => {
		reqwest({
			url: `${url.doc}/${editData.id}`,
			method: "GET",
			data: {
				//param:editData
			}
		}, result => {
			console.log('=========',result.baseDocDetailList)
			if(result.baseDocDetailList.length==0){
				let obj = {};
				obj.name='';
				obj.editState='ADD';
				obj.enableState=1;
				obj.key='add'+Math.random().toFixed(5);
				result.baseDocDetailList.push(obj)	
			}
			for(let i=0,len=result.baseDocDetailList.length;i<len;i++){
				let cur=result.baseDocDetailList[i];
				if(cur.id){
					cur.key=cur.id+'';
				}
			}
			return dispatch(fetchData('DOC_LIST_SHOWFORM_EDIT', { visible: flag, editData:result, dataSource: result.baseDocDetailList, isDefault:result.isDefault }));
		})
      
    }	
}
const getListData = (params) => {
	
	return (dispatch) => {
		reqwest({
			url: url.doc,
			method: "GET",
			data: { 
				param: {
					...params.pagination,
					searchMap: params.searchMap,
				}
			},
		},result => {
			console.log('result=============',result)
			dispatch(fetchData('DOC_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const onSave4Add = (data, index) => {
	return (dispatch) => {
		reqwest({
			url: url.doc,
			method: "POST",
			data: {
				param:data
			}
		}, result => {		
			dispatch(fetchData('DOC_CARD_SAVEADD', { ...result, visible: false, storage:[],editData:{}}));
		})
	}
}

const onSave4Edit = (data, index) => {
	console.log('data==========',data)
	return (dispatch) => {
		reqwest({
			url: `${url.doc}/${data.id}`,
			method: "PUT",
			data: {
				param:data
			}
		}, result => {
			dispatch(fetchData('DOC_CARD_SAVEEDIT', { ...result, visible: false, storage:[] }));
		})
	}
}

const onDelete = (rowKeys, params) => {
	return (dispatch) => {
		reqwest({
			url: url.docBatch,
			method: "DELETE",
			data: {
				param: {
					ids: rowKeys.join(","),
					...params.pagination,
					searchMap: params.searchMap,
				},
			}
		}, result => {
			dispatch(fetchData('DOC_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const onEnable = (rowKeys, enable, params) => {
	return (dispatch) => {
		reqwest({
			url: `${url.enable}`,
			method: "PUT",
			data: {
				param: {
					ids: rowKeys.join(","),
					enableState: enable,
					...params.pagination,
					searchMap: params.searchMap,
				},
			}
		}, result => {
			dispatch(fetchData('DOC_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

//=============以下是弹框中的方法
//表单中的方法
const valueChange=(data)=>{
	return (dispatch)=>{
		dispatch(fetchData('DOC_FORM_CHANGE',{editData:data}))
	}
  }


//table中的方法
const onBlur=(data)=>{

  return (dispatch)=>{
	  dispatch(fetchData('DOC_INPUT_CHANGE',{dataSource:data}))
  }
}

const changeEnabe = (data) => {
	return dispatch => {
		dispatch(fetchData('DOC_SELECT_CHANGE',{dataSource:data}))
	}
}

const storage = (data) => {//储存改动过的数据
	return dispatch => {
		dispatch(fetchData('DOC_DETAIL_STORAGE',{storage:data}))
	}
}

const detailDelete = (data) =>{
	return dispatch => {
		if(data.length==0){
			let obj = {};
			obj.name='';
			obj.editState='ADD';
			obj.enableState=1;
			obj.key='add'+Math.random().toFixed(5);
			data.push(obj)
		}
		dispatch(fetchData('DOC_DETAIL_DELETE',{dataSource:data}))
	}
}
 const detailAdd = (data) => {
	return dispatch => {
		dispatch(fetchData('DOC_DETAIL_ADD',{dataSource:data}))
	}
 }
export {
	langChange,
	getListData,
	onDelete,
	showForm,
	onSave4Add,
	onSave4Edit,
	onEnable,
	showFormAdd,
	showFormEdit,
	onBlur,
	changeEnabe,
	storage,
	detailDelete,
	detailAdd,
	valueChange,
}