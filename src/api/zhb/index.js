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
    approval: baseDir+'bpub/approvals/processes',
}

const approved = {//审批流
    notfinished: baseDir+'bpub/approvals/documents/notfinished',
    finished: baseDir+'bpub/approvals/documents/finished',
    todo: baseDir+'bpub/approvals/tasks/todo',
    done: baseDir+'bpub/approvals/tasks/done',   
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

export {
    taskcard,
    doc,
    visitrules,
    phonebooks,
    approval,
    approved,
    distributed,
    cusStatus,
}
 