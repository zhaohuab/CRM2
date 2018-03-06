import cookie from "utils/cookie";

let baseDir = cookie("basedir"); // host:ip/crm_web/

const login = baseDir + "login";

const menu = baseDir + "sys/menuitem";

const org = {
    org: baseDir + "sys/orgs",
    orgTree: baseDir + "sys/orgs/orgTree"
};

const user = {

    listTpl: baseDir + "sys/users/template/list",
    addTpl: baseDir + "sys/users/template/add",
    editTpl: baseDir + "sys/users/template/edit",

    user: baseDir + "sys/users",
    userBatch: baseDir + "sys/users/batch",
    enable: baseDir + "sys/users/state" ,// {id}/state
    userref: baseDir + "sys/users/ref"
};

const measure = {
    measure: baseDir + "base/measures",
    measureBatch: baseDir + "base/measures/batch"
};
const cum = {
    customer: baseDir + "cum/customers",
    doc: baseDir + "cum/customers/docs",
    cumref: baseDir + "cum/customers/ref",
};


//线索
const lead = {
    lead: baseDir + "sprc/leads",
    doc: baseDir + "sprc/leads/docs"
}
//任务调度
const quartz = {
    quartz: baseDir + "quartz/tasks",
    taskgroup: baseDir + "quartz/taskgroups"
}


const role = {
    role: baseDir + "sys/roles"
};

const brand = {
    brand: baseDir + "base/brands"
};
const prdtype = {
    prdtype: baseDir + "base/prdtypes",
    prdtypeTree: baseDir + "base/prdtypes/prdtypeTree",
    prdtyperef: baseDir + "base/prdtypes/reftree",
};

const product = {
    product: baseDir + "base/products",
    productBatch: baseDir + "base/products/batch"
};

const contacts = {
    contacts: baseDir + "cum/contacts",
    ref: baseDir + "cum/contacts/ref",
    dynamic: baseDir + "cum/contacts/dynamic",
};

const visitRouter = {
    visit: baseDir + "sact/visitroutes"
};

const taskcard = {//任务卡
    taskcard: baseDir + 'sact/taskcards',
    taskcardBatch: baseDir + 'sact/taskcards/batch',
    enable: baseDir + 'sact/taskcards/state',
    biztype:baseDir + 'sact/taskcards/biztypes'
}
const doc = {//档案管理
    doc: baseDir + 'base/docs',
    docBatch: baseDir + 'base/docs/batch',
    enable: baseDir + 'base/docs/state' 
}

const sysinit = {
    mainEditTpl: baseDir + "sys/sysinit/template/edit",
    info: baseDir + "sys/sysinit/info",
    org: baseDir + 'sys/sysinit/org',
    adminList: baseDir + 'sys/sysinit/adminlist',
}
const opportunity = {
    opportunity: baseDir + 'sprc/opportunities',
}

const oppaction = {
    oppaction: baseDir + 'sprc/oppactions',
    doc: baseDir + "sprc/oppactions/docs",
}

const oppstage = {
    oppstage: baseDir + 'sprc/oppstages',
    all: baseDir + 'sprc/oppstages/all',
}

const oppdimension = {
    oppdimension: baseDir + 'sprc/oppdimensions',
    doc: baseDir + "sprc/oppdimensions/docs",
    all: baseDir + 'sprc/oppdimensions/all',
}

const oppflow = {
    oppflow: baseDir + 'sprc/oppflows',
    doc: baseDir + "sprc/oppflows/docs",
}
const prdattr = {
    prdattr: baseDir + 'base/attrs',
}

const prdattrgroup = {
    prdattrgroup: baseDir + 'base/attrgroups',
}

const phonebooks = {//通讯录
    mydept: baseDir + 'csns/phonebooks/mydept',
    organizations: baseDir + 'csns/phonebooks/organizations',
    search: baseDir + 'csns/phonebooks/search',
    sub: baseDir + 'csns/phonebooks/sub',
}

const func = {
    func: baseDir + "sys/functions"
};
const approval = {
    notfinished: baseDir + 'bpub/approvals/notfinished',
    finished: baseDir + 'bpub/approvals/finished',
    todo: baseDir + 'bpub/approvals/todo',
    done: baseDir + 'bpub/approvals/done',
    histories: baseDir + 'bpub/approvals/details/histories',
    details: baseDir + 'bpub/approvals/details',
    historyStatus: baseDir + 'bpub/approvals/histories',
    actions: baseDir + 'bpub/approvals/actions',
    todototal: baseDir + 'bpub/approvals/todototal',
    notfinishedtotal: baseDir + 'bpub/approvals/notfinishedtotal',
    remind: baseDir + '/bpub/approvals/remind'
}
const visitrules = {//拜访规则
    visitrules: baseDir + 'sact/visitrules',
    enable: baseDir + '/sact/visitrules/state',
}
const speech = {
    saletalk: baseDir + 'sact/saletalk'
}
const finishtask ={
    finishtask:baseDir+'sact/cumevent'
}
 const cusInquire={//客户所有查询方案接口
     groupLsit:baseDir+'cum/groupcustomers/querytemplate',
 }


const upload ={
     upload:baseDir+'sys/upload'
 }
const industry = {
     ref : baseDir + "base/industrys/reftree",
 }
const distributed = {//客户分布
    department: baseDir+'cum/customerchart',//获取部门（人员）、客户数量
    customer: baseDir+'cum/customerchart/customers',//获取客户数据
}
const cusStatus = {//客户状态
    department: baseDir+'cum/customerchart',//获取部门（人员）、客户数量
    customer: baseDir+'cum/customerchart/customers',//获取客户数据
    echarts: baseDir+'cum/customerchart/ratio',
}
const approval = {//客户中审批流设置
    approval: baseDir+'bpub/approvals/processes',
}

export {
    login,
    menu,
    org,
    user,
    measure,
    cum,
    lead,
    role,
    brand,
    prdtype,
    product,
    baseDir,
    contacts,
    sysinit,
    opportunity,
    oppaction,
    visitRouter,
    oppstage,
    oppdimension,
    oppflow,
    prdattr,
    prdattrgroup,
    phonebooks,
    func,
    quartz,
    approval,
    speech,
    finishtask,
    cusInquire,
    upload,
    industry,
    visitrules,
    distributed,
    cusStatus,
    approval,
}
