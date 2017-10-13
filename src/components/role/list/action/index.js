import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { user as url } from 'api';

const showForm = (flag, editData = {}, index) => {
	return (dispatch) => {
		dispatch(fetchData('USER_LIST_SHOWFORM', { visible: flag, editData }));
	}
}

const getListData = (params) => {
	
	return (dispatch) => {
		reqwest({
			url: url.user,
			method: "GET",
			data: {
				param: {
					...params.pagination,
					searchMap: params.searchMap,
				}
			},
		},result => {
			dispatch(fetchData('USER_LIST_GETLISTSUCCESS', { ...result }));
		})
	}
}



//输出 type 与 方法
export {
	getListData,
}