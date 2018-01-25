import {
    Modal,
    Cascader,
    Select,
    Form,
    Row,
    Col,
    Input,
    Button,
    Icon,
    Menu,
    Dropdown,
    Tree,
    Table
} from "antd";
const TreeNode = Tree.TreeNode;

import "assets/stylesheet/all/iconfont.css";

export default class PersonChioce extends React.Component {
    constructor(props){
        super(props)
        this.state={
            page:1,
            pageSize:5,
        }
    }
    renderTreeNodes(data){
        return data.map((item) => {
          if (item.children && item.children.length) {
            return (
              <TreeNode title={item.name} key={item.id} dataRef={item}>
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode title={item.name} key={item.id} />;
        });
    }
    //树选中方法
    onSelect(selectedKeys,selectedObj){
        let {page,pageSize} = this.state;
        this.props.selectList(page,pageSize,selectedKeys)
    }

    //table行选中方法
    onSelectChange(selectedRowKeys, selectedRows){
        this.props.selectedTableList(selectedRowKeys,selectedRows)
    }

    render(){
        let rowSelection = {
            onChange: this.onSelectChange.bind(this),
            type: "radio",
            selectedRowKeys:this.props.selectedRowKeys
        };

        return(
            <div>
                <div className='person-chioce-wapper' style={{height:this.props.height?this.props.height:''}}>
                   <p className='title'>待选</p>
                   <Row type='flex'  className='main tabel-recoverd'>
                        <Col span={8} className='tree-wapper'>
                            <Tree
                                onSelect={this.onSelect.bind(this)}
                                selectedKeys = {this.props.selectedKeys}
                            >
                                {this.renderTreeNodes(this.props.data)}
                            </Tree>
                        </Col>
                        <Col span={16} className='table'>
                            <Table 
                                columns={this.props.columns} 
                                dataSource={this.props.personList.data} 
                                rowKey="id"
                                size="middle"
                                rowSelection={rowSelection}
                                pagination={{
                                    size: "small",
                                    //total: tableData.total,
                                    //showTotal: this.showTotal,
                                    //onChange: this.onPageChange.bind(this),
                                    // pageSize: 5,
                                    //current: tableData.page
                                }}
                            />
                        </Col>
                   </Row>
                </div>
            </div>    
        )
    }
}