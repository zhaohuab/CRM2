/**
 * 处理提示信息公共
 */
import { message,notification } from 'antd';
function handle(result) {
    var { response } = result;
    if(response==null){
        response = result
    }else{
        response = JSON.parse(response);
    }
    const { code ,message,developerMessage } = response;
    switch (code) {
		case 'SUCCESS':
            message.success(message);
            console.log(developerMessage)
            break;
        case 'INFO':
            message.info(message);
            console.log(developerMessage);
            break;
        case 'WARN':
            message.warn(message);
            console.log(developerMessage);
            break;
        case 'ERROR':
            message.error(message);
            console.log(developerMessage);
            break;
        case 'NOTIFICATION':
            notification.open({
                message: '操作异常',
                description: '请联系管理员！',
            });
            console.log(developerMessage);
            break;
        default: 
            notification.open({
                message: '操作异常',
                description: '请联系管理员！',
            });
            console.log(developerMessage)
    }
    
}

export default handle;