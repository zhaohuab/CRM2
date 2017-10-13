import fetchData from 'utils/fetchdata';
import reqwest from 'reqwest';
import {baseDir} from 'api'
import { browserHistory } from 'react-router'

export function loginOut(){
   return (dispatch)=>{
        reqwest({
            url: `${baseDir}logout`,
            method: "POST",
        }).then(result => {
            location.href = location.href
        })
   }
}