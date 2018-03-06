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
    editData: {postList:[],customerList:[]},//客户和职务列表
    searchMap:{enableState:1},//查询条件
    modalData:{},//弹窗modal中的数据
    post:{id:0,name:''},//职务
    dynamicData:[],//动态数据
    nameArr:[],//编辑时修改过的字段名集合
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
            return $$state.merge({
                data: action.data,
                loading: false,
                visible:false,
                pagination: action.pagination,
            });
        case "CONTACTS_LIST_SHOWFORM": //显示、关闭modal层
            return $$state.update("visible", val => {
                return action.data;
            });

        case "CONTACTS_LIST_EDIT"://打开新增编辑按钮
            return $$state.merge({
                loading: false,
                visible: action.show,
                editData: action.result,
                modalData: {},
                post: {id:0,name:''},
                nameArr: [],
            });

        case "CONTACTS_LIST_SELECTDATA": //保存已选择的数据
            return $$state.merge({
                rowKeys: action.data
            }); 
            return $$state.update("rowKeys", val => {
                return Immutable.fromJS(action.data);
            });
        case "CONTACTS_LIST_GETLISTUPDATE": //删除一到多条数据
            $$state = $$state.set("data", Immutable.fromJS(action.data));
            $$state = $$state.set("loading", false).toJS();
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
            let dataCopy={},postEdit={}; 
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
            dataCopy.data = data
            return $$state.merge({
                visible: false,
                loading: false,
                post: postEdit,
                modalData: action.data,
            });
        case "CONTACTS_LIST_SEARCHMAP": //保存table已选择条件
            return $$state.merge({
                searchMap: action.data
            });
        case "CONTACTS_ADD_CARD": //表单中的变化值往redux写入中
            return $$state.merge({
                modalData: action.data,
                nameArr: action.arr,
            });
        case "CONTACTS_CHOOSED_CARD": //保存参照中选择项
            return $$state.merge({
                post: action.data
            });    
        case "CONTACTS_SLIDESHOW_CARD": //打开详情窗口
            return $$state.merge({
                dynamicData: action.result.dynamicList,
            });
        case "CONTACTS_LIST_FAIL": //请求失败，关闭loading
            return $$state.merge({
                loading: false
            });
        case "CONTACTS_EDIT_DETAIL_BEGIN": //请求详情，就清空modalData中的值
            return $$state.merge({
                modalData: {},
            });
        case "CONTACTS_EDIT_DETAIL": //展开详情时请求回来单个联系人数据详情
            let post={id:0,name:''};
            post.id=action.result.post;
            post.name=action.result.postName;
            let value = {
                name: action.result.customerInfo.name,
                id: action.result.customer
            }
            action.result.customer ={value: value}
            return $$state.merge({
                modalData: action.result,
                post: post,
                });  
                                                  
        default:
            return $$state;
    } 
}
