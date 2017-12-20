import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Select, Button, Tree, Dropdown, Row, Icon} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
import * as Actions from "../action"
class OrgRef extends React.Component {
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
        this.props.action.getOrgRefTree();
    }

    onSelect = (selectedKeys, info)=> {
        this.setState({selectedKeys:selectedKeys});
        this.setState({selectedValue:info.node.props.title});        
    }

    onOrgOk() {    
        let {selectedValue, selectedKeys} = this.state; 
        this.props.onChange({orgId:selectedKeys,orgName:selectedValue});
        this.handleVisibleChange(false);
    }

    onOrgCancel() {
        this.handleVisibleChange(false);
    }

    onDelete(){
        this.props.onChange({isDelete:true});
    }

    render() {
        const orgRefTree = this.props.$$state.get("orgRefTree").toJS().data;
        let loop = () =>{};
        if(orgRefTree!== undefined && orgRefTree.length>0){
            loop = data => data.map((item) => {
                if (item.children && item.children.length>0) {
                    return (
                        <TreeNode  key={item.id } 
                            title={item.name } 
                        >
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
                        <div className="title">组织</div>
                    </Row>
                    <Row className="reference-main-choice" type="flex">
                        <Tree 
                        onClick = {this.handleTreeClick}
                        checkStrictly={true}
                        onSelect={this.onSelect}               
                        selectedKeys={this.state.selectedKeys}                
                        className="reference-tree"
                        >
                            {loop(orgRefTree)}
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
                                <Button onClick={this.onOrgCancel.bind(this)}>
                                    取消
                                </Button>
                            </div>
                            <div>
                                <Button
                                type="primary"
                                onClick={this.onOrgOk.bind(this)}
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
                    <Input value = {this.props.value} 
                    suffix={<Icon type="close"  onClick={this.onDelete.bind(this)}/>}/>:
                    <Search placeholder = "组织"value = {this.props.value}/>
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
  
export default  connect( mapStateToProps, mapDispatchToProps)(OrgRef);