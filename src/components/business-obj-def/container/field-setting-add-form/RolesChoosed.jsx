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

import "assets/stylesheet/all/iconfont.css";

import debounce from "lodash.debounce";
import { baseDir } from "api";
import reqwest from "utils/reqwest";

const Search = Input.Search;

export default class CuperiorCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, //整个下拉面板显示控制
            industryData: [], //获取树数据
            select: {}, //选择面板选择出的行业
            selectKeys: [], //存放选择面板已选择的keys
            selectKeyUp: {}, //手输入时获取的选择字段
            industryDataSearch: [], //获取手输入时获取的数据
            selectedRowKeys: [], //保存table行选中信息
        };
        this.columns = [
            {
                title: "名称",
                dataIndex: "name",
            }
        ];
         this.dataSource=[
        {
            id:1,
            name:'张三',
        },{
            id:2,
            name:'李四',
        },{
            id:3,
            name:'王五',
        },{
            id:4,
            name:'李麻子',
        },{
            id:5,
            name:'赵六',
        },
    ]
    }


    //获取table选择数据
    getListData(flag, pagination) {
        reqwest(
            {
                url: baseDir + "cum/customers/ref",
                method: "GET",
                data: {
                    param: {}
                }
            },
            result => {
                this.setState({
                    visible: flag,
                    industryData: result
                });
            }
        );
    }

    //点击input弹出下拉面板
    getIndustry(flag) {
        //这里需要Request请求
        if (flag) {
            this.getListData(flag);
        } else {
            this.setState({
                visible: flag,
            });
        }
    }

    //点击X图标操作的方法
    emitEmpty() {
        if (this.props.onChange) {
            this.setState(
                {
                    visible: false
                    //keyDownVisiable: false
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
                this.props.onChange(this.state.selectedRowKeys);
            this.setState(
                {
                    visible: false,
                    selectedRowKeys: []
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

    //搜索框输入方法
    onSearch(value) {
        console.log(value);
        reqwest(
            {
                url: baseDir + "cum/customers",
                method: "GET",
                data: {
                    param: {
                        ...this.state.pagination,
                        searchMap: {
                            name: value
                        }
                    }
                }
            },
            result => {
                this.setState({
                    industryData: result
                });
            }
        );
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
            <div className="reference">
                <div
                    className="reference-main"
                    style={{ width: "300px" }}
                >
                    <Row
                        type="flex"
                        justify="space-between"
                        className="reference-main-header"
                    >
                        <div className="title">上级客户</div>
                        <div>
                            <Search
                                placeholder="搜索上级客户"
                                style={{ width: 200 }}
                                onSearch={this.onSearch.bind(this)}
                            />
                        </div>
                    </Row>
                    <Row className="tabel-recoverd reference-main-choice ">
                        <Table
                            columns={this.columns}
                            dataSource={this.dataSource}
                            rowKey="id"
                            size="small"
                            rowSelection={rowSelection}
                            pagination={false}
                        />
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
    }

    render() {
        const suffix =
            this.props.value && this.props.value.name ? (
                <Icon type="close" onClick={this.emitEmpty.bind(this)} />
            ) : null;
        return (
            <div>
                <div className="reference-warpper">
                    {
                        this.props.viewData?
                        <Input disabled value={this.props.viewData.name}/>:
                        <Dropdown
                            overlay={this.choiceIndustry()} //生成下拉结构样式
                            trigger={["click"]}
                            onVisibleChange={this.getIndustry.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                            visible={this.state.visible} //受控面板显示
                            placement={this.props.placement}
                        >
                            <Input
                                placeholder="上级客户"
                                value={
                                    this.props.value ? this.props.value.name : ""
                                }
                                suffix={suffix}
                                addonAfter={
                                    <Icon
                                        type="search"
                                        onClick={this.getIndustry.bind(this, true)}
                                    />
                                }
                            />
                        </Dropdown>
                    }
                    
                </div>
            </div>
        );
    }
}
