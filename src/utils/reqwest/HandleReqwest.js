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

//本方法返回的true和false用于指示页面是否要终止之后的操作(用于报错后停止之后的逻辑)。
function handleMessage(result) {
    debugger
    let { response,status } = result;
    if(status == 401) {
        browserHistory.push('/crm_web/login/sessionover');
        return true;
    }
    if(!response) {
        return true;
    }
    let { code ,message,developerMessage } = JSON.parse(response);
    console.log(developerMessage)
    //message.destroy()
    if(!message && code == codeConstant.Success) {
        return true;
    }
    switch (code) {
		case codeConstant.Success:
            MsgTool.success(message);
            return true;
        case codeConstant.ServerError:
            MsgTool.error(message);
            return false;
        case codeConstant.Info:
            MsgTool.info(message);
            return true;
        case codeConstant.Warn:
            MsgTool.warn(message);
            return true;
        case codeConstant.Notification:
            notification.open({
                message: '操作异常',
                description: '请联系管理员！',
            });
            return false;
        default: 
            return true
            
    }
   
}

export default handleMessage;