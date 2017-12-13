import { Input, Modal, Tree, Icon } from "antd";

import { org as url } from "api";
import reqwest from "utils/reqwest";
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
import "./index.less";
class Department extends React.Component {
    state = {
        visible: false,
        select: {
            key: "",
            title: ""
        },
        dataSource: []
    };
    constructor(props) {
        super(props);
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
                    <TreeNode title={item.name} key={item.id} path={item.path} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} key={item.id} path={item.path} dataRef={item} />;
        });
    };

    onSelect = (key, e) => {
        let { title,path } = e.node.props;
        this.setState({ select: { key: key[0], title,path } });
    };

    getData = () => {
        let that = this;
      console.log('===================')  
        reqwest(
            {
                url: url.orgTree,
                method: "get",
                data: {}
            },
            dataResult => {
                debugger
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

    aa() {
        return (
            <div className="pepole-refer">
                <div>组织</div>
                <div className="pepole-refer-search">
                    <Search
                        placeholder="请输入关键字"
                        onSearch={value => console.log(value)}
                    />
                </div>
            </div>
        );
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
                <Input
                    value={title}
                    placeholder="请选择..."
                    onClick={this.onClick}
                    suffix={suffix}
                />
                <Modal
                    title={this.aa()}
                    visible={this.state.visible}
                    onOk={this.onOk}
                    onCancel={this.onClose}
                    width={400}
                    closable={false}
                >
                    <div className="add-inset-modal tree-icon" id="tree-icon">
                        <Tree onSelect={this.onSelect} showLine={true}>
                            {this.renderTreeNodes(this.state.dataSource)}
                        </Tree>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Department;
