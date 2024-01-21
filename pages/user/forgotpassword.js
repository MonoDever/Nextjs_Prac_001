import UserComponent from "../../components/user/usercomponent"
import { MemberContext } from "../../providers/membercontext"
import { useContext, useEffect } from "react";
import { CheckConfirmPassword, ValidateEmail, ValidatePassword } from "../../common/functions/userfunction";
import { useRouter } from "next/router";
export default function forgotpassword() {
    const router = useRouter();
    const { memberState, memberDispatch } = useContext(MemberContext);

    useEffect(() => {
        const verifyCode = memberState.userVerifyEmail.verifyCode
        if(verifyCode == ''){
            alert('sorry! no entrance to forgot password page.')
            router.push('/user/login')
        }
    })

    const gotoLoginPage = () => {
        router.push('/user/login')
    }

    const onForgotpassword = async () => {
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
    }

    return (
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
    )
}