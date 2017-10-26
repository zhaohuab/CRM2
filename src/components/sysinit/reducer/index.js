import Immutable from 'immutable'
let $$initialState = {
    orgInfo:{},
    adminList:[]
};
export default function reducer($$state = Immutable.fromJS($$initialState), action){
    switch (action.type) {
        case 'SYSINIT_PAGE_ADMINLISTCHANGE':
            return $$state.merge({
                adminList:action.content.newData
            })
        case 'SYSINIT_PAGE_ADMINLISTSAVE':
        
            return $$state.merge({
                adminList:action.content.adminList
            })
        case 'SYSINIT_PAGE_ORGSAVE':
        debugger
            return $$state.merge({
                orgInfo: action.content.orgInfo,
            })
        case 'SYSINIT_PAGE_ADMINCHANGE':
            return $$state.merge({
                adminList: action.content.adminList,
            })
        default: 
            return $$state;
    }
};