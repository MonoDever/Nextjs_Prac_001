import UserComponent from "../../components/user/usercomponent"
import { MemberContext } from "../../providers/membercontext"
import { useContext, useEffect } from "react";
import { CheckConfirmPassword, ValidateEmail, ValidatePassword } from "../../common/functions/userfunction";
import { useRouter } from "next/router";
import { ChangePassword } from "../../services/userservices/userservice";
import { PopupContext } from "../../providers/popupcontext";
import { sha256 } from "js-sha256";
import { LayoutContext } from "../../providers/layoutcontext";
import WaitingSignal from "../../components/layouts/waitingsignal"
export default function forgotpassword() {
    const router = useRouter();
    const { memberState, memberDispatch } = useContext(MemberContext);
    const { popupState, popupDispatch } = useContext(PopupContext)
    const { layoutState, layoutDispatch } = useContext(LayoutContext)

    const openWaitingSign = () => {
        layoutDispatch({ type: 'SET_DISPLAY', payload: { display: true } })
    }

    const closeWaitingSign = () => {
        layoutDispatch({ type: 'SET_DISPLAY', payload: { display: false } })
    }

    useEffect(() => {
        const verifyCode = memberState.userVerifyEmail.verifyCode
        if (verifyCode == '') {
            alert('sorry! no entrance to forgot password page.')
            router.push('/user/login')
        }
    }, [])

    const gotoLoginPage = () => {
        router.push('/user/login')
    }

    const onForgotpassword = async () => {
        try {
            openWaitingSign();
            let user = memberState.userLogin
            const validConfirmpassword = await CheckConfirmPassword(user.password, user.confirmPassword)
            const validEmail = await ValidateEmail(user.email)
            const validPassword = await ValidatePassword(user.password)

            if (!validConfirmpassword || !validEmail || !validPassword) {
                let message = ''
                if (!validConfirmpassword) {
                    message = 'Passwords are not equal'
                } else if (!validEmail) {
                    message = 'Email format is invalid'
                } else if (!validPassword) {
                    message = 'Password format is invalid'
                }
                memberDispatch({ type: 'SET_ALERTMESSAGE', payload: { alertMessage: message } })
                return;
            }

            const data = await ChangePassword({ username: user.email, password: sha256(user.password) });
            if (data && data.status == true) {
                popupDispatch({ type: 'SET_DISPLAY', payload: { display: true, topic: 'Alert', body: 'เปลี่ยนรหัสผ่านสำเร็จ', action: onClosePopup } })
                gotoLoginPage();
            } else {
                popupDispatch({ type: 'SET_DISPLAY', payload: { display: true, topic: 'Alert', body: 'กรุณาทำรายการอีกครัง', action: onClosePopup } })
            }
        } catch (error) {
            console.log(`onForgotpassword error : ${error.message}`)
        } finally {
            closeWaitingSign();
        }
    }

    const onClosePopup = () => {
        popupDispatch({ type: 'SET_DISPLAY', payload: { display: false, topic: '', body: 'test', action: null } })
    }

    return (
        <>
        <WaitingSignal></WaitingSignal>
            <div className="layout_member">
                <div className="box_login">
                    <UserComponent
                        topic='Forgot password'
                        inputEmailDisplay='true'
                        inputPasswordDisplay='true'
                        inputPasswordConfirmDisplay='true'
                        onGotoLoginPage={() => gotoLoginPage()}
                        onClickForgotPassword={() => onForgotpassword()}


                    ></UserComponent>
                </div>
            </div>
        </>
    )
}