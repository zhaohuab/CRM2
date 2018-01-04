import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { role as url } from 'api';
import funcTreeData from '../container/data'

console.log("url"+url)
const showRoleForm = (flag, editData = {}, index) => {
	return (dispatch) => {
		dispatch(fetchData('ROLE_LIST_SHOWFORM', { visible: flag, editData }));
	}
}

const mockData = {
	total:3,
	data:[
		{
			code:"3eew",
			name:'销售经理',
			org:'fdsfeww'
		},
		{
			code:"wqe",
			name:'销售员',
			org:'234ds'
		},
		{
			code:"dsf",
			name:'公司内勤',
			org:'sdfwe'
		}
	]
}


const transData = (data) => {
	data.orgId = data.orgId.key
	return data;
}

const getRoleListData = () => {
	
	return (dispatch) => {
		reqwest({
			url: url.role,
			method: "GET",
			data: {
			},
		},result => {
			dispatch(fetchData('ROLE_LIST_GETROLELISTSUCCESS', { ...result }));
		})
	}
}

const getFuncTreeData = () => {
	return (dispatch)=>{
		dispatch(fetchData("ROLE_LIST_GETFUNCTREESUCCESS",funcTreeData))
	}

}
const selectRow = (selectedRows, selectedRowKeys) => {
    return (dispatch)=>{
		dispatch(fetchData("ROLE_LIST_SELECTROW",{selectedRows,selectedRowKeys}))
	}
};
const selectRowTab = (rowId,tabIndex) => {
	debugger
    return (dispatch) => {
		reqwest({
			url: `${url.role}/${rowId}`,
			method: "GET",
			data: {
				tabIndex:tabIndex,
			},
		},result => {
			dispatch(fetchData('ROLE_LIST_SELECTROWTAB', { ...result }));
		})
	}
};
const onTabClick = (tabIndex) => {
    return (dispatch)=>{
		dispatch(fetchData("ROLE_LIST_TABSELECT",{tabIndex}))
	}
};

const onSaveRole4Add = (data, index) => {
	return (dispatch) => {
		reqwest({
			url: url.role,
			method: "POST",
			data: {
				param: transData(data)
			}
		}, result => {
			dispatch(fetchData('ROLE_CARD_SAVEADD', { ...result}));
		})
	}
}

const onSaveRole4Edit = (data, index) => {
	return (dispatch) => {

		reqwest({
			url: `${url.role}/${data.id}`,
			method: "PUT",
			data: {
				param: transData(data)
			}
		}, result => {
			dispatch(fetchData('ROLE_CARD_SAVEEDIT', { ...result}));
		})
	}
}

const onDelete = (id) => {
	return (dispatch) => {
		reqwest({
			url: url.role+"/"+id,
			method: "DELETE",
			data: {
				// param: {
				// 	ids: ids.join(","),
				// },
			}
		}, result => {
			if(result.flag){
				dispatch(fetchData('ROLE_LIST_DELETESUCCESS', id));
			}
			
		})
	}
}


//输出 type 与 方法
export {
	getRoleListData,
	showRoleForm,
	onSaveRole4Add,
	onSaveRole4Edit,
	onDelete,
	getFuncTreeData,
	selectRow,
	onTabClick,
	selectRowTab,
}