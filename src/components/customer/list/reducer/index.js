import Immutable from "immutable";

let $$initialState = {
    data: [], //tabel展示数据
    enumData: {},//存储查询条件预制数据
    //selectedRows: [],
    selectedRowKeys: [],//存储table已选择keys
    formVisitable: false, //新增、修改modal显隐
    searchMap: {}, //存放实时输入的表单查询查询条件
    viewData: {}, //获取当前客户信息，view面板使用数据
    pagination: {//list列表页table分页信息
        pageSize: 20,
        page: 1
    },
    moreShow: false, //查询条件显隐,
    viewState: false, //滑动面板显隐,

    icbcInfo: [], //根据客户工商id查询出来的所有详情信息,用在编辑和新增中
    icbcVisible: false, //工商信息查询新增编辑时面板显隐控制
    addIcbcName:'',//保存新增时已查询了的名字

    icbcInfo1: [], //根据客户工商id查询出来的所有详情信息,用在详情中
    icbcVisible2: false, //工商信息查询详情面板显隐
    

    viewDataRelevant:[],//获取详情相关list面板
    viewDataJoinList:{},//存放参与人列表数据
    leftJoinPanelKeys:'1',//保存详情面板右侧面板选项卡选中值
    RightJoinPanelKeys:'1',//保存详情面板左侧面板选项卡选中值,
    contactsCardData:{},//保存联系人相关对象输入值
    clueCardList:{},//保存商机新增表单数据
    clueTableList:{},//保存商机新增表单table数据
    leadVisible:false,
    //==================以下为模板数据
    layoutFilds:[],//--------新增弹框模板
    titleList:[],//----------主列表表头模板
    detailFilds:[],//--------详情模板
    relationObject:[],//-----相关对象模板
};

function pageAdd(page, item) {
    page.total += 1;
    page.data.unshift(item);
    page.page = Math.ceil(page.total / page.pageSize);
    return page;
}

function pageEdit(page, item) {
    let { data } = page;
    for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].id == item.id) {
            data[i] = item;
            break;
        }
    }
    page.data = data;
    return page;
}

function clearObject(obj){
    for(let key in obj){
        debugger
        obj[key] = undefined
    }
    return obj
}

export default function orgReducers($$state = Immutable.fromJS($$initialState),action) {
    switch (action.type) {
        case "CUSTOMER_LIST_GETDATA": //查询各种table数据
            return $$state.merge({
                data: action.payload.data,
                pagination: action.payload.pagination,
                selectedRowKeys:[]
            });
        case 'CUSTOMER_LIST_DETAILENABLESTATE'://详情起停用功能
            let enableState = $$state.get('viewData').toJS()
            enableState.enableState = action.state;
            debugger
            return $$state.merge({
                data: action.data,
                pagination: action.pagination,
                viewData:enableState
            });
        case "CUSTOMER_LIST_SHOWFORM": //新增、修改编辑菜单显示
            
            $$state.get('viewData')
            return $$state.merge({
                formVisitable: action.payload.visible,
            });
        case "CUSTOMER_LIST_CHANGEVISIBLE": //查询功能显示
            let visit = $$state.get("moreShow");
            return $$state.merge({ moreShow: !visit });

        case "CUSTOMER_LIST_SELECTROW": //保存table已选择条件
            return $$state.merge({
                selectedRowKeys: Immutable.fromJS(
                    action.payload.selectedRowKeys
                )
            });
        case "CUSTOMER_LIST_ADDCUSTOMER": //点击新建按钮时，清空viewPanel数据,增加带过来的值
            return $$state.merge({
                viewData: {},
                formVisitable: action.data,
            });
        //点击选择公司获取工商信息列表    
        case "CUSTOMER_LIST_ICBCDETAILINFO":
            debugger
            return $$state.merge({
                icbcInfo: action.data,
                icbcVisible: action.visiable,
            });
        //新增时，保存已获取工商信息的客户名称,和表单已赋值的数据
        case 'CUSTOMER_LIST_SAVEICBCNAME':
        debugger
            return $$state.merge({
                icbcVisible: action.visiable,
                addIcbcName :action.viewData.name,
                viewData:action.viewData
            });
        //新增时,关闭工商信息详情modal
        case "CUSTOMER_LIST_SAVEICBCNAMECANCEL":
            return $$state.merge({
                icbcVisible: action.visiable
            });
        //客户详情获取工商详情列表，打开modal    
        case "CUSTOMER_LIST_ICBCINFODETAIL":
            debugger
            return $$state.merge({
                icbcInfo1: action.data,
                icbcVisible2: action.visiable,
            });
        case 'CUSTOMER_LIST_ICBCDETAILMODAL':
            return $$state.merge({
                icbcVisible2: action.visiable,
                icbcInfo1:action.data
            })
        case "CUSTOMER_LIST_MODALDETALHIDE":
            return $$state.merge({
                icbcVisible2: action.visiable
            });

        case "CUSTOMER_LIST_CLEANSELECT":
     
            return $$state.merge({
                icbcVisible2: action.visiable,
                data: pageEdit($$state.get("data").toJS(), action.data)
            });
        case "CUSTOMER_LIST_CHANGESTATEEDIT":
            return $$state.merge({
                icbcSelect: action.visiable
            });
        case "CUSTOMER_LIST_MODALDETALSHOW":
            return $$state.merge({
                icbcVisible2: action.visiable,
                icbcInfo1: action.data
            });
        case "CUSTOMER_LIST_MODALCLOSE1":
            return $$state.merge({
                //编辑中的modal显示、关闭
                icbcVisible: action.visible
            });
        case "CUSTOMER_LIST_SEARCHMAP": //存放扩展、基础查询条件
            return $$state.merge({
                searchMap: action.data
            });
        case "CUSTOMER_LIST_CARDEDITCHANGE": //存放新增修改表单数据
            return $$state.merge({
                viewData: action.data
            });
        case "CUSTOMER_LIST_SAVESEARCHMAP": //每次根据查询条件进行获取table数据
            return $$state.merge({
                searchMap: action.payload == undefined ? {} : action.payload
            });
        //增加客户，增加一条新数据，清空工商详情，和保存的客户名称
        case "CUSTOMER_LIST_ADDSAVE": 
            return $$state.merge({
                formVisitable: false,
                data: pageAdd($$state.get("data").toJS(), action.data),
                icbcInfo:[],
                addIcbcName:'',
                viewData:clearObject($$state.get('contactsCardData').toJS())
            });
        case "CUSTOMER_LIST_EDITSAVE": //修改客户
            return $$state.merge({
                formVisitable: false,
                data: pageEdit($$state.get("data").toJS(), action.data),
                viewData:action.data
            });
        case "CUSTOMER_LIST_SHOWVIEWFORM": //显示面板时，根据客户id查客户数据，上级客户，行业参照改成{id,name}形式
            //把重新复制操作放到点击编辑按钮的地方，这个地方保留关注属性
            let actionData = action.data;
            actionData.industry = {
                id: actionData.industry,
                name: actionData.industryName
            };
            // actionData.parentId = {
            //     id: actionData.parentId,
            //     name: actionData.parentName
            // };
            actionData.followState = action.state.followState;
            
            actionData.province_city_district = {}
            actionData.province_city_district.result= [
                actionData.province.toString(),
                actionData.city.toString(),
                actionData.district.toString()
            ];
            
            actionData.ownerUserId = {id:actionData.salesVOs[0].ownerUserId,name:actionData.salesVOs[0].ownerUserName}
            return $$state.merge({
                viewState: action.visible,
                viewData: actionData,
                leftJoinPanelKeys:'1',
                RightJoinPanelKeys:'1'
            });
        case "CUSTOMER_LIST_FOLLOWSTATECHANGE": //更改关注未关注
            return $$state.setIn(
                ["viewData", "followState"],
                action.state.followState
            );
        case "CUSTOMER_LIST_HIDEVIEWFORM":
            return $$state.merge({
                viewState: action.payload.visiable,
                icbcInfo1: []
            });
        case "CUSTOMER_LIST_CLEANVERIFYID":
            let clean = $$state.get("viewData").merge({
                verifyFullname: ""
            });
            return $$state.merge({
                icbcVisible2: action.visiable,
                viewData: clean
            });
        case "CUSTOMER_LIST_DELETE": //删除客户
            return $$state.merge({
                data: action.payload.data,
                selectedRowKeys:[]
            });

        case "CUSTOMER_LIST_GETENUMDATA": //获取查询条件基础显示内容
            return $$state.merge({ enumData: action.payload.enumData });
            
        case 'CUSTOMER_VIEWPANEL_ASSIGN_CHANGEVIEWPANEL':
            return $$state.merge({
                 viewData: action.viewData 
            });
        case 'CUSTOMER_VIEWPANEL_PANELRIGHT_LIST'://点击详情面板中右侧详情部分列表数据
            
            return $$state.merge({
                viewDataJoinList: action.data,
                RightJoinPanelKeys:action.index
            });
        case 'CUSTOMER_VIEWPANEL_PANELLEFT_LIST'://点击详情面板中左侧详情部分列表数据
        
            return $$state.merge({
                leftJoinPanelKeys:action.index+'',
                viewDataRelevant:action.data
            });
        
        case 'CUSTOMER_VIEWPANEL_PANELLEFT_SETLIST'://只能加参与人
            let joinList = $$state.getIn(['viewDataJoinList','data']) 
            return $$state.setIn(['viewDataJoinList','data'],joinList.push(Immutable.fromJS(action.data))) 
        case 'CUSTOMER_VIEWPANEL_PANELLEFT_DELLIST'://删除一条联系人
            let delList = $$state.getIn(['viewDataJoinList','data']).toJS();
            
            delList = delList.filter((item)=>{
                return item.id !=action.id
            })
            return $$state.setIn(['viewDataJoinList','data'],Immutable.fromJS(delList)) 
        case 'CUSTOMER_VIEWPANEL_CHANGEPANELLEFT'://触发详情左侧tab
            return $$state.merge({
                leftJoinPanelKeys:action.index
            });
        case "CUSTOMER_VIEWPANEL_PANELLEFT_CONTACTSFORM"://获取相关对象联系人表单数据
            return $$state.merge({
                contactsCardData:action.data
            });
        case "CUSTOMER_VIEWPANEL_PANELLEFT_CONTACTSFORMADD"://增加联系人对象    
           let addContacts = $$state.get('viewDataRelevant').toJS()
           debugger
           addContacts[0].list.data.unshift(action.data)
           return $$state.merge({
                viewDataRelevant:addContacts
           });
        case "CUSTOMER_VIEWPANEL_PANELLEFT_CLEARCONTACTSFORM":
        
            return $$state.merge({
                contactsCardData:clearObject($$state.get('contactsCardData').toJS())
            });
        case 'CUSTOMER_VIEWPANEL_DELOPP':
            let delOpp = $$state.get('viewDataRelevant').toJS();
            delOpp[2].list.data = delOpp[2].list.data.filter((item)=>{
                return item.id != action.ids
            })
            
            return $$state.merge({
                viewDataRelevant:Immutable.fromJS(delOpp)
            });
        case 'CUSTOMER_VIEWPANEL_DELCONTACTS':
            let delContacts = $$state.get('viewDataRelevant').toJS();
            delContacts[0].list.data = delContacts[0].list.data.filter((item)=>{
                return item.id != action.id
            })
            return $$state.merge({
                viewDataRelevant:Immutable.fromJS(delContacts)
            });
        
        //=================================以下为模板方法
        case 'CUSTOMER_CARD_ADD'://弹出框模板
        return $$state.merge({
            layoutFilds: action.layoutFilds 
        });
    case 'CUSTOMER_GETTITLE_SUCCESS'://表头模板
        return $$state.merge({
            titleList: action.titleList 
        });
    case 'CUSTOMER_GETDETAIL_SUCCESS'://详情模板
        return $$state.merge({
            detailFilds: action.detailFilds,
            relationObject: action.relationObject
        });
        default:
            return $$state;
    }
}
