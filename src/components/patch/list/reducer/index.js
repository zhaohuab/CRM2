import Immutable from 'immutable'

let $$initialState = {
	data:[
        {
            id:1,
            code:1,
            name:"你好",
            groupName:"世界",
            description:"他好"

        }
    ]
};
function pageAdd(page, item) {
	page.data.unshift(item)
	return page;
}

export default function reducer($$state = Immutable.fromJS($$initialState), action) {

	switch (action.type) {
	
		default:
			return $$state;
	}
}
