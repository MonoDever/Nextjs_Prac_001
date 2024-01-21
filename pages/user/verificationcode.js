import UserComponent from "../../components/user/usercomponent"
import { useRouter } from "next/router";
import { MemberContext } from "../../providers/membercontext";
import { useContext } from "react";
import { ValidateEmail } from "../../common/functions/userfunction";
export default function verificationcode() {
    const router = useRouter();
    const { memberState, memberDispatch } = useContext(MemberContext);

    const gotoLoginPage = () => {
        router.push('/user/login')
    }

    const onVerifyCode = () =>{
        
        router.push('/user/forgotpassword')
    }

    const onSendEmail = async () => {
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
        alert('sendEmail')
        let data = "Success"
        if (data && data == 'Success') {
            memberDispatch({ type: 'SET_SENTMAIL', payload: { countSentEmail: memberState.userVerifyEmail.countSentEmail + 1 } })
        }
    }

    return (
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
    )
}