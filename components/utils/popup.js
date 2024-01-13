import Alertheader from "../popups/alertheader"
import Alertbody from "../popups/alertbody"
import Alertbottom from "../popups/alertbottom"
import { PopupContext } from "../../providers/popupcontext"
import { useContext } from "react"

export default function popup(){
    const {popupState,popupDispatch} = useContext(PopupContext)

    return(
        <>
        <div style={{position:'absolute',width:'100%',height:'100%',display:popupState.inline}}>
            <div style={{position:'absolute',backgroundColor:'white',boxShadow:'0px 4px 4px 0px gray',
            border:'black 1px solid',borderRadius:'10px',
            width:'500px',height:'300px',top:'50%',left:'50%',transform:'translate(-50%,-50%)'
            }}>
            <div className="row" style={{height:'15%',backgroundColor:'lightblue',margin:'0px',borderRadius:'10px 10px 0px 0px'}}>
                <Alertheader/>
            </div>
            <div className="row" style={{height:'65%'}}>
                <Alertbody/>
            </div>
            <div className="row" style={{height:'20%'}}>
                <Alertbottom/>
            </div>
            </div>
        </div>
        </>
    )
}