import reqwest from "reqwest";

import { baseDir} from "api";

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
        files.forEach((file,index,items)=>{
            this.upLoad(file);
        })
        /*
        files.forEach((file,index,items)=>{
            let before = this.props.beforeUpload(file,index,items);
            if(typeof before == 'boolean' && before){
                proAry.push(this.upLoad(file))
            }
        })
        Promise.all(proAry).then((result)=>{
            
            console.log(result)
            this.props.success()
        },(error)=>{
            
            console.log(error)
        })
        */
    }

    upLoad(file){
        let formdata=new FormData();
        formdata.append('file', file)
        //formdata.get("filedata")
        debugger
        return reqwest(
            {
                url:baseDir + "/cum/customers/upload",
                method: "POST",
                processData: false,
                contentType: false,
                data:formdata
            }
        );
    }
    
    iconClick(e){
        debugger
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
