
import { Table, Input, Popconfirm, Switch , Icon } from 'antd';

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }

  render() {
    const { value, editable } = this.state;
    return (
      <div>
        {
          editable ?
            <div>
              <Input
                value={value}
                onChange={e => this.handleChange(e)}
              />
            </div>
            :
            <div className="editable-row-text">
              {value.toString() || ' '}
            </div>
        }
      </div>
    );
  }
}

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '名称',
      dataIndex: 'name',
      width: '55%',
      render: (text, record, index) => this.renderColumns(this.state.docDetail, index, 'name', text),
    },{
      title: '状态',
      dataIndex: 'enableState',
      width: '15%',
      render: (text, record, index) => <Switch defaultChecked={record.enableState=='1' ? true :false } checkedChildren={'启'} unCheckedChildren={'停'} onChange={this.onChange.bind(this,text, record, index)}/>
        
    },{
      title: '删除',
      dataIndex: 'deleteState',
      width: '10%',
      render: (text, record, index) => (<Popconfirm title = "确定删除?" onConfirm = { this.onDelete.bind(this, record) }  onCancel = { this.onCancel } okText = "是" cancelText = "否" >
      <a href="#"><Icon type="delete" /></a>
      </Popconfirm>)
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const { editable } = this.state.docDetail[index].name;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.editDone(index, 'save')} style= {{ marginRight: '10px' }}>保存</a>
                  <Popconfirm title="确定取消?" onConfirm={() => this.editDone(index, 'cancel')}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                :
                <span>
                  <a onClick={() => this.edit(index)}><Icon type="edit" /></a>
                </span>
            }
          </div>
        );
      },
    }];

    this.state = {
      docDetail: [],
      deleDetail:[]
    };
  }

  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />);
  }

  handleChange(key, index, value) {
    const { docDetail } = this.state;
    docDetail[index][key].value = value;
    this.setState({ docDetail });
  }

  edit(index) {//编辑明细
    const { docDetail } = this.state;
    Object.keys(docDetail[index]).forEach((item) => {
      if (docDetail[index][item] && typeof docDetail[index][item].editable !== 'undefined') {
        docDetail[index][item].editable = true;
        docDetail[index].editState2= 'update';
      }
    });
    this.setState({ docDetail });
  }

  editDone(index, type) {//编辑明细，确定
    const { docDetail } = this.state;
    Object.keys(docDetail[index]).forEach((item) => {
      if (docDetail[index][item] && typeof docDetail[index][item].editable !== 'undefined') {
        docDetail[index][item].editable = false;
        docDetail[index][item].status = type;
        docDetail[index][item].editState2= 'update';
        docDetail[index].editState2= 'update';
      }
    });
    this.setState({ docDetail }, () => {
      Object.keys(docDetail[index]).forEach((item) => {
        if (docDetail[index][item] && typeof docDetail[index][item].editable !== 'undefined') {
          delete docDetail[index][item].status;
        }
      });
    });  
  }

  add(){//增加明细
    let value = this.input.value;
    if(value=='') return;
    let detail = this.state.docDetail;
    let obj = {
          key:'add'+Math.round(Math.random()*50),
          name: {
            editable: false,
            value: value,
          },
          enableState: {
            value: '1',
          },
          editState1: 'add',
          flag:true,
        }
    detail.push(obj);
    this.input.value = '';  
    this.setState({ docDetail: detail })  
  }

  onChange(text, record, index){//档案明细停启用
    let id = record.key;
    let arr = this.state.docDetail;
    for (let i=0,len=arr.length; i<len; i++){
      if (id==arr[i].id){
        let enableState = arr[i].enableState;
        arr[i].enableState = enableState == 1 ? 2 : 1;
        arr[i].editState = "update"
        break;
      }
    } 
    this.setState({docDetail:arr})
  }

  onCancel(){return}
  onDelete(record){//档案明细删除
    let id = record.key;
    let arr = this.state.docDetail;
    let delArr=this.state.deleDetail;
    for (let i=0,len=arr.length; i<len; i++){
      let cur = arr[i];
      if (id==cur.key){
        if (cur.flag){
          arr.splice(i,1)
          }else {
          cur.editState = "delete"
          delArr.push(cur)
          arr.splice(i,1)
        }        
        break;
      }
    } 
    this.setState({docDetail:arr,deleDetail:delArr})
  }

  getTableData (){//抛出子表state中的数据源 
     return this.state.docDetail.concat(this.state.deleDetail);
  }

  clearState (){//清空子表state中的数据源
    this.setState({ docDetail: [], deleDetail: [] });
  }

  translate (data){//转化数据格式
   let obj = {};
   obj.name = {};
   obj.key = data.id;
   obj.editState = data.editState ? data.editState : 'normal';
   obj.enableState = {};
   obj.name.editable = false;
   obj.name.value = data.name;
   obj.enableState.value = data.enableState;
   return obj
  }

  setTableData(dataSource){ //将store中的数据替换到state中 
    let data = dataSource.sysDocDetailList;
    if (data){
      let arr=[];
      let translate = this.translate;
      for (let i=0,len=data.length; i<len; i++){
      let cur = data[i];
      arr.push(translate(cur))
      }
      this.setState({ docDetail: arr })
    } 
  }

  title(){//档案明细title
    return (
      <div style={{color:'rgba(0,0,0,0.85)',padding:'5px 0', fontSize:'15px' }}>档案明细:</div>
    )} 

  render() {
    const { docDetail } = this.state;
    const dataSource = docDetail.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
    return (
        <div id='doc-table'>
          { 
            this.state.docDetail.length ? 
            <Table 
              title={this.title} 
              dataSource={dataSource} 
              columns={columns} 
              pagination={false} 
              showHeader={false} 
            /> :'' 
          } 
          <div style={{ marginTop:'20px', overflow: 'hidden'}}>
            <input 
              ref={ref => this.input=ref} 
              placeholder='请输入档案明细...' 
              style={{width:'50%', float:'left'}}
            >
            </input>
            <button style={{width:'15%', float:'right'}} onClick={this.add.bind(this)}>添加</button>
          </div>
        </div>
        );
  }
}

