import Immutable from 'immutable'

let $$initialState = {

	data: [],
	funnelData: {
		data:[],
		money:{}
	},
	selectedRows: [],
	selectedRowKeys: [],
	formVisitable: false,
	pagination: {
		pageSize: 20,
		page: 1
	},
	searchMap: {},
	viewFormVisible: false,
	allProduct: [],
	productVisible: false,
	editData: {},
	moreShow: false,
	isEdit: false,
	oppBList: [],
	selectedProduct: [],
	selectedProductKeys: [],
	selectedOppB: [],
	selectedOppBKeys: [],
	biztypeList: [],
	stageData: [],
	resultData: [],
	selectedStage: "",
	//查询条件用
	enumData: {
		biztypeList: []
	},

	stageEnum: [],
	winCardVisible: false,
	lostCardVisible: false,
	radarCardVisible: false
};

function pageAdd(page, item) {
	page.total += 1;
	page.data.unshift(item)
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
export default function orgReducers($$state = Immutable.fromJS($$initialState), action) {

	switch (action.type) {
		case 'OPPORTUNITY_LIST_GETDATA':
			return $$state.merge({ data: action.payload.data })

		case 'OPPORTUNITY_LIST_SHOWFORMNEW':
			return $$state.merge({
				editData: action.payload.editData,
				oppBList: [],
				formVisitable: action.payload.visible,
				isEdit: false,
				stageEnum: action.payload.stageEnum,
			})
		case 'OPPORTUNITY_LIST_SHOWFORMEDIT':
			return $$state.merge({
				editData: action.payload.editData,
				oppBList: action.payload.editData.childList,
				formVisitable: action.payload.visible,
				// viewFormVisible:false,
				isEdit: true
			})

		case 'OPPORTUNITY_LIST_SHOWVIEWFORM':
			return $$state.merge({
				editData: action.payload.record,
				viewFormVisible: action.payload.visible,
			})

		case "OPPORTUNITY_LIST_CHANGEVISIBLE": //查询功能显示
			let visit = $$state.get("moreShow");
			return $$state.merge({ moreShow: !visit });

		case 'OPPORTUNITY_LIST_CLOSEFORM':
			return $$state.merge({
				formVisitable: false,
			})
		case 'OPPORTUNITY_LIST_CHANGEVISIBLE':
			return $$state.merge({ toolVisible: action.payload.toolVisible })

		case "OPPORTUNITY_LIST_SELECTROW": //保存table已选择条件
			return $$state.merge({
				selectedRows: Immutable.fromJS(action.payload.selectedRows),
				selectedRowKeys: Immutable.fromJS(action.payload.selectedRowKeys)
			});


		case 'OPPORTUNITY_LIST_SAVESEARCHMAP':
			return $$state.merge({ searchMap: action.payload == undefined ? {} : action.payload })

		case 'OPPORTUNITY_LIST_ADDSAVE':
			return $$state.merge({
				formVisitable: false,
				viewFormVisible: false,
				data: pageAdd($$state.get("data").toJS(), action.payload),
				viewData: {}
			})
		case 'OPPORTUNITY_LIST_EDITSAVE':
			return $$state.merge({
				formVisitable: false,
				viewFormVisible: false,
				data: pageEdit($$state.get("data").toJS(), action.payload),
				viewData: {},
			})

		case 'OPPORTUNITY_LIST_CLOSEPANEL':
			return $$state.merge({
				viewFormVisible: false,
				formVisitable: false,
			})
		case 'OPPORTUNITY_LIST_DELETE':
			return $$state.merge({
				data: action.payload.data,
				viewFormVisible: false
			})

		case 'OPPORTUNITY_LIST_GETFUNNELDATA':
			return $$state.merge({ funnelData: action.payload })

		case 'OPPORTUNITY_LIST_SHOWPRODUCTCARD':
			return $$state.merge({
				productVisible: true,
				allProduct: action.payload.data,
				selectedProduct: [],
				selectedProductKeys: []
			})

		case 'OPPORTUNITY_LIST_CLOSEPRODUCTCARD':
			return $$state.merge({ productVisible: false })

		case 'OPPORTUNITY_LIST_SELECTPRODUCT':
			return $$state.merge({
				selectedProduct: action.payload.selectedRows,
				selectedProductKeys: action.payload.selectedRowKeys
			})

		case 'OPPORTUNITY_LIST_SAVEOPPBLIST':
			return $$state.merge({ oppBList: action.payload.oppBList })

		case 'OPPORTUNITY_LIST_SELECTOPPB':
			return $$state.merge({
				selectedOppB: action.payload.selectedRows,
				selectedOppBKeys: action.payload.selectedRowKeys
			})
		case 'OPPORTUNITY_LIST_SETFORMDATA':
			return $$state.merge({
				editData: action.payload
			})

		case 'OPPORTUNITY_LIST_GETBIZTYPE':
			return $$state.merge({
				biztypeList: action.payload.biztypeList
			})

		case 'OPPORTUNITY_LIST_GETSTAGERESULT':
			return $$state.merge({
				resultData: action.payload.resultList,
				stageData: action.payload.stageList,
			})

		case 'OPPORTUNITY_LIST_SELECTSTAGE':
			return $$state.merge({
				selectedStage: action.payload
			})

		case 'OPPORTUNITY_LIST_FINISHACTION':
			return $$state.merge({
				resultData: action.payload.data
			})

		case 'OPPORTUNITY_LIST_GETENUMDATA':
			return $$state.merge({
				enumData: action.payload
			})


		case 'OPPORTUNITY_LIST_SAVEENUMDATA':
			return $$state.merge({
				enumData: action.payload.enumData
			})
		case 'OPPORTUNITY_LIST_SETCURRENTSTAGE':
			const editData = $$state.get("editData").toJS();
			editData.saleStage = action.payload.stageId;
			return $$state.merge({
				editData
			})

		case 'OPPORTUNITY_LIST_SHOWWINCARD':
			return $$state.merge({
				winCardVisible: action.payload.visible
			})

		case 'OPPORTUNITY_LIST_SHOWLOSTCARD':
			return $$state.merge({
				lostCardVisible: action.payload.visible
			})
			case 'OPPORTUNITY_LIST_SHOWRADARCARD':
			return $$state.merge({
				radarCardVisible: action.payload.visible
			})
		default:
			return $$state;
	}
}
