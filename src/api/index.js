
import cookie from 'utils/cookie'

const baseDir = cookie('basedir'); // host:ip/crm_web/

const login =  baseDir +'login';

const menu = baseDir + 'sys/menuitem'

const org = {
    org : baseDir + 'sys/org',
    orgTree : baseDir + 'sys/orgTree',
}

const user = baseDir + 'sys/users'

export {
    login,
    menu,
    org,
    user,
}