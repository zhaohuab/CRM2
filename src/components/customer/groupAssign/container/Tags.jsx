import {
    Modal,
    Select,
    Row,
    Col,
    Input,
    Button,
    Icon,
    Dropdown,
    Tree,
    Checkbox
} from "antd";
const TreeNode = Tree.TreeNode;


export default class Tags extends React.Component {
    checkedFn(item){
        this.props.value.map((tag)=>{
            if(tag.id == item.id){
                tag.checked = !tag.checked
                return item
            }
            return item
        })
        this.props.onChange(this.props.value)
    }

    render(){
        let value = this.props.value;
 
        return(
            <Row type='flex' gutter={15} align='middle' className='tags-container'>
                {
                    this.props.value && this.props.value.length?
                    this.props.value.map((item)=>{
                        debugger;
                        return(
                            item.enableState==1?
                            <div className={item.checked?'tags-item tags-item-show':'tags-item tags-item-hide'} onClick={this.checkedFn.bind(this,item)}>
                                {item.name}
                                <i className="iconfont icon-xuanzhong"/>
                            </div>:''
                        )
                    }):''
                }
            </Row>
        )
    }
}