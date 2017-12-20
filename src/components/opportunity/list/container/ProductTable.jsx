
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Input, Table, Row, Col, Button ,Modal} from 'antd';
const Search = Input.Search;
import * as Actions from "../action";



class DetailTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dataSource: [],
            //数据中包含新增、修改、已删除内容，保存使用
            dataSourceForSave: [],
            count: 0,
            selectedRows:[],
        }
        this.columns = [
     
            {
                title: "产品编码",
                dataIndex: "code",
            },
            {
                title: "产品名称",
                dataIndex: "name"
            },
        ]

        const that = this;
        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            that.props.action.selectProduct({selectedRows,selectedRowKeys});
        };
    }

    componentDidMount() {

    }

    render() {
        const allProduct = this.props.$$state.get("allProduct").toJS();
        const selectedRowKeys = this.props.$$state.get("selectedProductKeys").toJS();
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        return (
            <div>
                <Table
                    columns={this.columns}
                    dataSource={allProduct.data}
                    pagination={false}
                    rowKey="id"
                    rowSelection={rowSelection}
                    size="middle"
                />
            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.opportunityList,
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(DetailTable);
