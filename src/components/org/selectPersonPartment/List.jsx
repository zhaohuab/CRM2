import React from 'react';
import { Checkbox} from 'antd';
import PropTypes from 'prop-types';
import './list.less'
export default class List extends React.Component {
    constructor(props){
        super(props);
    }
    change(e){
        let index=e.target.keyIndex;

        let target = null
        if(this.props.personSingle){
            for(let i=0;i<this.props.selected.length;i++){
                if(i===index){
                    this.props.selected[i].check=e.target.checked;
                }else{
                    this.props.selected[i].check=false
                }
            }
        }else{
            //循环判断点击那个改变
            for(let i=0;i<this.props.selected.length;i++){
                if(i===index){
                    this.props.selected[i].check=e.target.checked;
                    target = this.props.selected[i]
                    break;
                }
            }

            //判断所有选项是否为全选或者不全选
            let flag=true;
            for(let i=0;i<this.props.selected.length;i++){
                if(this.props.selected[i].check===false){
                    flag=false
                    break;
                }
            }
        }

       this.props.onSelect(this.props.selected,target)
    }

    changeAll(e){
        if(e.target.checked){
            for(let i=0;i<this.props.selected.length;i++){
                this.props.selected[i].check=true;
            }
        }else{
            for(let i=0;i<this.props.selected.length;i++){
                this.props.selected[i].check=false;
            }
        }
        this.props.onSelect(this.props.selected,e.target.checked)
    }


    render() {
        let {dataSource} = this.props;
        let a=this.props.selected.every((item)=>{
            return item.check==true
        })
        return (
            <div className="person-list">

                {
                    !this.props.personSingle?
                    <p className="person-list-p">
                        <Checkbox onChange={this.changeAll.bind(this)} checked={a}/>
                        <span className="all">全选</span>
                    </p>
                    :null
                }
                <ul>
                {
                    dataSource?
                    dataSource.map((item,index)=>{
                       return(
                           <li key={index}>
                               <Checkbox className='licheck'
                                   onChange={this.change.bind(this)}
                                   value={item.name}
                                   checked={this.props.selected[index].check}
                                   keyIndex={index}
                               />
                               <img src={item.photo}/>
                               <span className="list-span">{item.name}</span>

                           </li>
                       )
                    }) :
                    null
                }
                </ul>
            </div>
        )
    }
}

List.defaultProps={
    data:[],
    selected:[],
    onSelect:()=>{},
    personSingle:false,
}

List.PropTypes={
    data:PropTypes.array.isRequired,
    selected:PropTypes.array.isRequired,
    onSelect:PropTypes.func.isRequired,
    personSingle:PropTypes.bool.isRequired
}