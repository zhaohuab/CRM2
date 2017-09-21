import reqwest from 'utils/reqwest'
import fetchData from 'utils/fetchData'
import { menu as url } from 'api'

const getMenuData = ()=>{
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

const changeHeader = (title) => {

    return (dispatch) => {
        dispatch(fetchData('HEADER_CHANGE', {title}));
    }
}

export {
	getMenuData,
	changeHeader,
}
