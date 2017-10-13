
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Icon, Button, Form, Input, Checkbox, Col, Modal, Spin } from 'antd';
import * as roleActions from "../action"
class List extends React.Component {

    constructor(props) {
        super(props)

        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
            }, {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '性别',
                dataIndex: 'genderName',
            },
        ]

        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className='list-warpper'>
                <div className='list-main'>
                    <div className='list-table-tree' style={{ minHeight: 'auto' }}>



                    </div>
                    <div className='list-table' ref="listTablePanel">
                        <div className='table-header'>
                        </div>
                        <div className='org-tabel'>
                            <Table columns={this.columns} rowKey='id' size='middle' />
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
