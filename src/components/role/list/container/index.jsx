
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tabs,Table, Icon, Button, Form, Input, Checkbox, Col, Modal, Spin } from 'antd';
const TabPane = Tabs.TabPane;
import * as roleActions from "../action"
class List extends React.Component {

    constructor(props) {
        super(props)

        this.columns = [{
                title: '姓名',
                dataIndex: 'name',
            }]

        this.state = {

        }
    }

    componentDidMount() {
        this.props.action.getRoleListData();
    }

    render() {

        return (
            <div className='list-warpper'>
                <div className='list-main'>
                    <div className='list-table-tree' style={{ minHeight: 'auto' }}>
                        <div className='org-tree-top'>
                            <Button>新增角色</Button>
                        </div>
                        <Table
                            size="middle"
                            columns={this.columns}
                            rowKey="name"
                            pagination="false"
                        />
                    </div>
                    <div className='list-table' ref="listTablePanel">
                        <div className='table-header'>
                            <Button>功能</Button>
                            <Button>数据</Button>
                            <Button>分配用户</Button>
                        </div>
                        <div className='org-tabel'>
                        <Tabs tabPosition={this.state.tabPosition}>
                        <TabPane tab="功能" key="1">Content of Tab 1</TabPane>
                        <TabPane tab="数据" key="2">Content of Tab 2</TabPane>
                        <TabPane tab="分配用户" key="3">Content of Tab 3</TabPane>
                      </Tabs>
                        </div>
                        
                        <Modal
                            title="修改组织"
                            visible={false}
                        >
                            <div className='model-height'>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
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
        action : bindActionCreators(roleActions, dispatch)
    }
  }
  
  //输出绑定state和action后组件
export default  connect( mapStateToProps, mapDispatchToProps)(List);
