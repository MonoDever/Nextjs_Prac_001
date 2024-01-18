import { PopupContext } from "../../providers/popupcontext"
import { useContext } from "react"

export default function alertpopup(props) {
    const { topic, body, action } = props;
    const { popupState, popupDispatch } = useContext(PopupContext);

    return (
        <>
            <div style={{ position: 'absolute', width: '100%', height: '100%', display: popupState.display == true ? 'inline' : 'none' }}>
                <div style={{
                    position: 'absolute', backgroundColor: 'white', boxShadow: '0px 4px 4px 0px gray',
                    border: 'black 1px solid', borderRadius: '10px',
                    width: '500px', height: '300px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'
                }}>
                    <div className="row" style={{ height: '15%', backgroundColor: 'lightblue', margin: '0px', borderRadius: '10px 10px 0px 0px' }}>
                        <div>
                            <span style={{ fontSize: '16px', fontWeight: 'bold', verticalAlign: '-webkit-baseline-middle' }}>
                                <i class="bi bi-exclamation-triangle-fill" style={{ color: 'yellowgreen' }}></i>{popupState.topic}
                            </span>
                        </div>
                    </div>
                    <div className="row" style={{ height: '65%' }}>
                        <div style={{ alignItems:'center', display:'flex',justifyContent:'center' }}>
                            <span style={{ verticalAlign: '-webkit-baseline-middle' }}>{popupState.body}</span>
                        </div>
                    </div>
                    <div className="row" style={{ height: '20%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <button type="button"
                                style={{
                                    border: 'lightgray 2px solid', borderRadius: '10px', boxShadow: '0px 4px 4px 0px gray',
                                    width: '90px', height: '40px'
                                }} onClick={() => popupState.action()}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}