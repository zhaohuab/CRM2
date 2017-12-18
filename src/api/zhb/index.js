import cookie from "utils/cookie";

const baseDir = cookie("basedir"); // host:ip/crm_web/
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

const visitrules = {//拜访规则
    visitrules: baseDir + 'sact/visitrules',
    enable: baseDir + '/sact/visitrules/state',
}

const phonebooks = {//通讯录
    mydept: baseDir + 'csns/phonebooks/mydept',
    organizations: baseDir + 'csns/phonebooks/organizations',
    search: baseDir + 'csns/phonebooks/search',
    sub: baseDir + 'csns/phonebooks/sub',
}

const approval = {//客户中审批流设置
    approval: baseDir+'bpub/approvals/processes'
}

const approved = {//审批流
    approved:baseDir+'bpub/approvals/processes'
}

export {
    taskcard,
    doc,
    visitrules,
    phonebooks,
    approval,
    approved,
}
 