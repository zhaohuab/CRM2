import Immutable from 'immutable'

let $$initialState = {
    addModelVisible: false,
    addData: {
        name: "单行文本",
        type: 1,
        length: 255,
        precision: 2,
        minValue: 0,
        maxValue: 100,
        description: "",
        defaultChecked: 1,
        refDocId: 0
    },
    editModelVisible: false,
    editIndex: 0,
    moduleType: "mainModule",
    editData: {
        name: "",
        type: 1,
        length: 255,
        precision: 2,
        minValue: 0,
        maxValue: 10000,
        description: "",
        defaultChecked: 1,
        refDocId: 0
    },
    formControls: [{
        name: "单行文本",
        type: 1,
        length: 255,
        precision: 2,
        minValue: 0,
        maxValue: 10000,
        description: '',
        defaultChecked: 1,
        refDocId: 0
    }, {
        name: "多行文本",
        type: 2,
        length: 5000,
        precision: 2,
        minValue: 0,
        maxValue: 10000,
        description: '',
        defaultChecked: 1,
        refDocId: 0
    }, {
        name: "下拉枚举",
        type: 3,
        length: 255,
        precision: 2,
        minValue: 0,
        maxValue: 10000,
        description: '',
        defaultChecked: 1,
        refDocId: 0
    }, {
        name: "数值",
        type: 4,
        length: 255,
        precision: 2,
        minValue: 0,
        maxValue: 1000000000000,
        description: '',
        defaultChecked: 1,
        refDocId: 0
    }],
    data: {
        mainModule: {
            fields: [{
                data: {
                    name: "名称",
                    type: 1,
                    length: 255,
                    precision: 2,
                    minValue: 0,
                    maxValue: 100,
                    description: "",
                    defaultChecked: 1,
                    refDocId: 0,
                    isCustom: 1
                },
                operations: {
                    edit: 1,
                    delete: 0
                }

            }, {
                data: {
                    name: "备注",
                    type: 2,
                    length: 5000,
                    precision: 2,
                    minValue: 0,
                    maxValue: 100,
                    description: "",
                    defaultChecked: 1,
                    refDocId: 0,
                    isCustom: 1
                },
                operations: {
                    edit: 1,
                    delete: 0
                }
            }]
        },
        itemModule: {
            fields: [{
                data: {
                    name: "地址",
                    type: 1,
                    length: 255,
                    precision: 2,
                    minValue: 0,
                    maxValue: 100,
                    description: "",
                    defaultChecked: 1,
                    refDocId: 0,
                    isCustom: 1
                },
                operations: {
                    edit: 1,
                    delete: 1
                }
            }, {
                data: {
                    name: "客户类型",
                    type: 3,
                    length: 255,
                    precision: 2,
                    minValue: 0,
                    maxValue: 100,
                    description: "",
                    defaultChecked: 1,
                    refDocId: 0,
                    isCustom: 1
                },
                operations: {
                    edit: 1,
                    delete: 1
                }
            }]
        },

    }
};

export default function reducer($$state = Immutable.fromJS($$initialState), action) {
    switch (action.type) {
        case 'field_setting_add_showModal':
            return $$state.merge({
                addModelVisible: true,
            })
        case 'field_setting_add_hideModal':
            return $$state.merge({
                addModelVisible: false
            })
        case 'field_setting_edit_showModal':
            return $$state.merge({
                editModelVisible: true,
                editData: action.content.item,
                editIndex: action.content.index,
                moduleType: action.content.moduleType
            })
        case 'field_setting_edit_hideModal':
            return $$state.merge({
                editModelVisible: false
            })
        case 'field_setting_editAddControl':
            return $$state.merge({
                addData: action.content.editAddControl
            })

        case 'field_setting_change_add_data':
            return $$state.setIn(["addData", action.content.key], action.content.value);

        case 'field_setting_change_edit_data':
            return $$state.setIn(["editData", action.content.key], action.content.value);
        case "field_setting_save_add_data":
            return $$state;
        case "field_setting_save_edit_data":
            return $$state;
        default:
            return $$state;
    }
};