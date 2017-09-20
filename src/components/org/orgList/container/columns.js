let columns=[]
export default columns= [
          {
            title: '编码',
            dataIndex: 'code',
            key: 'code',
          },
          {
            title: '名称',
            dataIndex: 'name',
            key: 'name'
          }, 
          {
            title: '简称',
            dataIndex: 'simpleName',
            key: 'simpleName'
          }, 
          {
            title: '助记码',
            dataIndex: 'simpleCode',
            key: 'simpleCode',
          },
          {
            title: '上级组织',
            dataIndex: 'fatherorgId',
            key: 'fatherorgId',
          },
          {
            title: '负责人',
            dataIndex: 'respoPerson',
            key: 'respoPerson',
          }, 
           {
            title: '其他负责人',
            dataIndex: 'otherRespoPerson',
            key: 'otherRespoPerson',
          },
           {
            title: '组织类型',
            dataIndex: 'orgType',
            key: 'orgType',
            render:(text, record,index) => {
                if(text === 0 ){
                    return text='公司'
                }else if(text === 1){
                    return text='部门'
                }
            }
          },
           {
            title: '状态',
            dataIndex: 'enablestate',
            key: 'enablestate',
          }
]; 