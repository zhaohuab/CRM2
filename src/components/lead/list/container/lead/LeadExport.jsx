import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../action";
import {
    Select,
    Input,
    Form,
    Table,
    Modal,
    Button,
    Icon,
    Row,
    Col,
    Tabs,
    message,
    Spin
} from "antd";

import LeadStart from "./LeadStart"
import reqwest from "reqwest";
import { baseDir } from "api";

import "assets/stylesheet/all/iconfont.css";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            importVisible: false
        }
    }

    //开始导入 余春梅 1.30
    leadStart() {
        debugger
        let { leadFiles, filesSuccess } = this.props.$$state.toJS();
        let files = Array.prototype.slice.call(leadFiles)
        // this.props.action.leadShow(false);
        //this.props.action.leadEndShow(true);
        if (files && files.length) {
            this.setState({ importVisible: true })
            this.uploadFiles.call(this);

            this.props.action.changeStep(1);
        }
        // this.props.action.leadEndView(true, 2);
        if (filesSuccess) {
            debugger
            this.props.action.leadEndView(true);
            // setTimeout(() => {
            //     debugger
            //     this.props.action.changeStep(2);
            // }, 2000)
        }

    }
    //取消导入 余春梅 1.30
    leadStartCancel() {
        this.setState({ importVisible: false });
        this.props.action.viewLeadShow(false);
        this.props.action.leadEndShow(false);
        // this.props.action.leadEndView(false, 1);
        // this.props.action.fileSuccess(false, {});
        this.props.action.fileSuccess(false, {}, false, 0);
    }
    //关闭导入 余春梅 1.30
    leadEnd() {
        this.setState({ importVisible: false })
        this.props.action.viewLeadShow(false);
        this.props.action.leadEndShow(false);
        this.props.action.fileSuccess(false, {}, false, 0);
        // setTimeout(() => {
        //     debugger
        //     this.props.action.leadEndView(false, 1);
        // }, 1000)
    }
    leadEndCancel() {
        this.props.action.leadEndShow(false)
    }
    leadIng() {
        this.props.action.leadEndShow(true)
    }
    //上传之前的验证
    beforeUpload(file, index, items) {
        debugger
        let type = ['.bmp', '.gif', '.jpeg', '.html', '.txt', '.vsd', '.ppt', '.doc', '.xml', '.jpg', '.png', '.xlsx', '.xls']
        let pos = file.name.lastIndexOf('.')
        let end = file.name.slice(pos)
        if (type.indexOf(end) >= 0) {
            return true
        } else {
            //保存信息写不符合上传类型
            console.log('文件类型错误')
            return false
        }
    }
    uploadFiles() {
        debugger
        let { leadFiles } = this.props.$$state.toJS();
        let files = Array.prototype.slice.call(leadFiles)
        let proAry = []
        // files.forEach((file, index, items) => {
        //     proAry.push(this.upLoad(file));
        // })
        files.forEach((file, index, items) => {
            let before = this.beforeUpload(file, index, items);
            if (typeof before == 'boolean' && before) {
                proAry.push(this.upLoad(file))
            }
        })

        Promise.all(proAry).then((result) => {
            debugger
            console.log(12, result)
            if (result.length && result[0].code == '0') {
                message.success([result[0].message]);
                this.props.action.fileSuccess(true, result, true, 2)
                // setTimeout(() => {
                //     debugger
                //     this.props.action.changeStep(2);
                // }, 1000)
            }
        }, (error) => {
            console.log(34, error)
            this.props.action.fileFail(false)
        })
    }
    upLoad(file) {
        debugger
        let formdata = new FormData();
        formdata.append('file', file)
        //formdata.get("filedata")
        return reqwest(
            {
                url: baseDir + "/tpub/excels/3/import",
                method: "POST",
                processData: false,
                contentType: 'multipart/form-data',
                data: formdata
            }
        )
    }

    render() {
       
        let {
            leadVisible,
            leadEndVisible,
            leadingVisible,
            viewLeadVisible,
            pagination,
            searchMap

        } = this.props.$$state.toJS();
        ;
       debugger
        return (
            <Modal title="导入"
                className="lead-cur-import"
                // destroyOnClose={true}
                visible={viewLeadVisible}
                // onOk={this.leadStart.bind(this)}
                onCancel={this.leadStartCancel.bind(this)}
                footer={leadEndVisible ? [
                    <Button key="submit" type="primary" onClick={this.leadEnd.bind(this)}>
                        关闭
                        </Button>
                ] :
                    [
                        <Button key="back" onClick={this.leadStartCancel.bind(this)}>取消</Button>,
                        <Button key="submit"
                            loading={this.state.importVisible}
                            type="primary" onClick={this.leadStart.bind(this)}>
                            开始导入
                        </Button>
                    ]}

            // footer={leadEndVisible?[
            //     <Button key="submit" type="primary" onClick={this.leadEnd.bind(this)}>
            //      关闭
            //     </Button>
            //   ]:leadingVisible?[
            //     <Button key="submit" type="primary" onClick={this.leadIng.bind(this)}>
            //      导入中
            //     </Button>
            //   ]:
            //   [
            //     <Button key="back" onClick={this.leadStartCancel.bind(this)}>取消</Button>,
            //     <Button key="submit" type="primary" onClick={this.leadStart.bind(this)}>
            //       开始导入
            //     </Button>
            //   ]}
            >
                <div className="cur-lead" ref="leadContent">
                    {viewLeadVisible ? <LeadStart /> : null}
                </div>
            </Modal>
        );
    }
}
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.lead
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(List);
