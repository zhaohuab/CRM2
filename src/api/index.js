import cookie from "utils/cookie";

const baseDir = cookie("basedir"); // host:ip/crm_web/

const login = baseDir + "login";

const menu = baseDir + "sys/menuitem";

const org = {
    org: baseDir + "sys/org/",
    orgTree: baseDir + "sys/orgTree/"
};

const user = {
    user: baseDir + "sys/users",
    userBatch: baseDir + "sys/users/batch",
    enable: baseDir + "sys/users/state" // {id}/state
};

const measure = {
    measure: baseDir + "base/measures",
    measureBatch: baseDir + "base/measures/batch"
};
const cum = {
    customer: baseDir + "cum/customers"
};

const role = {
    role: baseDir + "sys/roles"
};

const brand = {
    brand: baseDir + "base/brands"
};
const prdtype = {
    prdtype: baseDir + "base/prdtype",
    prdtypeTree: baseDir + "base/prdtypeTree"
};

const product = {
    product: baseDir + "base/products",
    productBatch: baseDir + "base/products/batch"
};

const contacts = {
    contacts: baseDir + "cum/contacts",
    contactsDel: "cum/contacts/batch"
};

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
    oppaction
}
