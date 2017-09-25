import fetchData from 'utils/fetchData';
import reqwest from 'utils/reqwest';
import fail from 'utils/reqwest/fail.js';
import { login as url } from 'api';

//定义方法 action
const login = (params) => {
	
	return (dispatch) => {
	    dispatch(fetchData('LOGIN_MAIN_LOGIN_START', {}))
		const { user,password } = params;
		reqwest({
			url: url,
			method : 'POST',
			data : {
				param : JSON.stringify({username:user,password}),
			}
		})
		.then((result) => {	
			dispatch(fetchData('LOGIN_MAIN_LOGIN_START_SUCCESS', {}))
		})
		.fail((result) => {
			fail(result);
		})
	}
}


//输出 type 与 方法
export {
    login,
}