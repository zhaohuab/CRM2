import { Icon,Row } from "antd";
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
                <span className='show-img'><Icon type="eye-o" /></span>

            </div>
            <div className='detail'>
                <p className='detail-name'>{file.name}</p>
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
                <span className='cover'><Icon type="loading" /></span>

            </div>
            <div className='detail'>
                <p className='detail-name'>{file.name}</p>
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
            <div className='detail'>
                <p className='detail-name'>{file.name}</p>
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
            <div className='detail'>
                <p className='detail-name'>{file.name}</p>
                <p className='detail-remark'><span>上传人:</span><span>{file.uploadUserId}</span></p>
                <p className='detail-remark'><span>上传时间:</span><span>{moment(file.uploadTime.time).format("YYYY-MM-DD")}</span></p>
            </div>
            <span className='del' onClick={this.props.onDeleteFile.bind(this,file)}><i className='iconfont icon-canyuren-shanchu'/></span>
        </Row>
    }

}
class RelFile extends React.Component {

    getFileRender(file) {
        
        let fileType = file.type;
        let picTypes = ["png","jpg","jpeg","gif"];
        let excelTypes = ["xlsx","xls"];
        let wordTypes = ["docx","doc"];
        debugger
        let onDeleteFile = (file)=>{
            debugger
            this.props.onDeleteFile(file);

        }

        if(picTypes.includes(fileType) ) {
            return <PicFile file={file} onDeleteFile={onDeleteFile}/>
        }
        else if(excelTypes.includes(fileType)) {
            return <ExcelFile file={file} onDeleteFile={onDeleteFile}/>
        }
        else if(wordTypes.includes(fileType)) {
            return <WordFile file={file} onDeleteFile={onDeleteFile}/>
        }
        else if(fileType == "ppt") {
            return <PPTFile file={file} onDeleteFile={onDeleteFile}/>
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
        return <div className='file-warpper'>
            {
                files && files.length ?
                    files.map((file, index) => {
                        return this.getFileRender(file)
                    }) : '暂无数据'
            }
        </div>
    }

}

export default RelFile;