import Immutable from 'immutable'

let $$initialState = {
    addModelVisible: false,
    pcEditListData: [{
        id: "tpl_edit_1",
        name: "模板布局1",
        description: "模板布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }, {
        id: "tpl_edit_1",
        name: "模板布局2",
        description: "模板布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }],
    pcDetailListData: [{
        id: "tpl_detail_1",
        name: "模板布局1",
        description: "模板布局",
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
        name: "模板布局3",
        description: "模板布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }, {
        id: "tpl_detail_4",
        name: "模板布局4",
        description: "模板布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }],
    mobileEditListData: [{
        id: "tpl_edit_1",
        name: "模板布局1",
        description: "模板布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }, {
        id: "tpl_edit_2",
        name: "模板布局2",
        description: "模板布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }, {
        id: "tpl_edit_3",
        name: "模板布局1",
        description: "模板布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }, {
        id: "tpl_edit_4",
        name: "模板布局2",
        description: "模板布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }],
    mobileDetailListData: [{
        id: "tpl_detail_1",
        name: "模板布局1",
        description: "模板布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }, {
        id: "tpl_detail_1",
        name: "模板布局2",
        description: "模板布局",
        isDefault: 1,
        isCustom: 0,
        edit: 0,
        delete: 0
    }],
    name: "",
    sourceList: [{
            name: "分组线",
            apiName: "group"
        },
        {
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
            id: "groupid1",
            name: "基本信息",
            apiName: "group"
        },
        {
            id: "nameid1",
            name: "客户名称",
            apiName: "name",
            isRequired: 1,
            isReadOnly: 0
        }
    ],
    relativeObj: [{
            label: '参与人',
            value: 'id1'
        },
        {
            label: '联系人',
            value: 'id2'
        },
    ],
    selectRelativeObj: []
};

export default function reducer($$state = Immutable.fromJS($$initialState), action) {
    switch (action.type) {
        case 'tpl_setting_add_showModal':
            return $$state.merge({
                addModelVisible: true,
            })
        case 'tpl_setting_hideModal':
            return $$state.merge({
                addModelVisible: false,
            })
        case 'tpl_setting_change_tpl_list':
            return $$state.merge({
                name: action.content.name,
                targetList: action.content.targetList,
                selectRelativeObj: action.content.selectRelativeObj,
            })
        default:
            return $$state;
    }
};