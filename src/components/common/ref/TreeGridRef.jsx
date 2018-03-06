import {
    Tree,
    Table,
    Row,
    Col,
    Input,
    Button,
    Icon,
    Dropdown,
} from "antd";
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

import "assets/stylesheet/all/iconfont.css";
import DropDownRef from 'components/common/ref/DropDownRef'
import reqwest from "utils/reqwest";

export default class TreeGridRef extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            treeData:[],
            gridData:[],
            select:'',
            selectedTableRowKeys:[],
            selectedTreeKeys:[],
            value:'',//保存modal里input中搜索value值
        }
    }

    
    //获取树的数据
    getTree(flag){
        if(this.props.disabled && this.props.viewData.id){
            return
        }
        if(flag){
            
            reqwest(
                {
                    url: this.props.treeUrl,
                    method: "GET",
                    data:{
                        param:{
                            orgType:3,
                            type:1
                        }
                    }
                },
                result => {
                    
                    this.setState({
                        visible:true,
                        treeData:result.data
                    })
                }
            );
            
        }else{
            this.setState({
                visible:false,
                treeData:[],
                gridData:[],
                select:''
            })
        }
    }

    //树选中方法
    onTreeSelect(selectedKeys,selectedObj){
        if(selectedKeys && selectedKeys.length){
            let pageSize = 5;
            //每次点击树都获取第一页的数据
            let page = 1
            this.treeSelect(page,pageSize,[selectedObj.node.props.eventKey])
        }
    }
    //树选中，获取表格数据
    treeSelect(page,pageSize,selectedKeys){        
        let treeId = selectedKeys[0]//部门id
        let searchMap = {deptId:treeId}
        reqwest(
            {
                url: this.props.gridUrl,
                method: "GET",
                data:{
                    param:{
                        page,pageSize,searchMap
                    }
                }
            },
            result => {
                this.setState({
                    gridData:result,
                    selectedTreeKeys:selectedKeys
                })
            }
        );
    }

    //table选中方法
    selectedTableList(selectedRowKeys,selectedRows){
        debugger
        this.setState({
            select:{id:selectedRowKeys[0],name:selectedRows[0].name,deptId:selectedRows[0].deptId,deptName:selectedRows[0].deptName},
            selectedTableRowKeys:selectedRowKeys
        })
    }
    
    onOk(){
        
        this.setState({
            visible:false,
            treeData:[],
            gridData:[],
            selectedTableRowKeys:[],
            selectedTreeKeys:[],
        },()=>{
            if(this.props.onChange) {
                this.props.onChange(this.state.select)
            }
        })
    }

    onCancel(){
        this.setState({
            visible:false,
            treeData:[],
            gridData:[],
            selectedTableRowKeys:[],
            selectedTreeKeys:[],
        })
    }

    //modal中input搜索值
    onSearch(){

    }

    //modal中input发生onchange
    onChange(value){
        this.setState({
            value
        })
    }

    //分页方法
    showTotal(total) {
        return `共 ${total} 条`;
    }

    //点击翻页
    onPageChange(page, pageSize) {
      this.treeSelect(page,pageSize,this.state.selectedTreeKeys);
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

    //table行选中方法
    onSelectChange(selectedRowKeys, selectedRows){
        this.selectedTableList(selectedRowKeys,selectedRows)
    }
    creatPanel(){
        let rowSelection = {
            onChange: this.onSelectChange.bind(this),
            type: "radio",
            selectedRowKeys:this.state.selectedTableRowKeys
        };
        let sizeEnum = {
            small : {
                width:400,
                height:320
            },
            middle : {
                width:600,
                height:320
            },
            large : {
                width:600,
                height:520
            }
        }
        let size = this.props.size ? this.props.size : "small";
        let width = this.props.width ? this.props.width : sizeEnum[size].width;
        let height = this.props.height ? this.props.height : sizeEnum[size].height;
        return(
            <DropDownRef 
                title={this.props.title} 
                onOk={this.onOk.bind(this)} 
                onCancel={this.onCancel.bind(this)}  
                onSearch = {this.onSearch.bind(this)}
                value = {this.state.value}
                onChange = {this.onChange.bind(this)}
                width = {width}
                height= {height}
                className='crm-list-panel-ownerUser-modal'
            >   
                <div className='height' style={{width:'100%'}}>
                    <div className='person-chioce-wapper' style={{height:this.props.height?this.props.height:''}}>
                        <p className='title'>待选</p>
                        <Row type='flex'  className='main tabel-recoverd'>
                                <Col span={8} className='tree-wapper'>
                                    <Tree
                                        onSelect={this.onTreeSelect.bind(this)}
                                        selectedKeys = {this.state.selectedTreeKeys}
                                    >
                                        {this.renderTreeNodes(this.state.treeData)}
                                    </Tree>
                                </Col>
                                <Col span={16} className='table'>
                                    <Table 
                                        columns={this.props.columns} 
                                        dataSource={this.state.gridData.data} 
                                        rowKey="id"
                                        size="middle"
                                        rowSelection={rowSelection}
                                        pagination={{
                                            size: "small",
                                            total: this.state.gridData.total,
                                            showTotal: this.showTotal,
                                            onChange: this.onPageChange.bind(this),
                                            pageSize: 5,
                                            current: this.state.gridData.page
                                        }}
                                    />
                                </Col>
                        </Row>
                    </div>
                </div>
            </DropDownRef>
        )
    }

    

    emitEmpty(){
        this.props.onChange({})
    }

    render(){
        const suffix =
            this.props.value && this.props.value.name ? (
                <Icon type="close" onClick={this.emitEmpty.bind(this)} />
            ) : null;
        return(
            <div>
                {
                    this.props.disabled && this.props.viewData.id?
                    <Input placeholder={this.props.title} value={this.props.value ? this.props.value.name : ""} disabled />:
                    <Dropdown
                        overlay={this.creatPanel()} //生成下拉结构样式
                        trigger={["click"]}
                        onVisibleChange={this.getTree.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                        visible={this.state.visible} //受控面板显示
                    >   
                        <Search
                            placeholder={this.props.title}
                            onSearch={this.getTree.bind(this, true)}
                            value={this.props.value ? this.props.value.name : ""}
                            suffix={suffix}
                        />
                    </Dropdown>
                }
            </div>
        )
    }
}
