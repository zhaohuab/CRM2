import reqwest from "reqwest";

import { baseDir} from "api";

import {message} from 'antd'

export default class Upload extends React.Component {
    onChange(e){
        debugger
        let files = e.target.files
        this.uploadFiles(files)
    }

    uploadFiles(files){
         files = Array.from(files);
        let proAry = []
        debugger
        files.forEach((file,index,items) => {
            this.upload(file);
        })
    }

    upload = (file) => {
        debugger
        let formdata=new FormData();
        formdata.append('file', file)
        let {objType,objId} = this.props;
        debugger
        return reqwest(
            {
                url:baseDir + `/sys/upload/${objType}/${objId}`,
                method: "POST",
                processData : false,
                contentType : false,
                data:formdata
            }
        )
        .then((result) => {
            debugger
            if(result.code == 1){
                message.error(result.message);
                return
            }
            this.props.success(result.data);
            let file = this.refs.file
            file.value = ''
        }) 
        .fail((result) => {
            debugger
        })
    }
    
    iconClick(e){
        e.stopPropagation()
        let file = this.refs.file
        if(!file) return
        file.click()
    }

    render(){
        let props = this.props
        return(
            <div onClick={this.iconClick.bind(this)}>
                <input
                    type="file"
                    ref="file"
                    disabled={props.disabled}
                    style={{ display: 'none' }}
                    multiple={props.multiple}
                    onChange={this.onChange.bind(this)}
                />
                {props.children}
            </div>
        )
    }
}
