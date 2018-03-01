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
import { connect } from 'react-redux';

const Search = Input.Search;

class RolesChoosed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, //整个下拉面板显示控制
            dataFlag:false,//table数据来源控制
            industryData: [], //查询时获取参照数据
            select: {}, //选择面板选择出的行业
            selectKeys: [], //存放选择面板已选择的keys
            selectKeyUp: {}, //手输入时获取的选择字段
            industryDataSearch: [], //获取手输入时获取的数据
            selectedRowKeys: [], //保存table行选中信息
            valueFlag:false,//适用角色input值显示
            roles:[],//存储已选择角色
        };
    }



    //点击input弹出下拉面板
    getIndustry(flag) {     
            this.setState({visible: flag});

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
           /*  select: { name: selectedRows[0].role, id: selectedRows[0].key }, */
            selectedRowKeys: selectedRowKeys,
            roles:selectedRows
        });
        let obj={};
        obj.name=selectedRows[0].name;
        obj.id=selectedRows[0].id;
        this.props.onChange(obj)
    }


    //点击确定
    onOk() {           
        this.setState(
            {
                visible: false,
                selectedRowKeys: [],
                valueFlag: true,
                dataFlag: false,
            }
        );
    }

    //点击取消
    onCancel() {
        this.setState({
            visible: false,
            selectedRowKeys: [],
            dataFlag: false,
        });
    }

    //下拉时显示的面板布局
    choiceIndustry() { 
        //debugger;
        let rowSelection = {
            onChange: this.onSelectChange.bind(this),
            type: "radio",
            selectedRowKeys: this.props.idArr,          
        };   
        //let dataSource = this.props.$$state.get("businessObjList").toJS(); 
        return (
            <div className="reference">
                <div
                    className="reference-main"
                    style={{ width:"250px",border:'1px solid #eee' }}
                >
                { /*    <Row
                        type="flex"
                        justify="space-between"
                        className="reference-main-header"
                    >
                        <div className="title">业务类型</div>
                    </Row> */}
                    <Row className="tabel-recoverd reference-main-choice ">
                        <Table
                            columns={this.props.columns}
                            dataSource={this.props.dataSource}
                            rowKey="id"
                            size="small"
                            pagination={false}
                            scroll={{y:300}}
                            rowSelection={rowSelection}
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
        let xxxx=this.props;
        //debugger;
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
                                placeholder="请选择" 
                                value={
                                    this.props.name
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

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.contacts
  }
}

export default connect(mapStateToProps, {})(RolesChoosed);