import Immutable from 'immutable'

let $$initialState = {
    loading: false, //请求加载动画
    addModelVisible: false,
    data: [
        {
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
        }
    ],
    add:false,
    url:'',
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
    ],
    dataSource:[],//编辑时请求回来的数据
};

export default function reducer($$state = Immutable.fromJS($$initialState), action) {

    switch (action.type) {
        case 'approval_add_showModal':
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

        case 'approval_edit_showModal':
            return $$state.merge({
                addModelVisible: true,
                editData: action.content.item,
                editIndex: action.content.index,
                isEdit: true
            })

        case 'approval_hideModal':
            return $$state.merge({
                addModelVisible: false
            })

        case 'APPROVAL_GETLIST_SUCCESS':
            return $$state.merge({
                data: action.content.data,
                addModelVisible: true,
                isEdit: false,
            })
        case 'APPROVAL_ADD_SUCCESS':
            return $$state.merge({
                dataSource: action.content.dataSource,
                addModelVisible: true,
                isEdit: false,
            })
        case 'APPROVAL_ADD_SHOW':
            return $$state.merge({//新增打开页面
              add: true,
              url: action.content.url
            })
        case 'approval_add_closed':
            return $$state.merge({//关闭新增页面
              add: false,
              url: ''
            })
            
        case 'approval_del_data':
            return $$state.deleteIn(["data", action.content.index])
        case 'approval_change_edit_data':
            return $$state.merge({
                editData: {
                    ...$$state.get("editData").toJS(),
                    [action.content.keyName]: action.content.val
                }
            })
        case 'approval_save_add_data':
            return $$state.merge({
                addModelVisible: false,
                data: $$state.get("data").toJS().concat(action.content.addData)
            });
        case 'approval_save_edit_data':
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

/* 

*/