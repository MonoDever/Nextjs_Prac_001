import { createContext, useEffect, useState, useContext } from 'react'
import Userheader from '../../components/user/userheader'
import Userbody from '../../components/user/userbody'
import Userbottom from '../../components/user/userbottom'
import { useRouter } from 'next/router'
import Waitingsignal from '../../components/layouts/waitingsignal'
import Popup from '../../components/utils/popup'
import { MemberContext } from '../../providers/membercontext'
import UserComponent from '../../components/user/usercomponent'

const UserContext = createContext(null)

export default function member() {
    const router = useRouter()
    const [userLogin, setUserLogin] = useState({ username: 'test003', password: 'passwordTest003', displayState: 'none' })
    const [displayState, setDisplayState] = useState('none');

    const { memberState, memberDispatch } = useContext(MemberContext)


    useEffect(() => {
        setupLogin()
    }, [])

    const setupLogin = () => {
        memberDispatch({
            type: 'login',
            payload: {
                headerText: 'Login',
                body: { email: true, password: true, repeatPassword: true },
                bottom: {
                    register: { text: 'Register',func: gotoRegister, display: true },
                    login:{text:'OK',func:loginCallback,display:true},
                    forgot:{text:'forgotpassword',func:gotoForgotPassword,display:true}
                }
            }
        })
    }

    const loginCallback = async (response) => {
        if (response.userId != undefined) {
            router.push('/main/landing')
        }
    }
    const gotoRegister = () => {
        alert('register')
    }

    const gotoForgotPassword = () => {
        alert('forgotpassword')
    }


    return (
        <UserContext.Provider value={{ userLogin, setUserLogin }}>
            <Waitingsignal inline={displayState}></Waitingsignal>
            <Popup></Popup>
            <div className="layout_member" >
                <div className="box_login">
                    <UserComponent></UserComponent>
                </div>
            </div>
        </UserContext.Provider>
    )
}
export { UserContext }