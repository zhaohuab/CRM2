/**
 * 功能：ajax判断是否登录
 * 参数：request库参数
 * 创建日期：2017-8-1
 */
import request from 'reqwest'
import handle from './HandleReqwest'
import des from 'des.js'
import crypto from 'crypto';
import {Buffer} from 'buffer'
request.ajaxSetup({
    headers: {
        // 后端约定, 用以辨别是否为ajax请求的字段
        'X-Requested-With': 'XMLHttpRequest',
        // "type":"application/x-www-form-urlencoded"
    }
})

// session过期自动跳转登录页面
const reqwest = (options,success,fail)=> {
    let {data,...others} = options;

    var CBC = des.CBC.instantiate(des.DES);
    let v = "3132333435363738";
    var key = new Buffer(v, 'hex');
    var iv = new Buffer(v, 'hex');
    var input = new Buffer(v, 'hex');
    //debugger
    var enc = CBC.create({  
        type: 'encrypt',
        key: key,
        iv: iv
    });
    console.info(key);
    // console.info(enc.update(input));
    // console.info(enc.final())
    var out = enc.update(input).concat(enc.final());
    
    //  var cipher = crypto.createCipheriv('des', key, iv);
    // console.info(cipher.update(input));
    // console.info(cipher.final());
    console.info(out);


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