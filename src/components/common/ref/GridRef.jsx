import {
    Row,
    Col,
    Input,
    Button,
    Icon,
    Dropdown,
    Table
} from "antd";

import "assets/stylesheet/all/iconfont.css";

import reqwest from "utils/reqwest";
import DropDownRef from './DropDownRef'

const Search = Input.Search;

export default class GridRef extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, //整个下拉面板显示控制
            data: [], //获取树数据
            select: {}, //选择面板选择出的行业
            selectKeys: [], //存放选择面板已选择的keys
            selectKeyUp: {}, //手输入时获取的选择字段
            selectedRowKeys: [], //保存table行选中信息
            pagination: {
                pageSize: 5,
                page: 1,
                current: 1
            },//分页信息
            value:''
        };
        this.columns = this.props.columns;
    }

    //点击分页时触发的方法
    onPageChange(page, pageSize) {
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
    }

    //获取table选择数据
    getListData(flag, pagination) {
        reqwest(
            {
                url: this.props.url,
                method: "GET",
                data: {
                    param: {
                        ...this.state.pagination
                    }
                }
            },
            result => {
                this.setState({
                    visible: flag,
                    data: result
                });
            }
        );
    }

    //点击input弹出下拉面板
    getData(flag) {
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
                    visible: false
                },
                () => {
                    this.props.onChange({});
                }
            );
        }
    }

    //table发生行选中触发的方法
    onSelectChange(selectedRowKeys, selectedRows) {
        //{ name: selectedRows[0].name, id: selectedRows[0].id }
        //selectedRows循环放进数组，单选先创建的数组 永远等于selectedRows【0】项，
        this.setState({
            select: { name: selectedRows[0].name, id: selectedRows[0].id },
            selectedRowKeys: selectedRowKeys
        });
    }

    //显示分页多少条结构
    showTotal(total) {
        return `共 ${total} 条`;
    }

    //点击确定
    onOk() {
        if (this.props.onChange) {
            this.props.onChange(this.state.select);
            this.setState(
                {
                    visible: false,
                    selectedRowKeys: [],
                    select:''
                }
            );
        }
    }

    //点击取消
    onCancel() {
        this.setState({
            visible: false,
            selectedRowKeys: [],
            select:'',
            pagination: {
                pageSize: 5,
                page: 1
            }
        });
    }

    //搜索框输入方法
    onSearch() {
        let {value,pagination} = this.state
        reqwest(
            {
                url: baseDir + this.props.url,
                method: "GET",
                data: {
                    param: {
                        ...pagination,
                        searchMap: {
                            name: value
                        }
                    }
                }
            },
            result => {
                this.setState({
                    data: result
                });
            }
        );
    }

    //设置手输查询value值
    onDropDownChange(value){
        this.setState({
            value
        })
    }

    //下拉时显示的面板布局
    createPanel() {
        let rowSelection = {
            onChange: this.onSelectChange.bind(this),
            type: "radio",
            selectedRowKeys: this.state.selectedRowKeys
        };
        let tableData = this.state.data;
        let sizeEnum = {
            small : {
                width: 200,
                height: 280
            },
            middle : {
                width : 450,
                height : 280
            },
            large : {
                width : 800,
                height : 450
            }
        }
        let size = this.props.size ? this.props.size : "middle";
        let width = this.props.width ? this.props.width : sizeEnum[size].width;
        let height = this.props.height ? this.props.height : sizeEnum[size].height;
        debugger
        return (
            <DropDownRef 
                title={this.props.title}
                onCancel={this.onCancel.bind(this)}  
                onOk={this.onOk.bind(this)} 
                onSearch = {this.onSearch.bind(this)}
                value = {this.state.value}
                onChange = {this.onDropDownChange.bind(this)}
                width={width}
                height={height}
            >
               <div className='crm-list-card-super-model tabel-recoverd'>
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
                </div>
            </DropDownRef>
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
                        this.props.disabled?
                        <Input disabled value={this.props.value ? this.props.value.name : ""}/>:
                        <Dropdown
                            overlay={this.createPanel()} //生成下拉结构样式
                            trigger={["click"]}
                            onVisibleChange={this.getData.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                            visible={this.state.visible} //受控面板显示
                            placement={this.props.placement}
                        >
                            <Search
                                placeholder={this.props.title}
                                onSearch={this.getData.bind(this, true)}   //只要包含在dropdown里的只要出发都会执行onVisibleChange方法不必单写
                                value={this.props.value ? this.props.value.name : ""}
                                suffix={suffix}
                            />
                        </Dropdown>
                    }
                </div>
            </div>
        );
    }
}
