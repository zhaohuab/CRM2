import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';

const mockData = {
	data:[]
}

const getListData = (params) => {
	
	return (dispatch) => {
		// reqwest({
		// 	url: url.user,
		// 	method: "GET",
		// 	data: {
		// 		param: {
		// 			...params.pagination,
		// 			searchMap: params.searchMap,
		// 		}
		// 	},
		// },result => {
			dispatch(fetchData('MEASURE_LIST_GETLISTSUCCESS', /*{ ...result }*/mockData));
		//})
	}
}

//输出 type 与 方法
export {
	getListData,
}