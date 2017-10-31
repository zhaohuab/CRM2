const  funcTree = [
    {
        id: "1",
        name: "PC端",
        children: [{
            id: "11",
            name: "基本客户"
        }, {
            id: "12",
            name: "客户管理",
            children: [
                {
                    id: "121",
                    name: "客户联系人",
                },
                {
                    id: "122",
                    name: "客户",
                    children: [{
                        id: "1221",
                        name: "集团客户",
                    },
                    {
                        id: "1222",
                        name: "公司客户",
                        children: [{
                            id: "12221",
                            name: "新增客户",
                        }, {
                            id: "12222",
                            name: "编辑客户",
                        }, {
                            id: "12223",
                            name: "删除客户",
                        }]
                    }]
                }
            ]
        },
        {
            id: "13",
            name: "新增客户",
        }, {
            id: "14",
            name: "编辑客户",
        }]
    },{
        id:'2',
        name:"移动端"
    }
]


export default funcTree;