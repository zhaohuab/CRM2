/**
 * 功能：ajax判断是否登录
 * 参数：request库参数
 * 创建日期：2017-8-1
 */

import request from 'reqwest'
request.ajaxSetup({
    headers: {
        // 后端约定, 用以辨别是否为ajax请求的字段
        'X-Requested-With': 'XMLHttpRequest'
    }
})

// session过期自动跳转登录页面
const reqwest = (options)=> {
    const {success, ...others} = options
    return request({
        ...others,
        success: (resp)=> {
            if (resp.error_code == 10001) {
                // 开启本地代理时, 跳转到代理服务器
                if (/proxy/.test(options.url)) {
                    return window.location.href = window.location.origin + '/login'
                }
                return window.location.href = resp.data.url
            }

            if (success && Object.prototype.toString.call(success) === '[object Function]') {
                success(resp)
            }
        }
    })
}

export default  reqwest