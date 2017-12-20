import Immutable from 'immutable'

let $$initialState = {
    pcVisible: false,
    mobileVisible: false,
    pcListData: [{
        id: "tpl_edit_1",
        name: "列表布局1",
        description: "列表布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }, {
        id: "tpl_edit_2",
        name: "列表布局2",
        description: "列表布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }, {
        id: "tpl_edit_3",
        name: "列表布局1",
        description: "列表布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }, {
        id: "tpl_edit_4",
        name: "列表布局2",
        description: "列表布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }],
    mobileListData: [{
        id: "tpl_detail_1",
        name: "列表布局1",
        description: "列表布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }, {
        id: "tpl_detail_2",
        name: "模板布局2",
        description: "模板布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }, {
        id: "tpl_detail_3",
        name: "列表布局1",
        description: "列表布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }, {
        id: "tpl_detail_4",
        name: "模板布局2",
        description: "模板布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }],
    name: "",
    sourceList: [{
            name: "客户名称",
            apiName: "name",
            isRequired: 1,
            isReadOnly: 0
        },
        {
            name: "客户类型",
            apiName: "type",
            isRequired: 0,
            isReadOnly: 0
        },
        {
            name: "客户地址",
            apiName: "address",
            isRequired: 0,
            isReadOnly: 0
        }
    ],
    targetList: [{
        id: "nameid1",
        name: "客户名称",
        apiName: "name",
        isRequired: 1,
        isReadOnly: 0
    }]
};

export default function reducer($$state = Immutable.fromJS($$initialState), action) {
    switch (action.type) {
        case 'list_config_add_pc':
            return $$state.merge({
                pcVisible: true,
            })
        case 'list_config_add_mobile':
            return $$state.merge({
                mobileVisible: true,
            })
        case 'list_config_pc_hideModal':
            return $$state.merge({
                pcVisible: false,
            })
        case 'list_config_mobile_hideModal':
            return $$state.merge({
                mobileVisible: false,
            })
        case 'list_config_change_tpl_list':
            return $$state.merge({
                name: action.content.name,
                targetList: action.content.targetList
            })
        default:
            return $$state;
    }
};