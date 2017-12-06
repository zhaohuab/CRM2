import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Select, Button,Tree,Dropdown ,Row} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
import * as Actions from "../action"
 class PrdClassRef extends React.Component {
    constructor(props) {
    super(props);

    const value = this.props.value || {};
    this.state = {
        selectedKeys:0,         
        selectedValue:"", 
        info:[],
        visible:false,
        refData:""
    };
  }
 

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
    this.props.action.getProdClassRef();//获取产品分类参照列表
  }

    onSelect = (selectedKeys, info)=> {
        if(info.node.props.children == undefined){
        this.setState({selectedKeys:selectedKeys});
        this.setState({selectedValue:info.node.props.title});
        //this.handleVisibleChange(false);
    }        
    }
    onPrdClassOk() {
    
    let {selectedValue, selectedKeys} = this.state; 
    this.props.onChange(selectedKeys);
    this.setState({refData:selectedValue});
    this.handleVisibleChange(false);
    this.props.action.setPrdClassValue(selectedValue);
  //  this
    }

    onPrdClassCancel() {
        this.handleVisibleChange(false);
    }

  render() {
    const classRefTree = this.props.$$state.get("classRefTree").toJS().voList;
    let loop = () =>{};
    if(classRefTree!== undefined && classRefTree.length>0){
         loop = data => data.map((item) => {
            if (item.children && item.children.length>0) {
                return (
                  <TreeNode  key={item.id 
  
                   } title={item.name 
  
                   } disableCheckbox >
                       {loop(item.children)}
                  </TreeNode>
                );
              }
              return <TreeNode key={item.id } title={item.name }/>;    
                     
            });
    }else{
        
         loop = data => {return <div/>};
    }
   
 
  const refTree = (
      <div  className = "industry-main"> 
          <Row
              type="flex"
              justify="space-between"
              className="industry-main-header"
          >
              <div className="title">产品分类</div>
          </Row>
          <Row className="industry-main-choice" type="flex">
              <Tree 
                  onClick = {this.handleTreeClick}
                  //checkable
                  checkStrictly={true}
                  onSelect={this.onSelect}
                  //onCheck={this.onCheck}
                  selectedKeys={this.state.selectedKeys}
                  //checkedKeys={this.state.preCheckedKeys}
                  className="industry-tree"
                  >
                  {loop(classRefTree)}
              </Tree>                     
          </Row>
          <Row
              type="flex"
              justify="end"
              align="middle"
              className="industry-main-footer"
          >
              <Row type="flex" justify="end" align="middle" gutter={15}>
                  <div>
                      <Button onClick={this.onPrdClassCancel.bind(this)}>
                          取消
                      </Button>
                  </div>
                  <div>
                      <Button
                          type="primary"
                          onClick={this.onPrdClassOk.bind(this)}
                      >
                          确定
                      </Button>
                  </div>
              </Row>
          </Row>
      </div>       
  );
    return (
      <Dropdown overlay={refTree} 
        trigger="click"
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
      >                        
        <Search placeholder = "产品分类"value = {this.props.$$state.get("prdClassValue") || this.props.value} />
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
  
  export default  connect( mapStateToProps, mapDispatchToProps)(PrdClassRef);