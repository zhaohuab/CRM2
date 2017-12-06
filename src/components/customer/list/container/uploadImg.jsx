import React from "react";
import { Icon, Button, Col, Row, Modal, Upload } from "antd";

export default class UploadImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: "",
            fileList: props.defaultList ? props.defaultList : []
        };
    }

    handleCancel() {
        this.setState({ previewVisible: false });
    }

    handlePreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    }

    handleChange({ fileList }) {
        this.setState({ fileList });
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;

        const uploadButton = (
            <div>
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return (
            <div className="customer-form-uoload">
                <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    showUploadList={
                        this.props.showUploadList
                            ? this.props.showUploadList
                            : {}
                    }
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage}
                    />
                </Modal>
            </div>
        );
    }
}
