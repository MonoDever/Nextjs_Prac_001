import UserComponent from "../../components/user/usercomponent"
import { useRouter } from "next/router"
import { MemberContext } from "../../providers/membercontext"
import { useContext } from "react"
import { sha256 } from "js-sha256"
import { ValidateEmail, ValidatePassword, CheckConfirmPassword } from "../../common/functions/userfunction"
import Alertpopup from "../../components/layouts/alertpopup"
import { PopupContext } from "../../providers/popupcontext"
import { UserSignup } from "../../services/userservices/userservice"
import { LayoutContext } from "../../providers/layoutcontext"

export default function register() {
    const { memberState, memberDispatch } = useContext(MemberContext)
    const { popupState, popupDispatch } = useContext(PopupContext)
    const { layoutState, layoutDispatch} = useContext(LayoutContext)
    const router = useRouter()

    const onRegister = async () => {
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
            layoutDispatch({ type: 'SET_DISPLAY', payload: { display: true } })
            const params = { username: '', password: '' }
            params.username = user.email;
            params.password = sha256(user.password);

            const data = await UserSignup(params);
            if (data.result && data.result == 'SUCCESS') {
                popupDispatch({ type: 'SET_DISPLAY', payload: { display: true, topic: 'Alert', body: 'Register is success', action: onRegisterSuccess } })
            }else{
                memberDispatch({ type: 'SET_ALERTMESSAGE', payload: { alertMessage: `เข้าสู่ระบบไม่สำเร็จ \r\n${data.errorMessage}` } })
            }
            layoutDispatch({ type: 'SET_DISPLAY', payload: { display: false } })
        }
    }

    const gotoLoginPage = () => {
        router.push('/user/login')
    }

    const onRegisterSuccess = async () =>{
        await gotoLoginPage()
        setTimeout(()=>{
            onClosePopup()
        },1000)
    }

    const onClosePopup = () => {
        popupDispatch({ type: 'SET_DISPLAY', payload: { display: false, topic: '', body: 'test', action: null } })
    }

    return (
        <>
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