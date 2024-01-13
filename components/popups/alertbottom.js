import { useContext } from "react"
import { PopupContext } from "../../providers/popupcontext"

export default function alertbottom(){

    const {popupState,popupDispatch} = useContext(PopupContext)
    const closepopup = async () =>{
        popupDispatch({type:'closepopup'})
    }

    return(
        <>
        <div style={{ textAlign:'center' }}>
        <button type="button" 
        style={{ border:'black 2px solid', borderRadius:'10px',boxShadow:'0px 4px 4px 0px gray',
        width:'90px',height:'40px' }} onClick={closepopup}>OK</button>
        </div>
        </>
    )
}
