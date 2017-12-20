import Immutable from 'immutable'

let $$initialState = {
    loading: false, //请求加载动画
    addModelVisible: false,
    data: [{
        name: "业务类型1",
        des: "描述业务类型1",
        isDefault: 1,
        roles: [{
            label: '管理员',
            value: "admin"
        }, {
            label: '经理',
            value: "manager"
        }, {
            label: '普通用户',
            value: "normal"
        }]
    }, {
        name: "业务类型2",
        des: "描述业务类型2",
        isDefault: 0,
        roles: [{
            label: '经理',
            value: "admin"
        }, {
            label: '普通用户',
            value: "manager"
        }]
    }],
    isEdit: false,
    editIndex: 0,
    editData: {
        name: "",
        des: "",
        isDefault: 0,
        roles: []
    },
    roleList: [{
            label: '管理员',
            value: 'admin'
        },
        {
            label: '经理',
            value: 'manager'
        },
        {
            label: '普通用户',
            value: 'normal'
        }
    ]
};

export default function reducer($$state = Immutable.fromJS($$initialState), action) {

    switch (action.type) {
        case 'business_obj_add_showModal':
            return $$state.merge({
                addModelVisible: true,
                isEdit: false,
                editData: {
                    name: "",
                    des: "",
                    isDefault: 0,
                    roles: []
                }
            })

        case 'business_obj_edit_showModal':
            return $$state.merge({
                addModelVisible: true,
                editData: action.content.item,
                editIndex: action.content.index,
                isEdit: true
            })

        case 'business_obj_hideModal':
            return $$state.merge({
                addModelVisible: false
            })

        case 'business_obj_data':
            return $$state.merge({
                data: action.content.data
            })
        case 'business_obj_del_data':
            return $$state.deleteIn(["data", action.content.index])
        case 'business_obj_change_edit_data':
            return $$state.merge({
                editData: {
                    ...$$state.get("editData").toJS(),
                    [action.content.keyName]: action.content.val
                }
            })
        case 'business_obj_save_add_data':
            return $$state.merge({
                addModelVisible: false,
                data: $$state.get("data").toJS().concat(action.content.addData)
            });
        case 'business_obj_save_edit_data':
            let data = $$state.get("data").toJS()
            data.splice(action.content.editIndex, 1, action.content.editData)
            return $$state.merge({
                addModelVisible: false,
                data
            })
        default:
            return $$state;
    }
};