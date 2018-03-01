import reqwest from "reqwest";

import { baseDir} from "api";

import {message} from 'antd'

export default class Upload extends React.Component {
    onChange(e){
        debugger
        let files = e.target.files
        this.uploadFiles(files)
        debugger
        // reqwest(
        //     {
        //         url:`https://open.yonyoucloud.com/operation/palmyy/message/app/share?access_token=f9ffe7ec2a61e88c890cadf193fa03c0c2c8efe9560a2f8d3cf835b4e8e`,
        //         method: "POST",
        //         contentType:'application/json',
        //         data:{
        //             "spaceId": "5417",// 用友集团:5417
        //             "appId": "1", // 应用ID,应用添加后张立朋提供
        //             "sendThrough":"appNotify", // 发送到应用通知，写死
        //             "sendScope":"list", // 发送给指定人员，写死
        //             "toUserType":1, // 用户标识类型，1:手机号 2:邮箱
        //             "to":["15810966427"], // 接收人手机号/邮箱，同toUserType匹配
        //             "title":"crm测试", // 消息标题
        //             "desc": "这里是内容描述1", // 消息内容描述
        //             "detailUrl":""
        //         }
        //     }
        // )
        // .then((result) => {
        //     debugger
           
        // }) 
        // .fail((result) => {
        //     debugger
        // })
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
