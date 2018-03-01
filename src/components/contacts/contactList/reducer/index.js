import Immutable from "immutable";
import { pageAdd, pageEdit } from 'utils/busipub'

let $$initialState = {
    pagination: {
        pageSize: 10,
        page: 1
    },
    loading: false,//列表页加载动画
    rowKeys: {},//选择
    data: {},//列表数据
    visible: false,//
    tags: {},//
    editData: {postList:[],customerList:[]},//客户和职务列表
    searchMap:{enableState:1},//查询条件
    enumData:[],
    modalData:{},//弹窗modal中的数据
    post:{id:0,name:''},//职务
    customer:{id:0,name:''},//客户
    slideShowData:{},//详情页面数据
};

export default function reducer(
    $$state = Immutable.fromJS($$initialState),
    action
) {
    switch (action.type) {
        case "CONTACTS_LIST_GETLISTSUCCESS": //table显示加载数据动画
            return $$state.update("loading", val => {
                return true;
            });
        case "CONTACTS_LIST_GETLIST": //获取查询的数据，关闭table加载动画
       // debugger
           /*  $$state = $$state.update("loading", val => {
                return false;
            }); */
            return $$state.merge({
                data: action.data,
                loading: false,
                pagination: action.pagination,
            });
        case "CONTACTS_LIST_SHOWFORM": //显示、关闭modal层
            return $$state.update("visible", val => {
                return action.data;
            });

        case "CONTACTS_LIST_EDIT"://打开新增编辑按钮
        let zzz=action;
        let post={id:0,name:''},customer={id:0,name:''};
        debugger;
        if(action.name=='edit'){        
            post.id=action.data.post;
            post.name=action.data.postName;
            customer.id=action.data.customer;
            customer.name=action.data.customerInfo.name;
        }      
        //debugger;
            return $$state.merge({
                loading: false,
                visible: action.show,
                editData: action.result,
                modalData: action.data,
                post: post,
                customer: customer,
            });
        case "CONTACTS_CARD_SAVEADD": //新增一条数据
        let vvv=action;
        debugger;
            return $$state.merge({
                visible: false,
                loading: false,
                data: pageAdd($$state.get("data").toJS(), action.data)
            });

        case "CONTACTS_LIST_SELECTDATA": //保存已选择的数据
            return $$state.merge({
                rowKeys: action.data
            }); 
            return $$state.update("rowKeys", val => {
                return Immutable.fromJS(action.data);
            });
        case "CONTACTS_LIST_GETLISTUPDATE": //删除一到多条数据
            $$state = $$state.set("data", Immutable.fromJS(action.data)).toJS();
           // $$state = $$state.set("loading", false);
            //selectedRows中删除已选择的
            $$state.rowKeys["selectedRows"] = $$state.rowKeys[
                "selectedRows"
            ].filter((item, index) => {
                for (var i = 0; i < action.del.length; i++) {
                    if (action.del[i] == item.id) {
                        return false;
                    }
                }
                return true;
            });
            //从selectedRowKeys中删除已选择的
            $$state.rowKeys["selectedRowKeys"] = $$state.rowKeys[
                "selectedRowKeys"
            ].filter((item, index) => {
                for (var i = 0; i < action.del.length; i++) {
                    if (action.del[i] == item) {
                        return false;
                    }
                }
                return true;
            });
            return Immutable.fromJS($$state);
        case "CONTACTS_LIST_UPDATELIST": //保存编辑
            let data = $$state.toJS().data.data; 
            let dataCopy={},postEdit={},customerEdit={}; 
            if(data&&data.length){
                data.forEach((item,index,arr)=>{
                    if(item.id==action.data.id){              
                        action.data['customerInfo'].name=action.data.customerName;
                        arr[index]=action.data 
                    }
                })
            }
            postEdit.id= action.data.post;
            postEdit.name = action.data.postName;
            customerEdit.id = action.data.customer;
            customerEdit.name = action.data.customerName;
            dataCopy.data = data
            //debugger;
            return $$state.merge({
                data: dataCopy,
                visible: false,
                loading: false,
                post: postEdit,
                customer: customerEdit,
                slideShowData: action.data,
            });
        case "CONTACTS_LIST_SEARCHMAP": //保存table已选择条件
            return $$state.merge({
                searchMap: action.data
            });
        case "CONTACTS_ADD_CARD": //打开新建窗口
            return $$state.merge({
                modalData: action.data
            });
        case "CONTACTS_CHOOSED_CARD": //保存参照中选择项
                if(action.name=='post'){
                    return $$state.merge({
                        post: action.data
                    });
                }else{
                    return $$state.merge({
                        customer: action.data
                    }); 
                }   
        case "CONTACTS_SLIDESHOW_CARD": //打开详情窗口
            let cccvvvvvvvvvv=action;
            let data2 = $$state.toJS().data.data
            let slideShowObj = {};
            if(data2){
                data2.forEach(item=>{
                    if(item.id==action.data.id){
                        slideShowObj=item
                    }
                })
            }
            return $$state.merge({
                slideShowData: slideShowObj
            });
        case "CONTACTS_LIST_FAIL": //请求失败，关闭loading
                return $$state.merge({
                    loading: false
                });
                                  
        default:
            return $$state;
    }
}
