import React from "react";
import { Icon, Button, Col, Row, Modal, Upload ,message} from "antd";
import { cum as url, doc, baseDir } from "api";
import reqwest from "utils/reqwest";
//import reqwest from "reqwest";

export default class UploadImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: "",
            loading:false,
            tempList:[]
        };
    }

    //预览图片modal关闭
    handleCancel() {
        this.setState({ previewVisible: false });
    }

    //点击图片进行预览
    handlePreview(file) {
        this.setState({
            previewImage: file.url,
            previewVisible: true
        });
    }

    //自定义上传图片方法
    upFn(){
       debugger
       let list = this.state.tempList;

       let formdata=new FormData();
       list.forEach((item)=>{
        formdata.append('filedata', item)
       })
       //let f = formdata.getAll('filedata')
       //let c=eval((f[0])); 
       debugger
          reqwest(
            {
                url: baseDir + "cum/customers/upload",
                method: "POST",
                type:'Multipart/Form-data',
                contentType:'Multipart/Form-data',
                data: {
                    param: {
                        filename:formdata
                    }
                }
            },
            data => {
               debugger
               this.setState({
                    tempList:[]
                })
            }
        );

        // reqwest({
        //     url: baseDir + "cum/customers/upload"
        //   , type: 'json',
        //   data:formdata,
        //   method: 'POST'
        //   , contentType: 'Multipart/Form-data'
          
        //   , error: function (err) { 
        //       debugger
        //   }
        //   , success: function (resp) {
        //       debugger
        //       qwery('#content').html(resp.content)
        //     }
        // })
    }

    //删除一张图片时方法
    delFn(name,callback){
        // reqwest(
        //     {
        //         url: baseDir + " /cum/customers/deletefile",
        //         method: "DELETE",
        //         data: {
        //             param: {
        //                 filename:name
        //             }
        //         }
        //     },
        //     data => {
        //         callback()
        //     }
        // );
    }

    //图片上传文件之前进行的操作
    beforeUpload(file, fileList){
        debugger
        // {
        //     uid: 1,
        //     name: 'xxx.png',
        //     status: 'done',
        //     reponse: 'Server Error 500', // custom error message to show
        //     url: 'http://www.baidu.com/xxx.png',
        // }

        let type = ['.jpeg' ,'.jpg' ,'.png' ]
        let pos = file.name.lastIndexOf('.')
        let end = file.name.slice(pos);

        if(type.indexOf(end)){
            this.state.tempList.push(file)
            this.setState({
                tempList: this.state.tempList
            })
            return true
        }else{
            //保存信息写不符合上传类型
            message.error(`不支持${end}格式，只支持 .jpg .png .jpeg格式,请重新上传`);
            return false
        }
    }

    //上传失败，删除失败要做
    render() {
        const { previewVisible, previewImage, fileList ,imageUrl} = this.state;
        const uploadButton = (
                <div className='upload-warpper'>
                    <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                </div>
        );
      
       let list =this.props.value?JSON.parse(this.props.value):[]
        return (
            <div className="customer-form-uoload">
                <Upload
                    listType="picture-card"
                    fileList={list}
                    onPreview={this.handlePreview.bind(this)}
                    beforeUpload = {this.beforeUpload.bind(this)}
                    customRequest = {this.upFn.bind(this)}
                    multiple = {true}
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
                        alt="图片"
                        style={{ width: "100%" }}
                        src={previewImage}
                    />
                </Modal>
            </div>
        );
    }
}


//是否显示增加按钮   
//是否显示删除按钮
//设置图片显示数量  
//Upload 里增加样式，以便传多个图片用 
//增加是否多选字段
