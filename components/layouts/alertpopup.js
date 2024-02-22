import { PopupContext } from "../../providers/popupcontext"
import { useContext } from "react"

export default function alertpopup(props) {
    const { topic, body, action } = props;
    const { popupState, popupDispatch } = useContext(PopupContext);

    return (
        <>
            <div className="alert-div-background" style={{ display: popupState.display == true ? 'inline' : 'none' }}>
                <div className="alert-div-box alert-div-box-sizing">
                    <div className="alert-topic row" >
                        <div className="alert-sub-topic">
                            <i className="bi bi-exclamation-triangle-fill" style={{ color: 'yellowgreen' }}></i>
                            <label className="">{` ${popupState.topic}`}</label>
                        </div>
                    </div>
                    <div className="row alert-body">
                        <div className="alert-sub-body">
                            <span > {`${popupState.body}`}</span>
                        </div>
                    </div>
                    <div className="row alert-bottom">
                        <div className="alert-sub-bottom">
                            <button type="button" className="alert-button"
                                onClick={() => popupState.action()}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}