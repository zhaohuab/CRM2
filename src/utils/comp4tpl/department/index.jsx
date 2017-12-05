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
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} key={item.id} dataRef={item}/>;
        });
    };

    onSelect = (key, e) => {
        let data = e.selectedNodes[0].props.dataRef;
        this.setState({ select: data  });
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
        const mapper = this.props.mapper;
        if (onChange) {
            onChange({value:changedValue,mapper});
        }
    };

    emitEmpty = () => {
        this.triggerChange({});
    };

    getTitle() {
        return (
            <div className="pepole-refer">
                <div>组织</div>
                <div className="pepole-refer-search">
                    <Search
                        placeholder="请输入关键字"
                    />
                </div>
            </div>
        );
    }
    render() {
        
        const suffix =
            this.props.value  ? (
                <Icon type="close" onClick={this.emitEmpty} />
            ) : null;

        return (
            <div>
                {/* <Input value={key}/> */}
                <Input
                    value={this.props.value}
                    placeholder="请选择..."
                    onClick={this.onClick}
                    suffix={suffix}
                />
                <Modal
                    title={this.getTitle()}
                    visible={this.state.visible}
                    onOk={this.onOk}
                    onCancel={this.onClose}
                    width={400}
                    closable={false}
                    maskClosable={false}
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
