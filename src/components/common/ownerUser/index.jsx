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
    Tree,
    Table
} from "antd";

import "assets/stylesheet/all/iconfont.css";

import debounce from "lodash.debounce";
import { baseDir } from "api";
import reqwest from "utils/reqwest";

const confirm = Modal.confirm;
const Search = Input.Search;
const TreeNode = Tree.TreeNode;

import DropDownModal from '../DrowdownModal'


//负责人参照 可根据部门查询
export default class OwnerUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, //整个下拉面板显示控制
            ownerUserData: [], //获取树数据
            select: {}, //选择面板选择出的行业
            selectKeys: [], //存放选择面板已选择的keys
            name: undefined,//下拉面板中的searchvalue
        };
        this.columns = [
            {
                title: "负责人",
                dataIndex: "name",
                width: 150
            },
            {
                title: "电话",
                dataIndex: "phone",
                width: 100
            },
            ,
            {
                title: "部门",
                dataIndex: "deptName",
                width: 100
            }
        ]
    }

    //获取树的数据
    getOwnerUser(flag) {
        let searchMap = {}
        let deptId = this.props.deptId;
        let name = this.state.name;
        if(deptId&&deptId!=""){
            searchMap.deptId = deptId;
        }
        if(name&&name!=""){
            searchMap.name = name
        }
        reqwest(
            {
                url: baseDir + "sys/users/ref",
                method: "GET",
                data:{
                    param:{
                        searchMap
                    }
                }
            },
            data => {
                this.setState({
                    visible: flag,
                    ownerUserData: data.data,
                    keyDownVisiable: false
                });
            }
        );
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
                select: ''
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
                    industryDataSearch: []
                },
                () => {
                    this.props.onChange({});
                }
            );
        }
    }

    //下拉面板onSearch
    onDropDownSearch() {
        this.state.name
    }

    onDropDownChange(name) {
        this.setState({
            name
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
        let suffix = <Icon type="close" />
        return (
            <DropDownModal
                title='行业'
                onCancel={this.onCancel.bind(this)}
                onOk={this.onOk.bind(this)}
                onSearch={this.onDropDownSearch.bind(this)}
                value={this.state.name}
                onChange={this.onDropDownChange.bind(this)}
                width={400}
                height={380}
            >
                <Row>
                    <Table
                        columns={this.columns}
                        dataSource={this.state.ownerUserData}
                        rowKey="id"
                        // rowSelection={rowSelection}
                        size="middle"
                        pagination={false}

                    />
                </Row>

            </DropDownModal>
        );
    }

    render() {
        let suffix =
            this.props.value && this.props.value.name ? (
                <Icon type="close" onClick={this.emitEmpty.bind(this)} />
            ) : null;

        return (
            <div>
                {
                    this.props.disabled ?
                        <Input value={this.props.value ? this.props.value.name : ""} /> :
                        <Dropdown
                            overlay={this.createTree()} //生成下拉结构样式
                            trigger={["click"]}
                            onVisibleChange={this.getOwnerUser.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                            visible={this.state.visible} //受控面板显示
                        >
                            <Search
                                placeholder="行业"
                                onSearch={this.getOwnerUser.bind(this, true)}
                                value={this.props.value ? this.props.value.name : ""}
                                suffix={suffix}
                            />
                        </Dropdown>
                }
            </div>

        );
    }
}
