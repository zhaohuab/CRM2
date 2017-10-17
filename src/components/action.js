export function getCollaps() {
    return {
        type: "COMMON_MENU_COLLAPSED"
    };
}

export function getToggle(flag) {
    return {
        type: "COMMON_MENU_TOGGLE",
        flag
    };
}

export function getH(h) {
    return {
        type: "COMMON_HEIGHT",
        h
    };
}