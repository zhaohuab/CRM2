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
    editTpl : baseDir + "sys/users/template/edit",
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

const sysinit = {
    mainEditTpl : baseDir + "sys/sysinit/template/edit",
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

const oppstage = {
    oppstage: baseDir + 'sprc/oppstages',
    all:baseDir + 'sprc/oppstages/all',
}

const oppdimension = {
    oppdimension: baseDir + 'sprc/oppdimensions',
    doc:baseDir + "sprc/oppdimensions/docs",
    all:baseDir + 'sprc/oppdimensions/all',
}

const oppflow = {
    oppflow: baseDir + 'sprc/oppflows',
    doc:baseDir + "sprc/oppflows/docs",
}
const prdattr = {
    prdattr: baseDir + 'base/attrs',
}

const prdattrgroup = {
    prdattrgroup: baseDir + 'base/attrgroups',
}

<<<<<<< HEAD
=======
const phonebooks = {
    mydept: baseDir + 'csns/phonebooks/mydept',
    organizations: baseDir + 'csns/phonebooks/organizations',
    search: baseDir + 'csns/phonebooks/search',
    sub: baseDir + 'csns/phonebooks/sub',
}

const func = {
    func: baseDir + "sys/functions"
};

>>>>>>> fa1d9856800c8f4a416f38d6e3cb853ac12cb8aa
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
    sysinit,
    opportunity,
    oppaction,
    visitRouter,
    oppstage,
    oppdimension,
    oppflow,
    prdattr,
    prdattrgroup,
<<<<<<< HEAD
=======
    phonebooks,
    func
>>>>>>> fa1d9856800c8f4a416f38d6e3cb853ac12cb8aa
}
 