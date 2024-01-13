import { useContext, useEffect } from "react"
import { MemberContext } from "../../providers/membercontext"
import { useRouter } from "next/router";

export default function UserComponent(props) {
    const {topic,inputEmailDisplay,inputPasswordDisplay,onClickLogon} = props;
    const { memberState, memberDispatch } = useContext(MemberContext);

    useEffect(() => {
    })

    const onBindingEmail = (e) => {
        const email = e.target.value;
        memberDispatch({type:'SET_EMAIL',payload:{email:email}})
    }

    const onBindingPassword = (e) =>{
        const password = e.target.value;
        memberDispatch({type:'SET_PASSWORD',payload:{password:password}})
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
                        <label for="email" ><b>Email</b></label>
                        <input className='input_user' type="text" placeholder="Enter Email" name="email" id="email" required
                        onChange={(e)=>{onBindingEmail(e)}} value={memberState.userLogin.email}></input>
                    </div>

                    <div style={{ textAlign: 'left', display: inputPasswordDisplay ? 'inline' : 'none' }}>
                        <label for="Password" ><b>Password</b></label>
                        <input className='input_user' type="password" placeholder="Enter Password" name="password" id="password" required
                        onChange={(e)=>{onBindingPassword(e)}}></input>
                    </div>

                    <div style={{ textAlign: 'left', display: memberState.userStage.body.repeatePassword ? 'inline' : 'none' }}>
                        <label for="psw-repeat" ><b>Repeat Password</b></label>
                        <input className='input_user' type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required
                        ></input>
                    </div>

                </div>
            </div>
            {/* endbody */}
            {/* bottom */}
            <br></br>
            <div className="row">
                <div className="col-sm-4" style={{ alignSelf: 'self-end' }}>
                    <button onClick={memberState.userStage.bottom.register.func}>
                        {`<<${' register'}`}</button>
                </div>
                <div className="col-sm-4">
                    <button className="button_member" onClick={()=>onClickLogon()}>{'Log on'}</button>
                </div>
                <div className="col-sm-4" style={{ alignSelf: 'self-end' }}>
                    <button onClick={memberState.userStage.bottom.forgot.func}>
                        {`${'forgot password '}>>`}</button>
                </div>
            </div>
            {/* endbottom */}
        </>
    )
}