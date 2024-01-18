import { useContext, useEffect } from "react"
import { MemberContext } from "../../providers/membercontext"
import { useRouter } from "next/router";
import { PasswordInformation } from "../../common/functions/userfunction";
export default function UserComponent(props) {
    const { topic,
        inputEmailDisplay,
        inputPasswordDisplay,
        inputPasswordConfirmDisplay,
        onClickLogon,
        onGotoRegisterPage,
        onGotoLoginPage,
        onGotoForgotPassword,
        onClickRegister } = props;
    const { memberState, memberDispatch } = useContext(MemberContext);

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
                        <label form="Password" ><b>Password</b></label>
                        <input className='input_user' type="password" placeholder="Enter Password" name="password" id="password" required
                            onChange={(e) => { onBindingPassword(e) }}></input>
                    </div>

                    <div style={{ textAlign: 'left', display: inputPasswordConfirmDisplay ? 'inline' : 'none' }}>
                        <label form="psw-repeat" ><b>Confirm Password</b></label>
                        <input className='input_user' type="password" placeholder="Confirm Password" name="psw-repeat" id="psw-repeat" required onChange={(e) => { onBindingConfirmPassword(e) }}
                        ></input>
                    </div>

                </div>
                <div style={{display:memberState.alertMessage ? 'inline':'none'}}>
                    <i><i class="bi bi-dash-circle-fill" style={{ color:'red'}}></i></i>
                    <span style={{ textDecoration:'underline', color:'red'}}>{memberState.alertMessage}</span>
                </div>
                {/* {passwordinfomation} */}
                <div style={{ textAlign: 'start' }}>
                    <PasswordInformation></PasswordInformation>
                </div>
                {/* {passwordinfomation} */}
            </div>
            {/* endbody */}

            {/* bottom */}
            <br></br>
            <div className="row">
                <div className="col-sm-4" style={{ alignSelf: 'self-end', display: onGotoLoginPage ? 'inline' : 'none' }}>
                    <button onClick={onGotoLoginPage}>
                        {`<<${' Login'}`}</button>
                </div>
                <div className="col-sm-4" style={{ alignSelf: 'self-end', display: onGotoRegisterPage ? 'inline' : 'none' }}>
                    <button onClick={onGotoRegisterPage}>
                        {`<<${' register'}`}</button>
                </div>
                <div className="col-sm-4" style={{ display: onClickLogon ? 'inline' : 'none' }}>
                    <button className="button_member" onClick={() => onClickLogon()}>{'Logon'}</button>
                </div>
                <div className="col-sm-4" style={{ display: onClickRegister ? 'inline' : 'none' }}>
                    <button className="button_member" onClick={() => onClickRegister()}>{'Signup'}</button>
                </div>
                <div className="col-sm-4" style={{ alignSelf: 'self-end', display: onGotoForgotPassword ? 'inline' : 'none' }}>
                    <button onClick={() => onGotoForgotPassword()}>
                        {`${'forgot password '}>>`}</button>
                </div>
            </div>
            {/* endbottom */}
        </>
    )
}