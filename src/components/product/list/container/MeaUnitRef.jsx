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
        selected:"",
        pagination : {
            pageSize:10,
            page:1,
          },
          searchMap : {
            enableState:1,
          },
        };
    }

  columns = [ {
    title: '名称',
    dataIndex: 'name',
    key: 'name'                      
    }            
    ];
onOk() {
    let {selectedMeaValue,selectedId} = this.state; 
    this.props.onChange(selectedId);
    this.setState({selected:selectedMeaValue});
    this.handleMeaVisibleChange(false);
   // let {selectedMeaValue,selectedId} = this.state; 
    this.props.action.setMeaUnitValue(selectedMeaValue);
}

onCancel() {
    this.handleMeaVisibleChange(false);
}

onMeaRowClick = (record, index) => {
    this.setState({selectedMeaValue:record.name});
    this.setState({selectedId:record.id});
}

handleMeaVisibleChange = (flag) => {
    let {pagination} = this.state; 
    this.setState({ visible: flag });
    this.props.action.getMeaUnitRef(pagination);//获取计量单位参照列表
}

  render() {
    const meaRefData = this.props.$$state.get("meaunitRefList").toJS().data;
    const meaRefList = (
        <div className = "reference">
    <div  className = "reference-main"> 
        <Row
            type="flex"
            justify="space-between"
            className="reference-main-header"
        >
            <div className="title">计量单位</div>
        </Row>
        <Row className="reference-main-choice" type="flex">
       
                <Table columns = {this.columns} 
                    dataSource = {meaRefData} 
                   // style = {{background:"white",height:100}}
                    showHeader={false}
                    onRowClick={this.onMeaRowClick}
                    pagination={false}
                   // scroll={{ y: 150 }}
                    className="inner"
                   // rowSelection={rowSelection}
                   />
           
        </Row>
        <Row
            type="flex"
            justify="end"
            align="middle"
            className="reference-main-footer"
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
    </div>
);

    return (
        <Dropdown overlay={meaRefList} 
        trigger="click"
        onVisibleChange={this.handleMeaVisibleChange}
        visible={this.state.visible}
    >                        
        <Search value = {this.props.$$state.get("meaUnitValue") || this.props.value}/>
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