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

export default class Industry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, //整个下拉面板显示控制
            industryData: [], //获取树数据
            select: {}, //选择面板选择出的行业
            selectKeys: [], //存放选择面板已选择的keys
            keyDownVisiable: false, //是否显示手输查询面板
            selectKeyUp: {}, //手输入时获取的选择字段
            industryDataSearch: [] //获取手输入时获取的数据,
        };
        this.lodashSearch = debounce(this.lodashSearch, 800, {
            trailing: true
        });
    }

    //获取树的数据
    getIndustry(flag) {
        //这里需要Request请求
        if (!flag) {
            debugger;
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
                    url: baseDir + "/base/industrys/reftree",
                    method: "GET"
                },
                data => {
                    this.setState({
                        visible: flag,
                        industryData: data.data,
                        keyDownVisiable: false
                    });
                }
            );
        }
    }

    //选中某一个树节点触发的方法
    treeSelect(selectedKeys, selectArrays) {
        if (selectedKeys.length) {
            if (
                !(
                    selectArrays.node.props.children &&
                    selectArrays.node.props.children.length
                )
            ) {
                this.setState({
                    select: {
                        name: selectArrays.node.props.title,
                        id: selectArrays.node.props.eventKey
                    },
                    selectKeys: [selectedKeys[0]]
                });
            } else {
                this.setState({
                    selectKeys: [selectedKeys[0]],
                    select: {}
                });
            }
        } else {
            this.setState({
                selectKeys: [selectedKeys[0]],
                select: {}
            });
        }
    }

    //搜索面板选择方法
    searchChoice(item) {
        if (!item.id) {
            this.setState(
                {
                    visible: false,
                    keyDownVisiable: false
                },
                () => {
                    this.props.onChange({});
                }
            );
        } else if (this.props.onChange) {
            this.setState(
                {
                    visible: false,
                    keyDownVisiable: false
                },
                () => {
                    this.props.onChange({ name: item.name, id: item.id });
                }
            );
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

    //动态赋予this.props.value input中的值
    inputChange(e) {
        let value = e.target.value;

        if (this.props.onChange) {
            this.props.onChange({ name: value, id: null });
        }
    }

    //每隔500毫秒执行一次查找请求
    lodashSearch(value) {
        reqwest(
            {
                url: baseDir + "/base/industrys/list",
                method: "GET",
                data: {
                    param: {
                        searchMap: {
                            searchKey: value
                        }
                    }
                }
            },
            result => {
                result = result.data;
                let resultEnd = [];
                if (result && result.length) {
                    result.forEach(item => {
                        resultEnd.push({ id: item.id, name: item.name });
                    });

                    this.setState({
                        visible: true,
                        keyDownVisiable: true,
                        industryDataSearch: resultEnd
                    });
                } else {
                    this.setState({
                        keyDownVisiable: true,
                        visible: true,
                        industryDataSearch: [{ id: null, name: "暂无数据" }]
                    });
                }
            }
        );
    }

    //触发键盘事件时，选择框消失，出现搜索面板
    keyDownUp(e) {
        let value = e.target.value;
        if (value) {
            this.lodashSearch(value);
        } else {
            this.setState({
                keyDownVisiable: false,
                industryDataSearch: []
            });
        }
    }

    //下拉时显示的面板布局
    choiceIndustry() {
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

        return (
            <div className="reference">
                <div>
                    {this.state.keyDownVisiable ? (
                        <div className="reference-search">
                            {this.state.industryDataSearch &&
                            this.state.industryDataSearch.length ? (
                                this.state.industryDataSearch.map(item => {
                                    return (
                                        <div
                                            className="reference-search-list"
                                            onClick={this.searchChoice.bind(
                                                this,
                                                item
                                            )}
                                        >
                                            {item.name}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="reference-search-list">
                                    暂无数据
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="reference-main">
                            <Row
                                type="flex"
                                justify="space-between"
                                className="reference-main-header"
                            >
                                <div className="title">行业</div>
                            </Row>
                            <Row className="reference-main-choice" type="flex">
                                <Tree
                                    className="reference-tree"
                                    onSelect={this.treeSelect.bind(this)}
                                    selectedKeys={this.state.selectKeys}
                                >
                                    {loop(this.state.industryData)}
                                </Tree>
                            </Row>
                            <Row
                                type="flex"
                                justify="end"
                                align="middle"
                                className="reference-main-footer"
                            >
                                <Row
                                    type="flex"
                                    justify="end"
                                    align="middle"
                                    gutter={15}
                                >
                                    <div>
                                        <Button
                                            onClick={this.onCancel.bind(this)}
                                        >
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
                    )}
                </div>
            </div>
        );
    }

    render() {
        const suffix =
            this.props.value && this.props.value.name ? (
                <Icon type="close" onClick={this.emitEmpty.bind(this)} />
            ) : null;

        return (
            <div className="reference-warpper">
                <Dropdown
                    overlay={this.choiceIndustry()} //生成下拉结构样式
                    trigger={["click"]}
                    onVisibleChange={this.getIndustry.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                    visible={this.state.visible} //受控面板显示
                >
                    <Input
                        placeholder="行业"
                        onChange={this.inputChange.bind(this)}
                        onKeyUp={this.keyDownUp.bind(this)}
                        value={this.props.value ? this.props.value.name : ""}
                        suffix={suffix}
                        addonAfter={
                            <Icon
                                type="search"
                                onClick={this.getIndustry.bind(this, true)}
                            />
                        }
                    />
                </Dropdown>
            </div>
        );
    }
}
