import reqwest from "utils/reqwest";

import { baseDir} from "api";

export default class Upload extends React.Component {
    onChange(e){
        let files = e.target.files
        this.uploadFiles(files)
    }

    uploadFiles(files){
         files = Array.from(files);
        let proAry = []
        
        files.forEach((file,index,items)=>{
            debugger
            let before = this.props.beforeUpload(file,index,items);
            if(typeof before == 'boolean' && before){
                proAry.push(this.upLoad(file))
            }
        })
        Promise.all(proAry).then((result)=>{
            
            console.log(12,result)
            this.props.success()
        },(error)=>{
            
            console.log(34,error)
        })
    }

    upLoad(file){
        let formdata=new FormData();
        formdata.append('filedata', file)
        //formdata.get("filedata")
        
        return reqwest(
            {
                url:baseDir + "/cum/customers/upload",
                method: "POST",
                contentType: 'text/html;charset=utf-8',
                data: {
                    param: {
                        filename:formdata
                    }
                }
            }
        );
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
