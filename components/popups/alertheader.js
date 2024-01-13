import { useContext } from "react"
import { PopupContext } from "../../providers/popupcontext"

export default function alertheader(){
    const {popupState,popupDispatch} = useContext(PopupContext)
    console.log(`popupState:${JSON.stringify(popupState)}`)

    return(
        <>
        <div>
            <span style={{ fontSize:'16px',fontWeight:'bold' }}>{popupState.topic}</span>
            </div>
        </>
    )
}