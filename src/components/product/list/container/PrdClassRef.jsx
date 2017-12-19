import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Select, Button, Tree, Dropdown, Row, Icon} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
import * as Actions from "../action"
 class PrdClassRef extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedKeys:[0],         
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
        }        
    }

    onPrdClassOk() {    
        let {selectedValue, selectedKeys} = this.state; 
        this.props.onChange({prdtypeId:selectedKeys,prdtypeName:selectedValue});
        this.handleVisibleChange(false);
    }

    onPrdClassCancel() {
        this.handleVisibleChange(false);
    }

    onDelete(){
        this.props.onChange({isDelete:true});
    }

    render() {
        const classRefTree = this.props.$$state.get("classRefTree").toJS().voList;
        let loop = () =>{};
        if(classRefTree!== undefined && classRefTree.length>0){
            loop = data => data.map((item) => {
                if (item.children && item.children.length>0) {
                    return (
                        <TreeNode  key={item.id } 
                            title={item.name } 
                            disableCheckbox >
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
            <div className = "reference">
                <div  className = "reference-main"> 
                    <Row
                    type="flex"
                    justify="space-between"
                    className="reference-main-header"
                    >
                        <div className="title">产品分类</div>
                    </Row>
                    <Row className="reference-main-choice" type="flex">
                        <Tree 
                        onClick = {this.handleTreeClick}
                        checkStrictly={true}
                        onSelect={this.onSelect}               
                        selectedKeys={this.state.selectedKeys}                
                        className="reference-tree"
                        >
                            {loop(classRefTree)}
                        </Tree>                     
                    </Row>
                    <Row
                    type="flex"
                    justify="end"
                    align="middle"
                    className="reference-main-footer"
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
            </div>      
        );

        return (
            <Dropdown overlay={refTree} 
            trigger="click"
            onVisibleChange={this.handleVisibleChange}
            visible={this.state.visible}
            > 
            {
                (this.props.value) ?
                    <Input placeholder = "产品分类"value = {this.props.value} 
                    suffix={<Icon type="close"  onClick={this.onDelete.bind(this)}/>}/>:
                    <Search placeholder = "产品分类"value = {this.props.value}/>
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
  
export default  connect( mapStateToProps, mapDispatchToProps)(PrdClassRef);