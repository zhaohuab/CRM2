import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { taskcard as url } from 'api/zhb';

const showForm = (visible=false, editData = {}, isEdit = false, bizTypes = []) => {
	return (dispatch) => {
		dispatch(fetchData('TASKCARD_LIST_SHOWFORM', { visible, editData, isEdit, bizTypes }));
	}
}

const getListData = (params) => { //获取列表	
	return (dispatch) => {
		reqwest({
			url: url.taskcard,
			method: "GET",
			data: {
				param: {}
			},
		},result => {
			dispatch(fetchData('TASKCARD_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const onSave4Add = (data) => { //增加
	return (dispatch) => {
		reqwest({
			url: url.taskcard,
			method: "POST",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('TASKCARD_CARD_SAVEADD', {...result, visible: false, isEdit: false }));
		})
	}
}

const onSave4Edit = (data) => { //修改
	return (dispatch) => {
		reqwest({
			url: `${url.taskcard}/${data.id}`,
			method: "PUT",
			data: {
				param: data
			}
		}, result => {
			dispatch(fetchData('TASKCARD_CARD_SAVEEDIT', { ...result, visible: false, isEdit: false }));
		})
	}
}

const onDelete = (rowKeys) => { //删除
	return (dispatch) => {
		reqwest({
			url: url.taskcardBatch,
			method: "DELETE",
			data: {
				param: {
					ids: rowKeys.join(","),
				},
			}
		}, result => {
			dispatch(fetchData('TASKCARD_LIST_GETLISTSUCCESS', { ...result }));
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
			dispatch(fetchData('TASKCARD_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}

const typeSelected = (id) =>{//业务类型选择
	return (dispatch) => {
		reqwest({
			url: `${url.biztype}`,
			method: "GET",
			data: {
				param: {
					moduleId: id+'',
				},
			}
		}, result => {
			dispatch(fetchData('TASKCARD_BIZTYPES_GETLISTSUCCESS', { ...result }));
		})
	}
}

const orderEnable = () => {//允许停用
	return (dispatch) => {
		dispatch(fetchData('TASKCARD_ORDER_ENABLE', { enable:true }));
	}
}

const valueChange = (data) => {//listForm表单域的值改变时写入redux中的editData中
	return (dispatch) => {
		dispatch(fetchData('TASKCARD_VALUE_CHANGE', { editData: data }));
	}
}

const inputChange = (value) => {//搜索按钮input框中的值写入redux
	return (dispatch) => {
		dispatch(fetchData('TASKCARD_INPUT_CHANGE', { searchKey: value }));
	}
}

const selectChange = (value) => {//搜索按钮select框中的值写入redux
	return (dispatch) => {
		dispatch(fetchData('TASKCARD_SELECT_CHANGE', { enableState: value }));
	}
}

const search = (data) => {//按条件搜索
	if(data){
		return (dispatch) => {
			reqwest({
				url: url.taskcard,
				method: "GET",
				data: {
					param: {
						searchMap:data
					},
				}
			    }, result => {
				dispatch(fetchData('TASKCARD_LIST_GETLISTSUCCESS', { ...result }));
			    }
		    )
	    }
	}	
}

//输出 type 与 方法
export {
	getListData,
	onDelete,
	showForm,
	onSave4Add,
	onSave4Edit,
	onEnable,
	typeSelected,
	orderEnable,
	valueChange,
	inputChange,
	selectChange,
	search,
}