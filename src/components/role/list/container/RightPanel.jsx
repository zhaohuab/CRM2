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


class RightPanel extends Component {
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

    selectRight(rightId) {
        const rightData = this.props.$$state.get('rightData').toJS();
        const roleId = this.props.$$state.get("selectedRoleId");
        const isPreseted = this.props.$$state.get("selectedRoleIsPreseted");
        if(isPreseted==1){
            message.error("预制角色不允许修改数据权限");
            return;
        }
        for (let i = 0; i < rightData.length; i++) {
            if (rightData[i].id == rightId) {
                rightData[i].checked = "T";
            } else {
                rightData[i].checked = "F";
            }
        }
        this.props.action.selectRight( roleId,rightId, rightData)
    }


    render() {
        const showRight = data => data.map((item) => {
            return (
                <Col span={6}>
                    <div onClick={this.selectRight.bind(this, item.id)} className={item.checked == 'T' ? "RightPanel-box-checked" : "RightPanel-box"}>{item.name}</div>
                </Col>

            );
        })
        let rightData = this.props.$$state.get('rightData').toJS();

        return (
            <div className="collapse-recover">
                <Row type="flex" gutter={15} >
                    {showRight(rightData)}
                </Row>
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
export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
