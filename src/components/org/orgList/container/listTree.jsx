import  React, { Component } from 'react';
import { Table, Icon,Button ,Form,  Input,  Checkbox,Col,DatePicker,message,Modal,Spin ,Tree} from 'antd';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

import './index.less'


export default class ListTree extends Component {
    onSelect(selectedKeys,obj){
        this.props.onSelect(selectedKeys,obj)
    }

    edit(item,e){
        e.stopPropagation()
        this.props.edit(item.id)
    }

    add(item,e){
        e.stopPropagation()
        this.props.edit(item.id)
    }

    delete(item,e){
        e.stopPropagation()
        this.props.edit(item.id)
    }

    getCustomTitle(item){
        return(
            <span className='show-edit-warpper'>
                <span>{item.name}</span>
                <span className='show-edit-inner'>
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
                        <Search placeholder="Search" onChange={this.onChange}/>
                        <Tree
                            showLine
                            defaultExpandedKeys={['1015']}
                            onSelect={this.onSelect.bind(this)}
                        >
                            {loop(data)}
                        </Tree>
                    </div>:''
                }
            </div>
        )
    }
}