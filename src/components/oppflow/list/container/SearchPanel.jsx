


import { Form, Input, Select, Row, Col, Card as AntdCard } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from "../action"

const FormItem = Form.Item;
const Option = Select.Option;
class SearchPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // let data = this.props.$$state.get("editData").toJS();
        // if(data.oppdimension==undefined){
        //     data.oppdimension = [] ;
        // }
        // if(data.oppstage==undefined){
        //     data.oppstage = [] ;
        // }
        // this.props.form.setFieldsValue(data);
    }


    btnSearch(){
        const searchMap =this.props.form.getFieldsValue()
        this.props.action.getListData(searchMap);
    }

    render() {
        
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

  
        return (
            
          <Form layout="inline" >
            <Row type="flex" align="middle" style={{ height: "54px" }}>
              <Col span={4}>
                <FormItem >
                  {getFieldDecorator("searchKey", {})(
                    <Input type="text" placeholder="流程名称" />
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
                <div onClick={this.btnSearch.bind(this)}>搜索</div>
              </Col>
            </Row>

          </Form>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.oppflowList
    }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);