import {
    Select,
    Row,
    Col,
    Input,
    Button,
    Icon,
    Menu,
    Dropdown,
    Table
} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "assets/stylesheet/all/iconfont.css";
import * as Actions from "../action";
import debounce from "lodash.debounce";
import { baseDir } from "api";
import reqwest from "utils/reqwest";

const Search = Input.Search;

const searchList = [
    {
        id: "0-1",
        name:
            "广式腊肠广式腊肠广式腊肠广式腊肠广式腊肠广式腊肠广式腊肠广式腊肠广式腊肠广式腊肠广式腊肠"
    },
    { id: "0-2", name: "广式腊肠" },
    { id: "0-3", name: "广式腊肠" },
    { id: "0-4", name: "广式腊肠" },
    { id: "0-5", name: "广式腊肠" },
    { id: "0-6", name: "广式腊肠" },
    { id: "0-7", name: "广式腊肠" },
    { id: "0-8", name: "广式腊肠" },
    { id: "0-9", name: "广式腊肠" },
    { id: "0-10", name: "广式腊肠" },
    { id: "0-11", name: "广式腊肠" },
    { id: "0-12", name: "广式腊肠" },
    { id: "0-13", name: "广式腊肠" },
    { id: "0-14", name: "广式腊肠" },
    { id: "0-15", name: "广式腊肠" }
];

export default class CuperiorCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, //整个下拉面板显示控制
            industryData: [], //获取树数据
            select: {}, //选择面板选择出的行业
            selectKeys: [], //存放选择面板已选择的keys
            keyDownVisiable: false, //是否显示手输查询面板
            selectKeyUp: {}, //手输入时获取的选择字段
            industryDataSearch: [], //获取手输入时获取的数据
            selectedRowKeys: [], //保存table行选中信息
            pagination: {
                pageSize: 5,
                page: 1,
                current: 1
            } //分页信息
        };
        this.columns = [
            {
                title: "客户名称",
                dataIndex: "name",
                key: "name",
                filterMultiple: false
            },
            {
                title: "等级",
                dataIndex: "levelName",
                key: "levelName"
            },
            {
                title: "区域",
                dataIndex: "saleArea",
                key: "saleArea"
            }
            // {
            //     title: "负责人",
            //     dataIndex: "ownerUseId",
            //     key: "ownerUseId"
            // }
        ];
    }

    //点击分页时触发的方法
    onPageChange(page, pageSize) {
        debugger;
        //let { page, pageSize } = this.state.pagination;
        let pagination = {
            page,
            pageSize
        };
        this.setState(
            {
                pagination
            },
            () => {
                this.getListData(true, pagination);
            }
        );
        console.log(page, pageSize);
    }

    //获取table选择数据
    getListData(flag, pagination) {
        reqwest(
            {
                url: baseDir + "cum/customers/ref",
                method: "GET",
                data: {
                    param: {
                        ...this.state.pagination
                    }
                }
            },
            result => {
                debugger;
                this.setState({
                    visible: flag,
                    industryData: result,
                    keyDownVisiable: false
                });
            }
        );
    }

    //点击input弹出下拉面板
    getIndustry(flag) {
        //这里需要Request请求
        if (flag) {
            let { page, pageSize } = this.state.pagination;
            this.getListData(flag, { page, pageSize });
        } else {
            this.setState({
                visible: flag,
                pagination: {
                    pageSize: 5,
                    page: 1
                }
            });
        }
    }

    //点击X图标操作的方法
    emitEmpty() {
        if (this.props.onChange) {
            this.setState(
                {
                    visible: false,
                    keyDownVisiable: false
                },
                () => {
                    this.props.onChange({});
                }
            );
        }
    }

    //table发生行选中触发的方法
    onSelectChange(selectedRowKeys, selectedRows) {
        this.setState({
            select: { name: selectedRows[0].name, id: selectedRows[0].id },
            selectedRowKeys: selectedRowKeys
        });
        console.log(selectedRowKeys, selectedRows);
    }

    //显示分页多少条结构
    showTotal(total) {
        return `共 ${total} 条`;
    }

    //点击确定
    onOk() {
        if (this.props.onChange) {
            this.setState(
                {
                    visible: false,
                    selectedRowKeys: []
                },
                () => {
                    this.props.onChange(this.state.select);
                }
            );
        }
    }

    //点击取消
    onCancel() {
        this.setState({
            visible: false,
            selectedRowKeys: [],
            pagination: {
                pageSize: 5,
                page: 1
            }
        });
    }
    //input框输入值的时候
    keyDownUp(e) {
        let value = e.target.value;
        if (value) {
            this.setState({
                keyDownVisiable: true,
                industryDataSearch: searchList
            });
        } else {
            this.setState({
                keyDownVisiable: false
            });
        }
    }

    //input触发onchange方法
    inputChange(e) {
        let value = e.target.value;
        if (this.props.onChange) {
            this.props.onChange({ name: value, id: null });
        }
    }

    //下拉列表选择时触发方法
    searchChoice(item) {
        if (this.props.onChange) {
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

    //下拉时显示的面板布局
    choiceIndustry() {
        let rowSelection = {
            onChange: this.onSelectChange.bind(this),
            type: "radio",
            selectedRowKeys: this.state.selectedRowKeys
        };
        let tableData = this.state.industryData;
        return (
            <div>
                {this.state.keyDownVisiable ? (
                    <div className="industry-search">
                        {this.state.industryDataSearch &&
                        this.state.industryDataSearch.length ? (
                            this.state.industryDataSearch.map(item => {
                                return (
                                    <div
                                        className="industry-search-list"
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
                            <div className="industry-search-list">暂无数据</div>
                        )}
                    </div>
                ) : (
                    <div
                        className="industry-main"
                        style={{ width: this.props.width + "px" }}
                    >
                        <Row
                            type="flex"
                            justify="space-between"
                            className="industry-main-header"
                        >
                            <div className="title">上级客户</div>
                        </Row>
                        <Row className="tabel-recoverd industry-main-choice ">
                            <Table
                                columns={this.columns}
                                dataSource={tableData.data}
                                rowKey="id"
                                size="small"
                                rowSelection={rowSelection}
                                pagination={{
                                    size: "small",
                                    total: tableData.total,
                                    showTotal: this.showTotal,
                                    onChange: this.onPageChange.bind(this),
                                    pageSize: 5,
                                    current: tableData.page
                                }}
                            />
                        </Row>
                        <Row
                            type="flex"
                            justify="end"
                            align="middle"
                            className="industry-main-footer"
                        >
                            <Row
                                type="flex"
                                justify="end"
                                align="middle"
                                gutter={15}
                            >
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
                )}
            </div>
        );
    }

    render() {
        const suffix =
            this.props.value && this.props.value.name ? (
                <Icon type="close" onClick={this.emitEmpty.bind(this)} />
            ) : null;

        return (
            <div className="industry-warpper">
                <Dropdown
                    overlay={this.choiceIndustry()} //生成下拉结构样式
                    trigger={["click"]}
                    onVisibleChange={this.getIndustry.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                    visible={this.state.visible} //受控面板显示
                >
                    <Input
                        placeholder="上级客户"
                        value={this.props.value ? this.props.value.name : ""}
                        suffix={suffix}
                        onKeyUp={this.keyDownUp.bind(this)}
                        onChange={this.inputChange.bind(this)}
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
