import Immutable from "immutable";

let $$initialState = {
    collapsed: false,
    toggle: false,
    height: 0
};

export default function reducer(
    $$state = Immutable.fromJS($$initialState),
    action
) {
    switch (action.type) {
        case "COMMON_MENU_COLLAPSED":
            let col = $$state.get("collapsed");
            return $$state.set("collapsed", !col);
        case "COMMON_MENU_TOGGLE":
            let tog = $$state.get("toggle");
            return $$state.set("toggle", action.flag);
        case "COMMON_HEIGHT":
            return $$state.set("height", action.h);
        default:
            return $$state;
    }
}
