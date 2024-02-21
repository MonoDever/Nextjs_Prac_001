import { createContext,} from "react";

const initPopupState = {
    display:true,
    topic:'test',
    body:'',
    action:null
}
const PopupContext = createContext(initPopupState)

function popupReducer(state, action) {
    switch (action.type) {
        case "SET_DISPLAY":
            return { ...state, display: action.payload.display,
                topic: action.payload.topic,
                body: action.payload.body,
                action: action.payload.action };
        case "closepopup":
            return { ...state, inline: 'none' };
        default: return state;
    }
}
export {PopupContext,initPopupState,popupReducer}