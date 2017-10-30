import { Form, Row, Col, Input, Select, Button,Modal, Table} from 'antd';
import './index.less';
import {VisitCardTable} from './VisitCardTable';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Search = Input.Search;
const Option = Select.Option;

let cardNum = 1;
let editKey = true;

class Card extends React.Component {

    constructor(props) {
        super(props)

        this.state={
            cardNum : 1,
            visitCardList:[ {taskCardName:'任务卡1',
            taskCardId:1,
            object:'客户',
            type:'重要客户',
            ps:'无'
            },
            {taskCardName:'任务卡2',
            taskCardId:2,
            object:'客户',
            type:'重要客户',
            ps:'无'
            },
            {taskCardName:'任务卡3',
            taskCardId:3,
            object:'客户',
            type:'重要客户',
            ps:'无'
            }
        ],
            visible:false,
            selectedRowKeys:[],
            selectedRows:[],
            disabled:true,
            valueToKey:{},
            keyToValue:{},
            preSelectedRowKeys:[]
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
       
       let data = this.props.dataSource;
       this.props.form.setFieldsValue(data);
        let keys = this.props.form.getFieldValue('keys');
        let i = 0;
        let {valueToKey, keyToValue, visitCardList, selectedRowKeys, selectedRows, preSelectedRowKeys} = this.state;
        //debugger
        //keys.splice(keys.length-1,1);
        keys.forEach((key)=>{
            if(i<keys.length-1){
            valueToKey[data['taskCardId-'+key]]=key;
            keyToValue[key] = data['taskCardId-'+key];
            selectedRowKeys[i] = data['taskCardId-'+key];
            preSelectedRowKeys[i] = data['taskCardId-'+key];
            visitCardList.filter((item)=>{
                if(item.taskCardId === data['taskCardId-'+key]){
                    selectedRows[i] = item;
            }});
            i++;
        }});
     
        this.setState({valueToKey:valueToKey});
        this.setState({keyToValue,keyToValue});
        this.setState({preSelectedRowKeys:preSelectedRowKeys});
        this.setState({selectedRowKeys:selectedRowKeys});
        this.setState({selectedRows:selectedRows});
        
    }

    componentWillMount() {

    }

    onAdd(){
       
        cardNum++;
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const len = keys.length;
        let k = keys[len -1];
        let ss = form.getFieldsValue();
        let name = form.getFieldValue('taskCardName-'+k);
        let id = form.getFieldValue('taskCardId-' + k);
        let order = form.getFieldValue('taskCardOrder-' +k);
        if( (name !== null && name !== undefined && name !=='' )|| (id !== null && id !== undefined
            && id !== '' )|| (order !== null && order !== undefined && order !== '')){
            const nextKeys = keys.concat(cardNum);
            form.setFieldsValue({keys:nextKeys});
            let {disabled} = this.state;
            if(disabled === true){
                this.setState({disabled:false});
            }
    }
        else{
            return ;
        }
       
    }

    onCancel(){
        this.setState({visible:false});
    }

    onDelete(k){    
      
        let {form} = this.props;
        let keys = form.getFieldValue('keys');
        let {keyToValue, valueToKey} =this.state;       
        if(keys.length === 2){return;}
        keys = keys.filter(key =>key !==k);
        let value = keyToValue[k];
        delete keyToValue[k];
        delete valueToKey[value];
       
        form.setFieldsValue({keys: keys});
        if(keys.length ===2){
            this.setState({disabled: true});
        }

        let {selectedRowKeys, selectedRows} = this.state;
        let i = selectedRowKeys.indexOf(value);
        selectedRowKeys.splice(i,1);
        selectedRows.splice(i,1);
        this.setState({selectedRowKeys:selectedRowKeys, selectedRows:selectedRows});
          
    }

    onSave(){

        const {form} = this.props;
        let fvs = form.getFieldsValue();
        let initKeys = form.getFieldValue('keys');
        //let keys = [];
        let {selectedRowKeys, selectedRows, valueToKey, keyToValue, preSelectedRowKeys} = this.state;
        //let selectedLen = selectedRowKeys.length;
        let taskcardIds = [];     
        //let{selectedMap} =this.state;
        for(let value in valueToKey){
            let value = parseInt(value);
            let i = selectedRowKeys.indexOf(value);
            let name = 'taskCardName-'+valueToKey[value];
            let id = 'taskCardId-'+valueToKey[value];
            form.setFieldsValue({[name]:selectedRows[i].taskCardName});
            taskcardIds[valueToKey[value]] = {[id]:value};
           // selectedMap[value];
        }
        form.setFieldsValue({taskCardId:taskcardIds});
    
        let s = form.getFieldsValue();
      
        this.setState({visible:false});  

}

    onSelect = (selectedRowKeys,selectedRows) => {  
        const {form} = this.props;
        let initKeys = form.getFieldValue('keys');           
        let{preSelectedRowKeys,valueToKey, keyToValue} =this.state;
        let preSelected = new Set(preSelectedRowKeys);
        let selected = new Set(selectedRowKeys);
        let diffPre = new Set([...preSelected].filter(x=> !selected.has(x)));
        let diffSel = new Set([...selected].filter(x => !preSelected.has(x)));
        
        if (diffPre !== null && diffPre !== undefined && diffPre !==[]){
            diffPre.forEach((value,key)=>{
                let k = valueToKey[value];
                initKeys = initKeys.filter(key =>key !=k);
                delete valueToKey[value];
                delete keyToValue[k];
                form.setFieldsValue({keys: initKeys});
            });
        }
        this.setState({preSelectedRowKeys : selectedRowKeys});
        if(diffSel !==null && diffSel !== undefined && diffSel !==[]){
       
           diffSel.forEach((value,key) =>{
            valueToKey[value] = cardNum;
            keyToValue[cardNum] = value;
                cardNum++;
                const nextKeys = initKeys.concat(cardNum);
                form.setFieldsValue({keys:nextKeys});
                let {disabled} = this.state;
                if(disabled === true){
                    this.setState({disabled:false});
                }
                //selectedMap[value] = cardNum;
            });
  
  
         }// }
         let state = {
            selectedRowKeys:selectedRowKeys,
            disabled: false,
            selectedRows:selectedRows,
            valueToKey:valueToKey,
            keyToValue:keyToValue,
          
        }
        this.setState(state);
    }

    showTable(){
        this.setState({visible:true});
    }

    render() {
      this.state;
        const {form} = this.props;
        let {selectedRowKeys,selectedRows, preSelectedRowKeys} = this.state;
        const { getFieldDecorator,getFieldValue } = this.props.form;
        getFieldDecorator('keys',{initialValue:[1]});
        let keys = form.getFieldValue('keys');
       if(editKey === true){
           keys = this.props.keys;
           form.setFieldsValue({keys:keys});
           editKey = false;
           cardNum+=keys.length-1;
       }
        
      
        getFieldDecorator('taskCardId',{initialValue:[]});
        getFieldDecorator('id',{initialValue:{}});
       
        const cardItems = keys.map((k, index) => {
            if(k ===1){
                return(
                <Row gutter ={4}>
                <Col span={2}>
                    <Button  size ="large" type = "primary" ghost icon = "plus" onClick={this.onAdd.bind(this)}> </Button>
                </Col >  
                <Col span={18}>  
                   
                        <InputGroup size="large">                             
                            <Col span="7" offset={2}>
                            {getFieldDecorator('taskCardName-'+k, {
                                rules: [{ required: true, message: '请输出名称',}], })
                                (<Search  placeholder='任务卡名称' onClick ={this.showTable.bind(this)}/>)}
                            </Col>
                            <Col span="7">
                            {getFieldDecorator('taskCardOrder-'+k, {
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
                    <Button  disabled ={this.state.disabled} size ="large" type = "primary" ghost icon = "minus" onFocus={() => this.onDelete(k)}> </Button>
                </Col>                                
            </Row> )
                                    } else{
                                        return(    
                                            
                                    <Row gutter ={4}>                      
                                        <Col span={18} offset={2}>  
                                                <InputGroup size="large">                             
                                                    <Col span="7" offset={2}>
                                                    {getFieldDecorator('taskCardName-'+k, {
                                                rules: [{ required: true, message: '请输出名称',}], 
                                            })(
                                                        <Search  placeholder='任务卡名称' onClick ={this.showTable.bind(this)}/>)}
                                                    </Col>
                                                    <Col span="7">
                                                    {getFieldDecorator('taskCardOrder-'+k, {
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
                                            <Button disabled ={this.state.disabled}  size ="large" type = "primary" ghost icon = "minus" onFocus={() => this.onDelete(k)}> </Button>
                                        </Col> 
                                    </Row>  
                                       );                                 
                                    }  
           
                                                      
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
                
                    {cardItems}                          
                </FormItem>               
               
            </Form>            
             <Modal title="任务卡" visible={this.state.visible}  width={500} onOk={this.onSave.bind(this)}
             onCancel = {this.onCancel.bind(this)}>
             <div className='model-height'>
            
             <Table  rowSelection={rowSelection} 
                dataSource={this.state.visitCardList} 
                columns = {this.columns}
                rowKey = {'taskCardId'}/>
             </div>
            </Modal>
            </div>
        )
    }
}

export default Card;