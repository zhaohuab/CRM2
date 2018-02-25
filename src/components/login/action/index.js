import fetchData from "utils/fetchdata";
import reqwest from "utils/reqwest";
import { login as url,role } from "api";
import { codeConstant } from "utils/reqwest/HandleReqwest";
import getInfo from "utils/cookie"
//定义方法 action
const login = (params) => {
	return (dispatch) => {
		dispatch(fetchData('LOGIN_MAIN_LOGIN_START', {}))
		const { user, password } = params;
		reqwest({
			url: url,
			method: 'POST',
			data: {
				param: { username: user, password },
			}
		}, (result) => {
			if (result && result.code && result.code == codeConstant.ServiceFormVaild) {
				//登录失败时result返回错误message信息
				dispatch(fetchData('LOGIN_MAIN_LOGIN_START_FAIL', result.message))
			} else {
				dispatch(fetchData('LOGIN_MAIN_LOGIN_START_SUCCESS', {}))
			}

		})
	}
}

const loginSessionOver = (params) => {
	return (dispatch) => {

		dispatch(fetchData('LOGIN_MAIN_SESSIONOVER',{}))
	}
}

const setLogout = () => {
	return dispatch => {
		dispatch(fetchData("LOGIN_MAIN_SETLOGOUT", {}));
	};
};

//输出 type 与 方法
export { login, setLogout,loginSessionOver };
