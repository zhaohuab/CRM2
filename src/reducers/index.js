import { combineReducers } from 'redux'

//登录
import login from 'components/login/reducer'
//左侧menu树
import commonMenu from 'components/common/menu/reducer'
//头部
import header from 'components/common/header/reducer'
//最外层component
import componentReducer from '../components/reducer.js'
//project目录
import projectList from 'components/project/list/reducer'
//user目录
import userlist from 'components/user/list/reducer'
//organization目录
import orgReducers from 'components/org/orgList/reducer/index.js'
//measure目录
import measureList from 'components/measure/list/reducer/index.js'
//客户
import customerList from '../components/customer/list/reducer/index.js'
//角色
import roleList from '../components/role/list/reducer/index.js'
//产品分类
import prdtype from '../components/prdtype/list/reducer/index.js'
//product目录
import product from '../components/product/list/reducer'
//任务卡
import taskcard from '../components/taskcard/list/reducer'


let rootReducer = combineReducers({
    login,
    commonMenu,
    header,
    componentReducer,
    userlist,
    orgReducers,
    projectList,
    measureList,
    customerList,
    roleList,
    prdtype,
    product,
    taskcard
 });

export { rootReducer }