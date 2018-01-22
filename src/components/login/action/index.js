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
				//登录成功后，根据登录人角色获取功能权限。
				const roleId = getInfo("roleid");
				reqwest({
					url: role.role+"/"+roleId+"/funcres",
					method: 'GET',
					data: {
						param: { roleId },
					}
				}, (result) => {
						const data = result.data
						let code = ""
						for(let i=0;i<data.length;i++){
							code += " \.";
							code += data[i].resRemark;
						}
						code += " {display:none;}"
						code.replace(".",'\\.')
						debugger
						var head = document.head || document.getElementsByTagName('head')[0];
						var style = document.createElement('style');
						style.rel = 'stylesheet';
						style.type = 'text/css';
						style.id = "sys_func"
						style.appendChild(document.createTextNode(code));
						head.appendChild(style);
						// return style.sheet || style.styleSheet;
						dispatch(fetchData('LOGIN_MAIN_LOGIN_START_SUCCESS', {}))
				})
			}

		})
	}
}

const setLogout = () => {
	return dispatch => {
		dispatch(fetchData("LOGIN_MAIN_SETLOGOUT", {}));
	};
};

//输出 type 与 方法
export { login, setLogout };
