import Immutable from 'immutable'

let $$initialState = {
	loading: false,
	editData:{},
	data:[{
	name:"粤海",
	begintime:"2017-07-31 12:00:00",
	type: "1",
	personnum:6,
	stage:"0.2",
	owner: [{
		key:"dev",
		value:"研发部"
	},{
		key:"guankx",
		value:"关凯旋"
	}],
	marks: "这是一个粤海项目",
	isbusy : "N",
	}]
};

export default function reducer($$state = Immutable.fromJS($$initialState), action){
	switch (action.type) {
	    case 'PROJECT_LIST_GETDATA':
	        return $$state.merge({
                loading: true
            })
		case 'PROJECT_LIST_GETDATA_SUCCESS': 
	        return $$state.merge({
	        	loading: false,
				data: action.payload.data,
				visible : action.payload.visible,
			})
		case 'PROJECT_LIST_SHOWFORM':
			return $$state.merge({
				visible : action.payload.visible,
				editData : action.payload.editData,
			})
	    default: 
	        return $$state;
	}
};
