//import Animate from 'rc-animate'
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon } from 'antd';
import reqwest from 'reqwest';
import { Promise } from 'promise';

const noop = function () {

}

export default class CkUpload extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            disabled: false,
            filesList: this.props && this.props.filesList || []
        }
    }

    onChange = (e) => {
        if (this.state.disabled) {
            return;
        }
        this.setState({
            disabled: true,
        });
        const files = e.target.files;
        this.uploadFiles(files);
    }
    onClick = (e) => {
        const el = this.refs.file;
        if (!el) {
            return;
        }
        el.click();
    }
    onKeyDown = (e) => {

        if (e.key === 'Enter') {
            this.onClick();
        }
    }
    onFileDrop = (e) => {

        if (this.state.disabled) {
            return;
        }
        if (e.type === 'dragover') {
            e.preventDefault();
            return;
        }
        this.setState({
            disabled: true
        });
        this.uploadFiles(e.dataTransfer.files)
        e.preventDefault()
    }
    onUpload = () => {
        if (this.props.onUpload) {
            this.props.onUpload()
        }
    }
    uploadFile = (file) => {
        let formData = new FormData()
        formData.append('filedata', file)
        return reqwest({
            url: this.props.url,
            data: formData,
            cache: false,
            contentType: 'text/html;charset=utf-8',
            processData: false,
            method: 'post'
        })
    }
    uploadFiles = (files) => {
        const props = this.props
        let uploadRequests = []
        const postFiles = Array.prototype.slice.call(files)
        postFiles.forEach((file, i, files) => {
            // 调用beforeUpload, 根据返回值判断是否上传到服务器
            const before = props.beforeUpload(file, i, files);
            if (typeof before === 'boolean' && before) {
                uploadRequests.push(this.uploadFile(file))
            }
        })

        this.onUpload()
        Promise.all(uploadRequests).then(rsArray => {
            this.setState({
                disabled: false
            })

            if (props.onSuccess) {
                props.onSuccess(rsArray.map((rs) => {
                    return JSON.parse(rs)
                }), files)
            }

        }, reason => {
            console.log(reason)
            this.setState({
                disabled: false
            })
            if (props.onError) {
                props.onError(reason, files)
            }

        })


    }

    render() {
        const props = this.props;
        return (

            <span
                role="button"
                tabIndex="0"
                onKeyDown={this.onKeyDown}
                onClick={this.onClick}>

                <input
                    type="file"
                    ref="file"
                    disabled={this.props.disabled || this.state.disabled}
                    style={{ display: 'none' }}
                    accept={props.accept}
                    multiple={props.multiple}
                    onChange={this.onChange}
                />
                {props.children}
            </span>
        )
    }
}


CkUpload.propTypes = {
    multiple: PropTypes.bool,
    beforeUpload: PropTypes.func,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    url: PropTypes.string
};

CkUpload.defaultProps = {
    multiple: true,
    url: '/api/upload',
    beforeUpload: function (file) {
        return true
    }
};