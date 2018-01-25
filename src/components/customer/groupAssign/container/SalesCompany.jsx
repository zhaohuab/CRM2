import {
    Modal,
    Cascader,
    Select,
    Form,
    Row,
    Col,
    Input,
    Button,
    Icon,
    Menu,
    Dropdown,
    Tree
} from "antd";

import "assets/stylesheet/all/iconfont.css";

import debounce from "lodash.debounce";
import { baseDir } from "api";
import reqwest from "utils/reqwest";

const confirm = Modal.confirm;
const Search = Input.Search;
const TreeNode = Tree.TreeNode;

import DropDownModal from '../../../common/DrowdownModal'


export default class SalesCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, //整个下拉面板显示控制
            companyData: [], //获取树数据
            select: {}, //选择面板选择出的行业
            selectKeys: [], //存放选择面板已选择的keys
        };
    }

    //获取树的数据
    getCompany(flag) {
        if (!flag) {
            this.setState(
                {
                    visible: false,
                    selectKeys: [],
                },
                () => {
                    if (!this.state.select.id) {
                        this.props.onChange({});
                    }
                }
            );
        } else {
            reqwest(
                {
                    url: baseDir+'sys/orgs/orgTree',
                    method: "GET",
                    data:{
                        param:{
                            orgType:2,
                        }
                    }
                },
                result => {
                    this.setState({
                        visible: flag,
                        companyData: result.data,
                    });
                    
                }
            );
        }
    }

    //选中某一个树节点触发的方法
    treeSelect(selectedKeys, selectArrays) {
        
        if (selectedKeys.length) {
            this.setState({
                select: {
                    name: selectArrays.node.props.title,
                    id: selectArrays.node.props.eventKey
                },
                selectKeys: selectedKeys,
            });
        } else {
            this.setState({
                selectKeys: selectedKeys,
                select: {}
            });
        }
    }

    //点击确定按钮触发的方法
    onOk() {
        if (this.props.onChange) {
            this.props.onChange(this.state.select);
            this.setState({
                visible: false,
                keyDownVisiable: false,
                selectKeys: [],
                value:''
            });
        }
    }

    //点击取消按钮触发的方法
    onCancel() {
        if (this.props.onChange) {
            this.setState({
                visible: false,
                selectKeys: [],
                value:''
            });
        }
    }

    //清空input数据
    emitEmpty() {
        if (this.props.onChange) {
            //关闭全部的时候 两个面板都应该改关闭
            this.setState(
                {
                    visible: false,
                },
                () => {
                    this.props.onChange({});
                }
            );
        }
    }

    //下拉框中的输入查询
    onSearch(){
        this.state.value
    }

    //下拉框中input触发的onChange
    onChange(value){
        this.setState({
            value
        })
    }

    //下拉时显示的面板布局
    createTree() {
        const loop = data =>
            data.map(item => {
                if (item.children && item.children.length) {
                    return (
                        <TreeNode key={item.id} title={item.name}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode key={item.id} title={item.name} />;
            });
            let suffix = <Icon type="close"/> 

        return (
            <DropDownModal 
                title='销售公司' 
                onCancel={this.onCancel.bind(this)}  
                onOk={this.onOk.bind(this)} 
                onSearch = {this.onSearch.bind(this)}
                value = {this.state.value}
                onChange = {this.onChange.bind(this)}
                width = {400}
                height= {380}
            >
                <Tree
                    className="reference-tree"
                    onSelect={this.treeSelect.bind(this)}
                    selectedKeys={this.state.selectKeys}
                >
                    {loop(this.state.companyData)}
                </Tree>
            </DropDownModal>
        );
    }

    render() {
        let suffix =
            this.props.value && this.props.value.name ? (
                <Icon type="close" onClick={this.emitEmpty.bind(this)}/>
            ) : null;

        return (
            <div>
                {
                    this.props.disabled?
                    <Input value={this.props.value ? this.props.value.name : ""}/>:
                    <Dropdown
                        overlay={this.createTree()} //生成下拉结构样式
                        trigger={["click"]}
                        onVisibleChange={this.getCompany.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                        visible={this.state.visible} //受控面板显示
                    >
                        <Search
                            placeholder="销售公司"
                            onSearch={this.getCompany.bind(this, true)}
                            value={this.props.value ? this.props.value.name : ""}
                            suffix={suffix}
                        />
                    </Dropdown>
                }
            </div>
        );
    }
}
