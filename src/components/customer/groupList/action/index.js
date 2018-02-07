import reqwest from "utils/reqwest";
import { message } from "antd";
import { cum as url, cusInquire, doc, baseDir,oppstage ,opportunity,contacts} from "api";


//包装发给redux的对象
export function fetchData(type, payload){
    return {
        type,
        payload
    };
};


//控制查询显隐
export function changeVisible(){
    return {
        type: "CUSTOMERGROUP_LIST_CHANGEVISIBLE"
    };
};

//保存table已选择行数据
export function selectedRowKeys (selectedRowKeys){
    return {
        type: "CUSTOMERGROUP_LIST_SELECTROW",
        payload: { selectedRowKeys }
    };
};


//控制新增表单显隐
export function showForm (visible){
    return fetchData("CUSTOMERGROUP_LIST_SHOWFORM", { visible });
};

//点击修改按钮触发的方法
export function showFormEdit(visiable){
    
    return{
        type:'CUSTOMERGROUP_LIST_SHOWEDITFORM',
        visiable
    }
}


//删除客户
export function deleteData (ids, searchMap, pagination){
    
    return dispatch => {
        reqwest(
            {
                url: baseDir+'cum/groupcustomers/batch',
                method: "DELETE",
                data: {
                    param: {
                        ids,
                        ...pagination,
                        searchMap
                    }
                }
            },
            data => {
                
                dispatch(
                    fetchData("CUSTOMERGROUP_LIST_DELETE", {
                        data: data
                    })
                );
            }
        );
    };
};
//启停用功能
export function setEnableState (ids, state, page, searchMap){
    
    return dispatch => {
        reqwest(
            {
                url: baseDir + 'cum/groupcustomers/state',
                method: "PUT",
                data: {
                    param: {
                        ids,
                        ...page,
                        searchMap,
                        enableState: String(state)
                    }
                }
            },
            dataResult => {
                dispatch(
                    fetchData("CUSTOMERGROUP_LIST_GETDATA", {
                        data: dataResult,
                        pagination: page
                    })
                );
            }
        );
    };
};

//详情器停用
export function setDetailEnableState (ids, state, page, searchMap){
    
    return dispatch => {
        reqwest(
            {
                url: url.customer + "/state",
                method: "PUT",
                data: {
                    param: {
                        ids,
                        ...page,
                        searchMap: changeSearchData(searchMap),
                        enableState: String(state)
                    }
                }
            },
            dataResult => {
                
                dispatch({
                    type:"CUSTOMERGROUP_LIST_DETAILENABLESTATE",
                    data: dataResult,
                    pagination: page,
                    state
                });
            }
        );
    };
};

//拼接一堆地址
export function appendAddress(data){
    for (let i = 0; i < data.data.length; i++) {
        data.data[i].address =
            String(data.data[i].provinceName) +
            String(data.data[i].cityName) +
            String(data.data[i].districtName) +
            String(data.data[i].street);
    }
    return data;
};

//获取数据、基础查询数据、扩展查询数据
export function getListData (pagination, searchMap,searchPlan){//----赵华冰2-2添加一个searchPlan参数
    
    return dispatch => {
        dispatch(fetchData("CUSTOMERGROUP_LIST_SAVESEARCHMAP", searchMap));
        reqwest(
            {
                url: baseDir +'/cum/groupcustomers',
                method: "get",
                data: {
                    param: {
                        ...pagination,
                        searchMap: changeSearchData(searchMap),
                        searchPlanMap:searchPlan//---赵华冰2-2
                    }
                }
            },
            data => {
                console.log('进入页面获取到的首页数据============================',data)              
                dispatch(
                    fetchData("CUSTOMERGROUP_LIST_GETDATA", {
                        data: data,
                        pagination,
                    })
                );
                dispatch(
                    fetchData("CUSTOMERGROUP_SEARCHPLAN_SUCESS", {
                        searchPlan
                    })
                );
            }
        );
    };
};

//-----------获取查询方案初始条件值 赵华冰2-2
export function getInitInquire(){
    let xx=cusInquire.groupLsit;
    return dispatch => {
        reqwest(
            {
                url: cusInquire.groupLsit,
                method: "get",
                data: {}
            },
            result => {
                let searchPlan={};
                dispatch(
                    fetchData("CUSTOMERGROUP_GROUPLIST_GETENUMDATA", {
                        searchData: result.plan
                    })
                );
                if(result&&result.plan){
                    result.plan.forEach(item=>{
                        if(item.isSelected==1){
                            searchPlan.id=item.id;
                            searchPlan.defClass=item.defClass;
                        }
                    })
                }
                reqwest(
                    {
                        url: baseDir +'/cum/groupcustomers',
                        method: "get",
                        data: {
                            param: {
                                page:1,
                                pageSize:10,
                                searchPlanMap:searchPlan,
                            }
                        }
                    },
                    data => {            
                        dispatch(
                            fetchData("CUSTOMERGROUP_LIST_GETDATA", {
                                data: data,
                                pagination:{page:1,pageSize:10}
                            })
                        );
                    }
                );
            }
        );
    };
}


//获取查询条件档案初始值
export function getEnumData(){
    
    return dispatch => {
        reqwest(
            {
                url: url.doc,
                method: "get",
                data: {
                    param: { ids: "1,2,3,4,5,6" }
                }
            },
            data => {
                
                dispatch(
                    fetchData("CUSTOMERGROUP_LIST_GETENUMDATA", {
                        enumData: data.enumData
                    })
                );
            }
        );
    };
}; 

//获取动态信息
export function getDynamic(id){  
    return dispatch => {
        reqwest(
            {
                url: baseDir + `cum/groupcustomers/${id}/dynamic`,
                method: "GET",
            },
            data => {
                //debugger;
                dispatch({
                    type:"CUSTOMERGROUP_LIST_GETDYNAMIC",
                    data:data && data.dynamiclist?data.dynamiclist:[]
                });
            }
        );
    };
}

//遍历表单更改为可传数据
let changeSearchData=(data)=>{
    ;
    for(let key in data){
        if(key == 'cannelType'|| key == 'level'|| key == 'enableState'|| key == 'type'){
            if(data[key] && data[key].key){
                data[key] = data[key].key
            }
        }
        if(key=='province_city_district'&& data[key]){
            data.province = data[key][0];
            data.city = data[key][1];
            data.district = data[key][2];
            delete data.province_city_district;
        }
        if (key == 'industry'&& data[key]) {
            data[key] = data[key].id; //这会直接影响searchMap里industry的值，所以要先在不改变原先对象的基础上 改变原对象的id  进行原对象inmutable拷贝对象
        }
    }
    return data
}


 //上传数据时，各种参照的数据转换
 let trancFn=(data)=>{//--------------------
    
    //城市
    if (data.province_city_district) {
        let change = data.province_city_district.result;
        data.province = change[0];
        data.city = change[1];
        data.district = change[2];
        data.province_city_district = "";
    }

    //详细地址
    if (data.street && data.street.location) {
        data.longitude = data.street.location.lng
        data.latitude = data.street.location.lat
        data.street = data.street.address
    }

    if(data.cannelType && data.cannelType.key){
        data.cannelType = data.cannelType.key
    }

    data.address = ''
    
    return data;
}


//根据名称获取行业id,返回promise
let getIndustry = (industry)=>{
    return new Promise(function(resolve, reject) {
        
        reqwest(
            {
                url: baseDir + 'base/industrys/list',
                method: "GET",
                data: {
                    param: {
                        searchMap:{
                            searchKey:industry
                        }
                    }
                }
            },
            indastry => {
                
                resolve(indastry)
            }
        );
    });

}

//编辑的Request请求
let sendCumRequest = (data,dispatch)=>{
debugger
reqwest(
    {
        url: baseDir + "cum/groupcustomers/" + data.id,
        method: "put",
        data: {
            param: data
        }
    },
    data => {
        debugger
        dispatch({
            type: "CUSTOMERGROUP_LIST_EDITSAVE",
            data
        });
    }
);
}

//新增的Request请求
let sendCumNewRequest = (data,dispatch)=>{
    reqwest(
        {
            url: baseDir + 'cum/groupcustomers',
            method: "POST",
            data: {
                param: data
            }
        },
        data => {
            dispatch({
                type: "CUSTOMERGROUP_LIST_ADDSAVE",
                data
            });
        }
    );
}

//新增、编辑表单
export function listFormSave(data,id) {
    debugger
    data = trancFn(data);
    
    
    return dispatch => {
        if(data.industry && data.industry.name && (!data.industry.id)){
            getIndustry(data.industry.name).then((indastry)=>{
                
                if(indastry && indastry.data.length){
                    data.industry = indastry.data[0].id;
                }else{
                    data.industry = 'undefined'
                }
                //然后再发送编辑Request请求
                //如果newTypeId存在代表是新增
                if(!id){
                    sendCumNewRequest(data,dispatch)
                }else{
                    sendCumRequest(data,dispatch)
                } 
            })
        }else{
            //有行业id没有行业name
            
            if( data.industry && (!data.industry.name) && data.industry.id){
                data.industry = data.industry.id
            //都有的情况下只获取行业id    
            }else if(data.industry && data.industry.name && data.industry.id){
                data.industry = data.industry.id
            //都没有获取undefined    
            }else{
                data.industry = 'undefined'
            }
            //然后再发送编辑Request请求
            //如果newTypeId存在代表是新增
            if(!id){
                sendCumNewRequest(data,dispatch)
            }else{
                sendCumRequest(data,dispatch)
            }
        }
    };
};



//展示面板，把点击某个客户的所有值，放在redux中
export function showViewForm(visible, id){  
    //xxxxxxxxxxxxxxxxxxxxxxxxx
    debugger;
    return dispatch => {
        reqwest(
            {
                url: baseDir + "cum/groupcustomers/" + id,
                method: "GET",
            },
            data => {  
                debugger;             
                reqwest(
                    {
                        url: baseDir + `cum/groupcustomers/${id}/isfollow`,
                        method: "GET"
                    },
                    state => {
                        debugger;
                        dispatch({
                            type: "CUSTOMERGROUP_LIST_SHOWVIEWFORM",
                            visible,
                            data,
                            state
                        })
                    }
                );           
            }
        );
    };
};

export function hideViewForm (visiable){
    return fetchData("CUSTOMERGROUP_LIST_HIDEVIEWFORM", { visiable });
};

//客户升级
export function cumUpgrade(id){
    
    return dispatch => {
        reqwest(
            {
                url:baseDir + `/cum/customers/${id}/submit`,
                method: "POST"
            },
            data => {
                
                reqwest(
                    {
                        url: baseDir + 'cum/customers/rel',
                        method: "GET",
                        data: {
                            param: {
                                pageSize: 50,
                                page: 1,
                                searchMap:{
                                    cumId:id
                                } 
                            }
                        }
                    },
                    result => {
                        
                        dispatch({
                            type:'CUSTOMERGROUP_VIEWPANEL_PANELLEFT_LIST',
                            index:2,
                            data:result.data
                        });
                    }
                );
            }
        );
    };
}


/**
 * 
 * @param {*} data 存放工商信息详细数据
 * @param {*} viewData  存储表单数据
 * @param {*} visiable 显示modal
 */

export function customerListInfo(data, visiable) {
    
    return {
        type: "CUSTOMERGROUP_LIST_ICBCDETAILINFO",
        data,
        visiable
    };
};

//在新增时保存客户工商名称，工商详情的时候,保存名字
export function saveIcbcName(viewData, visiable) {
    
    return {
        type: 'CUSTOMERGROUP_LIST_SAVEICBCNAME',
        viewData,
        visiable
    }
}
//在新增时关闭工商详情
export function saveIcbcNameCancel(visiable) {
    return {
        type: 'CUSTOMERGROUP_LIST_SAVEICBCNAMECANCEL',
        visiable
    }
}


//保存工商核实详情数据
export function icbcDetailInfo(data, visiable) {
    
    return {
        type: "CUSTOMERGROUP_LIST_ICBCINFODETAIL",
        data,
        visiable
    };
};

export function changeStateFn(visiable) {
    return {
        type: "CUSTOMERGROUP_LIST_CHANGESTATEEDIT",
        visiable
    };
};
//详情中工商核实
export function checkedFn(viewData, select, id, visiable) {
    
    return dispatch => {
        reqwest(
            {
                url: baseDir + `cum/customers/${id}/identifications`,
                method: "PUT",
                data: {
                    param: {
                        status: "Y",
                        companyid: select.companyid,
                        verifyFullname: select.companyname,
                        data: viewData
                    }
                }
            },
            result => {
                //debugger
                dispatch({
                    type: "CUSTOMERGROUP_LIST_CLOSEDETAILICBCMODOL",
                    visiable,
                    verifyFullname: result.verifyFullname,
                    verifyId:result.verifyId
                });
                
            }
        );
    };
};
//详情中取消工商核实
export function checkedCancelFn(id, visiable) {
    //debugger;
    return dispatch => {
        reqwest(
            {
                url: baseDir + `cum/customers/${id}/identifications`,
                method: "PUT",
                data: {
                    param: {
                        status: "N"
                    }
                }
            },
            result => {
               // debugger;
                dispatch({
                    type: "CUSTOMERGROUP_LIST_CLEANVERIFYID",
                    visiable
                });
            }
        );
    };
};

export function hasIcbc(name, id , visiable) {
    return dispatch => {
        //debugger
        if(name){
            reqwest(
                {
                    url: baseDir + "cum/customers/identifications/full",
                    method: "GET",
                    data:{
                        param:{
                            name:name
                        }
                    }
                },
                result => {
                    //debugger
                    dispatch({
                        type: "CUSTOMERGROUP_LIST_ICBCDETAILMODAL",
                        visiable,
                        data: result.data,
                    });
                }
            );
        }else{
            reqwest(
                {
                    url: baseDir + "cum/customers/identifications/" + id,
                    method: "GET"
                },
                result => {
                   // debugger
                    dispatch({
                        type: "CUSTOMERGROUP_LIST_ICBCDETAILMODAL",
                        visiable,
                        data: result.data,
                    });
    
                }
            );
        }  
    }
}


/* export function hasIcbc(verifyId,visiable){
    return dispatch => {
        
        reqwest(
            {
                url: baseDir + "cum/customers/identifications/" + verifyId,
                method: "GET"
            },
            result => {
                
                dispatch({
                    type: "CUSTOMERGROUP_LIST_ICBCDETAILMODAL",
                    visiable,
                    data:result.data,
                });
          
            }
        );
    }
} */

//详情中工商核实详情modal
// export function icbcDetailModal(icbcInfo1,visiable){
//     return {
//         type: "CUSTOMER_LIST_ICBCDETAILMODAL",
//         visiable
//     }
// }



//点击关注按钮
export function attentionFn(id, state){
    return dispatch => {
        reqwest(
            {
                url: baseDir + `cum/groupcustomers/${id}/follows`,
                method: "PUT",
                data: {
                    param: {
                        followState: state
                    }
                }
            },
            state => {
                dispatch({
                    //followState
                    type: "CUSTOMERGROUP_LIST_FOLLOWSTATECHANGE",
                    state
                });
            }
        );
    };
};

//控制modal2状态显隐的
export function modalDetalVisiable(visiable, verifyId){
    return dispatch => {
        reqwest(
            {
                url: baseDir + "cum/customers/identifications/" + verifyId,
                method: "GET"
            },
            result => {
                dispatch({
                    type: "CUSTOMERGROUP_LIST_MODALDETALSHOW",
                    visiable,
                    data: result.data
                });
            }
        );
    };
};

export function modalDetalVisiableFalse(visiable){
    return {
        type: "CUSTOMERGROUP_LIST_MODALDETALHIDE",
        visiable
    };
};

//控制modal1状态显隐的
export function customerModal1Show(visible){
    return {
        type: "CUSTOMERGROUP_LIST_MODALSHOW1",
        visible
    };
};

//关闭modal1
export function closeIcbcVisible1(visible){
    return {
        type: "CUSTOMERGROUP_LIST_MODALCLOSE1",
        visible
    };
};

//点击新建按钮清空viewPanel面板数据
export function addCustomer(data){
    //debugger;
    return dispatch => {
        dispatch({
            type: "CUSTOMERGROUP_LIST_ADDCUSTOMER",
            data
        });
    };
};

//点击新增按钮获取业务类型
export function addNewType() {
    return dispatch => {
        
        reqwest(
            {
                url: baseDir + 'cum/customers/roles/biztypes',
                method: "GET",
            },
            result => {
                
                dispatch({
                    type: "CUSTOMERGROUP_LIST_NEWEDITTYPE",
                    typeItem: result.biztypeList,
                });
            }
        );
    };
}

//往redux中存基础、扩展查询条件
export function saveSearchMap(data){
    return {
        type: "CUSTOMERGROUP_LIST_SEARCHMAP",
        data
    };
};

//往redux中存放编辑新增修改条件
export function editCardFn(changeData){
    
    return {
        type: "CUSTOMERGROUP_LIST_CARDEDITCHANGE",
        data: changeData
    };
};

//点击分配改变负责人信息
export function assignChangeViewData(viewData){  
    return{
        type: "CUSTOMERGROUP_VIEWPANEL_ASSIGN_CHANGEVIEWPANEL",
        viewData
    }
}

//点击获取右侧面板相关list
export function getRightPaneltList(id,JoinPagination,index){
    return dispatch => {
        reqwest(
            {
                url: baseDir + 'cum/customer/relusers',
                method: "GET",
                data: {
                    param: {
                        ...JoinPagination,
                        searchMap:{
                            cumId:id
                        } 
                    }
                }
            },
            result => {
                ;
                dispatch({
                    type: "CUSTOMERGROUP_VIEWPANEL_PANELRIGHT_LIST",
                    data: result,
                    index
                });
            }
        );
    };
}
//改变详情面板点击左侧tab时切换index
export function changeLeftPanel(index){
    return{
        type:'CUSTOMERGROUP_VIEWPANEL_CHANGEPANELLEFT',
        index
    }
}

//点击获取左侧面板相关list
export function getLeftPaneltList(id,JoinPagination,index){  
    
    return dispatch => {
        reqwest(
            {
                url: baseDir + 'cum/customers/rel',
                method: "GET",
                data: {
                    param: {
                        ...JoinPagination,
                        searchMap:{
                            cumId:id
                        } 
                    }
                }
            },
            result => {
                
                dispatch({
                    type:'CUSTOMERGROUP_VIEWPANEL_PANELLEFT_LIST',
                    index,
                    data:result.data
                });
            }
        );
    };
}

//添加参与人
export function setRightPaneltList(data){
    return{
        type:'CUSTOMERGROUP_VIEWPANEL_PANELLEFT_SETLIST',
        data
    }
}

//删除参与人
export function delRightPaneltList(id){
    return{
        type:'CUSTOMERGROUP_VIEWPANEL_PANELLEFT_DELLIST',
        id
    }
}

//保存联系人相关对象表单值
export function refContactForm(changeData){
    return {
        type: "CUSTOMERGROUP_VIEWPANEL_PANELLEFT_CONTACTSFORM",
        data: changeData
    };
}

export function refContactFormAdd(data){
    return {
        type: "CUSTOMERGROUP_VIEWPANEL_PANELLEFT_CONTACTSFORMADD",
        data
    };
}

//新增联系人相关对象
export function clearRefContactsForm(){
    return {
        type: "CUSTOMERGROUP_VIEWPANEL_PANELLEFT_CLEARCONTACTSFORM",
    };
}


//获取最新商机列表
export function getOppList(JoinPagination,id,index){ 
    return dispatch => {
        reqwest(
            {
                url: baseDir + 'cum/customers/rel',
                method: "GET",
                data: {
                    param: {
                        ...JoinPagination,
                        searchMap:{
                            cumId:id
                        } 
                    }
                }
            },
            result => {
                ;
                dispatch({
                    type:'CUSTOMERGROUP_VIEWPANEL_PANELLEFT_LIST',
                    data:result.data,
                    index
                });
            }
        );
    };
}

//删除一条商机
export function delOpp(ids,pagination){
    return (dispatch) => {
        reqwest({
            url: opportunity.opportunity + '/batch',
            method: "DELETE",
            data: {
                param: {
                    ids,
                    ...pagination,
                    searchMap: {}
                },
            }
        }, (data) => {
            
            dispatch({
                type:'CUSTOMERGROUP_VIEWPANEL_DELOPP',
                ids
            });
        })
    }
}

//删除一条联系人
export function delContacts(id,pagination){
    return (dispatch) => {
        reqwest(
            {
                url: `${contacts.contacts}/batch`,
                method: "DELETE",
                data: {
                    param: {
                        ...pagination,
                        searchMap: {},
                        ids: id
                    }
                }
            },
            result => {
                
                dispatch({
                    type: "CUSTOMERGROUP_VIEWPANEL_DELCONTACTS",
                    id
                });
            }
        );
    }
}


//-------导入导出 1.30号 余春梅
export function viewLeadShow(leadVisible) {
    //debugger
    return {
        type: "CUSTOMERCOMPANY_LIST_VIEWLEADSHOW",
        payload: { leadVisible }
    };
}

export function leadShow(leadVisible) {
    return {
        type: "CUSTOMERCOMPANY_LIST_LEADSHOW",
        payload: { leadVisible }
    };
};

export function leadEndShow(leadVisible) {
    return {
        type: "CUSTOMERCOMPANY_LIST_LEADENDSHOW",
        payload: { leadVisible }
    };
};
export function leadEndView(leadVisible, leadStep) {
    //debugger
    return {
        type: "CUSTOMERCOMPANY_LIST_LEADENDVIEW",
        payload: { leadVisible, leadStep }
    };

}
export function leadEndIngShow(leadVisible) {
    return {
        type: "CUSTOMERCOMPANY_LIST_LEADINGSHOW",
        payload: { leadVisible }
    };
}

export function saveFiles(files) {
    //debugger
    return {
        type: "CUSTOMERCOMPANY_LIST_SAVEFILES",
        payload: { files }
    };
}
export function fileSuccess(filesSuccess, result, show, leadStep) {
    return {
        type: "CUSTOMERCOMPANY_LIST_FILESUCCESS",
        payload: { filesSuccess, result, show, leadStep }
    };
}
export function fileFail(filesFail) {
    return {
        type: "CUSTOMERCOMPANY_LIST_FILEFAIL",
        payload: { filesFail }
    };
}
//==============