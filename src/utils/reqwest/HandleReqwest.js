/**
 * 处理信息公共
 */
import { message as MsgTool,notification } from 'antd';
import { browserHistory } from 'react-router'
function handleMessage(result) {
    debugger
    let { response,status } = result;
    if(status == 401) {
        //browserHistory.push('/crm_web/login');
        return;
    }
    if(!response) {
        return;
    }
    let { code ,message,developerMessage } = JSON.parse(response);
    //message.destroy()
    if(!message && code == 'SUCCESS') {
        return;
    }
    switch (code) {
		case 'SUCCESS':
            MsgTool.success(message);
            break;
        case 'INFO':
            MsgTool.info(message);
            break;
        case 'WARN':
            MsgTool.warn(message);
            break;
        case 'ERROR':
            MsgTool.error(message);
            break;
        case 'NOTIFICATION':
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