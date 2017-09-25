import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { login as url } from 'api';

//定义方法 action
const login = (params) => {
	
	return (dispatch) => {
	    dispatch(fetchData('LOGIN_MAIN_LOGIN_START', {}))
		const { user,password } = params;
		console.info(url);
		reqwest({
			url: url,
			method : 'POST',
			data : {
				param : JSON.stringify({username:user,password}),
			}
		},(result) => {
			dispatch(fetchData('LOGIN_MAIN_LOGIN_START_SUCCESS', {}))
		})
	}
}


//输出 type 与 方法
export {
    login,
}