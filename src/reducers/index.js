import { combineReducers } from 'redux'

//登录
import login from 'components/login/reducer'

//project目录
import projectList from 'components/project/list/reducer'

//user目录
import userlist from 'components/user/list/reducer'

//organization目录

import orgReducers from '../components/org/orgList/reducer/index.js'
//左侧menu树
import commonMenu from 'components/common/menu/reducer'

let rootReducer = combineReducers({
    login,
    projectList,
    userlist,
    orgReducers,
    commonMenu,
 });

export { rootReducer }