/**
 * 功能：ajax判断是否登录
 * 参数：request库参数
 * 创建日期：2017-8-1
 */
import request from 'reqwest'
import handle from './HandleReqwest'

request.ajaxSetup({
    headers: {
        // 后端约定, 用以辨别是否为ajax请求的字段
        'X-Requested-With': 'XMLHttpRequest',
        // "type":"application/x-www-form-urlencoded"
    }
})

// session过期自动跳转登录页面
const reqwest = (options,success,fail)=> {
    request({
        type:"application/x-www-form-urlencoded",
        ...options
    })
    .then((result) => {
        handle(result);
        if(result.response) {
            success(JSON.parse(result.response));
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

export default  reqwest