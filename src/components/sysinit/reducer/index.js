import Immutable from 'immutable'
let $$initialState = {
    current:0,
    isInit : false,
    tenantInfo:{},
    adminList:[]
};
export default function reducer($$state = Immutable.fromJS($$initialState), action){
    switch (action.type) {
        case 'SYSINIT_PAGE_INFO':
            let current = 0;
            if(action.content.isInit) {
                current=2;
            }
            return $$state.merge({
                isInit:action.content.isInit,
                tenantInfo:action.content.tenantInfo,
                adminList:action.content.adminList || [],
                current:action.content.isInit? 2: 0, /*如果初始化过，则直接进入第三阶段，否则从第一阶段开始*/
            })
        case 'SYSINIT_PAGE_ORGSAVE':
            return $$state.merge({
                tenantInfo: action.content.tenantInfo,
                current:1,
            })
        case 'SYSINIT_PAGE_ADMINLISTCHANGE':
            return $$state.merge({
                adminList:action.content.newData
            })
        case 'SYSINIT_PAGE_ADMINLISTSAVE':
            return $$state.merge({
                adminList:action.content.adminList,
                current:2,
            })
        case 'SYSINIT_PAGE_ONEDIT':
            return $$state.merge({
                current:0,
            })
        default: 
            return $$state;
    }
};