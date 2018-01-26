import Immutable from 'immutable'
import { transToFields, transToValues } from 'utils/template/form/Transfer.js'
let $$initialState = {
	pagination: {
		pageSize: 10,
		page: 1
	},
	searchMap: {
		enableState: 1
	},
	loading: false,
	formData: {},
	formFields: {},
	data: [],
	visible: false,
	isEdit: false,
	template: {
		add: undefined,
		edit: undefined,
		list: undefined,
		view: undefined,
	},
	selectedRowKeys: [],
	selectedRows: [],
	roleList: [],
	assignVisible: false,
	selectedRole: undefined
};

function pageAdd(page, item) {
	debugger
	page.total += 1;
	page.data.unshift(item)
	// page.page = Math.ceil(page.total / page.pageSize);
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
export default function reducer($$state = Immutable.fromJS($$initialState), action) {
	switch (action.type) {
		case 'USER_LIST_TEMPLATE':
		debugger
			let tpl = $$state.get("template").toJS()
			return $$state.merge({
				template: {
					list: action.content.tpl.columns,
					add: tpl.add,
					edit:  tpl.edit,
					view:  tpl.view,
				},
			}).merge({
				loading: false,
				data: action.content.data,
				visible: action.content.visible,
				searchMap: action.content.searchMap,
				pagination: action.content.pagination,
				selectedRowKeys: [],
				selectedRows: [],
			})
		case 'USER_ADD_TEMPLATE':
			return $$state.mergeDeep({
				template: {
					add: action.content.fields,
				},
			})
		case 'USER_EDIT_TEMPLATE':
			return $$state.mergeDeep({
				template: {
					edit: action.content.fields,
				}
			})
		case 'USER_LIST_GETLIST':
			return $$state.merge({
				loading: true
			})
		case 'USER_LIST_GETLISTSUCCESS':
			return $$state.merge({
				loading: false,
				data:action.content.data,
				formFields: {},
				formData: {},
				selectedRowKeys: [],
				selectedRows: [],
				pagination:action.content.pagination,
				searchMap:action.content.searchMap,
			})


		case 'USER_LIST_SHOWFORM':
			return $$state.merge({
				visible: true,
				formFields: transToFields(action.content.editData),
				formData: action.content.editData,
				isEdit: action.content.isEdit,
			})
		case 'USER_LIST_CLOSEFORM':
			return $$state.merge({
				visible: false,
				formFields: {},
				formData: {},
				isEdit: action.content.isEdit,
				selectedRowKeys: [],
				selectedRows: [],
			})
		case 'USER_PAGE_USERCHANGE':
			return $$state.mergeDeep({
				formData: transToValues(action.content.formFields),
				formFields: action.content.formFields,
			})
		case 'USER_CARD_SAVEADD':
			return $$state.merge({
				visible: action.content.visible,
				data: pageAdd($$state.get("data").toJS(), action.content),
				formData: {},
				formFields: {},
			})
		case 'USER_CARD_SAVEEDIT':
			return $$state.merge({
				visible: action.content.visible,
				data: pageEdit($$state.get("data").toJS(), action.content),
				formData: {},
				formFields: {},
			})

		case 'USER_LIST_SHOWASSIGN':
			return $$state.merge({
				assignVisible: true,
				roleList: action.content.data,
			})

		case 'USER_LIST_ASSIGNROLE':
			return $$state.merge({
				assignVisible: false,
				data: action.content,
				selectedRowKeys: [],
				selectedRows: [],
				selectedRole: undefined
			})
		case 'USER_LIST_CLOSEASSIGN':
			return $$state.merge({
				assignVisible: false,
				selectedRowKeys: [],
				selectedRows: [],
				selectedRole: undefined
			})

		case 'USER_LIST_SELECTROW':
			return $$state.merge({
				selectedRowKeys: action.content.selectedRowKeys,
				selectedRows: action.content.selectedRows
			})

		case 'USER_LIST_SELECTROLE':
			return $$state.merge({
				selectedRole: action.content.selectedRole,
			})

		case 'USER_LIST_GETENUMDATA':

			return $$state.merge({
				enumData: action.content,
			})

		case 'USER_LIST_SAVETEMPLATE':
			return $$state.merge({
				template: action.content,
			})

		default:
			return $$state;
	}
};
