import { Input, Modal, Tree, Icon, Tabs } from "antd";
import { org as url } from "api";
import reqwest from "utils/reqwest";
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
import "./index.less";
class Department extends React.Component {
    state = {
        visible: false,
        select: {
            key: "",
            title: ""
        },
        dataSource: [],
    };
    constructor(props) {
        super(props);
    this.data=[
            {
                name:'张旭',
                phone:13012345678,
                email:'zhang@yonyou.com'
            },{
                name:'张丽',
                phone:13112345678,
                email:'zhang@yonyou.com'
            },{
                name:'张楠',
                phone:13212345678,
                email:'zhang@yonyou.com'
            },{
                name:'张婷',
                phone:13312345678,
                email:'zhang@yonyou.com'
            },{
                name:'陈瑶',
                phone:13412345678,
                email:'zhang@yonyou.com'
            },{
                name:'莎其热',
                phone:13512345678,
                email:'zhang@yonyou.com'
            },
        ]
        }
    onClick = () => {
        this.setState({ visible: true });
        this.getData();
    };
    onOk = () => {
        this.setState({ visible: false });
        this.triggerChange(this.state.select);
    };
    onClose = () => {
        this.setState({ visible: false });
    };
    renderTreeNodes = data => {
        return data.map(item => {
            if (item.children && item.children.length) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} key={item.id} dataRef={item} />;
        });
    };

    onSelect = (key, e) => {
        let { title } = e.node.props;
        this.setState({ select: { key: key[0], title } });
    };

    getData = () => {
        let that = this;
        reqwest(
            {
                url: url.orgTree,
                method: "get",
                data: {}
            },
            dataResult => {
                that.setState({ dataSource: dataResult.data });
            }
        );
    };

    triggerChange = changedValue => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue);
        }
    };

    emitEmpty = () => {
        this.setState({ select: { key: "", title: "" } }, () => {
            this.triggerChange(this.state.select);
        });
    };

    getTitle = () => {
        return (
            <div className="pepole-refer">
                <span>通讯录</span>
               
                    <Search
                        placeholder="请输入关键字"
                        onSearch={value => console.log(value)}
                        style={{marginLeft:'10px', width:'60%'}}
                    />
            
            </div>
        );
    }

    getDepartment= () => {
        return this.data.map(item => (
            <li style={{marginTop:'20px'}}>
                <Icon type="usergroup-delete" style={{display:'inline-block',verticalAlign:'middle',marginRight:'20px'}}/>
                <div style={{display:'inline-block', verticalAlign:'middle'}}>
                    <p>{item.name}</p>
                    <p><span style={{marginRight:'10px'}}>电话</span>{item.phone}</p>
                    <p><span style={{marginRight:'10px'}}>email</span>{item.email}</p>
                </div>
                <Icon type="aliwangwang-o" style={{display:'inline-block',verticalAlign:'middle',marginLeft:'60px'}}/>
            </li>
        ))
    }

    render() {
        let key = "",
            title = "";
        if (this.props.value) {
            key = this.props.value.key;
            title = this.props.value.title;
            console.log('title============',title)
        }
        const suffix =
            this.props.value && this.props.value.key ? (
                <Icon type="close" onClick={this.emitEmpty} />
            ) : null;

        return (
            <div>
                {/* <Input value={key}/> */}
                <div onClick={this.onClick}>通讯录</div>
                <Modal
                    title={this.getTitle()}
                    visible={this.state.visible}
                    onOk={this.onOk}
                    onCancel={this.onClose}
                    width={300}
                    mask={false}
                    footer={null}
                    wrapClassName='modal'
                    style={{position: 'absolute', right: '10px',top: '20px',height:'300px'}}
                >
                 <Tabs defaultActiveKey="1" onChange={()=>console.log('Tabs')} animated={false}>
                    <TabPane tab="部门" key="1"> 
                        <ul>
                            {this.getDepartment.call(this)}
                        </ul>
                    </TabPane>
                    <TabPane tab="组织结构" key="2">
                        <div className="add-inset-modal tree-icon" id="tree-icon">
                            <Tree onSelect={this.onSelect} showLine={true}>
                                {this.renderTreeNodes(this.state.dataSource)}
                            </Tree>
                        </div>
                    </TabPane>
                </Tabs>
                   
                </Modal>
            </div>
        );
    }
}

export default Department;
