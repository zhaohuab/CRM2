/*
* validator中存放所有需要正则验证的规则
* 
**/

let validator = {
    phone: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/ //验证130-139,150-159,180-189号码段的手机号码
};

export default validator;
