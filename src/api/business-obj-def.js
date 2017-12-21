/*
 * @Author: yangtmm 
 * @Date: 2017-11-22 11:45:28 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-11-24 13:17:39
 * @des  业务对象接口
 */

import cookie from "utils/cookie";
const baseDir = cookie("basedir"); // host:ip/crm_web/

export const getBusinessObjList = `${baseDir}sys/modules`               // http://{baseurl}/sys/modules/{objId}/biztypes   GET

export const saveAddBusinessObj = `${baseDir}sys/modules`               //http://{baseurl}/sys/modules/{objId}/biztypes    POST
export const saveEditBusinessObj = `${baseDir}sys/biztypes/`            //http://{baseurl}/sys/biztypes/{bizTypeId}        PUT

export const delBusinessObjData = `${baseDir}sys/biztypes/batchDelete`  //http://{baseurl}/sys/biztypes/batchDelete        POST