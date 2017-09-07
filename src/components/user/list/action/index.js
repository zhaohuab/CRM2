
//定义key， type

let table_params = {
	url:'',
	data: {
	}
}

let mockData = [{
	name:"粤海",
	begintime:"2017-07-31 12:00:00",
	type: "1",
	personnum:6,
	stage:"0.2",
	owner: [{
		key:"dev",
		value:"研发部"
	},{
		key:"guankx",
		value:"关凯旋"
	}],
	marks: "这是一个粤海项目",
	isbusy : "N",
    }]

const showForm = (flag, editData={}, index) => {
    const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
    }
    return (dispatch) => {
        dispatch(fetchData('PROJECT_LIST_SHOWFORM',{visible:flag, editData}));
    }
}
//定义方法 action
const getListData = (params) => {
	const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
    }
	return (dispatch) => {
	    //dispatch(fetchData('GET_LIST_DATA', {}))
	    setTimeout(()=>{
	  	    dispatch(fetchData('PROJECT_LIST_GETDATA', {data: mockData}))
	    }, 300)
	}
}

const onDelete = (record,index) => {
    const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
	}
	debugger
    mockData.splice(index,1);
	return (dispatch) => {
	    //dispatch(fetchData('GET_LIST_DATA', {}))
	    setTimeout(()=>{
	  	    dispatch(fetchData('PROJECT_LIST_GETDATA_SUCCESS', {data: mockData}))
	    }, 300)
	}
}

const onAdd = (data) => {
    const fetchData = (type, payload) => {
        return {
            type,
            payload,
        }
    }
    mockData.push(data);
	return (dispatch) => {
	    //dispatch(fetchData('GET_LIST_DATA', {}))
	    setTimeout(()=>{
	  	    dispatch(fetchData('PROJECT_LIST_GETDATA_SUCCESS', {data: mockData,visible: false}))
	    }, 300)
	}
}

const onEdit = (data, index) => {
    const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
    }
    mockData[index] = data;
	return (dispatch) => {
	    //dispatch(fetchData('GET_LIST_DATA', {}))
	    setTimeout(()=>{
	  	    dispatch(fetchData('PROJECT_LIST_GETDATA_SUCCESS', {data : mockData}))
	    }, 300)
	}
}

//输出 type 与 方法
export {
    getListData,
    onDelete,
    onAdd,
    onEdit,
    showForm,
}