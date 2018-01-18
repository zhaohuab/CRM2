import {Modal, Cascader,Select,Form,Row,Col,Input,Button,Icon,Radio} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Enum from "utils/components/enums";
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
let RadioGroup = Radio.Group;
import "assets/stylesheet/all/iconfont.css";
//导入action方法
import * as Actions from "../action";

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
    }
    handleSearch(e) {
        e.preventDefault();
        let that = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.action.getListData(this.props.$$state.get("pagination").toJS(), values);
                this.props.action.getFunnelData(values)
            }
        });
    }

    componentDidMount() {
        //装箱过程
        this.props.form.setFieldsValue(this.props.$$state.get("searchMap").toJS());
    }
  
    onEableRadioChange = e => {
        let enable = e.target.value;
        let pagination = this.props.$$state.get("pagination").toJS();
        pagination.page = 1;
        let searchMap = this.props.$$state.get("searchMap").toJS();
        //可能有问题
        searchMap.enableState = enable;
        this.props.action.getListData({ pagination, searchMap });
        // this.props.action.getListTpl(searchMap.enableState);
    };

    onAdd() {
        this.props.action.showForm(true, {}, false);
        this.props.action.getAddTpl();
    }
    btnSearchOnClick(){
        let pagination = this.props.$$state.get("pagination").toJS();
        
        const enableState = this.props.$$state.get("searchMap").toJS().enableState;
        const data = this.props.form.getFieldsValue();
        data.enableState = enableState;
        this.props.action.getListData({ pagination, searchMap:data });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 }
        };
        let enableState = this.props.$$state.get("searchMap").toJS().enableState;
        return (
            <Row type="flex" align="middle" style={{ height: "54px" }}>
                   
                        <Col span={4}>
                        <Form layout="inline">
                                {getFieldDecorator("searchKey", {})(
                                    <Input
                                    placeholder="请输入..."
                                    onSearch={value => console.log(value)}
                                />
                                )}
                                </Form>
                        </Col>
                       
                        <Col span={2}>
                            <div className="searchButton" onClick={this.btnSearchOnClick.bind(this)}><Button >搜索</Button></div>
                        </Col>
                        
                        <Col span={14}>
                            <RadioGroup
                                onChange={this.onEableRadioChange}
                                value={enableState}
                                className="simple-title-color"
                            >
                                <Radio value={1}>启用</Radio>
                                <Radio value={2}>停用</Radio>
                            </RadioGroup>
                        </Col>

                        <Col span={4}>
                            <ButtonGroup className="add-more">
                                <Button>
                                    <i className="iconfont icon-daochu" />导入
                                </Button>
                                <Button>
                                    <i className="iconfont icon-daoru" />导出
                                </Button>
                            </ButtonGroup>
                            <Button
                                type="primary"
                                className="button_add"
                                onClick={this.onAdd.bind(this)}
                            >
                                <Icon type="plus" />新增
                            </Button>
                        </Col>
                    </Row>
        );
    }
}

const WarpSearchForm = Form.create({

    // onFieldsChange: (props, onChangeFild) => {
    //     //往redux中写值//把值进行更新改变
    //     let { enumData } = props.$$state.toJS();
    //     for (let key in onChangeFild) {
    //         if (key == 'type' ) {
    //             for(let i=0;i<enumData.biztypeList.length;i++){
    //                 if(onChangeFild[key].value.key == enumData.biztypeList[i].key){
    //                     enumData.stageList = enumData.biztypeList[i].stageList;
    //                 }
                    
    //             }
    //         }
    //     }
    //     props.action.saveEnum(enumData);
    // }
})(SearchForm);

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.userlist
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WarpSearchForm);
