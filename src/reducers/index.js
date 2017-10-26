import { combineReducers } from "redux";

//登录
import login from "components/login/reducer";
//左侧menu树
import commonMenu from "components/common/menu/reducer";
//头部
import header from "components/common/header/reducer";
//最外层component
import componentReducer from "../components/reducer.js";
//project目录
import projectList from "components/project/list/reducer";
//user目录
import userlist from "components/user/list/reducer";
//organization目录
import orgReducers from "components/org/orgList/reducer/index.js";
//measure目录
import measureList from "components/measure/list/reducer/index.js";
//客户
import customerList from "../components/customer/list/reducer/index.js";
//角色
import roleList from "../components/role/list/reducer/index.js";
//产品分类
import prdtype from '../components/prdtype/list/reducer/index.js'
//product目录
import product from "../components/product/list/reducer";
//品牌
import brandList from '../components/brand/list/reducer/index.js'
//系统初始化
import sysinit from '../components/sysinit/reducer/index.js'
//联系人
import contacts from "components/contacts/contactList/reducer/index.js";
//任务卡
import taskcard from '../components/taskcard/list/reducer'
//档案管理
import doc from '../components/doc/list/reducer'

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
    brandList,
    prdtype,
    product,
<<<<<<< HEAD
    taskcard,
    doc
=======
    contacts,
    sysinit,
    taskcard,
>>>>>>> 4cc6d46dd143b84354126771382b180a7eef59cb
 });

export { rootReducer };
