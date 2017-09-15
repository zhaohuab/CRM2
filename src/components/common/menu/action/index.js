import reqwest from 'utils/reqwest'

const getMenuData = ()=>{
    const fetchData = (type,payload)=>{
        return {
            type,payload
        }
    }
    return (dispatch) => {
		reqwest({
			url: 'http://10.11.112.46:8081/crm_web/sys/menuitem',
		type:"application/x-www-form-urlencoded",
			method:'get',
			data:{
				username:'000',
				tenantId:'111'
			}
		})
		.then(function (data) {
			dispatch(fetchData('COMMON_MENU_GETDATA',{data:JSON.parse(data.response).data}));
		})
		.fail(function (err, msg) {
		})  
    }
}
export {
    getMenuData
}