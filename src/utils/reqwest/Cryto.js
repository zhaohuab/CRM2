import des from 'des.js'
import {Buffer} from 'buffer'
import b64 from 'base64-js'

import { stringToByte,byteToString} from './ByteStringUtil'

const KEY = Buffer.from("12345678","utf-8");
const IV = Buffer.from("12345678","utf-8");


const encrypt = (content) => {
    if(!content) {
        return;
    }
    //转为byte数组
    content = stringToByte(content);
    let CBC = des.CBC.instantiate(des.DES);
    let enc = CBC.create({
        type: 'encrypt',
        key: KEY,
        iv: IV
    });
    //加密，结果为byte[]
    let result = enc.final(content);
    //转为b64字符串
    let b64str = b64.fromByteArray(result);
    return b64str;
}

const decrypt = (content) => {
    //b64解码
    content = b64.toByteArray(content);
    let CBC = des.CBC.instantiate(des.DES);
    let dec = CBC.create({
        type: 'decrypt',
        key: KEY,
        iv: IV
    });
    //解密
    content = dec.final(content);
    content = byteToString(content);
    return content;
}


export {
    encrypt,
    decrypt,
}