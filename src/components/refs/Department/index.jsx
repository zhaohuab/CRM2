import { Input,Modal,Tree } from 'antd';

import { org as url } from 'api'
import reqwest from 'utils/reqwest'
const TreeNode = Tree.TreeNode;
class Department extends React.Component {
   
    state = {
        visible : false,
        select : {
            key:"",
            title:"",
        },
        dataSource : [],
    }
    constructor(props) {
        super(props);
      }
    onClick = () => {
        this.setState({visible : true});
        this.getData();
    }
    onOk = () => {
        this.setState({visible : false});
        this.triggerChange(this.state.select);
    }
    onClose = () => {
        this.setState({visible : false});
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }
    onSelect = (key,e) => {
        
        let {title} = e.node.props;
        this.setState({select:{key:key[0],title}});
    }
    getData = () => {
        let that = this;
        reqwest({
            url: url.orgTree,
            method:'get',
            data:{}
        })
        .then(function (dataResult){
            that.setState({dataSource:dataResult.data});
        })
        .fail(function (err, msg) {
        }) 
    }
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue);
        }
    }
    render() {
        let key="",title="";
        if(this.props.value) {
            key = this.props.value.key;
            title = this.props.value.title;
        }
        return (
            <div>
                {/* <Input value={key}/> */}
                <Input value={title}/>
                <div onClick={this.onClick}>
                    点我出弹窗
                </div>
                <Modal
                    title="部门参照"
                    visible={this.state.visible}
                    onOk={this.onOk}
                    onCancel={this.onClose}
                >
                    <Tree   
                        onSelect={this.onSelect}
                    >
                    {this.renderTreeNodes(this.state.dataSource)}
                    </Tree>
                </Modal>
            </div>
        );
    }
}

export default Department