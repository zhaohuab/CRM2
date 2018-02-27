import Immutable from "immutable";
import { pageAdd, pageEdit } from 'utils/busipub'

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
    viewState: false,//获取view面板详细信息
    data: {}, //table展示的数据 
    moreShow: false,//查询表单的显隐
    enumData: {//查询条件数据
        level: [],
        source: [],
        state: [],
        post: []
    },
    colseVisible: false //线索关闭表单显示
};

function clearObject(obj){
    //debugger
    for (let key in obj) {

        obj[key] = undefined
    }
    return obj
}

export default function reducer($$state = Immutable.fromJS($$initialState),
    action) {
    switch (action.type) {

        case 'CLUE_LIST_CLOSELEADSHOW':
            return $$state.merge({
                colseVisible: action.visible,
            });



        case "CLUE_LIST_GETDATA": //查询各种table数据
            debugger
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
        case "CLUE_LIST_SHOWFORM": //显示、关闭modal层
            //debugger
            return $$state.merge({
                visible: action.data
            });

        case "CLUE_LIST_CHANGEVISIBLE": //查询功能显示
            let visit = $$state.get("moreShow");
            return $$state.merge({ moreShow: !visit });

        case "CLUE_LIST_SEARCHMAP": //存放扩展、基础查询条件
            //debugger
            return $$state.merge({
                searchMap: action.data
            });
        case "CLUE_LIST_GETENUMDATA": //获取查询条件基础显示内容
            return $$state.merge({ enumData: action.payload.enumData });

        //点击编辑获取数据
        case "CLUE_LIST_EDIT":
            ////debugger
            // let EditStreetData =  $$state.get('viewData').toJS();
            // let ccccc = Immutable.fromJS(EditStreetData).toJS()
            // //debugger
            // let streetEdit = {
            //     address: EditStreetData.street,
            //     location: {
            //         lng: EditStreetData.longitude,
            //         lat: EditStreetData.latitude
            //     }
            // }

            // let industry = {
            //     id:EditStreetData.industry,
            //     name:EditStreetData.industryName
            // }

            // ccccc.street = streetEdit
            // ccccc.industry = industry
            // //debugger
            // return $$state.merge({
            //     formVisitable: action.visiable,
            //     viewData:ccccc
            // });    




            debugger
            let getData = action.edit;
            getData.province_city_district = [
                getData.province.toString(),
                getData.city.toString(),
                getData.district.toString()
            ];
            getData.insudtryId = {
                id: getData.industryId,
                name: getData.industryName
            }

            return $$state.merge({
                editData: getData,
                visible: true
            });
        //点击新建，清空数据
        case "CLUE_LIST_EMPTY":
            //debugger
            return $$state.merge({
                editData: clearObject($$state.get('editData').toJS()),
                visible: action.data,
            });

        case "CLUE_CARD_SAVEADD": //新增一条数据

            return $$state.merge({
                visible: false,
                data: pageAdd($$state.get("data").toJS(), action.data)
            });

        case "CLUE_LIST_UPDATELIST": //更改一条数据
            debugger
            let newData = action.data;
            newData.province_city_district = [
                newData.province.toString(),
                newData.city.toString(),
                newData.district.toString()
            ];
            return $$state.merge({
                visible: false,
                data: pageEdit($$state.get("data").toJS(), action.data),
                editData: newData
            });

        case "CLUE_LIST_CARDEDITCHANGE": //存放新增修改表单数据
            return $$state.merge({
                editData: action.changeData,
            });

        //点击编辑按钮
        case 'CUSTOMERCOMPANY_LIST_SHOWEDITFORM':
            let EditStreetData = $$state.get('editData').toJS();
            let ccccc = Immutable.fromJS(EditStreetData).toJS()
            
            let industryId = {
                id: EditStreetData.industryId,
                name: EditStreetData.industryName
            }

            ccccc.industryId = industryId
            //debugger
            return $$state.merge({
                visible: action.visible,
                editData: ccccc
            });

        case "CLUE_LIST_SHOWVIEWFORM": //显示面板时，根据客户id查客户数据，上级客户，行业参照改成{id,name}形式
            //debugger
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
