import Immutable from 'immutable'

let $$initialState = {
    addModelVisible: false,
    distributeVisible: false, //分配弹框
    objFlag:false,
    nameFlag:false,//-----------名称非空验证控制
    dataFlag:false,//-----------控制table数据源
    businessObj:{name:'',id:0},//-----------选择业务类型
    filterSourceList:[],//---------新建时过滤后的拖拽源
    editFilterSourceList:[],//-----编辑时过滤后的拖拽源
    roleInquireList:[],//----------查询出来的业务类型列表
    businessObjList:[],//----------新建时查询出来的业务类型列表
    roleList:[],//-----------------查询出来的对应业务类型下的角色列表
    rolesIdList:[],//--------------选定的角色
    description:'',//-------------布局模板描述
    businessId:0,
    layoutObj:{},
    pcEditDataId:0,//-------------选定pc编辑布局中对应业务类型id
    pcViewDataId:0,//-------------选定ppc详情布局中对应业务类型id
    mobileEditDataId:0,//---------选定移动编辑布局中对应业务类型id
    mobileViewDataId:0,//---------选定移动详情布局中对应业务类型id
    pcEditDataObj:{},//-----------正在分配的pc编辑布局
    pcViewDataObj:{},//-----------正在分配的pc详情布局
    mobileEditDataObj:{},//-------正在分配的移动编辑布局
    mobileViewDataObj:{},//-------正在分配的移动详情布局
    businessId2:{//---------------选定布局模板中对应业务类型id
        'pcEditData':0,
        'pcViewData':0,
        'mobileEditData':0,
        'mobileViewData':0
    },
    layoutObj2:{//---------------正在分配的布局模板
        'pcEditData':{},
        'pcViewData':{},
        'mobileEditData':{},
        'mobileViewData':{}
    },
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
        },
        checked:false,
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
    let translateSource = (list) => {
        let obj = {},arr=[];
        for(let value of list){
            if(value.data.isDefault == 1){
                value.data.checked = true; 
                obj = value;
                arr.push(obj)
            }else{
                value.data.checked = false;
            }
        }
        arr.push(list)
        return arr
    }
    switch (action.type) {
        case 'tpl_setting_relativeObj_data':
            return $$state.merge({
                relativeObj: action.content.data
            })
        case 'tpl_setting_field_setting_data':
            return $$state.merge({
                sourceList: $$state.get("sourceListBak").toJS().concat(action.content.data),
                filterSourceList: $$state.get("sourceListBak").toJS().concat(action.content.data),//----添加一个自己的副本，用于拖拽时过滤或者恢复拖拽项
            })
        case 'tpl_setting_data':
            return $$state.merge({
                pcViewData: translateSource(action.content.data[0].layouts)[1],
                pcEditData: translateSource(action.content.data[1].layouts)[1],
                mobileViewData: translateSource(action.content.data[2].layouts)[1],
                mobileEditData: translateSource(action.content.data[3].layouts)[1],
                pcViewDataObj: translateSource(action.content.data[0].layouts)[0],
                pcEditDataObj: translateSource(action.content.data[1].layouts)[0],
                mobileViewDataObj: translateSource(action.content.data[2].layouts)[0],
                mobileEditDataObj: translateSource(action.content.data[3].layouts)[0],
                pcViewDataId: translateSource(action.content.data[0].layouts)[0].data.biztypeId,
                pcEditDataId: translateSource(action.content.data[1].layouts)[0].data.biztypeId,
                mobileViewDataId: translateSource(action.content.data[2].layouts)[0].data.biztypeId,
                mobileEditDataId: translateSource(action.content.data[3].layouts)[0].data.biztypeId,              
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
            //-------自定义方法，在拖拽源中，去掉拖拽目标中已经存在字段；
            let businessObjCopy={};
                businessObjCopy.name=action.content.data.biztypeName;
                businessObjCopy.id=action.content.data.biztypeId;
            let existedList = action.content.data.mainLayout;
            let filtersource = $$state.get('filterSourceList').toJS()/* .filter(item=>{
                for(let i=0,len=existedList.length;i<len;i++){
                    if(item.apiName==existedList[i].apiName){
                        return true
                    }
                }
            }) */
            for(let i=0,len=filtersource.length;i<len;i++){

            }
            return $$state.merge({
                isEdit: true,
                editId: action.content.data.id,
                addModelVisible: true,
                editIndex: action.content.index,
                moduleType: action.content.moduleType,
                name: action.content.data.name,
                description: action.content.data.description,
                selectRelativeObj: action.content.data.relationLayout,
                targetList: action.content.data.mainLayout,
                filterSourceList:  Immutable.fromJS(filtersource),
                businessObj: businessObjCopy,
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
            if(action.content.name=='name'){
                return $$state.merge({
                    name: action.content.value,
                    targetList: action.content.targetList,
                    selectRelativeObj: action.content.selectRelativeObj,

                })
            }else{
                return $$state.merge({
                    description: action.content.value,
                    targetList: action.content.targetList,
                    selectRelativeObj: action.content.selectRelativeObj,

                })
            }
        case 'tpl_setting_change_tpl_list2':   
            return $$state.merge({
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
      
        //-----------------------------------        
        case 'tpl_setting_business_choosed'://选择业务类型
            return $$state.merge({
                businessObj: action.content.obj,
            })
        case 'tpl_setting_filter_source': //拖拽源拖拽结束，图标消失
            let filterData = action.content.data;
            let filterSource=$$state.get('filterSourceList').toJS().filter(item=>item.apiName!=filterData.apiName)
            return $$state.merge({
                filterSourceList: Immutable.fromJS(filterSource),
            })
        case 'tpl_setting_restore_source'://拖拽目标删除，拖拽源恢复
            let restoreData = action.content.data;
            let filterSource1 = $$state.get('sourceList').toJS().filter(item=>item.apiName==restoreData.apiName);   
            let sourceListCopy=$$state.get('filterSourceList').toJS();
                sourceListCopy.push(filterSource1[0]);
            return $$state.merge({
                filterSourceList: Immutable.fromJS(sourceListCopy),
            })  
        case 'tpl_setting_layout_choosed'://选定布局模板
        
            let id = action.content.id;
            let dataSourceName = action.content.name;
            let pcEditDataCopy = $$state.get(dataSourceName).toJS();    
            let xx=$$state.get('layoutObj').toJS();
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
            if(dataSourceName=='pcEditData'){
                return $$state.merge({
                    pcEditData: Immutable.fromJS(pcEditDataCopy),//将选中的模板置为勾选状态
                    pcEditDataObj: Immutable.fromJS(layoutObjCopy),//储存选中的模板
                    pcEditDataId: action.content.biztypeId,
                }) 
            }else if(dataSourceName=='pcViewData'){
                return $$state.merge({
                    pcViewData: Immutable.fromJS(pcEditDataCopy),//将选中的模板置为勾选状态
                    pcViewDataObj: Immutable.fromJS(layoutObjCopy),//储存选中的模板
                    pcViewDataId: action.content.biztypeId,
                }) 
            }else if(dataSourceName=='mobileEditData'){
                return $$state.merge({
                    mobileEditData: Immutable.fromJS(pcEditDataCopy),//将选中的模板置为勾选状态
                    mobileEditDataObj: Immutable.fromJS(layoutObjCopy),//储存选中的模板
                    mobileEditDataId: action.content.biztypeId,
                }) 
            }else{
                return $$state.merge({
                    mobileViewData: Immutable.fromJS(pcEditDataCopy),//将选中的模板置为勾选状态
                    mobileViewDataObj: Immutable.fromJS(layoutObjCopy),//储存选中的模板
                    mobileViewDataId: action.content.biztypeId,
                }) 
            }
                       
        case 'tpl_setting_field_role_inquire'://查询时获取业务类型列表
            return $$state.merge({
                roleInquireList: action.content.roleInquireList,
                dataFlag: action.content.dataFlag
            })
        case 'tpl_setting_bussinessObj_data'://点击新建或者是编辑时获取业务类型列表
            let businessObjListCopy = action.content.businessObjList.data.map(item=>{
                return item.data
            });
            return $$state.merge({
                businessObjList: businessObjListCopy,
            })
            
        case 'tpl_setting_distribute_showModal2'://显示分配界面
            return $$state.merge({
                roleList: action.content.roleList,
                distributeVisible: true,
            })
        case 'tpl_setting_roles_choosed'://选择角色
            return $$state.merge({
                rolesIdList: action.content.list,
            })
        case 'tpl_setting_enable_data':
            return  $$state.setIn([action.content.name, action.content.index,'data','enableState'], action.content.status);   
        default:
            return $$state;
    }
};