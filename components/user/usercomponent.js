import { useContext, useEffect, useState } from "react"
import { MemberContext } from "../../providers/membercontext"
import { PasswordInformation } from "../../common/functions/userfunction";
export default function UserComponent(props) {
    const { topic,
        inputEmailDisplay,
        inputPasswordDisplay,
        inputPasswordConfirmDisplay,
        onClickLogon,
        onClickRegister,
        onClickForgotPassword,
        onClickSendEmail,
        onClickVerifyCode,
        onGotoLoginPage,
        onGotoRegisterPage,
        onGotoForgotPasswordPage } = props;
    const { memberState, memberDispatch } = useContext(MemberContext);
    const [codeCount,setCodeCount] = useState(0)

    useEffect(() => {
    })

    const onBindingEmail = (e) => {
        const email = e.target.value;
        memberDispatch({ type: 'SET_EMAIL', payload: { email: email } })
    }

    const onBindingPassword = (e) => {
        const password = e.target.value;
        memberDispatch({ type: 'SET_PASSWORD', payload: { password: password } })
    }

    const onBindingConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        memberDispatch({ type: 'SET_CONFIRMPASSWORD', payload: { confirmPassword: confirmPassword } })
    }

    const onBindingVerifyCode = (e) =>{
        e.preventDefault()
        const code = e.target.value;
        memberDispatch({type:'SET_VERIFYCODE',payload: { verifycode : code}})
        setCodeCount(code.length)
    }

    return (
        <>
            {/* header */}
            <h1 className="user_header">{topic}</h1>
            {/* endheader */}
            {/* body */}
            <div className='container'>
                <div className='row'>

                    <div style={{ textAlign: 'left', display: inputEmailDisplay ? 'inline' : 'none' }}>
                        <label form="email" ><b>Email</b></label>
                        <input className='input_user' type="text" placeholder="Enter Email" name="email" id="email" required
                            onChange={(e) => { onBindingEmail(e) }} value={memberState.userLogin.email}></input>
                    </div>

                    <div style={{ textAlign: 'left', display: inputPasswordDisplay ? 'inline' : 'none' }}>
                        <label form="Password" ><b>{onClickForgotPassword ? 'New' : ''}Password</b></label>
                        <input className='input_user' type="password" placeholder="Enter Password" name="password" id="password" required
                            onChange={(e) => { onBindingPassword(e) }}></input>
                    </div>

                    <div style={{ textAlign: 'left', display: inputPasswordConfirmDisplay ? 'inline' : 'none' }}>
                        <label form="psw-repeat" ><b>Confirm {onClickForgotPassword ? 'New' : ''}Password</b></label>
                        <input className='input_user' type="password" placeholder="Confirm Password" name="psw-repeat" id="psw-repeat" required onChange={(e) => { onBindingConfirmPassword(e) }} 
                        ></input>
                    </div>

                </div>
                
                <div style={{display:memberState.alertMessage ? 'inline':'none'}}>
                    <i><i class="bi bi-dash-circle-fill" style={{ color:'red'}}></i></i>
                    <span style={{ textDecoration:'underline', color:'red'}}>{memberState.alertMessage}</span>
                </div>
                <br></br>
                <div style={{ display: onClickVerifyCode ? 'inline' : 'none'}}>
                    <span>Please check email : </span> <input placeholder="verifycode"  maxLength={6} onChange={(e) => onBindingVerifyCode(e)} style={{ border:'solid 1px black' }} value={memberState.userVerifyEmail.verifyCode} ></input>
                </div>
                {/* {passwordinfomation} */}
                <div style={{ textAlign: 'start',display: inputPasswordConfirmDisplay ? 'inline':'none' }}>
                    <PasswordInformation></PasswordInformation>
                </div>
                {/* {passwordinfomation} */}

            </div>
            {/* endbody */}

            {/* bottom */}
            <br></br>
            <div className="row">
                <div className="col-sm-4 div_btn_option" style={{ display: onGotoLoginPage ? 'flex' : 'none' }}>
                    <button className="btn_option" onClick={onGotoLoginPage}>
                    <i class="bi bi-caret-left icon_lr"></i>{`${' Login'}`}</button>
                </div>
                <div className="col-sm-4 div_btn_option" style={{ display: onGotoRegisterPage ? 'flex' : 'none' }}>
                    <button className="btn_option" onClick={onGotoRegisterPage}>
                    <i class="bi bi-caret-left"></i>{`${' register'}`}</button>
                </div>
                
                <div className="col-sm-4" style={{ display: onClickLogon ? 'inline' : 'none' }}>
                    <button className="button_member" onClick={() => onClickLogon()}>{'Logon'}</button>
                </div>
                <div className="col-sm-4" style={{ display: onClickRegister ? 'inline' : 'none' }}>
                    <button className="button_member" onClick={() => onClickRegister()}>{'Signup'}</button>
                </div>
                <div className="col-sm-4" style={{ display: onClickSendEmail ? 'inline' : 'none' }}>
                    <button className="button_member" onClick={() => onClickSendEmail()}>{memberState.userVerifyEmail.countSentEmail > 0 ? `Resend (${memberState.userVerifyEmail.countSentEmail})`:'Sendmail'}</button>
                </div>
                <div className="col-sm-4" style={{ display: onClickForgotPassword ? 'inline' : 'none' }}>
                    <button className="button_member" onClick={() => onClickForgotPassword()}>{'Sendmail'}</button>
                </div>
                <div className="col-sm-4" style={{ display: codeCount == 6 ? 'inline' : 'none' }}>
                    <button className="button_member" onClick={() => onClickVerifyCode()}>{'Verifycode'}</button>
                </div>

                <div className="col-sm-4 div_btn_option" style={{ display: onGotoForgotPasswordPage ? 'flex' : 'none' }}>
                    <button className="btn_option" onClick={() => onGotoForgotPasswordPage()}>
                        {`${'forgot password '}`}<i class="bi bi-caret-right"></i></button>
                </div>
            </div>
            {/* endbottom */}
        </>
    )
}