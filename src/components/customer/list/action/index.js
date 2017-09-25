import reqwest from 'reqwest'
import { message} from 'antd';
//定义key， type

let mockData = {
data:[{
        id:"666",
        name:"腾讯",
        cannelType:"0",
        level: "1",
        saleArea:"华北",
        industry:"挖煤",
        regAddr: "北京"
    },{
        id:"777",
        name:"联通",
        cannelType:"0",
        level: "1",
        saleArea:"东北",
        industry:"纺织",
        regAddr: "北京"
    },{
        id:"999",
        name:"石化",
        cannelType:"0",
        level: "1",
        saleArea:"华南",
        industry:"种地",
        regAddr: "北京"
    }]
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
	  	    dispatch(fetchData('CUSTOMER_LIST_GETDATA', {data: mockData}))
	    }, 300)
	}
}

const showAddForm=()=>{
   return{
       type:'CUSTOMER_LIST_SHOWADDFORM'
   }
}

const closeAddForm=()=>{
    return{
        type:'CUSTOMER_LIST_CLOSEADDFORM'
    }
 }

const testFunc = () => {
    reqwest({
        url: "http://10.1.204.74:8081/crm_web/sys/org/",
        type:"application/x-www-form-urlencoded",
        method:'get',
        data:{
            param: JSON.stringify({
                pageSize:20,
                page:1
            })
        }
    })
    .then(function (dataResult) {
        debugger
        let data=JSON.parse(dataResult.response);
        // dispatch(fetchData('ORG_LIST_GETLISTSUCCESS', {data: data.data.data}));
        message.success('获取数据成功');
    })
    .fail(function (err, msg) {
        debugger
        message.error('获取数据失败');
    })
}


//输出 type 与 方法
export {
    getListData,
    showAddForm,
    testFunc
}