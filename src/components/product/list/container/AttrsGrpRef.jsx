import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Select, Button, Dropdown ,Row, Table, Tree, Icon} from 'antd';
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
            pagination : {
                pageSize:10,
                page:1,
            },
            searchMap : {},
        };
    }

    columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name'                      
    }];

    onOk() {
        let {selectedValue,selectedId} = this.state; 
        this.props.onChange({attrGroupId:selectedId,attrGroupName:selectedValue});
        this.handleVisibleChange(false);
    }

    onCancel() {
        this.handleVisibleChange(false);
    }

    onClick = (record, index) => {
        this.setState({selectedValue:record.name});
        this.setState({selectedId:record.id});
    }

    onDelete(){
        this.props.onChange({isDelete:true});
    }

    handleVisibleChange = (flag) => {
        // let {pagination} = this.state; 
        this.setState({ visible: flag });
        let searchMap = {enableState:1};
        this.props.action.getAttrsGrpRef({searchMap:searchMap});//获取属性组参照列表
    }

    render() {      
        const attrgrpRefList = this.props.$$state.get("attrgrpRefList").toJS().data;
        const attrgrpRefData = (
            <div className = "reference">
                <div  className = "reference-main"> 
                    <Row
                        type="flex"
                        justify="space-between"
                        className="reference-main-header"
                    >
                        <div className="title">属性组</div>
                    </Row>
                    <Row className="reference-main-choice" type="flex">       
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
            <Dropdown overlay={attrgrpRefData} 
            trigger="click"
            onVisibleChange={this.handleVisibleChange}
            visible={this.state.visible}
            > 
                { (this.props.value) ?                      
                    <Input placeholder = "属性组" value = { this.props.value }
                        suffix={<Icon type="close"  onClick={this.onDelete.bind(this)}/>}/>:
                    <Search placeholder = "属性组" value = { this.props.value }/>
                }
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
  
export default  connect( mapStateToProps, mapDispatchToProps)(AttrsGrpRef);