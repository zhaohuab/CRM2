import Immutable from "immutable";
import { pageAdd, pageEdit } from 'utils/busipub'

let $$initialState = {
    data: [], //tabel展示数据
    enumData: [],//存储查询条件预制数据
    searchData:[],//-----储存查询方案数据    赵华冰2-2
    searchPlan:{id:'',defClass:''},//---存储查询方案    赵华冰 2-2
    defaultId:0, //----刷新页面返回的查询方案默认显示项id 赵华冰 2-2
    selectedRowKeys: [],//存储table已选择keys
    formVisitable: false, //新增、修改modal显隐
    newCumMenu: [],//点击新增按钮时获取的业务类型
    searchMap: {}, //存放实时输入的表单查询查询条件
    viewData: {}, //获取当前客户信息，view面板使用数据
    pagination: {//list列表页table分页信息
        pageSize: 10,
        page: 1
    },
    moreShow: false, //查询条件显隐,
    viewState: false, //滑动面板显隐,
    dynamicData:[],//动态数据

    icbcInfo: [], //根据客户工商id查询出来的所有详情信息,用在编辑和新增中
    icbcVisible: false, //工商信息查询新增编辑时面板显隐控制
    addIcbcName:'',//保存新增时已查询了的名字
    icbcSele:'',//保存已选择的公司信息名称及id

    icbcInfo1: [], //根据客户工商id查询出来的所有详情信息,用在详情中
    icbcVisible2: false, //工商信息查询详情面板显隐
    icbcSeleDetail:'',//保存已选择的公司信息名称及id

    viewDataRelevant:[],//获取详情相关list面板
    viewDataJoinList:{},//存放参与人列表数据
    leftJoinPanelKeys:'1',//保存详情面板右侧面板选项卡选中值
    RightJoinPanelKeys:'1',//保存详情面板左侧面板选项卡选中值,
    contactsCardData:{},//保存联系人相关对象输入值
    clueCardList:{},//保存商机新增表单数据
    clueTableList:{},//保存商机新增表单table数据,

    viewLeadVisible: false,
    leadVisible: false,//导入显隐
    leadEndVisible: false,//导入完成
    leadingVisible: false,//导入中
    leadStep: 1,//导入步骤
    leadFiles: {},//导入文件内容
    filesSuccess: false,
    filesFail: false,
    successResult: {} //导入成功后返回结果
};

function clearObject(obj){
    for(let key in obj){
        obj[key] = undefined
    }
    return obj
}

export default function customerGroupList($$state = Immutable.fromJS($$initialState),action) {
    switch (action.type) {


        //----------- 导入导出
        case 'CUSTOMERGROUP_LIST_VIEWLEADSHOW':
        
            return $$state.merge({
                viewLeadVisible: action.payload.leadVisible,
            });
        case 'CUSTOMERGROUP_LIST_LEADSHOW':
            return $$state.merge({
                leadVisible: action.payload.leadVisible,
            });
        case 'CUSTOMERGROUP_LIST_LEADENDSHOW':
            return $$state.merge({
                leadEndVisible: action.payload.leadVisible,
            });
        case 'CUSTOMERGROUP_LIST_LEADINGSHOW':
            return $$state.merge({
                leadingVisible: action.payload.leadVisible,
            });
        case 'CUSTOMERGROUP_LIST_LEADSHOW':
            return $$state.merge({
                leadVisible: action.payload.leadVisible,
            });
        case 'CUSTOMERGROUP_LIST_LEADENDSHOW':
            return $$state.merge({
                leadEndVisible: action.payload.leadVisible,
            });
        case 'CUSTOMERGROUP_LIST_LEADINGSHOW':
            return $$state.merge({
                leadingVisible: action.payload.leadVisible,
            });
        case 'CUSTOMERGROUP_LIST_SAVEFILES':           
            return $$state.merge({
                leadFiles: action.payload.files,
            });
        case 'CUSTOMERGROUP_LIST_FILESUCCESS':
            return $$state.merge({
                filesSuccess: action.payload.filesSuccess,
                successResult: action.payload.result,
                leadEndVisible: action.payload.show,
                leadFiles: {},
                leadStep: action.payload.leadStep
            });
        case 'CUSTOMERGROUP_LIST_FILEFAIL':
            return $$state.merge({
                filesFail: action.payload.filesFail,
            });
        case 'CUSTOMERGROUP_LIST_LEADENDVIEW':
            return $$state.merge({
                leadEndVisible: action.payload.leadVisible,
                leadStep: action.payload.leadStep
            });
            //------------------------     
        case 'CUSTOMERGROUP_LIST_CHANGESTEP':
            return $$state.merge({
                leadStep: action.payload.leadStep
            });


        case "CUSTOMERGROUP_LIST_GETDATA": //查询各种table数据    
            return $$state.merge({
                data: action.payload.data,
                pagination: action.payload.pagination,
                selectedRowKeys:[],
            });
        case 'CUSTOMERGROUP_LIST_DETAILENABLESTATE'://详情起停用功能
            let enableState = $$state.get('viewData').toJS()
            enableState.enableState = action.state;
            return $$state.merge({
                data: action.data,
                pagination: action.pagination,
                viewData:enableState
            });
        case "CUSTOMERGROUP_LIST_SHOWFORM": //新增、修改编辑显示
            let EditCancelData =  $$state.get('viewData').toJS();
            if(EditCancelData.street && EditCancelData.street.address){
                EditCancelData.street = EditCancelData.street.address
            }else{
                EditCancelData.street = ''
            }
            //industry
            if(EditCancelData.industry && EditCancelData.industry.id){
                EditCancelData.industry = EditCancelData.industry.id
            }else{
                EditCancelData.industry = ''
            }


            return $$state.merge({
                formVisitable: action.payload.visible,
                viewData:EditCancelData
            });
        //存放动态信息
        case "CUSTOMERGROUP_LIST_GETDYNAMIC":
                return $$state.merge({
                    dynamicData: action.data
                });    
        //点击编辑按钮触发的方法
        case 'CUSTOMERGROUP_LIST_SHOWEDITFORM':
            let EditStreetData =  $$state.get('viewData').toJS();
            let ccccc = Immutable.fromJS(EditStreetData).toJS()
            debugger
            let streetEdit = {
                address: EditStreetData.street,
                location: {
                    lng: EditStreetData.longitude,
                    lat: EditStreetData.latitude
                }
            }
            
            let industry = {
                id:EditStreetData.industry,
                name:EditStreetData.industryName
            }

            ccccc.street = streetEdit
            ccccc.industry = industry
            debugger
            return $$state.merge({
                formVisitable: action.visiable,
                viewData:ccccc
            });       

   /*          let editViewData =  $$state.get('viewData').toJS()
            let streetEdit = {
                address:editViewData.street,
                location:{
                    lng:editViewData.longitude,
                    lat:editViewData.latitude
                }
            }
            let industry = {
                id:editViewData.industry,
                name:editViewData.industryName
            }
            
            let district = [
                editViewData.province.toString(),
                editViewData.city.toString(),
                editViewData.district.toString()
            ]

            editViewData.province_city_district = {}

            //重新复制组合详细地址地图组件，和行业组件所需数据
            editViewData.province_city_district.result= district
            editViewData.street = streetEdit
            editViewData.industry = industry
            return $$state.merge({
                formVisitable: action.visiable,
                viewData:editViewData
            }); */
        case "CUSTOMERGROUP_LIST_NEWEDITTYPE":           
            return $$state.merge({
                newCumMenu: action.typeItem,
                viewData:clearObject($$state.get('contactsCardData').toJS())
            });
        case "CUSTOMERGROUP_LIST_CHANGEVISIBLE": //查询功能显示
            let visit = $$state.get("moreShow");
            return $$state.merge({ moreShow: !visit });

        case "CUSTOMERGROUP_LIST_SELECTROW": //保存table已选择条件
            return $$state.merge({
                selectedRowKeys: Immutable.fromJS(
                    action.payload.selectedRowKeys
                )
            });
        case "CUSTOMERGROUP_LIST_ADDCUSTOMER": //点击新建按钮时，清空viewPanel数据,增加带过来的值
            return $$state.merge({
                formVisitable: action.data,
                viewData: clearObject($$state.get('contactsCardData').toJS()),
                //每次新建把上一次保存的工商核实名称清零
                addIcbcName:''
            });
        //点击选择公司获取工商信息列表    
        case "CUSTOMERGROUP_LIST_ICBCDETAILINFO":
            return $$state.merge({
                icbcInfo: action.data,
                icbcVisible: action.visiable,
                icbcSele:action.select
            });
        //新增时，保存已获取工商信息的客户名称,和表单已赋值的数据
        case 'CUSTOMERGROUP_LIST_SAVEICBCNAME':
            return $$state.merge({
                icbcVisible: action.visiable,
                addIcbcName :action.viewData.name,
                viewData:action.viewData
            });
        //新增时,关闭工商信息详情modal
        case "CUSTOMERGROUP_LIST_SAVEICBCNAMECANCEL":
            return $$state.merge({
                icbcVisible: action.visiable
            });
        //客户详情获取工商详情列表，打开modal    
        case "CUSTOMERGROUP_LIST_ICBCINFODETAIL":
            return $$state.merge({
                icbcInfo1: action.data,
                icbcVisible2: action.visiable,
                icbcSeleDetail:action.select
            });
        case 'CUSTOMERGROUP_LIST_ICBCDETAILMODAL':
            return $$state.merge({
                icbcVisible2: action.visiable,
                icbcInfo1:action.data
            })
        case "CUSTOMERGROUP_LIST_MODALDETALHIDE":
            return $$state.merge({
                icbcVisible2: action.visiable
            });
            //详情确认核实关闭modal  
        case "CUSTOMERGROUP_LIST_CLOSEDETAILICBCMODOL":
         /*    let verifyData =  $$state.get('viewData').toJS()
            verifyData.verifyFullname = action.verifyFullname
            verifyData.verifyId = action.verifyId */
            return $$state.merge({
                icbcVisible2: action.visiable,
                viewData:action.result
            });
        case "CUSTOMERGROUP_LIST_CHANGESTATEEDIT":
            return $$state.merge({
                icbcSelect: action.visiable
            });
        case "CUSTOMERGROUP_LIST_MODALDETALSHOW":
            return $$state.merge({
                icbcVisible2: action.visiable,
                icbcInfo1: action.data
            });
        case "CUSTOMERGROUP_LIST_MODALCLOSE1":
            return $$state.merge({
                //编辑中的modal显示、关闭
                icbcVisible: action.visible
            });
        case "CUSTOMERGROUP_LIST_SEARCHMAP": //存放扩展、基础查询条件
            return $$state.merge({
                searchMap: action.data
            });
        case "CUSTOMERGROUP_LIST_CARDEDITCHANGE": //存放新增修改表单数据
            return $$state.merge({
                viewData: action.data
            });
        case "CUSTOMERGROUP_LIST_SAVESEARCHMAP": //每次根据查询条件进行获取table数据
            return $$state.merge({
                searchMap: action.payload == undefined ? {} : action.payload
            });
        //增加客户，增加一条新数据，清空工商详情，和保存的客户名称
        case "CUSTOMERGROUP_LIST_ADDSAVE": 
            return $$state.merge({
                formVisitable: false,
                data: pageAdd($$state.get("data").toJS(), action.data),
                icbcInfo:[],
                addIcbcName:'',
                icbcSele:'',
                viewData:clearObject($$state.get('contactsCardData').toJS()),
            });
        case "CUSTOMERGROUP_LIST_EDITSAVE": //修改客户
            let editFollow =  $$state.get('viewData').toJS()
            action.data.followState = editFollow.followState
            debugger
            return $$state.merge({
                formVisitable: false,
                data: pageEdit($$state.get("data").toJS(), action.data),
                viewData: action.data,
                icbcSele:'',
                addIcbcName:'',
                icbcInfo:[]
            });
        //点击一条客户数据时    
        case "CUSTOMERGROUP_LIST_SHOWVIEWFORM":
            let actionData = action.data;
        
                // let industry = {
                //     id:actionData.industry,
                //     name:actionData.industryName
                // }
                
                let district = [
                    actionData.province.toString(),
                    actionData.city.toString(),
                    actionData.district.toString()
                ]
    
                //关注
                actionData.followState = action.state.followState;
    
                //行业
                //actionData.industry = industry
    
                //省市区
                actionData.province_city_district = {}
                actionData.province_city_district.result = district
    
                return $$state.merge({
                    viewState: action.visible,
                    viewData: actionData,
                    leftJoinPanelKeys: '1',
                    RightJoinPanelKeys: '1'
                });
         /*    return $$state.merge({
                viewState: action.visible,
                viewData: action.data,
                leftJoinPanelKeys:'1',
                RightJoinPanelKeys:'1'
            }); */
        case "CUSTOMERGROUP_LIST_FOLLOWSTATECHANGE": //更改关注未关注
            return $$state.setIn(
                ["viewData", "followState"],
                action.state.followState
            );
        case "CUSTOMERGROUP_LIST_HIDEVIEWFORM":
            return $$state.merge({
                viewState: action.payload.visiable,
                icbcInfo1: []
            });
        case "CUSTOMERGROUP_LIST_CLEANVERIFYID":
            let clean = $$state.get("viewData").merge({
                verifyFullname: "",
                verifyId:'',
                isIdentified:action.isIdentified
            });
            return $$state.merge({
                icbcVisible2: action.visiable,
                viewData: clean
            });
        case "CUSTOMERGROUP_LIST_DELETE": //删除客户
            return $$state.merge({
                data: action.payload.data,
                selectedRowKeys:[]
            });

       case "CUSTOMERGROUP_LIST_GETENUMDATA": //获取查询条件基础显示内容
            return $$state.merge({ enumData: action.payload.enumData }); 
            
        case 'CUSTOMERGROUP_VIEWPANEL_ASSIGN_CHANGEVIEWPANEL':
            return $$state.merge({
                 viewData: action.viewData 
            });
        case 'CUSTOMERGROUP_VIEWPANEL_PANELRIGHT_LIST'://点击详情面板中右侧详情部分列表数据
            
            return $$state.merge({
                viewDataJoinList: action.data,
                RightJoinPanelKeys:action.index
            });
        case 'CUSTOMERGROUP_VIEWPANEL_PANELLEFT_LIST'://点击详情面板中左侧详情部分列表数据
        
            return $$state.merge({
                leftJoinPanelKeys:action.index+'',
                viewDataRelevant:action.data
            });
        
        case 'CUSTOMERGROUP_VIEWPANEL_PANELLEFT_SETLIST'://只能加参与人
            let joinList = $$state.getIn(['viewDataJoinList','data']) 
            return $$state.setIn(['viewDataJoinList','data'],joinList.push(Immutable.fromJS(action.data))) 
        case 'CUSTOMERGROUP_VIEWPANEL_PANELLEFT_DELLIST'://删除一条联系人
            let delList = $$state.getIn(['viewDataJoinList','data']).toJS();         
            delList = delList.filter((item)=>{
                return item.id !=action.id
            })
            return $$state.setIn(['viewDataJoinList','data'],Immutable.fromJS(delList)) 
        case 'CUSTOMERGROUP_VIEWPANEL_CHANGEPANELLEFT'://触发详情左侧tab
            return $$state.merge({
                leftJoinPanelKeys:action.index
            });
        case "CUSTOMERGROUP_VIEWPANEL_PANELLEFT_CONTACTSFORM"://获取相关对象联系人表单数据
            return $$state.merge({
                contactsCardData:action.data
            });
        case "CUSTOMERGROUP_VIEWPANEL_PANELLEFT_CONTACTSFORMADD"://增加联系人对象    
           let addContacts = $$state.get('viewDataRelevant').toJS()
           addContacts[0].list.data.unshift(action.data)
           return $$state.merge({
                viewDataRelevant:addContacts
           });
                   ////////天赐上传附件    
        case "CUSTOMERGROUP_LIST_FILESSUCCESS"://添加附件
        let viewDataRelevant = $$state.get('viewDataRelevant').toJS()
        viewDataRelevant[3].list.data.unshift(action.payload)
        return $$state.merge({
            viewDataRelevant: viewDataRelevant
        });
    ////////天赐删除附件
    case "CUSTOMERGROUP_LIST_DELETEFILE"://删除附件
        debugger
        let viewDataRelevant2 = $$state.get('viewDataRelevant').toJS()
        let fileArr = viewDataRelevant2[3].list.data;
        let file = action.file;
        for (let i = 0, len = fileArr.length; i < len; i++) {
            if (fileArr[i].id == file.id) {
                fileArr.splice(i, 1);
                break;
            }
        }
        return $$state.merge({
            viewDataRelevant: viewDataRelevant2
        });
    ////////////////   
        case "CUSTOMERGROUP_VIEWPANEL_PANELLEFT_CLEARCONTACTSFORM":
        
            return $$state.merge({
                contactsCardData:clearObject($$state.get('contactsCardData').toJS())
            });
        case 'CUSTOMERGROUP_VIEWPANEL_DELOPP':
            let delOpp = $$state.get('viewDataRelevant').toJS();
            delOpp[2].list.data = delOpp[2].list.data.filter((item)=>{
                return item.id != action.ids
            })
            
            return $$state.merge({
                viewDataRelevant:Immutable.fromJS(delOpp)
            });
        case 'CUSTOMERGROUP_VIEWPANEL_DELCONTACTS':
            let delContacts = $$state.get('viewDataRelevant').toJS();
            delContacts[0].list.data = delContacts[0].list.data.filter((item)=>{
                return item.id != action.id
            })
            return $$state.merge({
                viewDataRelevant:Immutable.fromJS(delContacts)
            });
        case "CUSTOMERGROUP_GROUPLIST_GETENUMDATA"://------------------获取集团客户查询条件选项及默认初始条件       
            let obj={};
            action.payload.searchData.forEach(item=>{
                if(item.isSelected==1){
                    obj.id=item.id;
                    obj.defClass=item.defClass;
                }
            })
            return $$state.merge({ searchData: action.payload.searchData, searchPlan:obj, defaultId:obj.id});
        case "CUSTOMERGROUP_SEARCHPLAN_SUCESS"://获取相关对象联系人表单数据      
            return $$state.merge({
                searchPlan:action.payload.searchPlan,
            });
            
        default:
            return $$state;
    }
}
