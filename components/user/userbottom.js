import { Button } from "@mui/material"
import { Stack, CircularProgress } from "@mui/material";
import { UserLogin } from "../../services/userservices/userservice";
import { useContext, useEffect } from "react";
import { UserContext } from "../../pages/user/member";
import { useRouter } from "next/router";
import { PopupContext } from "../../providers/popupcontext";

export default function userbottom(props) {
    const { loginCallback } = props
    const router = useRouter();
    const { userLogin, setUserLogin } = useContext(UserContext)
    const { popupState,popupDispatch} = useContext(PopupContext)

    useEffect(() => {
        console.log(userLogin)
    }, [])

    const CallUserLogin = async () => {
        setUserLogin({...userLogin, displayState: 'inline'})
        const body = userLogin;
        // console.log(body)
        const res = await UserLogin(body)
        // console.log(res)
        setTimeout(() => {
                    // loginCallback(res)
        setUserLogin({...userLogin, displayState: 'none'})
        }, 3000)
        popupDispatch({type:'openpopup'})
    }

    async function sleep(ms) {
            return await new Promise(resolve => setTimeout(resolve, ms));
          }

    return (
        <>
            <br></br>
            <div className="row">
                <div className="col-sm-4" style={{ alignSelf: 'self-end' }}>
                    <button onClick={() => router.push('/user/login')}>{'<<register'}</button>
                </div>
                <div className="col-sm-4">
                    <button
                        style={{ color: 'black' }} onClick={CallUserLogin}>Send </button>
                </div>
                {/* <div className="col-sm-4">
                    <Button variant="contained" size="large"
                        style={{ color: 'black' }} onClick={CallUserLogin}>Send </Button>
                </div> */}
                <div className="col-sm-4" style={{ alignSelf: 'self-end' }}>
                    <button onClick={() => router.back()}>{'forgotpassword>>'}</button>
                </div>
            </div>
        </>
    )
}