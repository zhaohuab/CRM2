/**
 * 功能：ajax判断是否登录
 * 参数：request库参数
 * 创建日期：2017-8-1
 */
import request from 'reqwest'
import handle from './HandleReqwest'
import {encrypt,decrypt} from './Cryto'

request.ajaxSetup({
    headers: {
        // 后端约定, 用以辨别是否为ajax请求的字段
        'X-Requested-With': 'XMLHttpRequest',
    }
})

const reqwest = (options,success,fail)=> {
    let {data,method,url,...others} = options;
    debugger
    let mResult = handleMehtod(method,url,data);
    
    request({
        type:"application/x-www-form-urlencoded",
        ...mResult,
        ...others
    })
    .then((result) => {
        
        handle(result);
        if(result.response) {
            let resp = JSON.parse(result.response);
            let respData = resp.data;
            let decryptData = decrypt(respData)
            success(decryptData ? JSON.parse(decryptData) : undefined);
        }
        else {
            success();
        }
    })
    .fail((result) => {
        handle(result);
        if(fail) {
            if(result.response) {
                fail(JSON.parse(result.response));
            }
        }
    })
}
function handleMehtod(method,url,data) {
    let contentType="";
    if((method.toUpperCase() == "GET" || method.toUpperCase() == "DELETE")) {
        if(data&&data.param) {
            url += "?param=" + encodeURIComponent(encrypt(JSON.stringify(data.param)));
        }
        data = {};
        contentType = "application/x-www-form-urlencoded";
    }
    else {
        data = JSON.stringify({
            param:encrypt(data && data.param ? JSON.stringify(data.param) : undefined)
        })
        contentType = "application/json";
    }
    return {
        method,
        contentType,
        url,
        data,
    }
}
export default  reqwest