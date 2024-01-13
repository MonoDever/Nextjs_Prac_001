import { createContext,} from "react";

const initPopupState = {topic:'test',inline:'none'}
const PopupContext = createContext(initPopupState)

function popupReducer(state, action) {
    switch (action.type) {
        case "openpopup":
            return { ...state, inline: 'inline' };
        case "closepopup":
            return { ...state, inline: 'none' };
        default: return state;
    }
}
export {PopupContext,initPopupState,popupReducer}