import reqwest from 'utils/reqwest';
//定义key， type

let table_params = {
	url:'',
	data: {
	}
}

let mockData = {
  user:"litcb",
  token:"d1eracvzcfd",
}
//定义方法 action
const login = (params) => {
	const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
	}
	
	return (dispatch) => {
	    dispatch(fetchData('LOGIN_MAIN_LOGIN_START', {}))
		const { user,password } = params;
		debugger
		reqwest({
			url: 'http://10.11.112.46:8081/crm_web/login',
			method : 'POST',
			data : {
				param : JSON.stringify({username:user,password}),
			}
		})
		.then((result) => {
			debugger
		})
		.fail((result) => {
			debugger
		})
	}
}


//输出 type 与 方法
export {
    login,
}