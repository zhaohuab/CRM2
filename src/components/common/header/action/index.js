import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import {baseDir} from 'api'

export function loginOut(){
   return (dispatch)=>{
       
       
        reqwest({
            url: `${baseDir}logout`,
            method: "POST",
        }, result => {
            debugger
            //dispatch(fetchData('USER_CARD_SAVEEDIT', { ...result, visible: false }));
        })
   }
}