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
            industryData: [], //查询时获取参照数据
            select: {}, //选择面板选择出的行业
            selectKeys: [], //存放选择面板已选择的keys
            selectKeyUp: {}, //手输入时获取的选择字段
            industryDataSearch: [], //获取手输入时获取的数据
            selectedRowKeys: [], //保存table行选中信息
        };
        this.columns = [
            {
                title: "角色",
                dataIndex: "roleName",
                key: "role",

            },
            {
                title: "组织",
                dataIndex: "orgName",
                key: "org"
            }
        ];
          this.dataSource=[
        {
            id:1,
            role:'张三',
            org:'总公司'
        },{
            id:4,
            role:'李四',
            org:'分公司'
        },{
            id:8,
            role:'王五',
            org:'事业部'
        },{
            id:26,
            role:'李麻子',
            org:'CRM'
        },{
            id:3,
            role:'赵六',
            org:'xxxxxx'
        },
    ]
    }





    //table发生行选中触发的方法
    onSelectChange(selectedRowKeys, selectedRows) {
        this.setState({
           /*  select: { name: selectedRows[0].role, id: selectedRows[0].key }, */
            selectedRowKeys: selectedRowKeys,
            roles:selectedRows
        });
        this.props.rolesChoosed(selectedRowKeys)
    } 
    //下拉时显示的面板布局
    choiceIndustry() {      
        let rowSelection = {
            onChange: this.onSelectChange.bind(this),          
            type: "checkbox",
            selectedRowKeys: this.props.roleIds,          
        };  

       
        return (
            <div className="reference">
                <div
                    className="reference-main"
                    style={{ width:"370px" }}
                >
                    <Row
                        type="flex"
                        justify="space-between"
                        className="reference-main-header"
                    >
                        <div className="title">角色</div>
                        <div>
                            <Search
                                placeholder="请输入角色关键字"
                                style={{ width: 200 }}
                                onChange={this.onSearch.bind(this)}
                            />
                        </div>
                    </Row>
                    <Row className="tabel-recoverd reference-main-choice ">
                        <Table
                            columns={this.columns}
                            dataSource={dataSource}
                            rowKey="roleId"
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
        let dataSource= this.props.$$state.get("roleList").toJS();
        let getValue=this.getValue;
        let rowSelection = {
            onChange: this.onSelectChange.bind(this),          
            type: "checkbox",
            selectedRowKeys: this.props.rolesIdList,          
        };   
      {/*   let dataSource= this.props.dataFlag ? this.state.industryData.data:this.props.$$state.get("roleList").toJS(); */}
        return (        
            <div className="reference-warpper"> 
                <div
                    className="reference-main"
                    style={{ width:"370px" }}
                >
                    <Row className="tabel-recoverd reference-main-choice ">
                        <Table
                            columns={this.columns}
                            dataSource={dataSource}
                            rowKey="roleId"
                            size="small"
                            pagination={false}
                            scroll={{y:300}}
                            rowSelection={rowSelection}
                        />
                    </Row>
            </div>
        </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.businessObjDef.tplSetting
  }
}

export default connect(mapStateToProps, {})(RolesChoosed);