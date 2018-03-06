import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { visitrules as url } from 'api';

const showForm = (visible=false, editData = {}) => {
	return (dispatch) => {
		dispatch(fetchData('VISITRULES_LIST_SHOWFORM', { visible, editData }));
	}
}

const getListData = (params) => { //获取列表	
	return (dispatch) => {
		reqwest({
			url: url.visitrules,
			method: "GET",
			data: {
				param: {}
			},
		},result => {
			dispatch(fetchData('VISITRULES_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const onSave4Edit = (id,data) => { //修改
	return (dispatch) => {
		reqwest({
			url: `${url.visitrules}/${id}/taskcards`,
			method: "POST",
			data: {
				param:data
			}
		}, result => {
			dispatch(fetchData('VISITRULES_CARD_SAVEEDIT', { visible: false }));
			reqwest({
				url: url.visitrules,
				method: "GET",
				data: {
					param: {}
				},
			},result => {
				dispatch(fetchData('VISITRULES_LIST_GETLISTSUCCESS', { ...result }));
			})
		})
	}
}

const onEnable = (rowKeys, enable) => {//停启用
	return (dispatch) => {
		reqwest({
			url: `${url.enable}`,
			method: "PUT",
			data: {
				param: {
					id: rowKeys.join(","),
					enableState: enable,
				},
			}
		}, result => {
			dispatch(fetchData('VISITRULES_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const requiredChange = (data) => {//必输非必输转换
	return (dispatch) => {
		dispatch(fetchData('VISITRULES_REQUIRED_CHANGE', { checkedData: data }));
	}
}

const inputChange = (value) => {//搜索按钮input框中的值写入redux
	return (dispatch) => {
		dispatch(fetchData('VISITRULES_INPUT_CHANGE', { searchKey: value }));
	}
}

const selectChange = (value) => {//搜索按钮select框中的值写入redux
	return (dispatch) => {
		dispatch(fetchData('VISITRULES_SELECT_CHANGE', { enableState: value }));
	}
}

const search = (data) => {//按条件搜索
	if(data){
		return (dispatch) => {
			reqwest({
				url: url.visitrules,
				method: "GET",
				data: {
					param: {
						searchMap:data
					},
				}
			    }, result => {
				dispatch(fetchData('VISITRULES_LIST_GETLISTSUCCESS', { ...result }));
			    }
		    )
	    }
	}	
}

const cardData = (data) => {//弹出框中拜访卡数据
	return (dispatch) => {
		dispatch(fetchData('VISITRULES_CARD_VALUE', { dataSource: data }));
	}
}

const checkedData = (data) => {//选中保存的任务卡集合
	return (dispatch) => {
		dispatch(fetchData('VISITRULES_CHECKED_TASKCARD', { checkedData: data }));
	}
}

const returnCards = (visible=false,data) => {//拖拽数据源初始化
    let id = 0;
    let taskcardList = data.taskcardList.map(item=> {
      id++     
      return { 
        isChoosed: true,
        isUse: true,
        id: id,
        text: item
        }    
      })
    
    let uncheckedList = data.uncheckedList.map(item => {
       id++;    
      return {
        isChoosed: false,
        isUse: false,
        id: id,
        text: item
      }
    })
    let checkedData = data.taskcardList;
	let dataSource = taskcardList.concat(uncheckedList); 
	let initalState = {
		left:false,
		right:true,
		cards:dataSource
	}
	return (dispatch) => {
		dispatch(fetchData('VISITRULES_LIST_SHOWFORM', { visible, editData:data }));
		dispatch(fetchData('VISITRULES_INITAL_STATE', { initalState: initalState }));
	}
  }
  
const changeState = (data) => {
	return (dispatch) => {
		dispatch(fetchData('VISITRULES_INITAL_STATE', { initalState: data }));
	}
}

//输出 type 与 方法
export {
	getListData,
	showForm,
	onSave4Edit,
	onEnable,
	requiredChange,
	inputChange,
	selectChange,
	search,
	cardData,
	checkedData,
	returnCards,
	changeState
}