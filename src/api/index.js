
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

const prdtype = {
    prdtype:baseDir + 'base/prdtype',
    prdtypeTree:baseDir + 'base/prdtypeTree'
}

const product = {
    product: baseDir + 'base/products',
    productBatch: baseDir + 'base/products/batch',
}

const taskcard = {
    taskcard: baseDir + 'sact/taskcard',
    taskcardBatch: baseDir + 'sact/taskcard/batch',
    enable: baseDir + 'sact/taskcard/state' 
}
const doc = {
    doc: baseDir + 'base/doc',
    docBatch: baseDir + 'base/doc/batch',
    enable: baseDir + 'base/doc/state' 
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
    taskcard,
    doc
}