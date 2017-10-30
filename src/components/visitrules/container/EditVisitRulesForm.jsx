import { Form, Row, Col, Input, Select, Button,Modal, Table} from 'antd';
import './index.less';
import {VisitCardTable} from './VisitCardTable';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Search = Input.Search;
const Option = Select.Option;

let cardNum = 0;

class Card extends React.Component {

    constructor(props) {
        super(props)

        this.state={
            cardNum : 1,
            visitCardList:[ {taskCardName:'任务卡1',
            taskCardId:'1001',
            object:'客户',
            type:'重要客户',
            ps:'无'
            },
            {taskCardName:'任务卡2',
            taskCardId:'1002',
            object:'客户',
            type:'重要客户',
            ps:'无'
            },
            {taskCardName:'任务卡3',
            taskCardId:'1003',
            object:'客户',
            type:'重要客户',
            ps:'无'
            }
        ],
            visible:false,
            selectedRowKeys:[],
            selectedRows:[]
        }

        this.columns=[
            {
                title: '序号',
                dataIndex: 'order',
                render:(text, record, index) =>{
                    return <span>{index+1}</span>
                }   
            },
            {
                title: '任务卡名称',
                dataIndex: 'taskCardName',
            },
            {
                title: '业务对象',
                dataIndex: 'object',
            },
            {
                title: '业务类型',
                dataIndex: 'type',
            },
            {
                title: '备注',
                dataIndex: 'ps',
            },
        ]
        
    }
    
    componentDidMount() {
    debugger
       this.props.form.setFieldsValue(this.props.dataSource);

    }

    componentWillMount() {

    }

    onAdd(){
        cardNum++;
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(cardNum);
        form.setFieldsValue({keys:nextKeys});
    }

    onDelete(k){
        
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        let i = keys.indexOf(k);
        if(keys.length === 0){return;}
        form.setFieldsValue({keys: keys.filter(key =>key !==k),});
        let {selectedRowKeys, selectedRows} = this.state;
        selectedRowKeys.splice(i+1,1);
        selectedRows.splice(i+1,1);
        this.setState({selectedRowKeys:selectedRowKeys, selectedRows:selectedRows});
    }

    onSave(){
       debugger
        const {form} = this.props;
        let keys = form.getFieldValue('keys');
        let {selectedRowKeys, selectedRows} = this.state;
        let selectedlen = selectedRowKeys.length;
        let names1 = form.getFieldsValue();
        let taskcardIds = [];
        if(selectedlen === 0 && keys.length === 0){
            form.setFieldsValue({keys:[],});
            form.setFieldsValue({taskCardsName:""});
            taskcardIds =[];
        }else{
           
            if(form.getFieldValue(taskCardsName) !== null || form.getFieldValue(taskCardsName) !== undefined
                || form.getFieldValue(taskCardsName) !== ''){
                    form.setFieldsValue({taskCardsName:selectedRows[0].taskCardName});
                    taskcardIds[0] = {taskCardsId:selectedRows[0].taskCardId};
                    for(let i=0;i<selectedlen-1;i++){
                        let k = keys[i];
                        let name = 'taskCardsName-'+k
                        let id = 'taskCardsId-'+k
                        form.setFieldsValue({[name]:selectedRows[i+1].taskCardName});
                        taskcardIds[i+1] = {[id]:selectedRows[i+1].taskCardId};
                    }
            }
            
          
        }
        form.setFieldsValue({taskCardId:taskcardIds});        
        this.setState({visible:false});
        let names2 = form.getFieldsValue();
    }

    onSelect = (selectedRowKeys,selectedRows) => {     
                    
         const {form} = this.props;
         const keys = form.getFieldValue('keys');
         //const originLen = this.props.listLen;
        
         if(keys.length < selectedRowKeys.length ){
             const diff = selectedRowKeys.length-keys.length;
             for(let i=0;i<diff-1;i++){
                 cardNum++;
                 const keys = form.getFieldValue('keys');
                 const nextKeys = keys.concat(cardNum);
                 form.setFieldsValue({keys:nextKeys});
             }            
         }
         let state = {
            selectedRowKeys:selectedRowKeys
        }
       
        this.setState({selectedRows:selectedRows});
       
        this.setState(state);
    }

    showTable(){
        this.setState({visible:true});
    }

    render() {
        const {form} = this.props;
        const { getFieldDecorator,getFieldValue } = this.props.form;
        getFieldDecorator('keys',{initialValue:[]});
        let keys = [];
        if(this.props.keys.length == 0){
           keys = form.getFieldValue('keys');
        }else{
            keys = this.props.keys;
        }
        getFieldDecorator('taskCardId',{initialValue:[]});
        let {selectedRowKeys} = this.state;

        const cardItems = keys.map((k, index) => {
           
                return(                
                    <Row gutter ={4}>                      
                        <Col span={18} offset={2}>  
                                <InputGroup size="large">                             
                                    <Col span="7" offset={2}>
                                    {getFieldDecorator('taskCardsName-'+k, {
                                rules: [{ required: true, message: '请输出名称',}], 
                            })(
                                        <Search  placeholder='任务卡名称' onClick ={this.showTable.bind(this)}/>)}
                                    </Col>
                                    <Col span="7">
                                    {getFieldDecorator('taskCardsOrder-'+k, {
                                        rules: [{ required: true, message: '请输出名称',}], })
                                        ( <Input  placeholder='显示顺序'/>)}
                                       
                                    </Col>
                                    <Col span="6">
                                    {getFieldDecorator('isRequired-'+k, {
                                        rules: [{ required: true, message: '请输出名称',}], })
                                        (  <Select placeholder = "是否必输">
                                            <Option value = {1}>是</Option>
                                            <Option value = {2}>否</Option>
                                        </Select>)}
                                       
                                    </Col>
                                </InputGroup>
                            
                        </Col>
                        <Col span={1}>
                            <Button  size ="large" type = "primary" ghost icon = "minus" onFocus={() => this.onDelete(k)}> </Button>
                        </Col> 
                    </Row>  
                       );                                                          
        });

        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelect.bind(this),
        };


        return ( 
            <div>       
            <Form layout ="vertical">                                 
                <FormItem label="拜访规则名称：" >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输入',
                        }],
                    })(
                        <Input placeholder='请输入'/>
                    )}
                </FormItem>
                <FormItem label="所属组织：" >
                    {getFieldDecorator('orgName', {
                        rules: [{
                            required: true,
                        }],
                    })(
                        <Search />
                    )}
                </FormItem>
                <FormItem label="参考指标：" >
                    {getFieldDecorator('refIndexName', {
                        rules: [{
                            required: true,
                        }],
                    })(
                        <Search placeholder='请输入'/>
                    )}
                </FormItem>
                <FormItem label="客户等级："  >
                    {getFieldDecorator('cumEnumValueName', {
                        rules: [{
                            required: true, message: '请输出名称',
                        }],
                    })(
                        <Search placeholder='请输入'/>
                    )}
                </FormItem>
                <FormItem label="任务卡："  >
                {getFieldDecorator('taskList', {
                        rules: [{
                            required: true, message: '请输出名称',
                        }],
                    })
                    (<Row gutter ={4}>
                        <Col span={2}>
                            <Button  size ="large" type = "primary" ghost icon = "plus" onClick={this.onAdd.bind(this)}> </Button>
                        </Col >  
                        <Col span={18}>  
                           
                                <InputGroup size="large">                             
                                    <Col span="7" offset={2}>
                                    {getFieldDecorator('taskCardsName', {
                                        rules: [{ required: true, message: '请输出名称',}], })
                                        (<Search  placeholder='任务卡名称' onClick ={this.showTable.bind(this)}/>)}
                                    </Col>
                                    <Col span="7">
                                    {getFieldDecorator('taskCardsOrder', {
                                        rules: [{ required: true, message: '请输出名称',}], })
                                        ( <Input  placeholder='显示顺序'/>)}
                                       
                                    </Col>
                                    <Col span="6">
                                    {getFieldDecorator('isRequired', {
                                        rules: [{ required: true, message: '请输出名称',}], })
                                        (  <Select placeholder = "是否必输">
                                            <Option value = {1}>是</Option>
                                            <Option value = {2}>否</Option>
                                        </Select>)}
                                       
                                    </Col>
                                </InputGroup>                           
                        </Col>  
                        <Col span={1}>
                            <Button  size ="large" type = "primary" ghost icon = "minus" onFocus={() => this.onDelete(k)}> </Button>
                        </Col>                                            
                    </Row> )}  
                    {cardItems}                          
                </FormItem>                              
            </Form>            
             <Modal title="任务卡" visible={this.state.visible}  width={500} onOk={this.onSave.bind(this)}>
             <div className='model-height'>
            
             <Table  rowSelection={rowSelection} 
                dataSource={this.state.visitCardList} 
                columns = {this.columns}/>
             </div>
            </Modal>
            </div>
        )
    }
}

export default Card;