import Immutable from 'immutable'
import { pageAdd, pageEdit } from 'utils/busipub'

let $$initialState = {

	data: [],
	funnelData: {
		data: [],
		money: {}
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
	radarCardVisible: false,
	winReason: [],
	lostReason: [],

	//查询条件中已选择的部门
	selectedDept: "",
	//联系人相关对象数据
	contactData: [],
	//联系人相关对象卡片页面数据
	contactCardData: [],
	//联系人弹框显隐
	contactCardVisible: false,
	//参与人相关对象数据

	//联系人参照选中行
	contactSelectedRows: [],
	contactSelectedRowKeys: [],
	//联系人参照卡片页面选中行
	contactCardSelectedRows: [],
	contactCardSelectedRowKeys: [],
	relUserData: [],

	attachFile: [],
	//产品分类数据
	classRefTree: [],
	//动态
	dynamicData: []
};

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
				winCardVisible: action.payload.visible,
				winReason: action.payload.winReason,
			})

		case 'OPPORTUNITY_LIST_SHOWLOSTCARD':
			return $$state.merge({
				lostCardVisible: action.payload.visible,
				lostReason: action.payload.lostReason,
			})
		case 'OPPORTUNITY_LIST_SHOWRADARCARD':
			return $$state.merge({
				radarCardVisible: action.payload.visible
			})


		case 'OPPORTUNITY_LIST_WINOPP':
			return $$state.merge({
				winCardVisible: action.payload.visible,
				winReason: [],
				editData: action.payload.data
			})
		case 'OPPORTUNITY_LIST_LOSTOPP':
			return $$state.merge({
				lostCardVisible: action.payload.visible,
				lostReason: [],
				editData: action.payload.data
			})

		case 'OPPORTUNITY_LIST_SAVESELECTEDDEPT':
			return $$state.merge({
				selectedDept: action.payload.deptId,
			})



		case 'OPPORTUNITY_LIST_GETCONTACTLISTDATA':
			return $$state.merge({
				contactData: action.payload.data,
			})

		case 'OPPORTUNITY_LIST_SHOWCONTACTVIEW':
			return $$state.merge({
				contactCardVisible: true,
				contactCardData: action.payload.data,
				contactCardSelectedRows: action.payload.selectedRows,
				contactCardSelectedRowKeys: action.payload.selectedKeys
			})



		case "OPPORTUNITY_LIST_SELECTCONTACTROW": //保存table已选择条件
			return $$state.merge({
				contactSelectedRows: Immutable.fromJS(action.payload.selectedRows),
				contactSelectedRowKeys: Immutable.fromJS(action.payload.selectedRowKeys)
			});
		case "OPPORTUNITY_LIST_SELECTCONTACTCARDROW": //保存table已选择条件
			return $$state.merge({
				contactCardSelectedRows: Immutable.fromJS(action.payload.selectedRows),
				contactCardSelectedRowKeys: Immutable.fromJS(action.payload.selectedRowKeys)
			});

		//添加联系人保存
		case 'OPPORTUNITY_LIST_SAVECONTACT':
			return $$state.merge({
				contactData: action.payload.data,
				contactCardVisible: false,
				contactSelectedRows: [],
				contactSelectedRowKeys: [],
				contactCardSelectedRows: [],
				contactCardSelectedRowKeys: []
			})

		//删除联系人保存
		case 'OPPORTUNITY_LIST_DELCONTACT':
			return $$state.merge({
				contactData: action.payload.data,
				contactSelectedRows: [],
				contactSelectedRowKeys: []
			})

		case 'OPPORTUNITY_LIST_CLOSECONTACTVIEW':
			return $$state.merge({
				contactCardVisible: false,
				contactSelectedRows: [],
				contactSelectedRowKeys: [],
				contactCardSelectedRows: [],
				contactCardSelectedRowKeys: []
			})

		case "OPPORTUNITY_LIST_GETRELUSERLISTDATA":
			return $$state.merge({
				relUserData: action.payload.data
			});
		case "OPPORTUNITY_LIST_GETATTACHFILE":
			return $$state.merge({
				attachFile: action.payload.data
			});


		case "OPPORTUNITY_LIST_DELETEFILE"://删除附件
			let attachFile = $$state.get('attachFile').toJS()
			let file = action.file;
			for (let i = 0, len = attachFile.length; i < len; i++) {
				if (attachFile[i].id == file.id) {
					attachFile.splice(i, 1);
					break;
				}
			}
			return $$state.merge({
				attachFile
			});

		case "OPPORTUNITY_LIST_FILESSUCCESS"://添加附件
			let attachFile2 = $$state.get('attachFile').toJS()
			attachFile2.unshift(action.payload)
			return $$state.merge({
				attachFile: attachFile2
			});


		//删除参与人
		case "OPPORTUNITY_LIST_SAVERELUSERSUCCESS":

			return $$state.merge({
				relUserData: action.payload
			});


		//删除参与人
		case "OPPORTUNITY_LIST_DELRELUSERLIST":
			let relUserData = $$state.get('relUserData').toJS()
			let relUserId = action.payload
			for (let i = 0, len = relUserData.length; i < len; i++) {
				if (relUserData[i].relUserId == relUserId) {
					relUserData.splice(i, 1);
					break;
				}
			}
			return $$state.merge({
				relUserData
			});

		//查询产品分类
		case "OPPORTUNITY_LIST_GETPROTYPETREE":
			return $$state.merge({
				classRefTree: action.payload.classRefTree
			});

		//动态
		case "OPPORTUNITY_LIST_GETDYNAMICDATA":
			return $$state.merge({
				dynamicData: action.payload.data
			});



		default:
			return $$state;
	}
}
