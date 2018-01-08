import Immutable from "immutable";

let $$initialState = {
    pagination: {//分页信息
        pageSize: 20,
        page: 1
    },
    searchMap: {}, //存放查询条件
    selectedRows: [],
    selectedRowKeys: [],
    visible: false,
    editData: {},
    viewState: false,
    data: {}, //table展示的数据 
    moreShow:false,
    enumData: {//查询条件数据
        level: [],
        source: [],
        state: []
    },
    //data: [
    // {
    //     id: 1,
    //     name: '他他他',
    //     companyName: '用友1',
    //     clueSource: '市场活动',
    //     duty: '销售经理',
    //     phone: 13333333333,
    //     mail: '123@.com',
    //     clueState: '跟进中',
    //     level: 'A',
    //     lastTime: '2017-10-10 12:30',
    //     manager: '张三',
    //     tel: 123,
    //     sex: '男',
    //     web: '123.com',
    //     industry: '销售',
    //     address: '产业园',
    //     province: '湖北',
    //     mark: ''


    // },
    // {
    //     id: 2,
    //     name: '他他他',
    //     companyName: '用友3',
    //     clueSource: '市场活动',
    //     duty: '销售经理',
    //     phone: 13333333333,
    //     mail: '123@.com',
    //     clueState: '跟进中',
    //     level: 'A',
    //     lastTime: '2017-10-10 12:30',
    //     manager: '张三',
    //     tel: 123,
    //     sex: '男',
    //     web: '123.com',
    //     industry: '销售',
    //     address: '产业园',
    //     province: '湖北',
    //     mark: ''
    // },
    // {
    //     id: 3,
    //     name: '他他他',
    //     companyName: '用友3',
    //     clueSource: '市场活动',
    //     duty: '销售经理',
    //     phone: 13333333333,
    //     mail: '123@.com',
    //     clueState: '跟进中',
    //     level: 'A',
    //     lastTime: '2017-10-10 12:30',
    //     manager: '张三',
    //     tel: 123,
    //     sex: '男',
    //     web: '123.com',
    //     industry: '销售',
    //     address: '产业园',
    //     province: '湖北',
    //     mark: ''
    // }
    //]  
};


function pageAdd(page, item) {
    ////debugger;
    page.total += 1;
    page.data.unshift(item);
    page.page = Math.ceil(page.total / page.pageSize);
    return page;
    console.log(22, page)
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



// function pageEdit(data, item) {

//     for (let i = 0, len = data.length; i < len; i++) {
//         if (data[i].id == item.id) {
//             data[i] = item;
//             break;
//         }
//     }
//     return data;
// }
// function pageAdd(data, item) {
//     //debugger;
//     data.unshift(item);
//     return data;
// }

export default function reducer($$state = Immutable.fromJS($$initialState),
    action) {
    switch (action.type) {

        case "CLUE_LIST_GETDATA": //查询各种table数据
            //debugger
            return $$state.merge({
                data: action.payload.data,
                pagination: action.payload.pagination
            });
        case "CLUE_LIST_SAVESEARCHMAP": //每次根据查询条件进行获取table数据
            return $$state.merge({
                searchMap: action.payload == undefined ? {} : action.payload
            });

        case "CLUE_LIST_SELECTCLUE": //保存已选择的数据
            return $$state.merge({
                selectedRows: Immutable.fromJS(action.payload.selectedRows),
                selectedRowKeys: Immutable.fromJS(
                    action.payload.selectedRowKeys
                )
            });
        case "CLUE_LIST_GETLISTUPDATE": //删除一到多条数据
            return $$state.merge({
                data: action.payload.data,
                selectedRows: [],
                selectedRowKeys: []
            });

        // // $$state = $$state.set("data", Immutable.fromJS(action.data)).toJS();
        // //selectedRows中删除已选择的 
        // ////debugger;
        // $$state = $$state.toJS();
        // $$state.data = $$state.data.filter((item, index) => {
        //     for (var i = 0; i < action.delKey.length; i++) {
        //         if (action.delKey[i] == item.id) {
        //             return false;
        //         }
        //     }
        //     return true;
        // })
        // $$state.rowKeys["selectedRows"] = $$state.rowKeys[
        //     "selectedRows"
        // ].filter((item, index) => {
        //     for (var i = 0; i < action.delKey.length; i++) {
        //         if (action.delKey[i] == item.id) {
        //             return false;
        //         }
        //     }
        //     return true;
        // });

        // //从selectedRowKeys中删除已选择的
        // $$state.rowKeys["selectedRowKeys"] = $$state.rowKeys[
        //     "selectedRowKeys"
        // ].filter((item, index) => {
        //     for (var i = 0; i < action.delKey.length; i++) {
        //         if (action.delKey[i] == item) {
        //             return false;
        //         }
        //     }
        //     return true;
        // });

        // return Immutable.fromJS($$state);

        case "CLUE_LIST_SHOWFORM": //显示、关闭modal层
            return $$state.merge({
                visible: action.data
            });

            case "CLUE_LIST_CHANGEVISIBLE": //查询功能显示
            let visit = $$state.get("moreShow");
            return $$state.merge({ moreShow: !visit });

            case "CLUE_LIST_SEARCHMAP": //存放扩展、基础查询条件
            debugger
            return $$state.merge({
                searchMap: action.data
            });
            case "CLUE_LIST_GETENUMDATA": //获取查询条件基础显示内容
            return $$state.merge({ enumData: action.payload.enumData });

        //点击编辑获取数据
        case "CLUE_LIST_EDIT":
            //debugger
            let getData = action.edit;
            getData.province_city_district = [
                getData.province.toString(),
                getData.city.toString(),
                getData.district.toString()
        ];
            return $$state.merge({
                editData:getData,
                visible: true
            });
        //点击新建，清空数据
        case "CLUE_LIST_EMPTY":
            //debugger
            return $$state.merge({
                editData: {},
                visible: action.data,
            });

        case "CLUE_CARD_SAVEADD": //新增一条数据

            return $$state.merge({
                visible: false,
                data: pageAdd($$state.get("data").toJS(), action.data)
            });

        case "CLUE_LIST_UPDATELIST": //更改一条数据

        let newData = action.data;
        newData.province_city_district = [
            newData.province.toString(),
            newData.city.toString(),
            newData.district.toString()
        ];
            return $$state.merge({
                visible: false,
                data: pageEdit($$state.get("data").toJS(), action.data),
                editData:newData 
            });

        case "CLUE_LIST_CARDEDITCHANGE": //存放新增修改表单数据
            return $$state.merge({
                editData: action.changeData,
            });

        case "CLUE_LIST_SHOWVIEWFORM": //显示面板时，根据客户id查客户数据，上级客户，行业参照改成{id,name}形式
            debugger
            let actionData = action.data;
            // actionData.industry = {
            //     id: actionData.industry,
            //     name: actionData.industryName
            // };
            // actionData.parentId = {
            //     id: actionData.parentId,
            //     name: actionData.parentName
            // };
            //actionData.followState = action.state.followState;
            actionData.province_city_district = [
                actionData.province.toString(),
                actionData.city.toString(),
                actionData.district.toString()
            ];

            // actionData.ownerUserId = { id: actionData.salesVOs[0].ownerUserId, name: actionData.salesVOs[0].ownerUserName }
            return $$state.merge({
                viewState: action.visible,
                editData: actionData
            });
        case "CLUE_LIST_HIDEVIEWFORM":
            return $$state.merge({
                viewState: action.payload.visible,
            });







        default:
            return $$state;
    }
}
