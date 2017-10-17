
import cookie from 'utils/cookie'

const baseDir = cookie('basedir'); // host:ip/crm_web/

const login =  baseDir +'login';

const menu = baseDir + 'sys/menuitem'

const org = {
    org : baseDir + 'sys/org/',
    orgTree : baseDir + 'sys/orgTree/',
}

const user = {
    user : baseDir + 'sys/users',
    userBatch : baseDir + 'sys/users/batch',
    enable : baseDir + 'sys/users/state'  // {id}/state
}

const measure = {
    measure : baseDir + "base/measures",
    measureBatch : baseDir + 'base/measures/batch',
}
const cum = {
    customer : baseDir + 'cum/customers',
}

const role = {
    role : baseDir + 'sys/roles',
}

const prdtype={//这两个路径分别对应请求的哪个资源？哪个是tree的，哪个是具体列表信息的？？
    prdtype:baseDir + 'base/prdtype',
    prdtypeTree:baseDir + 'base/prdtypeTree'
}

const product = {
    product: baseDir + 'base/products',
    productBatch: baseDir + 'base/products/batch',
}

export {
    login,
    menu,
    org,
    user,
    measure,
    cum,
    role,
    prdtype,
    product,
    baseDir,
}