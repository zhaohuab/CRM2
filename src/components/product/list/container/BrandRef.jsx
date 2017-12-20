import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Button, Dropdown ,Row, Table, Icon} from 'antd';
const FormItem = Form.Item;
const Search = Input.Search;
import * as Actions from "../action"

class BrandRef extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            selectedBrandValue:"",
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

    onBrandOk() {
        let {selectedBrandValue,selectedId} = this.state; 
        this.props.onChange({brandId:selectedId,brandName:selectedBrandValue});
        this.handleBrandVisibleChange(false);
    }

    onBrandCancel() {
        this.handleBrandVisibleChange(false);
    }

    onBrandRowClick = (record, index) => {
        this.setState({selectedBrandValue:record.name});
        this.setState({selectedId:record.id});
    }

    onDelete(){
        this.props.onChange({isDelete:true});
    }

    handleBrandVisibleChange = (flag) => {
        // let {pagination} = this.state; 
        this.setState({ visible: flag });
        this.props.action.getBrandRef();//获取品牌参照列表
    }

    render() {
        const brandRefData = this.props.$$state.get("brandRefList").toJS().data;
        const brandRefList = (
            <div className = "reference">
                <div  className = "reference-main"> 
                    <Row
                    type="flex"
                    justify="space-between"
                    className="reference-main-header"
                    >
                        <div className="title">品牌</div>
                    </Row>
                    <Row className="reference-main-choice" type="flex">
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
                    className="reference-main-footer"
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
            </div>
        );

        return (
            <Dropdown overlay={brandRefList} 
            trigger="click"
            onVisibleChange={this.handleBrandVisibleChange}
            visible={this.state.visible}                   
            >                                       
                { (this.props.value) ?                      
                    <Input placeholder = "品牌" value = { this.props.value }
                        suffix={<Icon type="close"  onClick={this.onDelete.bind(this)}/>}/>:
                    <Search placeholder = "品牌" value = { this.props.value}/>
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
  
export default  connect( mapStateToProps, mapDispatchToProps)(BrandRef);