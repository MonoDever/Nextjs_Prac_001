import { createContext } from "react"

const initMemberState = {
    userLogin: { email: '', password: '' },
    userRegister: {},
    alertMessage: '',
    userStage: {
        headerText: 'test',
        body: { email: false, password: false, repeatPassword: false },
        bottom: {
            register: { text: '', func: null, display: false },
            login: { text: '', func: null, display: false },
            forgot: { text: '', func: null, display: false }
        }
    }
}

const MemberContext = createContext(initMemberState);
function memberReducer(state, action) {
    try {
        switch (action.type) {
            case 'SET_EMAIL':
                return { ...state, userLogin: { ...state.userLogin, email: action.payload.email }, alertMessage:'' }
            case 'SET_PASSWORD':
                return { ...state, userLogin: { ...state.userLogin, password: action.payload.password }, alertMessage:''  }
            case 'SET_CONFIRMPASSWORD':
                return { ...state, userLogin: { ...state.userLogin, confirmPassword: action.payload.confirmPassword }, alertMessage:''  }
            case 'SET_ALERTMESSAGE':
                return { ...state, alertMessage: action.payload.alertMessage }
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
            default: return state;
        }
    } catch (err) {

    } finally {
        console.log(`memberReducer: ${JSON.stringify(state)}`)
    }
}

export { initMemberState, MemberContext, memberReducer }