import UserComponent from "../../components/user/usercomponent"
import { useRouter } from "next/router"
import { MemberContext } from "../../providers/membercontext"
import { useContext } from "react"
import { sha256 } from "js-sha256"
import { ValidateEmail, ValidatePassword, CheckConfirmPassword, setWaitingsign } from "../../common/functions/userfunction"
import Alertpopup from "../../components/layouts/alertpopup"
import { PopupContext } from "../../providers/popupcontext"
import { UserSignup } from "../../services/userservices/userservice"
import { LayoutContext } from "../../providers/layoutcontext"
import Waitingsignal from "../../components/layouts/waitingsignal"

export default function register() {
    const { memberState, memberDispatch } = useContext(MemberContext)
    const { popupState, popupDispatch } = useContext(PopupContext)
    const { layoutState, layoutDispatch } = useContext(LayoutContext)
    const router = useRouter()

    const openWaitingSign = () => {
        layoutDispatch({ type: 'SET_DISPLAY', payload: { display: true } })
    }

    const closeWaitingSign = () => {
        layoutDispatch({ type: 'SET_DISPLAY', payload: { display: false } })
    }

    const onRegister = async () => {
        try {
            openWaitingSign()
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
            } else {

                const params = { username: '', password: '' }
                params.username = user.email;
                params.password = sha256(user.password);

                const data = await UserSignup(params);
                if (data && data.status == true) {
                    popupDispatch({ type: 'SET_DISPLAY', payload: { display: true, topic: 'Alert', body: 'Register is success', action: onRegisterSuccess } })
                } else {
                    memberDispatch({ type: 'SET_ALERTMESSAGE', payload: { alertMessage: `l,สมัครสมาชิกไม่สำเร็จ \r\n${data?.statusCode ?? ''}` } })
                }
                setTimeout(() => {
                    closeWaitingSign()

                }, 1000);
            }

        } catch (error) {
            setTimeout(() => {
                closeWaitingSign()

            }, 1000);
        } finally {
            setTimeout(() => {
                closeWaitingSign()

            }, 1000);
        }

    }

    const gotoLoginPage = () => {
        router.push('/user/login')
    }

    const onRegisterSuccess = async () => {
        memberDispatch({type:'SET_DEFAULT_ALERTMESSAGE'})
        await gotoLoginPage()
        setTimeout(() => {
            onClosePopup()
        }, 0)
    }

    const onClosePopup = () => {
        popupDispatch({ type: 'SET_DISPLAY', payload: { display: false, topic: '', body: 'test', action: null } })
    }

    return (
        <>
            <Waitingsignal></Waitingsignal>
                <Alertpopup></Alertpopup>
                <div className="layout_member">
                    <div className="box_login">
                        <UserComponent
                            topic='Register'
                            inputEmailDisplay='true'
                            inputPasswordDisplay='true'
                            inputPasswordConfirmDisplay='true'
                            onClickRegister={() => onRegister()}
                            onGotoLoginPage={() => gotoLoginPage()}
                        >

                        </UserComponent>
                    </div>
                </div>
            </>
            )
}