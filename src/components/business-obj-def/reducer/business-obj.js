import Immutable from 'immutable'

let $$initialState = {
    loading: false, //请求加载动画
    addModelVisible: false,
    nameFlag: false,//-----名称非空验证控制
    roleFlag: false,//-----角色非空验证控制
    enable:false,//--------停启用控制
    data: [
        //   {
        //     id: 1,
        //     name: "业务类型1",
        //     description: "描述业务类型1",
        //     isDefault: 1,
        //     roles: [],
        //     isCustom: 1,
        //     isEnabled: 1
        // }
    ],
    isEdit: false,
    editId: 0,
    editIndex: 0,
    editData: {
        name: "",
        description: "",
        roleIds: []
    },
    roleList: [{
        code: "ZJL",
        deletedTime: null,
        deletedUserId: 0,
        description: "",
        id: 10,
        industryId: 0,
        isDeleted: 0,
        isPreseted: 2,
        isPresetedName: "否",
        name: "总经理",
        orgId: 1249,
        orgName: "公司C"
    }]
};

export default function reducer($$state = Immutable.fromJS($$initialState), action) {

    switch (action.type) {
        case 'business_obj_add_showModal':
            return $$state.merge({
                addModelVisible: true,
                isEdit: false,
                editData: {
                    name: "",
                    description: "",
                    roleIds: []
                }
            })

        case 'business_obj_edit_showModal':
            return $$state.merge({
                addModelVisible: true,
                editData: {
                    name: action.content.item.data.name,
                    description: action.content.item.data.description,
                    roleIds: action.content.item.data.roles.map((item)=>item.id)
                },
                editIndex: action.content.index,
                editId: action.content.item.data.id,
                isEdit: true
            })

        case 'business_obj_hideModal':
            return $$state.merge({
                addModelVisible: false,
                nameFlag: false,
                roleFlag: false,
            })

        case 'business_obj_data':
            return $$state.merge({
                data: action.content.data
            })
        case 'business_obj_get_roles':
            return $$state.merge({
                roleList: action.content.data
            })
        case 'business_obj_del_data':
            return $$state.deleteIn(["data", action.content.index])
        case 'business_obj_change_data':
            return $$state.merge({
                editData: {
                    ...$$state.get("editData").toJS(),
                    [action.content.keyName]: action.content.val
                }
            })
        case 'business_obj_save_add_data':
            return $$state.merge({
                addModelVisible: false,
                nameFlag: false,
                roleFlag: false,
                data: [action.content.data].concat($$state.get("data").toJS()),
            });
        case 'business_obj_save_edit_data':
            let data = $$state.get("data").toJS()
            data.splice(action.content.index, 1, action.content.data)
            return $$state.merge({
                addModelVisible: false,
                nameFlag: false,
                roleFlag: false,
                data
            })
        case 'business_obj_error_show':
            return $$state.merge({
                nameFlag: action.content.nameFlag,
                roleFlag: action.content.roleFlag,
            });
        case 'business_obj_enable_data':
         return  $$state.setIn(["data", action.content.index,'data','isEnabled'], action.content.status); 
           
        default:
            return $$state;
    }
};