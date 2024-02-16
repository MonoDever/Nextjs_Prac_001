import UserComponent from "../../components/user/usercomponent"
import { useRouter } from "next/router";
import { MemberContext } from "../../providers/membercontext";
import { useContext } from "react";
import { ValidateEmail } from "../../common/functions/userfunction";
import { SendMailForVerifyCode, ValidateVerifyCode } from "../../services/userservices/userservice";
import { PopupContext } from "../../providers/popupcontext";
import Alertpopup from "../../components/layouts/alertpopup";
import { LayoutContext } from "../../providers/layoutcontext";
import WaitingSignal from "../../components/layouts/waitingsignal"

export default function verificationcode() {
    const router = useRouter();
    const { memberState, memberDispatch } = useContext(MemberContext);
    const { popupState, popupDispatch } = useContext(PopupContext)
    const { layoutStata, layoutDispatch } = useContext(LayoutContext)

    const openWaitingSign = () => {
        layoutDispatch({ type: 'SET_DISPLAY', payload: { display: true } })
    }

    const closeWaitingSign = () => {
        layoutDispatch({ type: 'SET_DISPLAY', payload: { display: false } })
    }

    const gotoLoginPage = () => {
        memberDispatch({ type: 'SET_DEFAULT_USERVERIFYEMAIL' });
        router.push('/user/login');
    }

    const onVerifyCode = async () => {
        openWaitingSign();
        try {

            const user = memberState.userLogin;
            const verifycode = memberState.userVerifyEmail.verifyCode;
            const validEmail = await ValidateEmail(user.email);
            if (!validEmail) {
                let message = '';
                if (!validEmail) {
                    message = 'Email format is invalid'
                }
                memberDispatch({ type: 'SET_ALERTMESSAGE', payload: { alertMessage: message } })
                return;
            }

            let data = await ValidateVerifyCode({ email: user.email, verifyCode: verifycode })
            if (data && data.status == true) {
                router.push('/user/forgotpassword')
            } else {
                memberDispatch({ type: 'SET_VERIFYCODE', payload: { verifycode: '' } })
                popupDispatch({ type: 'SET_DISPLAY', payload: { display: true, topic: 'Alert', body: 'รหัสยืนยันไม่ถูกต้อง กรุณาตรวจสอบอีกครัง', action: onClosePopup } })
            }
        } catch (error) {
            console.log(`onVerifyCode error : ${error.message}`)
        } finally {
            closeWaitingSign();
        }
    }

    const onSendEmail = async () => {
        openWaitingSign()
        try {
            const user = memberState.userLogin;
            const validEmail = await ValidateEmail(user.email);
            if (!validEmail) {
                let message = '';
                if (!validEmail) {
                    message = 'Email format is invalid'
                }
                memberDispatch({ type: 'SET_ALERTMESSAGE', payload: { alertMessage: message } })
                return;
            }

            let data = await SendMailForVerifyCode({ email: user.email });
            if (data && data.status == true) {
                memberDispatch({ type: 'SET_SENTMAIL', payload: { countSentEmail: memberState.userVerifyEmail.countSentEmail + 1 } })
                popupDispatch({ type: 'SET_DISPLAY', payload: { display: true, topic: 'Information', body: 'กรุณาตรวจสอบ Mail box ของท่าน', action: onClosePopup } })
            }
        } catch (error) {
            console.log(`onSendEmail error : ${error.message} `)
        } finally {
            closeWaitingSign()
        }
    }

    const onClosePopup = () => {
        popupDispatch({ type: 'SET_DISPLAY', payload: { display: false, topic: '', body: 'test', action: null } })
    }

    return (
        <>
            <WaitingSignal></WaitingSignal>
            <Alertpopup></Alertpopup>
            <div className="layout_member">
                <div className="box_login">
                    <UserComponent
                        topic='Verification code'
                        inputEmailDisplay='true'
                        onGotoLoginPage={() => gotoLoginPage()}
                        onClickSendEmail={() => onSendEmail()}
                        onClickVerifyCode={() => onVerifyCode()}
                    ></UserComponent>
                </div>
            </div>
        </>
    )
}