export function getCollaps(){
    return{
        type:'COMMON_MENU_COLLAPSED'
    }
}

export function getToggle(flag){
    return{
        type:'COMMON_MENU_TOGGLE',
        flag
    }
}