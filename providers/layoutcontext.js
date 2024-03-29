import { createContext } from "react"

const initLayoutState = {
    waitingSignal: { display: false }
}

const LayoutContext = createContext(initLayoutState)
function layoutReducer(state,action){
    try{
        switch(action.type){
            case 'SET_DISPLAY' :
                return {...state,waitingSignal:{display:action.payload.display}}
                default: return state
        }
    }catch(err){

    } finally {
        console.log(`layoutReducer: ${JSON.stringify(state)}`)
    }
}

export {initLayoutState,LayoutContext,layoutReducer}