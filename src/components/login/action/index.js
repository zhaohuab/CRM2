
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
		if(user == "1" && password == "1") {
			setTimeout(()=>{
				dispatch(fetchData('LOGIN_MAIN_LOGIN_START_SUCCESS', {data: mockData}))
			}, 300)
		}
		else {
			dispatch(fetchData('LOGIN_MAIN_LOGIN_START_SUCCESS', {data: {user:"error"}}))
		}
	}
}


//输出 type 与 方法
export {
    login,
}