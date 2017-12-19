import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Button, Dropdown ,Row, Table, Icon} from 'antd';
const FormItem = Form.Item;
const Search = Input.Search;
import * as Actions from "../action"

class MeaUnitRef extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
            selectedMeaValue:"",
            selectedId:0,
            visible:false,
            pagination : {
                pageSize:10,
                page:1,
            },
            searchMap : {
            },
        };
    }

    columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name'                      
    }];

    onOk() {
        let {selectedMeaValue,selectedId} = this.state; 
        this.props.onChange({measureId:selectedId,measureName:selectedMeaValue});
        this.handleMeaVisibleChange(false);
    }

    onCancel() {
        this.handleMeaVisibleChange(false);
    }

    onMeaRowClick = (record, index) => {
        this.setState({selectedMeaValue:record.name});
        this.setState({selectedId:record.id});
    }

    onDelete(){
        this.props.onChange({isDelete:true});
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
                { (this.props.value) ?                      
                    <Input placeholder = "计量单位" value = { this.props.value }
                        suffix={<Icon type="close"  onClick={this.onDelete.bind(this)}/>}/>:
                    <Search placeholder = "计量单位" value = { this.props.value }/>
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
  
export default  connect( mapStateToProps, mapDispatchToProps)(MeaUnitRef);