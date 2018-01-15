const getInfo = (key) => {
    let str = document.cookie
    let reg = /([^ =;]+)=([^ =;]+)/g
    const cookieObj = {}
    str.replace(reg, function () {
        cookieObj[arguments[1]] = arguments[2]
    })
    if (typeof key == "undefined") {
        return cookieObj
    }
    //去除汉语中cookie带有的引号
    return decodeURI(cookieObj[key]).replace(/\"/g,"");
}

export default getInfo