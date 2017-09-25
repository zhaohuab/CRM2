import  React, { Component } from 'react';
import { Table, Icon,Button ,Form,  Input,  Checkbox,Col,DatePicker,message,Modal,Spin ,Tree} from 'antd';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const confirm = Modal.confirm;
import './index.less'


export default class ListTree extends Component {
    constructor(props){
        super(props)
        this.state={
            edit:''
        }
    }
    onSelect(selectedKeys,obj){
        this.props.onSelect(selectedKeys,obj)  
    }

    edit(item,e){
        e.stopPropagation()
        this.props.edit(item.id)
    }

    add(item,e){
        e.stopPropagation()
        this.props.add(item.id)
    }

    delete(item,e){
        e.stopPropagation()

        let that =this
        confirm({
        title: '确定要删除吗?',
        content: '此操作不可逆',
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {
            that.props.delete(item)
        },
        onCancel() {
        console.log('Cancel');
        },
     });
    }
    showEdit(item){
        this.setState({
            edit:item.id
        })
    }

    getCustomTitle(item){
        return(
            <span className='show-edit-warpper'>
                <span title={item.name} className='show-edit-title' onClick={this.showEdit.bind(this,item)}>{item.name}</span>
                <span className={this.state.edit == item.id?'show-edit-inner':'show-edit-inner-hide'}>
                    <span><Icon type="plus-circle-o" onClick={this.add.bind(this,item)}/></span>
                    <span><Icon type="minus-circle-o"  onClick={this.delete.bind(this,item)}/></span>
                    <span><Icon type="edit"  onClick={this.edit.bind(this,item)}/></span>
                </span>
            </span>
        )
    }
    render(){
        const loop = data => data.map((item) => {
            if (item.children && item.children.length) {
              return (
                 <TreeNode key={item.id} title={this.getCustomTitle(item)}>
                    {loop(item.children)}
                 </TreeNode>
              );
            }
            return <TreeNode key={item.id} title={this.getCustomTitle(item) }/>;
        });
        let {data} = this.props
        return(
            <div>
                {
                    data.length? 
                    <div>
                        <div className='org-tree-top'>
                            <Search placeholder="请输入关键字" onChange={this.onChange} />
                        </div>
                        <div className='org-tree-main'>
                            <Tree
                                showLine
                                defaultExpandedKeys={['1015']}
                                onSelect={this.onSelect.bind(this)}
                            >
                                {loop(data)}
                            </Tree>
                        </div>
                    </div>:''
                }
            </div>
        )
    }
}