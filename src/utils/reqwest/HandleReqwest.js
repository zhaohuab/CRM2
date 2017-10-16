/**
 * 处理信息公共
 */
import { message as MsgTool,notification } from 'antd';
import { browserHistory } from 'react-router'

export const codeConstant = {
    Success:"0",
    ServerError:"1",
    Info:"2",
    Warn:"3",
    Notification:"4",
    ServiceFormVaild:"5",
}

function handleMessage(result) {
    let { response,status } = result;
    if(status == 401) {
        browserHistory.push('/crm_web/login/sessionover');
        return;
    }
    if(!response) {
        return;
    }
    let { code ,message,developerMessage } = JSON.parse(response);
    //message.destroy()
    if(!message && code == codeConstant.Success) {
        return;
    }
    switch (code) {
		case codeConstant.Success:
            MsgTool.success(message);
            break;
        case codeConstant.Info:
            MsgTool.error(message);
            
            break;
        case codeConstant.Info:
            MsgTool.info(message);
            
            break;
        case codeConstant.Warn:
            MsgTool.warn(message);
            break;
        case codeConstant.Notification:
            notification.open({
                message: '操作异常',
                description: '请联系管理员！',
            });
            break;
        default: 
            
    }
    console.log(developerMessage)
}

export default handleMessage;