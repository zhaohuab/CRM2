import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../action";


import reqwest from "reqwest";

import { baseDir} from "api";

class Upload extends React.Component {
    onChange(e){
        debugger
        let files = e.target.files
        this.props.action.saveFiles(files);

        // this.uploadFiles(files)
    }

    // uploadFiles(files){
    //      files = Array.from(files);
    //     let proAry = []
    //     debugger
    //     files.forEach((file,index,items)=>{
    //         proAry.push(this.upLoad(file));
    //     })
        
    //     // files.forEach((file,index,items)=>{
    //     //     debugger
    //     //     let before = this.props.beforeUpload(file,index,items);
    //     //     if(typeof before == 'boolean' && before){
    //     //         proAry.push(this.upLoad(file))
    //     //     }
    //     // })

    //     Promise.all(proAry).then((result)=>{
    //         debugger
    //         console.log(12,result)

    //         this.props.success(result)
    //     },(error)=>{  
    //         console.log(34,error)
    //         this.props.fail(error)
    //     })
        
    // }

    // upLoad(file){
    //     let formdata=new FormData();
    //     formdata.append('file', file)
    //     //formdata.get("filedata")

    //     return reqwest(
    //         {
    //             url:baseDir + "/tpub/excels/1/import",
    //             method: "POST",
    //             processData: false,
    //             contentType: false,
    //             data:formdata
    //         }
    //     ).then(function(result){
        //    console.lo(5,result)
        // }).fail(function(error){
        //     console.log(6,error)
        // });
    // }
    
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
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerList,
        $$stateCommon: state.componentReducer
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(Upload);