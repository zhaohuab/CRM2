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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "assets/stylesheet/all/iconfont.css";
import * as Actions from "../action";

const confirm = Modal.confirm;
const Search = Input.Search;
const TreeNode = Tree.TreeNode;

const treeData = [
    {
        value: "包装",
        key: "0-0",
        children: [
            {
                value: "包装广告",
                key: "0-0-0",
                children: [
                    { value: "包装平面广告", key: "0-0-0-0" },
                    { value: "包装电视广告", key: "0-0-0-1" },
                    { value: "包装机械广告", key: "0-0-0-2" }
                ]
            },
            {
                value: "包装工具",
                key: "0-0-1",
                children: [
                    { value: "包装容器", key: "0-0-1-0" },
                    { value: "夹链自封袋", key: "0-0-1-1" },
                    { value: "包装材料", key: "0-0-1-2" }
                ]
            },
            {
                value: "包装用途",
                key: "0-0-2"
            }
        ]
    },
    {
        value: "商业",
        key: "0-1",
        children: [
            { value: "耗油", key: "0-1-0-0" },
            { value: "广式腊肠", key: "0-1-0-1" },
            { value: "冰棍", key: "0-1-0-2" }
        ]
    },
    {
        value: "汽车制造业",
        key: "0-2"
    }
];

const treeDataList = [
    {
        key: 1,
        value: "机械1"
    },
    {
        key: 2,
        value: "机械2"
    },
    {
        key: 3,
        value: "机械3"
    },
    {
        key: 4,
        value: "机械4"
    },
    {
        key: 5,
        value: "机械5"
    },
    {
        key: 6,
        value: "机械6"
    },
    {
        key: 7,
        value: "机械7"
    },
    {
        key: 8,
        value: "机械8"
    },
    {
        key: 9,
        value: "机械9"
    },
    {
        key: 10,
        value: "机械10"
    },
    {
        key: 11,
        value: "机械11"
    }
];

export default class Industry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            industryData: [],
            industryListData: [],
            select: {},
            expandedKeys: []
        };
    }
    getIndustry(flag) {
        //这里需要Request请求
        this.setState({
            visible: flag,
            industryData: treeData
        });
    }

    treeSelect(selectedKeys, selectArrays) {
        debugger;

        if (selectArrays.node.props.children) {
            this.setState({
                expandedKeys: selectedKeys
            });
        } else {
            if (selectedKeys.length) {
                //这里需要Request请求
                this.setState({
                    industryListData: treeDataList
                });
            }
        }
    }

    selectList(item) {
        this.setState(
            {
                select: { value: item.value, id: item.key }
            },
            () => {
                console.log(this.state.select);
            }
        );
    }

    onOk() {
        debugger;
        if (this.props.onChange) {
            this.props.onChange(this.state.select);
        }
    }
    cccc(expandedKeys, obj) {
        console.log(expandedKeys, obj);
        debugger;
        // if (selectArrays.node.props.children) {
        //     this.setState({
        //         expandedKeys: selectedKeys
        //     });
        // } else {
        //     if (selectedKeys.length) {
        //         //这里需要Request请求
        //         this.setState({
        //             industryListData: treeDataList
        //         });
        //     }
        // }
    }
    choiceIndustry() {
        const loop = data =>
            data.map(item => {
                if (item.children && item.children.length) {
                    return (
                        <TreeNode key={item.key} title={item.value}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode key={item.key} title={item.value} />;
            });
        return (
            <div className="industry-main">
                <Row
                    type="flex"
                    justify="space-between"
                    className="industry-main-header"
                >
                    <div className="title">行业</div>
                    <div>
                        <Search
                            placeholder="请输入关键字"
                            style={{ width: 200 }}
                            onSearch={value => console.log(value)}
                        />
                    </div>
                </Row>
                <Row className="industry-main-choice" type="flex">
                    <Tree
                        className="industry-tree"
                        onSelect={this.treeSelect.bind(this)}
                        onExpand={this.cccc.bind(this)}
                        expandedKeys={this.state.expandedKeys}
                    >
                        {loop(this.state.industryData)}
                    </Tree>
                    <div className="industry-tree-choice">
                        <div className="title">行业名称</div>
                        <ul>
                            {this.state.industryListData &&
                            this.state.industryListData.length
                                ? this.state.industryListData.map(item => {
                                      return (
                                          <li
                                              title="item.value"
                                              onClick={this.selectList.bind(
                                                  this,
                                                  item
                                              )}
                                          >
                                              {item.value}
                                          </li>
                                      );
                                  })
                                : ""}
                        </ul>
                    </div>
                </Row>
                <Row
                    type="flex"
                    justify="end"
                    align="middle"
                    className="industry-main-footer"
                >
                    <Row type="flex" justify="end" align="middle" gutter={15}>
                        <div>
                            <Button>取消</Button>
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
    }

    render() {
        debugger;
        return (
            <div className="industry-warpper">
                <Dropdown
                    overlay={this.choiceIndustry()} //生成下拉结构样式
                    trigger={["click"]}
                    onVisibleChange={this.getIndustry.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                    visible={this.state.visible} //受控面板显示
                >
                    <Input
                        placeholder="行业"
                        value={this.props.value ? this.props.value.value : "行业"}
                    />
                </Dropdown>
            </div>
        );
    }
}

/**
 * 点击时  获取redux中的数据放入树中
 * 点击树时  获取单个数据列表  存放在redux中  列表从redux中获取数据
 * 搜索时搜到的数据 放在行业名称下面  值存放在列表数据中
 * input的值存放this.props.value的值
 * 选中某一个行业 点击确定按钮  使用this.props.onChange导出
 */
