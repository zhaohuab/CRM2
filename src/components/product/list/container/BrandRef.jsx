import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Select, Button, Dropdown ,Row, Table, Tree} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
import * as Actions from "../action"

 class BrandRef extends React.Component {
    constructor(props) {
    super(props);

    
    this.state = {
        selectedBrandValue:"",
        selectedId:0,
        visible:false,
        selected:''
    };
  }
  columns = [ {
    title: '名称',
    dataIndex: 'name',
    key: 'name'                      
    }            
];

onBrandOk() {
    let {selectedBrandValue,selectedId} = this.state; 
    this.props.onChange(selectedId);
    this.setState({selected:selectedBrandValue});
    this.handleBrandVisibleChange(false);
}

onBrandCancel() {
    this.handleBrandVisibleChange(false);
}
onBrandRowClick = (record, index) => {
    this.setState({selectedBrandValue:record.name});
    this.setState({selectedId:record.id});
}

handleBrandVisibleChange = (flag) => {
    this.setState({ visible: flag });
}

  render() {
    const brandRefData = this.props.$$state.get("brandRefList").toJS().data;
  const brandRefList = (
    <div  className = "industry-main"> 
        <Row
            type="flex"
            justify="space-between"
            className="industry-main-header"
        >
            <div className="title">品牌</div>
        </Row>
        <Row className="industry-main-choice" type="flex">
        <Table columns = {this.columns} 
            dataSource = {brandRefData} 
            style = {{background:"white"}}
            showHeader={false}
            onRowClick={this.onBrandRowClick}
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
                    <Button onClick={this.onBrandCancel.bind(this)}>
                        取消
                    </Button>
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={this.onBrandOk.bind(this)}
                    >
                        确定
                    </Button>
                </div>
            </Row>
        </Row>
    </div>
);

    return (
        <Dropdown overlay={brandRefList} 
        trigger="click"
        onVisibleChange={this.handleBrandVisibleChange}
        visible={this.state.visible}                   
    >                        
        <Search value = {this.state.selected || this.props.value}/>
    </Dropdown>
    );
  }
}

function mapStateToProps(state, ownProps) {
    return {
      $$state: state.product
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    }
  }
  
  export default  connect( mapStateToProps, mapDispatchToProps)(BrandRef);