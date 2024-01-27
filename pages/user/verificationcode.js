import UserComponent from "../../components/user/usercomponent"
import { useRouter } from "next/router";
import { MemberContext } from "../../providers/membercontext";
import { useContext } from "react";
import { ValidateEmail } from "../../common/functions/userfunction";
import { SendMailForVerifyCode, ValidateVerifyCode } from "../../services/userservices/userservice";
import { verify } from "crypto";
export default function verificationcode() {
    const router = useRouter();
    const { memberState, memberDispatch } = useContext(MemberContext);

    const gotoLoginPage = () => {
        router.push('/user/login')
    }

    const onVerifyCode = async () => {
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

        let data = await ValidateVerifyCode({ email: user.email, verifyCode:verifycode})
        if(data && data.result == 'success'){
            router.push('/user/forgotpassword')
        }else{
            memberDispatch({type: 'SET_VERIFYCODE', payload: {verifycode:''}})
        }
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

        let data = await SendMailForVerifyCode({ email: user.email });
        if (data && data.result == 'success') {
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