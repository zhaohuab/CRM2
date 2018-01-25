import { combineReducers } from "redux";

//登录
import login from "components/login/reducer";
//左侧menu树
import commonMenu from "components/common/menu/reducer";
//头部
 import header from "components/common/header/reducer";
//云审批
import approval from "components/home/reducer/approval.js"
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
//集团客户
import customerGroupList from "../components/customer/groupList/reducer/index.js";
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
import doc from
'../components/doc/list/reducer'
//商机
import opportunityList from '../components/opportunity/list/reducer/index.js'
//商机动作
import oppactionlist from 'components/oppaction/list/reducer'
//拜访路线
import visitroute from "components/visitroute/list/reducer/index.js";
//拜访规则
import visitrules from '../components/visitrules/list/reducer'
//商机阶段
import oppstagelist from 'components/oppstage/list/reducer'
//商机维度
import oppdimensionlist from 'components/oppdimension/list/reducer';
//商机流程
import oppflowList from 'components/oppflow/list/reducer';
//产品属性
import prdattr from 'components/prdattr/list/reducer';
//产品属性组
import prdattrgroup from 'components/prdattrgroup/list/reducer';
//表单管理
import businessObjDef from 'components/business-obj-def/reducer';

//客户公司分配
import cusAssignReducers from 'components/customer/assign/reducer'
//客户集团分配
import cusGroupAssignReducers from 'components/customer/groupAssign/reducer'

//线索
import lead from 'components/lead/list/reducer';
//任务调度
import quartz from 'components/quartz/list/reducer'

//客户分布
import cusDistributed from 'components/customer-distributed/reducer';

let rootReducer = combineReducers({ 
    login, 
    doc,
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
    taskcard,
    doc,
    contacts,
    sysinit,
    opportunityList,
    oppactionlist,
    visitroute,
    visitrules,
    oppstagelist,
    oppdimensionlist,
    oppflowList,
    prdattr,
    prdattrgroup,
    businessObjDef,
    cusAssignReducers,
    cusGroupAssignReducers,
    customerGroupList,
    cusDistributed,
    lead,
    quartz,
    cusAssignReducers,
    approval
});

export { rootReducer };
