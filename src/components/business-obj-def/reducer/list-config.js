import Immutable from 'immutable'

let $$initialState = {
    pcVisible: false, //pc添加编辑框
    mobileVisible: false, //mobile添加编辑框
    distributeVisible: false, //分配弹框
    nameFlag: false,//------------名称非空验证控制
    listFlag: false,//------------列表非空验证控制
    dataFlag:false,//-----------控制table数据源
    filterSourceList:[],//---------过滤后的拖拽源
    roleInquireList:[],//----------查询出来的角色列表
    roleList:[],//-----------------分配时获取的角色列表
    rolesIdList:[],//---------------选定的角色
    layoutObj:{},//---------------正在分配的布局模板
    mobileListDataObj:{},//-------正在分配的移动列表模板
    pcListDataObj:{},//-----------正在分配的pc列表模板
    distData: {
        assignments: [],
        roles: [],
    },
    pcListData: [], //pc列表模板
    mobileListData: [], //mobile列表模板
    moduleType: "pcListData",
    name: "",
    description:'',
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
    let translateSource=(list)=>{
        let arr = []
        for(let value of list){
            if(value.data.isDefault==1){
                value.data.checked=true;
                arr.push(value)
            }else{
                value.data.checked=false;
            }
        }
        arr.push(list)
        return arr
    }
    switch (action.type) {
        case 'list_config_field_setting_data':
            return $$state.merge({
                sourceList: $$state.get("sourceListBak").toJS().concat(action.content.data),
                filterSourceList: action.content.data,//----添加一个自己的副本，用于拖拽时过滤或者恢复拖拽项
            })
        case 'list_config_data':
            return $$state.merge({
                pcListData: translateSource(action.content.data[0].listLayouts)[1],
                mobileListData: translateSource(action.content.data[1].listLayouts)[1],
                pcListDataObj: translateSource(action.content.data[0].listLayouts)[0],
                mobileListDataObj: translateSource(action.content.data[1].listLayouts)[0],
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
        case 'list_config_change_tpl_list': //--------------改造为专用于新建或者是编辑时名称和描述改变时触发
            let { title } = action.content;
            if(title=='name'){
               return $$state.merge({
                    name: action.content.name,
                    targetList: action.content.targetList
                }) 
            }else{
                return $$state.merge({
                    description: action.content.name,
                    targetList: action.content.targetList
                })  
            }
        case 'list_config_error_show':
            return $$state.merge({
                nameFlag: action.content.nameFlag,
                listFlag: action.content.listFlag,
                
            })
        //---------------------------------
        case 'list_config_filter_source': //拖拽源拖拽结束，图标消失
        let filterData = action.content.data;
        let filterSource=$$state.get('filterSourceList').toJS().filter(item=>item.apiName!=filterData.apiName)
        return $$state.merge({
            filterSourceList: Immutable.fromJS(filterSource),
        })
    case 'list_config_restore_source'://拖拽目标删除，拖拽源恢复
        let restoreData = action.content.data;
        let filterSource1 = $$state.get('sourceList').toJS().filter(item=>item.apiName==restoreData.apiName);  
        let sourceListCopy=$$state.get('filterSourceList').toJS();
            sourceListCopy.push(filterSource1[0]);
        return $$state.merge({
            filterSourceList: Immutable.fromJS(sourceListCopy),
        })  
    case 'list_config_layout_choosed'://选定列表模板
    //这里需要给模板添加一个checked属性，现在返回的数据中间没有这个属性，暂时以data中的isDefault作为操作对象
        let id = action.content.id;
        let dataSourceName = action.content.name;
        let pcEditDataCopy = $$state.get(dataSourceName).toJS();    
        let layoutObjCopy = {};
            pcEditDataCopy.forEach(item=>{
                if(item.data.id==id){
                    item.data.checked=!item.data.checked;
                }else{
                    item.data.checked=false;
                }
                if(item.data.checked){
                    layoutObjCopy=item
                }
            })
              
        if (dataSourceName=='pcListData'){
            return $$state.merge({
                pcListData: Immutable.fromJS(pcEditDataCopy),//将选中的模板置为勾选状态
                pcListDataObj: Immutable.fromJS(layoutObjCopy),//储存选中的模板
            })   
        }else{
            return $$state.merge({
                mobileListData: Immutable.fromJS(pcEditDataCopy),//将选中的模板置为勾选状态
                mobileListDataObj: Immutable.fromJS(layoutObjCopy),//储存选中的模板
            })  
        }
                 
    case 'list_config_field_role_inquire'://获取角色列表
        return $$state.merge({
            roleInquireList: action.content.roleInquireList,
            dataFlag: action.content.dataFlag
        })
    case 'list_config_distribute_showModal2'://显示分配界面
        return $$state.merge({
            roleList: action.content.roleList,
            distributeVisible: true,
        })
    case 'list_config_roles_choosed'://选择角色
        return $$state.merge({
            rolesIdList: action.content.list,
        })
    case 'list_config_add_tpl_list': //--------------新建时触发   
        return $$state.merge({
            name:action.content.name,
            description: action.content.description,
            targetList: action.content.targetList
        })   
    case 'list_config_enable_data':
        return  $$state.setIn([action.content.name, action.content.index,'data','enableState'], action.content.status);      
    default:
            return $$state;
    }
};