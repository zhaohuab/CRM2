function pageAdd(page,item) {
    page.total += 1;
	page.data.unshift(item);
	if(page.data.length == page.pageSize + 1) {
		page.data.splice(page.pageSize,1);
	}
	page.page = Math.ceil(page.total / page.pageSize);
	return page;
}
function pageEdit(page,item) {
	let {data} = page;
	for(let i=0,len=data.length;i<len;i++) {
		if(data[i].id == item.id) {
			data[i] = item;
			break;
		}
	}
	page.data = data;
	return page;
}

export {
    pageAdd,
    pageEdit
}