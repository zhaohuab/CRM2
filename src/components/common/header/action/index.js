import fetchData from 'utils/fetchdata';
import reqwest from 'utils/reqwest';
import {baseDir} from 'api'

export function loginOut(){
   return (dispatch)=>{
       
       debugger
        // reqwest({
        //     url: `${baseDir}logout`,
        //     method: "GET",
        // }, result => {
        //     debugger
        //     //dispatch(fetchData('USER_CARD_SAVEEDIT', { ...result, visible: false }));
        // })
   }
}