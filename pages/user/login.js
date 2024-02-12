import React, { useContext, useState } from "react";
import UserComponent from "../../components/user/usercomponent";
import { UserLogin } from "../../services/userservices/userservice";
import { MemberContext } from "../../providers/membercontext";
import { LayoutContext } from "../../providers/layoutcontext";
import { PopupContext } from "../../providers/popupcontext";
import Waitingsignal from "../../components/layouts/waitingsignal";
import Alertpopup from "../../components/layouts/alertpopup";
import { useRouter } from "next/router";
import { sha256 } from "js-sha256";

const login = () => {
    const { memberState, memberDispatch } = useContext(MemberContext)
    const { layoutState, layoutDispatch } = useContext(LayoutContext)
    const { popupState, popupDispatch } = useContext(PopupContext)
    const router = useRouter();

    const onLogon = async () => {
        layoutDispatch({ type: 'SET_DISPLAY', payload: { display: true } })
        const data = await UserLogin({ userId: '', username: memberState.userLogin.email, password: sha256(memberState.userLogin.password) })
        if (data) {
            await popupDispatch({ type: 'SET_DISPLAY', payload: { display: true, topic: 'แจ้งเตือน', body: 'เข้าสู่ระบบสำเร็จ', action: onClosePopup } })
            localStorage.setItem('token', JSON.stringify(data.auth))
        } else {
            popupDispatch({ type: 'SET_DISPLAY', payload: { display: true, topic: 'แจ้งเตือน', body: 'เข้าสู่ระบบไม่สำเร็จ', action: onClosePopup } })
        }
        layoutDispatch({ type: 'SET_DISPLAY', payload: { display: false } })

        router.push('/userinformation/userinfo')
    }

    const onClosePopup = () => {
        popupDispatch({ type: 'SET_DISPLAY', payload: { display: false, topic: '', body: 'test', action: null } })
    }

    const gotoRegisterPage = () => {
        router.push('/user/register')
    }

    const gotoForgotPasswordPage = () =>{
        router.push('/user/verificationcode')
    }

    return (
        <>
            <Waitingsignal></Waitingsignal>
            <Alertpopup></Alertpopup>
            <div className="layout_member">
                <div className="box_login">
                    <UserComponent
                        topic='Login'
                        inputEmailDisplay='true'
                        inputPasswordDisplay='true'
                        onClickLogon={() => onLogon()}
                        onGotoRegisterPage={() => gotoRegisterPage()}
                        onGotoForgotPasswordPage={() => gotoForgotPasswordPage()}

                    ></UserComponent>
                </div>
            </div>
        </>
    )
}

export default login