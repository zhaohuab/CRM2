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
    return cookieObj[key]
}

export default getInfo