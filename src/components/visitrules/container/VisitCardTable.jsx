import { Input,Table } from 'antd';

class VisitCardTable extends React.Component {
    constructor(props){
        super(props)

        this.state = {    
            selectedRowKeys : [],        
        },      

        this.columns = [{
            title: '显示顺序',
            dataIndex: 'genderName',
            render: ()=><Input placeholder="01"/>
            },
            {
            title: '是否必输',
            dataIndex: 'orgName',
            render: (text, record, index) => <Input value={text} onChange={(e) => this.handleChange(e, index, 'orgName')}></Input>
        }]
    }

    onSelect = (selectedRowKeys,selectedRows) => {
       
        let state = {
            selectedRowKeys:selectedRowKeys
        }
        if(selectedRowKeys.length >0){
            this.props.onSave(selectedRows);
        }
        this.setState({selectedRowKeys});
    }

    handleChange(e, index, key){
      
        let data = this.props.data;
        data[index][key] =  e.target.value;
        this.props.onChange(data);
    }

    render(){
       
        let {selectedRowKeys} = this.state;
        let rowSelection = {
          selectedRowKeys,
          onChange: this.onSelect.bind(this),
        };
        return (
            <div >
                <Table  size="middle" 
                rowSelection={rowSelection} 
                dataSource={this.props.data} 
                columns = {this.columns}/>
            </div> 
        )
    }    
}

export {VisitCardTable};