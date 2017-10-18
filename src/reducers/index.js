import { combineReducers } from 'redux'

//登录
import login from 'components/login/reducer'
//左侧menu树
import commonMenu from 'components/common/menu/reducer'
//头部
import header from 'components/common/header/reducer'
//project目录
import projectList from 'components/project/list/reducer'

//user目录
import userlist from 'components/user/list/reducer'

//organization目录
import orgReducers from '../components/org/orgList/reducer/index.js'

//客户
import customerList from '../components/customer/list/reducer/index.js'

//角色
import roleList from '../components/role/list/reducer/index.js'

//品牌
import brandList from '../components/brand/list/reducer/index.js'

import componentReducer from 'components/reducer.js'
let rootReducer = combineReducers({
    login,
    commonMenu,
    header,
    userlist,
    orgReducers,
    projectList,
    customerList,
    roleList,
    componentReducer,
    brandList
 });

export { rootReducer }