import reqwest from "utils/reqwest";
import fetchData from "utils/fetchdata";
import { menu as url, role } from "api";
import getInfo from "utils/cookie"
const getMenuData = () => {
	return dispatch => {
		reqwest(
			{
				url: url,
				method: "get"
			},
			data => {
				//debugger;
				//获取菜单成功后，根据登录人角色获取功能权限。
				dispatch(fetchData("COMMON_MENU_GETDATA", { data: data.data }));
				const roleId = getInfo("roleid");
				if(roleId == undefined||roleId==""||roleId=="undefined"){
					return 
				}
				reqwest({
					url: role.role + "/" + roleId + "/funcres",
					method: 'GET',
					data: {
						param: { roleId },
					}
				}, (result) => {
					const data = result.data
					debugger
					let code = ""
					for (let i = 0; i < data.length; i++) {
						if (data[i].isDisplay == 2) {
							code += "\.";
							code += data[i].resRemark;
							code += "\,";
						}
					}
					if (code.length > 0) {
						code = code.substring(0, code.length - 1);
					}
					code = code.replace(/\:/g, "\_");
					code += "{display:none;}"
					var head = document.head || document.getElementsByTagName('head')[0];
					var style = document.createElement('style');
					style.rel = 'stylesheet';
					style.type = 'text/css';
					style.id = "sys_func"
					style.appendChild(document.createTextNode(code));
					head.appendChild(style);
					// return style.sheet || style.styleSheet;
					dispatch(fetchData("SAVECSSCODE", { code }));
				})
			}
		);
	};
};

const changeHeader = title => {
	return dispatch => {
		dispatch(fetchData("HEADER_CHANGE", { title }));
	};
};

export { getMenuData, changeHeader };
