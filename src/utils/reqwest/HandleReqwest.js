/**
 * 处理信息公共
 */
import { message,notification } from 'antd';
function handleMessage(result) {
    let { response } = result;
    if(!response) {
        return;
    }
    let { code ,message,developerMessage } = JSON.parse(response);
    switch (code) {
		case 'SUCCESS':
            message.success(message);
            break;
        case 'INFO':
            message.info(message);
            break;
        case 'WARN':
            message.warn(message);
            break;
        case 'ERROR':
            message.error(message);
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