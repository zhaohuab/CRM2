import Immutable from 'immutable'

let $$initialState = {
    pcVisible: false, //pc添加编辑框
    mobileVisible: false, //mobile添加编辑框
    distributeVisible: false, //分配弹框
    nameFlag: false,//名称非空验证控制
    listFlag: false,//列表非空验证控制
    distData: {
        assignments: [],
        roles: [],
    },
    pcListData: [], //pc列表模板
    mobileListData: [], //mobile列表模板

    moduleType: "pcListData",

    name: "",
    editIndex: 0,
    isEdit: false,
    editId: 0,
    clientType: 1, // 1代表pc, 2代表移动端
    sourceListBak: [{
        name: "空",
        isBlank: 1,
        apiName: "",
        isRequired: 0,
        isReadonly: 0,
        width: "0.5",
        height: "1",
    }],
    sourceList: [],
    targetList: [],
};

export default function reducer($$state = Immutable.fromJS($$initialState), action) {

    switch (action.type) {
        case 'list_config_field_setting_data':
            return $$state.merge({
                sourceList: $$state.get("sourceListBak").toJS().concat(action.content.data)
            })
        case 'list_config_data':
            return $$state.merge({
                pcListData: action.content.data[0].listLayouts,
                mobileListData: action.content.data[1].listLayouts,
            })
        case "list_config_del_data":
            return $$state.deleteIn([action.content.moduleType, action.content.index]);

        case 'list_config_pc_save_add_data':
            return $$state.merge({
                pcVisible: false,
                [$$state.get("moduleType")]: $$state.get($$state.get("moduleType")).toJS().concat([action.content.data])
            });
        case "list_config_pc_save_edit_data":
            let moduleTypePcData = $$state.get($$state.get("moduleType")).toJS();
            moduleTypePcData.splice($$state.get("editIndex"), 1, action.content.data);

            return $$state.merge({
                pcVisible: false,
                [$$state.get("moduleType")]: moduleTypePcData
            });
        case 'list_config_mobile_save_add_data':
            return $$state.merge({
                mobileVisible: false,
                [$$state.get("moduleType")]: $$state.get($$state.get("moduleType")).toJS().concat([action.content.data])
            });
        case "list_config_mobile_save_edit_data":
            let moduleTypeModuleData = $$state.get($$state.get("moduleType")).toJS();
            moduleTypeModuleData.splice($$state.get("editIndex"), 1, action.content.data);

            return $$state.merge({
                mobileVisible: false,
                [$$state.get("moduleType")]: moduleTypeModuleData
            });
        case 'list_config_add_pc':
            return $$state.merge({
                pcVisible: true,
                isEdit: false,
                clientType: 1,
                moduleType: action.content.moduleType
            })

        case 'list_config_add_mobile':
            return $$state.merge({
                mobileVisible: true,
                isEdit: false,
                clientType: 2,
                moduleType: action.content.moduleType
            })

        case 'list_config_pc_edit_showModal':
            return $$state.merge({
                isEdit: true,
                editId: action.content.data.id,
                pcVisible: true,
                editIndex: action.content.index,
                moduleType: action.content.moduleType,
                name: action.content.data.name,
                editRoles: action.content.data.roles,
                targetList: action.content.data.items,
            })
        case 'list_config_mobile_edit_showModal':
            return $$state.merge({
                isEdit: true,
                editId: action.content.data.id,
                mobileVisible: true,
                editIndex: action.content.index,
                moduleType: action.content.moduleType,
                name: action.content.data.name,
                editRoles: action.content.data.roles,
                targetList: action.content.data.items,
            })
        case 'list_config_distribute_showModal':
            return $$state.merge({
                distributeVisible: true,
                distData: action.content.data,
                clientType: action.content.clientType,
                moduleType: action.content.moduleType,
            })

        case 'list_config_distribute_hideModal':
            return $$state.merge({
                distributeVisible: false,
            })

        case 'list_config_change_assignments':
            //let assignments = $$state.get("distData").get("assignments").get((action.content.key+"")).toJS();
            //Immutable path 各项必须是字符串 action.content.key+""
            return $$state.setIn(["distData", "assignments", action.content.key+""], action.content.val)


        case 'list_config_pc_hideModal':
            return $$state.merge({
                pcVisible: false,
                nameFlag: false,
                listFlag: false
            })

        case 'list_config_mobile_hideModal':
            return $$state.merge({
                mobileVisible: false,
                nameFlag: false,
                listFlag: false
            })
        case 'list_config_change_tpl_list':
            return $$state.merge({
                name: action.content.name,
                targetList: action.content.targetList
            })
        case 'list_config_error_show':
            return $$state.merge({
                nameFlag: action.content.nameFlag,
                listFlag: action.content.listFlag,
                
            })
            
        default:
            return $$state;
    }
};