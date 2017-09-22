import reqwest from 'utils/reqwest'
import fetchData from 'utils/fetchdata'
import { menu as url } from 'api'

const getMenuData = ()=>{
    return (dispatch) => {
		reqwest({
			url: url,
			method:'get',
		},(data) => {
			dispatch(fetchData('COMMON_MENU_GETDATA',{data:data.data}));
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
