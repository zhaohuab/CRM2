import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Icon, Button, Form, Input, Checkbox, Row, Col, DatePicker, message, Modal, Spin, Tree, Card, Collapse, Radio } from 'antd';
const Panel = Collapse.Panel;
import * as roleActions from "../action"
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const confirm = Modal.confirm;
import './index.less'


class FuncTree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: ''
        }
    }
    onSelect(selectedKeys, obj) {
        this.props.onSelect(selectedKeys, obj)
    }

    edit(item, e) {
        e.stopPropagation()
        this.props.edit(item.id)
    }

    add(item, e) {
        e.stopPropagation()
        this.props.add(item)
    }

    delete(item, e) {
        e.stopPropagation()

        let that = this
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
    showEdit(item) {
        this.setState({
            edit: item.id
        })
    }

    getCustomTitle(item) {
        return (
            <span className='show-edit-warpper'>
                <span title={item.name} className='show-edit-title' onClick={this.showEdit.bind(this, item)}>{item.name}</span>
            </span>
        )
    }

    hideOnClick() {
        const code = '.class2{border:1px solid #333; display:none;}'

        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.appendChild(document.createTextNode(code));
        head.appendChild(style);
        return style.sheet || style.styleSheet;
    }

    selectFunc(funcId, checked) {

        if (checked == "T") {
            checked = "F"
        } else {
            checked = "T"
        }
        const roleId = this.props.$$state.get("selectedRoleId");
        const funcData = this.props.$$state.get("funcData").toJS();
        let flag = false;
        for (let i = 0; i < funcData.length; i++) {
            let child = funcData[i].child
            for (let j = 0; j < child.length; j++) {
                if (child[j].id == funcId) {
                    funcData[i].child[j].checked = checked;
                    flag = true;
                    break;
                }
            }
            if (flag) {
                break;
            }
        }
        const funcIds = [];
        funcIds.push(funcId);
        this.props.action.selectFunc(roleId, funcIds, checked, funcData)
    }

    selectAllFunc(groupId, checked, e) {
        e.stopPropagation();
        const roleId = this.props.$$state.get("selectedRoleId");
        const funcData = this.props.$$state.get("funcData").toJS();
        const funcIds = [];
        //当前不全选时点击全选
        if (!checked) {
            for (let i = 0; i < funcData.length; i++) {
                if (funcData[i].id == groupId) {
                    let child = funcData[i].child;
                    for (let j = 0; j < child.length; j++) {
                        if (funcData[i].child[j].checked == 'F') {
                            funcIds.push(funcData[i].child[j].id);
                        }
                        funcData[i].child[j].checked = "T";
                    }
                    break;
                }

            }
            this.props.action.selectFunc(roleId, funcIds, "T", funcData)
        } else {
            for (let i = 0; i < funcData.length; i++) {
                if (funcData[i].id == groupId) {
                    let child = funcData[i].child;
                    for (let j = 0; j < child.length; j++) {
                        funcIds.push(funcData[i].child[j].id);
                        funcData[i].child[j].checked = "F";
                    }
                    break;
                }
            }
            this.props.action.selectFunc(roleId, funcIds, "F", funcData)
        }

    }

    render() {
        let selectedRoleIsPreseted = this.props.$$state.get("selectedRoleIsPreseted");
        const showGroup = data => data.map((item, index) => {
            let flag = true;
            if (item.child) {
                for (let i = 0; i < item.child.length; i++) {
                    if (item.child[i].checked == 'F') {
                        flag = false;
                        break;
                    }
                }
            }

            const header = (
                <div>
                    <Row>
                        <Col span={20}>{item.name}</Col>
                        {selectedRoleIsPreseted == 1 ?
                            <div>
                                <Col span={4}><Checkbox disabled checked={flag} />全选</Col>
                            </div>
                            :
                            <div onClick={this.selectAllFunc.bind(this, item.id, flag)}>
                                <Col span={4}><Checkbox checked={flag} />全选</Col>
                            </div>
                        }
                    </Row>
                </div>
            );
            return (
                <Panel header={header} key={index} >
                    <Row
                        className="func-panel-row"
                    >{showChild(item.child)}</Row>
                </Panel>
            );
        });
        const showChild = data => data.map((item) => {
            return (
                <div>
                    {selectedRoleIsPreseted == 1 ?
                        <div  >
                            <Col span={6}>
                                <Col span={4}><Checkbox disabled checked={item.checked == 'T' ? true : false} /></Col>
                                {item.name}
                            </Col>
                        </div>
                        :
                        
                            <Col span={6}>
                            <span  onClick={this.selectFunc.bind(this, item.id, item.checked)}>
                                <Col span={4}><Checkbox checked={item.checked == 'T' ? true : false} /></Col>
                                {item.name}
                                </span>
                            </Col>
                        
                    }
                </div>
            );
        })
        let funcData = this.props.$$state.get('funcData').toJS();
        return (
            <div>
                {/* <div>
                    <Button onClick={this.hideOnClick.bind(this)} className={'class1 class2'}>lalalala</Button>
                </div> */}
                <div className="collapse-recover">
                    <Collapse bordered={false} defaultActiveKey={['0', '1', '2', '3']}>
                        {showGroup(funcData)}
                    </Collapse>
                </div>
            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.roleList
    }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(roleActions, dispatch)
    }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(FuncTree);
