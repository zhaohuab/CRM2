import { Icon,Row ,Modal} from "antd";
import moment from 'moment'

class PicFile extends React.Component {
    render() {
        
        let file = this.props.file;
        return <Row className='file-warpper-item' type='flex' align='middle'>
            <div className='img-mark'>
                <img
                    src={file.url}
                    className="top-img"
                />
                <span className='show-img' onClick= {this.props.preview.bind(this,file.url)}>
                    <Icon type="eye-o" />
                </span>
            </div>
            <div className='detail' onClick = {this.props.download.bind(this,file.url)}>
                <p className='detail-name' title = {file.name}>{file.name}</p>
                <p className='detail-remark'><span>上传人:</span><span>{file.uploadUserId}</span></p>
                <p className='detail-remark'><span>上传时间:</span><span>{moment(file.uploadTime.time).format("YYYY-MM-DD")}</span></p>
            </div>
            <span className='del' onClick={this.props.onDeleteFile.bind(this,file)}><i className='iconfont icon-canyuren-shanchu'/></span>
        </Row>
    }
}

class ExcelFile extends React.Component {
    
    render() {
        let file = this.props.file;
        return <Row className='file-warpper-item' type='flex' align='middle'>
            <div className='img-mark'>
                <i className='iconfont icon-xsl' />
                {/* <span className='cover'><Icon type="loading" /></span> */}
            </div>
            <div className='detail'  onClick = {this.props.download.bind(this,file.url)}>
                <p className='detail-name' title = {file.name}>{file.name}</p>
                <p className='detail-remark'><span>上传人:</span><span>{file.uploadUserId}</span></p>
                <p className='detail-remark'><span>上传时间:</span><span>{moment(file.uploadTime.time).format("YYYY-MM-DD")}</span></p>
            </div>
            <span className='del' onClick={this.props.onDeleteFile.bind(this,file)}><i className='iconfont icon-canyuren-shanchu'/></span>
        </Row>
    }

}

class WordFile extends React.Component {
    render() {
        let file = this.props.file;
        return <Row className='file-warpper-item' type='flex' align='middle'>
            <div className='img-mark'>
                <i className='iconfont icon-word' />
            </div>
            <div className='detail' onClick = {this.props.download.bind(this,file.url)}>
                <p className='detail-name' title = {file.name}>{file.name}</p>
                <p className='detail-remark'><span>上传人:</span><span>{file.uploadUserId}</span></p>
                <p className='detail-remark'><span>上传时间:</span><span>{moment(file.uploadTime.time).format("YYYY-MM-DD")}</span></p>
            </div>
            <span className='del' onClick={this.props.onDeleteFile.bind(this,file)}><i className='iconfont icon-canyuren-shanchu'/></span>
        </Row>
    }

}

class PPTFile extends React.Component {
    render() {
        let file = this.props.file;
        return <Row className='file-warpper-item' type='flex' align='middle'>
            <div className='img-mark'>
                <i className='iconfont icon-ppt' />
            </div>
            <div className='detail' onClick = {this.props.download.bind(this,file.url)}>
                <p className='detail-name' title = {file.name}>{file.name}</p>
                <p className='detail-remark'><span>上传人:</span><span>{file.uploadUserId}</span></p>
                <p className='detail-remark'><span>上传时间:</span><span>{moment(file.uploadTime.time).format("YYYY-MM-DD")}</span></p>
            </div>
            <span className='del' onClick={this.props.onDeleteFile.bind(this,file)}><i className='iconfont icon-canyuren-shanchu'/></span>
        </Row>
    }

}
class RelFile extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            previewImage :'',
            visible:false,
            refDown:''
        }
    }
    //查看图片关闭modal
    onCancel(){
        this.setState({
            visible:false,
            previewImage:''
        })
    }
    //查看图片方法
    preview(url){
        this.setState({
            visible:true,
            previewImage:url,
            refDown:''
        })
    }

    //下载文件
    download(url){
        debugger
        //window.open(url)  只能下载文件   图片是打开页面   safria 图片可以但目前url不可以
        let  refDown = this.refs.refDown
        refDown.href = url
        refDown.download = url
        refDown.click()
    }

    //根据文件类型生成对应的文件布局
    getFileRender(file) {
        let fileType = file.type;
        let picTypes = ["png","jpg","jpeg","gif"];
        let excelTypes = ["xlsx","xls"];
        let wordTypes = ["docx","doc"];
        
        //删除方法
        let onDeleteFile = (file)=>{
            debugger
            this.props.onDeleteFile(file);
        }

        if(picTypes.includes(fileType) ) {
            return <PicFile file={file} onDeleteFile={onDeleteFile} preview = {this.preview.bind(this)} download = {this.download.bind(this)}/>
        }
        else if(excelTypes.includes(fileType)) {
            return <ExcelFile file={file} onDeleteFile={onDeleteFile} download = {this.download.bind(this)}/>
        }
        else if(wordTypes.includes(fileType)) {
            return <WordFile file={file} onDeleteFile={onDeleteFile} download = {this.download.bind(this)}/>
        }
        else if(fileType == "ppt") {
            return <PPTFile file={file} onDeleteFile={onDeleteFile} download = {this.download.bind(this)}/>
        }
        return (
            <Row className='file-warpper-item' type='flex' align='middle'>
                <div className='img-mark'>
                    <i className='iconfont icon-xsl' />
                </div>
                <div className='detail'>
                    <p className='detail-name'>{file.name}</p>
                    <p className='detail-remark'><span>上传人:</span><span>{file.uploadUserId}</span></p>
                    <p className='detail-remark'><span>上传时间:</span><span>{moment(file.uploadTime.time).format("YYYY-MM-DD")}</span></p>
                </div>
                <span className='del'><i className='iconfont icon-canyuren-shanchu' onClick={this.props.onDeleteFile(file)}/></span>
            </Row>
        )
    }

    render() {
        let files = this.props.files;
        let { previewImage , visible } = this.state
        debugger
        return (
            <div className='file-warpper'>
                {
                    files && files.length ?
                        files.map((file, index) => {
                            return this.getFileRender(file)
                        }) : '暂无数据'
                }
                <Modal
                    title="图片查看"
                    visible={this.state.visible}
                    onCancel={this.onCancel.bind(this)}
                    width = {750}
                    footer = {false}
                > 
                   <div className='crm-list-panel-upload-modal'>
                    <img alt="图片" src={previewImage} />
                   </div>
                </Modal>
                <a ref = 'refDown'/>
            </div>
        )
    }
}

export default RelFile;