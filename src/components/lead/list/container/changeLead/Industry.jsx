import {
    Modal,
    Cascader,
    Select,
    Form,
    Row,
    Col,
    Input,
    Button,
    Icon,
    Menu,
    Dropdown,
    Tree
} from "antd";

import "assets/stylesheet/all/iconfont.css";

import debounce from "lodash.debounce";
import { baseDir } from "api";
import reqwest from "utils/reqwest";

const confirm = Modal.confirm;
const Search = Input.Search;
const TreeNode = Tree.TreeNode;

import DropDownModal from '../../../../common/DrowdownModal'

export default class Industry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, //整个下拉面板显示控制
            industryData: [], //获取树数据
            select: {}, //选择面板选择出的行业
            selectKeys: [], //存放选择面板已选择的keys
            value:'',//下拉面板中的searchvalue
        };
    }

    //获取树的数据
    getIndustry(flag) {
        
        //这里需要Request请求
        if (!flag) {
            this.setState(
                {
                    visible: false,
                    selectKeys: [],
                    keyDownVisiable: false
                },
                () => {
                    if (!this.state.select.id) {
                        this.props.onChange({});
                    }
                }
            );
        } else {
            
            reqwest(
                {
                    url: baseDir + "/base/industrys/reftree",
                    method: "GET"
                },
                data => {
                    
                    this.setState({
                        visible: flag,
                        industryData: data.data,
                        keyDownVisiable: false
                    });
                }
            );
        }
    }

    //选中某一个树节点触发的方法
    treeSelect(selectedKeys, selectArrays) {
        if (selectedKeys.length) {
            this.setState({
                select: {
                    name: selectArrays.node.props.title,
                    id: selectArrays.node.props.eventKey
                },
                selectKeys: selectedKeys,
            });
        } else {
            this.setState({
                selectKeys: selectedKeys,
                select: ''
            });
        }
    }


    //点击确定按钮触发的方法
    onOk() {
        if (this.props.onChange) {
            this.props.onChange(this.state.select);
            this.setState({
                visible: false,
                keyDownVisiable: false,
                selectKeys: []
            });
        }
    }

    //点击取消按钮触发的方法
    onCancel() {
        if (this.props.onChange) {
            this.setState({
                visible: false,
                keyDownVisiable: false,
                selectKeys: []
            });
        }
    }

    //清空input数据
    emitEmpty() {
        if (this.props.onChange) {
            //关闭全部的时候 两个面板都应该改关闭
            this.setState(
                {
                    keyDownVisiable: false,
                    visible: false,
                    industryDataSearch: []
                },
                () => {
                    this.props.onChange({});
                }
            );
        }
    }

    //下拉面板onSearch
    onDropDownSearch(){
        
        this.state.value
    }
    
    onDropDownChange(value){
        this.setState({
            value
        })
    }

    //下拉时显示的面板布局
    createTree() {
        const loop = data =>
            data.map(item => {
                if (item.children && item.children.length) {
                    return (
                        <TreeNode key={item.id} title={item.name}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode key={item.id} title={item.name} />;
            });
            let suffix = <Icon type="close"/> 

        return (
            <DropDownModal 
                title='行业' 
                onCancel={this.onCancel.bind(this)}  
                onOk={this.onOk.bind(this)} 
                onSearch = {this.onDropDownSearch.bind(this)}
                value = {this.state.value}
                onChange = {this.onDropDownChange.bind(this)}
                width = {400}
                height= {380}
            >
                <Tree
                    className="reference-tree"
                    onSelect={this.treeSelect.bind(this)}
                    selectedKeys={this.state.selectKeys}
                >
                    {loop(this.state.industryData)}
                </Tree>
            </DropDownModal>
        );
    }

    render() {
        let suffix =
            this.props.value && this.props.value.name ? (
                <Icon type="close" onClick={this.emitEmpty.bind(this)}/>
            ) : null;

        return (
            <div>
                {
                    this.props.disabled?
                    <Input value={this.props.value ? this.props.value.name : ""}/>:
                    <Dropdown
                        overlay={this.createTree()} //生成下拉结构样式
                        trigger={["click"]}
                        onVisibleChange={this.getIndustry.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                        visible={this.state.visible} //受控面板显示
                    >
                        <Search
                            placeholder="行业"
                            onSearch={this.getIndustry.bind(this, true)}
                            value={this.props.value ? this.props.value.name : ""}
                            suffix={suffix}
                        />
                    </Dropdown>
                }
            </div>
            
        );
    }
}






<Row className="clue-customer">
<Row style={{ marginBottom: '5px' }}>
    <Col span={24}>
        <i className="iconfont icon-zhuanhuadekehu" />
        <span sytle={{ color: '#333333' }}>转化的客户</span>
    </Col>
</Row>


{editData&&editData.related &&editData.related.customers?
    <Row>
        <Row style={{ marginLeft: '21px', marginBottom: '5px' }}>

            <Col span={12} >
                <div>{editData.related.customers.name?editData.related.customers.name: ''}</div>
            </Col>

            <Col span={12} style={{ textAlign: 'right', color: '#F1B941' }}>
                {/* <div>3天未跟进</div> */}
            </Col>

        </Row>
        <Row style={{ marginLeft: '21px', color: '#999999', marginBottom: '5px' }}>
            <Col span={12}>
                <div>{editData.related.customers.address? editData.related.customers.address : ''}</div>
            </Col>
            <Col span={12} style={{ textAlign: 'right', color: '#999999' }}>
                <div>{editData.related.customers && editData.related.customers.ownerUserName && ownerUserName.length && ownerUserName[0].ownerUserName ? ownerUserName[0].ownerUserName : ''}</div>
            </Col>
        </Row>
        <Row style={{ marginLeft: '21px', color: '#999999', marginBottom: '5px' }}>
            <Col span={10}>
                <div>{editData.related.customers.levelName?editData.related.customers.levelName : ''}</div>
            </Col>

        </Row>
    </Row> : <div style={{ marginLeft: '21px' }}>暂无数据</div>}
</Row>






<Row className="clue-contast">
<Row style={{ marginBottom: '5px' }}>
    <Col span={24}>
        <i className="iconfont icon-lianxiren-daixuan" />
        <span sytle={{ color: '#333333' }}>转化的联系人</span>
    </Col>
</Row>
{relData &&relData.contacts ?
    <Row>
        {relData.contacts && relData.contacts.ownerUserInfo ?
            <Row style={{ marginLeft: '21px', marginBottom: '5px' }}>

                <Col span={12} >
                    <div>{relData.contacts.ownerUserInfo}</div>
                </Col>

                {/* <Col span={12} style={{ textAlign: 'right', color: '#F1B941' }}>
                <div>3天未跟进</div>
            </Col> */}

            </Row> : ''}
        {relData.contacts&& relData.contacts.customerInfo ?
            <Row style={{ marginLeft: '21px', color: '#999999', marginBottom: '5px' }}>
                <Col span={12}>
                    <div>{relData.contacts.customerInfo}</div>
                </Col>

            </Row> : ''}
        <Row style={{ marginLeft: '21px', color: '#999999', marginBottom: '5px' }}>
            <Col span={10}>
                <div>{relData.contacts && relData.contacts.postName ?relData.contacts.postName : ''}</div>
            </Col>

        </Row>
    </Row> : <div style={{ marginLeft: '21px' }}>暂无数据</div>}
</Row>