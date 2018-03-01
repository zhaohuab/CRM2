import Immutable from 'immutable'
import { transToFields, transToValues } from 'utils/template/form/Transfer.js'
import { pageAdd, pageEdit } from 'utils/busipub'
let $$initialState = {
	pagination: {
		pageSize: 10,
		page: 1
	},
	searchMap: {
		enableState: 1
	},
	tableLoading: false,
	cardLoading: false,
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
	selectedRole: undefined,
	enumData: {}
};


function clearObject(obj) {
	for (let key in obj) {

		obj[key] = undefined
	}
	return obj
}
export default function reducer($$state = Immutable.fromJS($$initialState), action) {
	switch (action.type) {
		case 'USER_LIST_TEMPLATE':
			let tpl = $$state.get("template").toJS()
			return $$state.merge({
				template: {
					list: action.content.tpl.columns,
					add: tpl.add,
					edit: tpl.edit,
					view: tpl.view,
				},
			}).merge({
				tableLoading: false,
				data: action.content.data,
				visible: action.content.visible,
				searchMap: action.content.searchMap,
				pagination: action.content.pagination,
				selectedRowKeys: [],
				selectedRows: [],
			})
		case 'USER_ADD_TEMPLATE':
			let tmpAdd = $$state.get("template").merge({
				add: action.content.fields,
			})
			return $$state.merge({
				template: tmpAdd
			})
		case 'USER_EDIT_TEMPLATE':
			let tmpEdit = $$state.get("template").merge({
				edit: action.content.fields,
			})
			return $$state.merge({
				template: tmpEdit
			})
		case 'USER_LIST_GETLIST':
			return $$state.merge({
				tableLoading: true
			})
		case 'USER_LIST_GETLISTSUCCESS':
		debugger
			return $$state.merge({
				tableLoading: false,
				data: action.content.data,
				formFields: transToFields(clearObject($$state.get('formFields').toJS())),
				formData: clearObject($$state.get('formData').toJS()),
				selectedRowKeys: [],
				selectedRows: [],
				pagination: action.content.pagination,
				searchMap: action.content.searchMap,
			})
		case 'USER_LIST_SHOWFORM':
			// editData: clearObject($$state.get('editData').toJS()),
			if (action.content.editData.id) {
				return $$state.merge({
					visible: true,
					formFields: transToFields(action.content.editData),
					formData: action.content.editData,
					isEdit: action.content.isEdit,
					cardLoading: true,
				})
			} else {
				return $$state.merge({
					visible: true,
					formFields: transToFields(clearObject($$state.get('formFields').toJS())),
					formData: clearObject($$state.get('formData').toJS()),
					isEdit: action.content.isEdit,
					cardLoading: true
				})
			}

		case 'USER_LIST_CLOSEFORM':
			return $$state.merge({
				visible: false,
				formFields: transToFields(clearObject($$state.get('formFields').toJS())),
				formData: clearObject($$state.get('formData').toJS()),
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
				formFields: transToFields(clearObject($$state.get('formFields').toJS())),
				formData: clearObject($$state.get('formData').toJS()),
				tableLoading: false,
				cardLoading: false
			})
		case 'USER_CARD_SAVEEDIT':
			return $$state.merge({
				visible: action.content.visible,
				data: pageEdit($$state.get("data").toJS(), action.content),
				formFields: transToFields(clearObject($$state.get('formFields').toJS())),
				formData: clearObject($$state.get('formData').toJS()),
				tableLoading: false,
				cardLoading: false
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
				selectedRole: undefined,
				tableLoading: false,
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
				enumData: Immutable.fromJS(action.content),
				cardLoading: false
			})

		case 'USER_LIST_SAVETEMPLATE':
			return $$state.merge({
				template: action.content,
			})
		case 'USER_LIST_SAVEADDSTART':
			return $$state.merge({
				tableLoading: true,
				cardLoading: true
			})
		case 'USER_LIST_SAVEEDITSTART':
			return $$state.merge({
				tableLoading: true,
				cardLoading: true
			})

		//页面状态重置
		case 'USER_LIST_RESETSTATE':
			return $$state.merge($$initialState)

		case 'USER_LIST_LOADOVER':
			return $$state.merge({
				tableLoading: false,
				cardLoading: false
			})

		default:
			return $$state;
	}
};
