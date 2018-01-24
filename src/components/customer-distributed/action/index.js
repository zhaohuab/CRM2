import reqwest from "utils/reqwest";
import { message } from "antd";
import { cum as url, doc, baseDir,oppstage ,opportunity,contacts} from "api";
import { distributed as url } from 'api/zhb';

//包装发给redux的对象
const fetchData = (type, payload) => {
    return {
        type,
        payload
    };
};

/* 
const distributed = {//客户分布
    department: baseDir+'cum/customerchart',//获取部门（人员）、客户数量
    customer: baseDir+'cum/customerchart/customers',//获取客户数据
}
 */

const getCustomerList = () => {//获取客户数据
    return dispatch => {
        reqwest({
            url: `${url.department}`,
            method: "GET",
            data: {
                param: {
                    pageSize: 5,
                    page: 1,
				}
            }
        }, result=>{
            dispatch(fetchData('CUSTOMER_DEPARTMENT_LIST_GETLISTSUCCESS', { ...result }));
        })
    }
  
}

function transData(searchMap) {
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



//输出 type 与 方法
export {};
