import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Select, Button, Dropdown ,Row, Table, Tree} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
import * as Actions from "../action"

 class AttrsGrpRef extends React.Component {
    constructor(props) {
    super(props);

    
    this.state = {
        selectedValue:"",
        selectedId:0,
        visible:false,
        select:""
    };
  }
  columns = [ {
    title: '名称',
    dataIndex: 'name',
    key: 'name'                      
    }            
];

onOk() {
    let {selectedValue,selectedId} = this.state; 
    this.props.onChange(selectedId);
    this.setState({select:selectedValue});
    this.handleVisibleChange(false);
}

onCancel() {
    this.handleVisibleChange(false);
}

onClick = (record, index) => {
    this.setState({selectedValue:record.name});
    this.setState({selectedId:record.id});
}

handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
}

  render() {
    
    const attrgrpRefList = this.props.$$state.get("attrgrpRef").toJS();
    const attrgrpRefData = (
        <div  className = "industry-main"> 
        <Row
            type="flex"
            justify="space-between"
            className="industry-main-header"
        >
            <div className="title">属性组</div>
        </Row>
        <Row className="industry-main-choice" type="flex">
       
                <Table columns = {this.columns} 
                    dataSource = {attrgrpRefList} 
                    
                    showHeader={false}
                    onRowClick={this.onClick}
                    pagination={false}
            
                    className="inner"
                   />
           
        </Row>
        <Row
            type="flex"
            justify="end"
            align="middle"
            className="industry-main-footer"
        >
            <Row type="flex" justify="end" align="middle" gutter={15}>
                <div>
                    <Button onClick={this.onCancel.bind(this)}>
                        取消
                    </Button>
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={this.onOk.bind(this)}
                    >
                        确定
                    </Button>
                </div>
            </Row>
        </Row>
    </div>
);

    return (
        <Dropdown overlay={attrgrpRefData} 
        trigger="click"
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
    >                        
        <Search value = {this.state.select || this.props.value}/>
    </Dropdown>
    );
  }
}

    function mapStateToProps(state, ownProps) {
        return {
            $$state: state.prdtype
        }
    }
  
    function mapDispatchToProps(dispatch) {
        return {
            action: bindActionCreators(Actions, dispatch)
        }
    }
  
    export default  connect( mapStateToProps, mapDispatchToProps)(AttrsGrpRef);