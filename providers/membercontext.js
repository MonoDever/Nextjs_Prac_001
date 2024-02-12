import { createContext } from "react"

const initMemberState = {
    userLogin: { email: '', password: '' },
    userVerifyEmail: { verifyCode: '', countSentEmail: 0 },
    alertMessage: '',
    userStage: {
        headerText: 'test',
        body: { email: false, password: false, repeatPassword: false },
        bottom: {
            register: { text: '', func: null, display: false },
            login: { text: '', func: null, display: false },
            forgot: { text: '', func: null, display: false }
        }
    },
    userInfo: {
        firstname: '', lastname: '', email: '', phone: ''
    }
}

const MemberContext = createContext(initMemberState);
function memberReducer(state, action) {
    try {
        switch (action.type) {
            case 'SET_EMAIL':
                return { ...state, userLogin: { ...state.userLogin, email: action.payload.email }, alertMessage: '' }
            case 'SET_PASSWORD':
                return { ...state, userLogin: { ...state.userLogin, password: action.payload.password }, alertMessage: '' }
            case 'SET_CONFIRMPASSWORD':
                return { ...state, userLogin: { ...state.userLogin, confirmPassword: action.payload.confirmPassword }, alertMessage: '' }
            case 'SET_ALERTMESSAGE':
                return { ...state, alertMessage: action.payload.alertMessage }
            case 'SET_SENTMAIL':
                return { ...state, userVerifyEmail: { ...state.userVerifyEmail, countSentEmail: action.payload.countSentEmail } }
            case 'SET_VERIFYCODE':
                return { ...state, userVerifyEmail: { ...state.userVerifyEmail, verifyCode: action.payload.verifycode } }
            case 'login':
                state = {
                    ...state, userStage: {
                        ...state.userStage,
                        headerText: action.payload.headerText,
                        body: action.payload.body,
                        bottom: action.payload.bottom
                    }
                }
                return state
            case 'register':
                state = { ...state, userStage: { ...state.userStage, headerText: 'Register' } }
                return state;
            case 'SET_FIRSTNAME':
                return { ...state, userInfo: { ...state.userInfo, firstname: action.payload.firstname } }
            case 'SET_LASTNAME':
                return { ...state, userInfo: { ...state.userInfo, lastname: action.payload.lastname } }
            case 'SET_PHONE':
                return { ...state, userInfo: { ...state.userInfo, phone: action.payload.phone } }
            case 'SET_EMAIL_INFO':
                return { ...state, userInfo: { ...state.userInfo, email: action.payload.email } }
            default: return state;
        }
    } catch (err) {

    } finally {
        console.log({memberReducer : state})
    }
}

export { initMemberState, MemberContext, memberReducer }