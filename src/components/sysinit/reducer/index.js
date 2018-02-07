import Immutable from 'immutable'
import { transToFields, transToValues } from 'utils/template/form/Transfer.js'
let $$initialState = {
    current: 0,
    isInit: false,
    tenantInfo: {},
    adminList: [],
    tenantFields: {},
    template: {
        edit: undefined,
    },
    isEdit: false,
    //人员类型，1为系统管理员
    userType: 0,
    tableLoading: false,
    infoCardLoading: false
};

export default function reducer($$state = Immutable.fromJS($$initialState), action) {
    switch (action.type) {
        case 'SYSINIT_EDIT_TEMPLATE':
            return $$state.mergeDeep({
                template: {
                    edit: action.content.fields
                }
            })
        case 'SYSINIT_PAGE_INFO':
            return $$state.merge({
                isInit: action.content.isInit,
                tenantInfo: action.content.tenantInfo,
                tenantFields: transToFields(action.content.tenantInfo),
                adminList: action.content.adminList || [],
                current: action.content.isInit ? 2 : 0, /*如果初始化过，则直接进入第三阶段，否则从第一阶段开始*/
                tableLoading: false
            })
        case 'SYSINIT_PAGE_ORGSAVE':
            return $$state.merge({
                tenantInfo: action.content.tenantInfo,
                current: 1,
                infoCardLoading:false
            })
        case 'SYSINIT_PAGE_ORGCHANGE':
            return $$state.mergeDeep({
                tenantInfo: transToValues(action.content.tenantFields),
                tenantFields: action.content.tenantFields,
            })
        case 'SYSINIT_PAGE_ADMINLISTCHANGE':
            return $$state.merge({
                adminList: action.content.newData
            })
        case 'SYSINIT_PAGE_ADMINLISTSAVE':
            return $$state.merge({
                adminList: action.content.adminList,
                current: 2,
                tableLoading:false
            })
        case 'SYSINIT_PAGE_ONEDIT':
            return $$state.merge({
                current: 0,
                isEdit: true
            })
        case 'SYSINIT_SAVE_USERTYPE':
            return $$state.merge({
                userType: action.content,
            })
        //页面状态重置
        case 'SYSINIT_SAVE_RESETSTATE':
            return $$state.merge($$initialState)

        case 'SYSINIT_PAGE_TABLELOADING':
            return $$state.merge({
                tableLoading: true,
            })

        case 'SYSINIT_PAGE_INFOCARDLOADING':
            return $$state.merge({
                infoCardLoading: true,
            })

            case 'SYSINIT_PAGE_LOADOVER':
            return $$state.merge({
                tableLoading: false,
                infoCardLoading: false
            })
        default:
            return $$state;
    }
};