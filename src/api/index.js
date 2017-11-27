import cookie from "utils/cookie";

const baseDir = cookie("basedir"); // host:ip/crm_web/

const login = baseDir + "login";

const menu = baseDir + "sys/menuitem";

const org = {
    org: baseDir + "sys/orgs",
    orgTree: baseDir + "sys/orgs/orgTree"
};

const user = {
    listTpl : baseDir + "sys/users/template/list",
    addTpl : baseDir + "sys/users/template/add",
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
    doc:baseDir + "cum/customers/docs",
};

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
    enable: baseDir + 'sact/taskcards/state' 
}
const doc = {
    doc: baseDir + 'base/docs',
    docBatch: baseDir + 'base/docs/batch',
    enable: baseDir + 'base/docs/state' 
}

const sysinit = {
    info : baseDir + "sys/sysinit/info",
    org : baseDir + 'sys/sysinit/org',
    adminList : baseDir + 'sys/sysinit/adminlist',
}
const opportunity = {
    opportunity: baseDir + 'sprc/opportunities',
}

const oppaction = {
    oppaction: baseDir + 'sprc/oppactions',
    doc:baseDir + "sprc/oppactions/docs",
}

const visitrules = {
    visitrules: baseDir + 'sact/visitrules',
}

const oppstage = {
    oppstage: baseDir + 'sprc/oppstages',
}
export {
    login,
    menu,
    org,
    user,
    measure,
    cum,
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
}
