import {
    Modal,
    Input,
    Icon,
    Dropdown,
    Tree
} from "antd";

import "assets/stylesheet/all/iconfont.css";

import reqwest from "utils/reqwest";

const Search = Input.Search;
const TreeNode = Tree.TreeNode;

import DropDownRef from './DropDownRef'

export default class TreeRef extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, //整个下拉面板显示控制
            data: [], //获取树数据
            select: {}, //选择面板选择出的行业
            value:'', //input框中显示值
            selectKeys: [], //存放选择面板已选择的keys
            searchValue:'',//下拉面板中的searchvalue
        };
    }

    //获取树的数据
    getData(flag) {
        
        //flag为下拉的显示隐藏标识，显示true，隐藏false，隐藏时清空数据，显示时请求后台
        if (!flag) {
            this.setState(
                {
                    visible: false,
                    selectKeys: [],
                    keyDownVisiable: false
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
                    url: this.props.url,
                    data:{
                        value:this.state.searchValue
                    },
                    method: "GET"
                },
                data => {
                    this.setState({
                        visible: flag,
                        data: data.data,
                        keyDownVisiable: false
                    });
                }
            );
        }
    }

    //选中某一个树节点触发的方法
    treeSelect(selectedKeys, selectArrays) {
        if (selectedKeys.length) {
            debugger
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
                select: ''
            });
        }
    }


    //点击确定按钮触发的方法
    onOk() {
        if (this.props.onChange) {
            debugger
            this.props.onChange(this.state.select);
            this.setState({
                visible: false,
                keyDownVisiable: false,
                selectKeys: []
            });
        }
    }

    //点击取消按钮触发的方法
    onCancel() {
        if (this.props.onChange) {
            this.setState({
                visible: false,
                keyDownVisiable: false,
                selectKeys: []
            });
        }
    }

    //清空input数据
    emitEmpty() {
        if (this.props.onChange) {
            //关闭全部的时候 两个面板都应该改关闭
            this.setState(
                {
                    keyDownVisiable: false,
                    visible: false,
                    searchResult: []
                },
                () => {
                    this.props.onChange({});
                }
            );
        }
    }

    //下拉面板onSearch
    onDropDownSearch(){
        // TODO 请求查询
    }
    
    onDropDownChange(value){
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
        let sizeEnum = {
            small : {
                width:300,
                height:360
            },
            middle : {
                width:400,
                height:480
            },
            large : {
                width:500,
                height:600
            }
        }
        let size = this.props.size;
        let width = this.props.width ? this.props.width : sizeEnum[size].width;
        let height = this.props.height ? this.props.height : sizeEnum[size].height;
        return (
            <DropDownRef 
                title={this.props.title}
                onCancel={this.onCancel.bind(this)}  
                onOk={this.onOk.bind(this)} 
                onSearch = {this.onDropDownSearch.bind(this)}
                value = {this.state.value}
                onChange = {this.onDropDownChange.bind(this)}
                width={width}
                height={height}
            >
                <Tree
                    className="reference-tree"
                    onSelect={this.treeSelect.bind(this)}
                    selectedKeys={this.state.selectKeys}
                >
                    {loop(this.state.data)}
                </Tree>
            </DropDownRef>
        );
    }

    render() {
        let suffix =
            this.props.value && this.props.value.name ? (
                <Icon type="close" onClick={this.emitEmpty.bind(this)}/>
            ) : null;
        
        let { title } = this.props;
        
        return (
            <div>
                {
                    this.props.disabled?
                    <Input value={this.props.value ? this.props.value.name : ""}/>:
                    <Dropdown
                        overlay={this.createTree()} //生成下拉结构样式
                        trigger={["click"]}
                        onVisibleChange={this.getData.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                        visible={this.state.visible} //受控面板显示
                    >
                        <Search
                            placeholder={title}
                            onSearch={this.getData.bind(this, true)}
                            value={this.props.value ? this.props.value.name : ""}
                            suffix={suffix}
                        />
                    </Dropdown>
                }
            </div>
            
        );
    }
}
