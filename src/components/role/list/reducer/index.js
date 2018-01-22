import Immutable from 'immutable'

let funcData = []


let $$initialState = {
	data: [],
	editData: {},
	isEdit: false,
	roleCardVisible: false,
	//主列表
	selectedRowKeys: [],
	selectedRows: [],
	//右侧人员列表
	selectedUserRowKeys: [],
	selectedUserRows: [],
	//右侧人员弹出框列表
	selectedUserCardRowKeys: [],
	selectedUserCardRows: [],
	tabIndex: 1,
	funcData,
	selectedRoleId: "",
	selectedRoleIsPreseted: 1,
	userPagination: {
		pageSize: 20,
		page: 1
	},
	userCardPagination: {
		pageSize: 20,
		page: 1
	},
	userCardVisible: false,
	userList: [],
	userCardList: [],
	enumData: { data: [] },
	rightData:[]
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

function pageDelete(page, id) {
	let { data } = page;
	for (let i = 0, len = data.length; i < len; i++) {
		if (data[i].id == id) {
			data.splice(i, 1);
			break;
		}
	}
	page.data = data;
	return page;
}

export default function reducer($$state = Immutable.fromJS($$initialState), action) {
	switch (action.type) {

		case 'ROLE_LIST_GETROLELISTSUCCESS':
			return $$state.merge({
				data: action.content,
			})
		case 'ROLE_LIST_SHOWFORM':
			return $$state.merge({
				roleCardVisible: action.content.visible,
				editData: action.content.editData,
				isEdit: action.content.isEdit,
			})
		case 'ROLE_LIST_SELECTROW':
			return $$state.merge({
				selectedRowKeys: action.content.selectedRowKeys,
				selectedRows: action.content.selectedRows
			})
		case 'ROLE_LIST_SELECTUSERROW':
			return $$state.merge({
				selectedUserRowKeys: action.content.selectedRowKeys,
				selectedUserRows: action.content.selectedRows
			})
		case 'ROLE_LIST_SELECTUSERCARDROW':
			return $$state.merge({
				selectedUserCardRowKeys: action.content.selectedRowKeys,
				selectedUserCardRows: action.content.selectedRows
			})

		case 'ROLE_LIST_TABSELECT':
			return $$state.merge({
				tabIndex: action.content.tabIndex
			})
		case 'ROLE_CARD_SAVEADD':
			return $$state.merge({
				roleCardVisible: false,
				data: pageAdd($$state.get("data").toJS(), action.content),
				selectedRoleId: action.content.id
			})
		case 'ROLE_CARD_SAVEEDIT':
			return $$state.merge({
				roleCardVisible: false,
				data: pageEdit($$state.get("data").toJS(), action.content),
			})

		case 'ROLE_LIST_DELETESUCCESS':
			return $$state.merge({
				data: pageDelete($$state.get("data").toJS(), action.content),
				selectedRowKeys: [],
				selectedRows: [],
			})

		case 'ROLE_LIST_GETFUNCTREESUCCESS':
			return $$state.merge({
				funcData: action.content.funcData.data,
				selectedRoleId: action.content.roleId,
				selectedRoleIsPreseted: action.content.isPreseted,
			})
		case 'ROLE_LIST_SELECTFUNC':
			return $$state.merge({
				funcData: action.content,
			})
		case 'ROLE_LIST_GETUSERLISTSUCCESS':
			return $$state.merge({
				userList: action.content.data,
				selectedRoleIsPreseted: action.content.isPreseted,
				selectedRoleId: action.content.roleId,
				selectedUserRowKeys: [],
				selectedUserRows: [],
			})
		case 'ROLE_LIST_GETUSERCARDLISTSUCCESS':
			return $$state.merge({
				userCardList: action.content,
				userCardVisible: true,
			})

		case 'ROLE_LIST_CLOSEUSERCARD':
			return $$state.merge({
				userCardVisible: false,
				selectedUserCardRowKeys: [],
				selectedUserCardRows: [],
			})
		case 'ROLE_LIST_GETENUMDATA':
			return $$state.merge({
				enumData: action.content
			})
		case 'ROLE_LIST_GETRIGHTDATA':
			return $$state.merge({
				rightData: action.content.data,
				selectedRoleIsPreseted: action.content.isPreseted,
			})
			
			case 'ROLE_LIST_SELECTRIGHTDATA':
			return $$state.merge({
				rightData: action.content,
			})
			
			case 'ROLE_LIST_SAVEUSERSUCCESS':
			debugger
			return $$state.merge({
				userList: action.content,
				selectedUserRowKeys: [],
				selectedUserRows: [],
			})
			case 'ROLE_LIST_DELETEUSERSUCCESS':
			debugger
			return $$state.merge({
				userList: action.content,
				selectedUserRowKeys: [],
				selectedUserRows: [],
			})
		default:
			return $$state;
	}
};
