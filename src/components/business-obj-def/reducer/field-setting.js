/*
 * @Author: yangtmm 
 * @Date: 2017-12-15 10:15:19 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-22 18:56:32
 */

import Immutable from 'immutable'

let $$initialState = {
    addModelVisible: false,
    nameFlag:false,//名称非空验证控制
    formTypeList:[],
    menuData:[],//参照档案
    addData: {
        name: "单行文本",
        type: 1,
        length: 255,
        precision: 2,
        minValue: 0,
        maxValue: 100,
        description: "",
        defaultChecked: 0,
        refDocId: 0,
    },
    editModelVisible: false,
    editData: {
        name: "",
        precision: 2,
        minValue: 0,
        maxValue: 10000,
        description: "",
        defaultChecked: 1
    },
    editIndex: 0,

    mainModuleData: [{
        data: {
            name: "名称",
            type: 1,
            length: 255,
            precision: 2,
            minValue: 0,
            maxValue: 100,
            description: "",
            defaultChecked: 0,
            refDocId: 0,
            isCustom: 1
        },
        operations: {
            edit: 1,
            delete: 0
        }

    }],
    itemModuleData: [{
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
    }],

    moduleType: "mainModule",
    mainModuleId: 5,
    itemModuleId: 1001,
};

export default function reducer($$state = Immutable.fromJS($$initialState), action) {
    switch (action.type) {
        case 'field_type_data':
        return $$state.merge({
            formTypeList:action.content.data
        })
        case 'field_setting_data':
            return $$state.merge({
                mainModuleData: action.content.data.mainModule.fields,
                /* itemModuleData: action.content.data.itemModule.fields, */
                mainGroupId: action.content.data.mainModule.id,
                /* itemGroupId: action.content.data.itemModule.id */
            })
        case 'field_setting_add_showModal':
            return $$state.merge({
                moduleType: action.content.moduleType,
                addModelVisible: true,
            })
        case 'field_setting_add_hideModal':
            return $$state.merge({
                addModelVisible: false,
                nameFlag: false,
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
                editModelVisible: false,
                nameFlag: false,
            })
        case "field_setting_save_add_data":
            return $$state.merge({
                addModelVisible: false,
                [$$state.get("moduleType") + "Data"]: $$state.get($$state.get("moduleType") + "Data").toJS().concat([action.content.data])
            });
        case "field_setting_save_edit_data":
            let moduleTypeData = $$state.get($$state.get("moduleType") + "Data").toJS();
            moduleTypeData.splice($$state.get("editIndex"), 1, action.content.data);

            return $$state.merge({
                editModelVisible: false,
                [$$state.get("moduleType") + "Data"]: moduleTypeData
            });

        case "field_setting_del_data":
            return $$state.deleteIn([action.content.moduleType+"Data", action.content.index]);

        case 'field_setting_editAddControl':
            return $$state.merge({
                addData: action.content.editAddControl
            })

        case 'field_setting_change_add_data':
            return $$state.setIn(["addData", action.content.key], action.content.value);

        case 'field_setting_change_edit_data':
            return $$state.setIn(["editData", action.content.key], action.content.value);

        case 'field_setting_reference_data':
            return $$state.merge({menuData: action.content.menuData})
        case 'field_setting_ref_choice_data':
            return $$state.setIn(["addData", 'refDocId'], action.content.id);  
        case 'field_setting_error_show':
            return $$state.merge({nameFlag: action.content.nameFlag}) 
                       
        default:
            return $$state;
    }
};