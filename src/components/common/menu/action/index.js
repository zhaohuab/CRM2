import reqwest from 'utils/reqwest'
import { menu as url } from 'api'

const getMenuData = ()=>{
    const fetchData = (type,payload)=>{
        return {
            type,payload
        }
    }
    return (dispatch) => {
		reqwest({
			url: url,
			type:"application/x-www-form-urlencoded",
			method:'get',
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