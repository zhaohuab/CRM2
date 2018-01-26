import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import { message } from "antd";
import { distributed as url } from 'api/zhb';


const getCustomerItem = (num) => {//这个地方应该在传一个角色id，确定是某个角色下的客户
    return (dispatch) => {
        reqwest({
			url: url.customer,
			method: "GET",
            data: {
                param: {
                    pageSize: 5,
                    page: num,
				}
            }
		},result => {
            //debugger;
			console.log('result=============',result)
			dispatch(fetchData('CUSTOMER_ITEM_LIST_GETLISTSUCCESS', { result }));
        });
	}
}


const getCustomerList = () => {//获取客户数据
    return dispatch => {
        reqwest({
            url: url.department,
            method: "GET",
            data: {}
        }, result=>{
            console.log('xxxxx==========',result)
            dispatch(fetchData('CUSTOMER_DEPARTMENT_LIST_GETLISTSUCCESS', { result }));
        })
    }
}

const transData = (searchMap)=> {
    if (searchMap == null) {
        return searchMap;
    }
    let change = searchMap.province_city_district;
    if (change) {
        searchMap.province = change[0];
        searchMap.city = change[1];
        searchMap.district = change[2];
        delete searchMap.province_city_district;
    }
    return searchMap;
}

//拼接一堆地址
const appendAddress = data => {
    for (let i = 0; i < data.data.length; i++) {
        data.data[i].address =
            String(data.data[i].provinceName) +
            String(data.data[i].cityName) +
            String(data.data[i].districtName) +
            String(data.data[i].street);
    }
    return data;
};

const aa = () => {
    debugger;
    return (dispatch)=>{
        dispatch(fetchData('DOC_LIST_SHOWFORM', { visible: false }))
      }
}

//输出 type 与 方法
export {
    getCustomerList,
    getCustomerItem,
    aa
};
