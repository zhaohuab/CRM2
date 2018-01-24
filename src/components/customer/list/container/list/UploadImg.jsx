import React from "react";
import { Icon, Button, Col, Row, Modal, Upload ,message} from "antd";
import { cum as url, doc, baseDir } from "api";
import reqwest from "utils/reqwest";

export default class UploadImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: "",
            loading:false
        };
    }

    handleCancel() {
        this.setState({ previewVisible: false });
    }

    handlePreview(file) {
        this.setState({
            previewImage: file.url,
            previewVisible: true
        });
    }

    getBase64(img, callback) {      
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    upFn(imageUrl,id){      
       let c=this.props.onChange
          reqwest(
            {
                url: baseDir + "/cum/customers/upload",
                method: "POST",
                data: {
                    param: {
                        filename:imageUrl
                    }
                }
            },
            data => {             
                let obj=[{
                        uid: id,
                        name: data.data[1],
                        status: 'done',
                        url: data.data[0],
                }]
                this.setState({
                    loading:false
                },()=>{                 
                    if(this.props.onChange){
                        this.props.onChange(JSON.stringify(obj))
                    }
                })
            }
        );
    }

    delFn(name,callback){     
        reqwest(
            {
                url: baseDir + " /cum/customers/deletefile",
                method: "DELETE",
                data: {
                    param: {
                        filename:name
                    }
                }
            },
            data => {
                callback()
            }
        );
    }

    handleChange = (info) => {    
          this.setState({ loading: true });
          if(info.file.originFileObj){
                let id = info.file.originFileObj.uid
                this.getBase64(info.file.originFileObj, imageUrl => {
                this.upFn(imageUrl,id)
            }); 
          }else{
              let id = info.file.uid;
              let name = info.file.name;
              this.delFn(name,()=>{
                    this.setState({
                        loading:false
                    },()=>{
                        this.props.onChange([])
                    })
           })
        }
    }

    //上传失败，删除失败要做
    render() {
        const { previewVisible, previewImage, fileList ,imageUrl} = this.state;
        const uploadButton = (
                <div className='upload-warpper'>
                    <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                    {/* <span className="loading-text">{this.state.loading ? 'loading' : this.props.title}</span> */}
                </div>
        );
      
       let list =this.props.value?JSON.parse(this.props.value):[]
        return (
            <div className="customer-form-uoload">
              <Upload
                    listType="picture-card"
                    fileList={list}
                    onPreview={this.handlePreview.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    // showUploadList={
                    //     this.props.showUploadList
                    //         ? this.props.showUploadList
                    //         : {}
                    // }
                >
                    {list && list.length >= 1 ? null : uploadButton}
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


