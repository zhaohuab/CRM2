import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Select, Button, Dropdown ,Row, Table, Tree} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
import * as Actions from "../action"

 class MeaUnitRef extends React.Component {
    constructor(props) {
    super(props);

    
     this.state = {
        selectedMeaValue:"",
        selectedId:0,
        visible:false,
        selected:""
        };
    }

    columns = [ {
      title: '名称',
      dataIndex: 'name',
      key: 'name'                      
    }            
    ];

    onOk() {
      let flag = true;
      let record  = this.props.record;
      let {selectedMeaValue,selectedId} = this.state; 
      if (record.editState != 'ADD') { 
        record.editState='UPDATE';
      } 
      Object.assign(record, {measureId:selectedId});
      let changedData = this.props.$$state.get('changedData').toJS();
      for (let i=0,len=changedData.length; i<len; i++){
        if(changedData[i].id==record.id){         
          Object.assign(changedData[i],record);
          flag = false;
          break;
        }
      }
      if (flag){ changedData.push(record) };   
      this.props.action.onChangeSuVa(changedData); 
      this.setState({selected:selectedMeaValue});
      this.handleMeaVisibleChange(false);
    }

    onCancel() {
      this.handleMeaVisibleChange(false);
    }

    onMeaRowClick = (record, index) => {
      this.setState({selectedMeaValue:record.name});
      this.setState({selectedId:record.id});
    }

    handleMeaVisibleChange = (flag) => {
      this.setState({ visible: flag });
    }

  render() {
    const meaRefData = this.props.$$state.get("meaunitRefList").toJS().data;
    const meaRefList = (
    <div  className = "industry-main"> 
        <Row
            type="flex"
            justify="space-between"
            className="industry-main-header"
        >
            <div className="title">销售单位</div>
        </Row>
        <Row className="industry-main-choice" type="flex">
       
                <Table columns = {this.columns} 
                    dataSource = {meaRefData} 
                    showHeader={false}
                    onRowClick={this.onMeaRowClick}
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
        <Dropdown overlay={meaRefList} 
        trigger="click"
        onVisibleChange={this.handleMeaVisibleChange}
        visible={this.state.visible}
    >                        
        <Search value = {this.state.selected || this.props.record.measureId}/>
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
  
  export default  connect( mapStateToProps, mapDispatchToProps)(MeaUnitRef);