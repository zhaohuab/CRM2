import cookie from "utils/cookie";

const baseDir = cookie("basedir"); // host:ip/crm_web/

const login = baseDir + "login";

const menu = baseDir + "sys/menuitem";

const org = {
    org: baseDir + "sys/orgs",
    orgTree: baseDir + "sys/orgs/orgTree"
};

const user = {
    listTpl: baseDir + "sys/users/template/list",
    addTpl: baseDir + "sys/users/template/add",
    user: baseDir + "sys/users",
    userBatch: baseDir + "sys/users/batch",
    enable: baseDir + "sys/users/state" // {id}/state
};

const measure = {
    measure: baseDir + "base/measures",
    measureBatch: baseDir + "base/measures/batch"
};
const cum = {
    customer: baseDir + "cum/customers",
    doc: baseDir + "cum/customers/docs",
};


//线索
const lead = {
    lead: baseDir + "sprc/leads",
    doc: baseDir + "sprc/leads/docs"
}
//任务调度
const quartz={
    quartz: baseDir +"quartz/tasks",
    taskgroup:baseDir +"quartz/taskgroups"
}


const role = {
    role: baseDir + "sys/roles"
};

const brand = {
    brand: baseDir + "base/brands"
};
const prdtype = {
    prdtype: baseDir + "base/prdtypes",
    prdtypeTree: baseDir + "base/prdtypes/prdtypeTree"
};

const product = {
    product: baseDir + "base/products",
    productBatch: baseDir + "base/products/batch"
};

const contacts = {
    contacts: baseDir + "cum/contacts"
};

const visitRouter = {
    visit: baseDir + "sact/visitroutes"
};

const taskcard = {
    taskcard: baseDir + 'sact/taskcards',
    taskcardBatch: baseDir + 'sact/taskcards/batch',
    enable: baseDir + 'sact/taskcards/state',
    biztype: baseDir + 'sact/taskcards/biztypes'
}
const doc = {
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

const visitrules = {
    visitrules: baseDir + 'sact/visitrules',
    enable: baseDir + '/sact/visitrules/state',
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

const phonebooks = {
    mydept: baseDir + 'csns/phonebooks/mydept',
    organizations: baseDir + 'csns/phonebooks/organizations',
    search: baseDir + 'csns/phonebooks/search',
    sub: baseDir + 'csns/phonebooks/sub',
}

const approval={
    notfinished:baseDir+'bpub/approvals/notfinished',
    finished:baseDir+'bpub/approvals/finished',
    todo:baseDir+'bpub/approvals/todo',
    done:baseDir+'bpub/approvals/done',
    histories:baseDir+'bpub/approvals/details/histories',
    details:baseDir+'bpub/approvals/details',
    historyStatus:baseDir+'bpub/approvals/histories',
    actions:baseDir+'bpub/approvals/actions',
    todototal:baseDir+'bpub/approvals/todototal',
    notfinishedtotal:baseDir+'bpub/approvals/notfinishedtotal'
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
    taskcard,
    sysinit,
    doc,
    opportunity,
    oppaction,
    visitRouter,
    visitrules,
    oppstage,
    oppdimension,
    oppflow,
    prdattr,
    prdattrgroup,
    phonebooks,
    quartz,
    approval
}
