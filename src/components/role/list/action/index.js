import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { user as url } from 'api';

const showForm = (flag, editData = {}, index) => {
	return (dispatch) => {
		dispatch(fetchData('USER_LIST_SHOWFORM', { visible: flag, editData }));
	}
}

const mockData = {
	total:3,
	data:[
		{
			name:销售经理
		},
		{
			name:销售员
		},
		{
			name:公司内勤
		}
	]
}

const getRoleListData = (params) => {
	
	// return (dispatch) => {
	// 	reqwest({
	// 		url: url.user,
	// 		method: "GET",
	// 		data: {
	// 			param: {
	// 				...params.pagination,
	// 				searchMap: params.searchMap,
	// 			}
	// 		},
	// 	},result => {
	// 		dispatch(fetchData('ROLE_LIST_GETROLELISTSUCCESS', { ...result }));
	// 	})
	// }
	dispatch(fetchData('ROLE_LIST_GETROLELISTSUCCESS', mockData));
}



//输出 type 与 方法
export {
	getRoleListData,
}