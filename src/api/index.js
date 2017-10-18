
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

const cum = {
    customer : baseDir + 'cum/customers',
    userBatch : baseDir + 'sys/users/batch',
    enable : baseDir + 'sys/users/state'  // {id}/state
}

const role = {
    role : baseDir + 'sys/roles',
}

const brand ={
    brand :baseDir + 'base/brands'
}

export {
    login,
    menu,
    org,
    user,
    cum,
    role,
    brand
}