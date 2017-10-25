import Immutable from 'immutable'
let $$initialState = {
    orgInfo:{},
    adminList:[]
};
export default function reducer($$state = Immutable.fromJS($$initialState), action){
    switch (action.type) {
        case 'SYSINIT_PAGE_ADMINLISTADD':
            let adminList = $$state.get("adminList").toJS();
            adminList.push(action.content.newData);
            return $$state.merge({
                adminList
            })
        case 'SYSINIT_PAGE_ADMINLISTSAVE':
        
            return $$state.merge({
                adminList:action.content.adminList
            })
        case 'SYSINIT_PAGE_SAVEADD':
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