/**
 * 处理fail公共
 */
import { message } from 'antd';
function handleFail(result) {
    let { response } = result;
    let { code ,message,developerMessage } = JSON.parse(response);

    message.error(message);
    console.error(developerMessage);
}

export default handleFail;