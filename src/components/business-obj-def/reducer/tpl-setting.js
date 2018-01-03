import Immutable from 'immutable'

let $$initialState = {
    addModelVisible: false,
    distributeVisible: false, //分配弹框
    objFlag:false,
    nameFlag:false,//名称非空验证控制
    distData: {
        assignments: [],
        biztypes: [],
        roles: [],
    },
    pcEditData: [{
        "data": {
            "id": 1,
            "name": "普通商机布局",
            "description": "普通商机布局",
            "isDefault": 0,
            "isCustom": 0
        },
        "operations": {
            "edit": 0,
            "delete": 0
        }
    }],
    pcViewData: [{
        "data": {
            "id": 1,
            "name": "普通商机布局",
            "description": "普通商机布局",
            "isDefault": 0,
            "isCustom": 0
        },
        "operations": {
            "edit": 0,
            "delete": 0
        }
    }],
    mobileEditData: [{
        "data": {
            "id": 1,
            "name": "普通商机布局",
            "description": "普通商机布局",
            "isDefault": 0,
            "isCustom": 0
        },
        "operations": {
            "edit": 0,
            "delete": 0
        }
    }],
    mobileViewData: [{
        "data": {
            "id": 1,
            "name": "普通商机布局",
            "description": "普通商机布局",
            "isDefault": 0,
            "isCustom": 0
        },
        "operations": {
            "edit": 0,
            "delete": 0
        }
    }],
    moduleType: "pcEditData",
    name: "",
    editIndex: 0,
    isEdit: false,
    editId: 0,
    clientType: 1, // 1代表pc, 2代表移动端
    type: 1, // 1代表详情, 2代表编辑
    selectRelativeObj: [],
    sourceListBak: [{
            name: "分组线",
            elementType: "group",
            apiName: "group",
            width: "1"
        },
        {
            name: "空",
            isBlank: 1,
            apiName: "",
            isRequired: 0,
            isReadonly: 0,
            width: "0.5",
            height: "1",
        }
    ],
    sourceList: [],
    targetList: [{
        idForClient: "groupid1",
        name: "基本信息",
        elementType: "group",
        apiName: "group",
        width: 1,
        height: "1",
    }],
    relativeObj: [],
};

export default function reducer($$state = Immutable.fromJS($$initialState), action) {
    switch (action.type) {
        case 'tpl_setting_relativeObj_data':
            return $$state.merge({
                relativeObj: action.content.data
            })
        case 'tpl_setting_field_setting_data':
            return $$state.merge({
                sourceList: $$state.get("sourceListBak").toJS().concat(action.content.data)
            })
        case 'tpl_setting_data':
            return $$state.merge({
                pcViewData: action.content.data[0].layouts,
                pcEditData: action.content.data[1].layouts,
                mobileViewData: action.content.data[2].layouts,
                mobileEditData: action.content.data[3].layouts
            })
        case "tpl_setting_del_data":
            return $$state.deleteIn([action.content.moduleType, action.content.index]);

        case 'tpl_setting_add_showModal':
            return $$state.merge({
                addModelVisible: true,
                isEdit: false,
                clientType: action.content.clientType,
                type: action.content.type,
                moduleType: action.content.moduleType,
            })

        case 'tpl_setting_save_add_data':
            return $$state.merge({
                addModelVisible: false,
                [$$state.get("moduleType")]: $$state.get($$state.get("moduleType")).toJS().concat([action.content.data])
            });

        case "tpl_setting_save_edit_data":
            let moduleTypeData = $$state.get($$state.get("moduleType")).toJS();
            moduleTypeData.splice($$state.get("editIndex"), 1, action.content.data);

            return $$state.merge({
                addModelVisible: false,
                [$$state.get("moduleType")]: moduleTypeData
            });

        case 'tpl_setting_edit_showModal':
            return $$state.merge({
                isEdit: true,
                editId: action.content.data.id,
                addModelVisible: true,
                editIndex: action.content.index,
                moduleType: action.content.moduleType,
                name: action.content.data.name,
                selectRelativeObj: action.content.data.relationLayout,
                targetList: action.content.data.mainLayout,
            })
        case 'tpl_setting_distribute_showModal':
            return $$state.merge({
                distributeVisible: true,
                distData: action.content.data,
                clientType: action.content.clientType,
                type: action.content.type,
                moduleType: action.content.moduleType,
            })

        case 'tpl_setting_distribute_hideModal':
            return $$state.merge({
                distributeVisible: false,
            })

        case 'tpl_setting_hideModal':
            return $$state.merge({
                addModelVisible: false,
                nameFlag:false,
            })

        case 'tpl_setting_change_tpl_list':
            return $$state.merge({
                name: action.content.name,
                targetList: action.content.targetList,
                selectRelativeObj: action.content.selectRelativeObj,

            })

        case 'tpl_setting_change_assignments':
            //let assignments = $$state.get("distData").get("assignments").get(action.content.key).toJS();
            return $$state.setIn(["distData", "assignments", action.content.key], action.content.val)
        case 'related_objects':
            return $$state.merge({
                objFlag: action.content.flag,
            })
        case 'tpl_setting_error_show':
            return $$state.merge({
                nameFlag: action.content.nameFlag,
            })
               
        default:
            return $$state;
    }
};