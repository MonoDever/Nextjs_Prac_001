import '../styles/globals.css'
import '../styles/userStyle/userCSS.css'
import 'bootstrap/dist/css/bootstrap.css'
import { popupReducer, PopupContext, initPopupState } from '../providers/popupcontext'
import { memberReducer, MemberContext, initMemberState } from '../providers/membercontext'
import { layoutReducer, LayoutContext, initLayoutState } from '../providers/layoutcontext'
import { useReducer } from 'react'

export default function App({ Component, pageProps }) {
  const [popupState, popupDispatch] = useReducer(popupReducer, initPopupState)
  const [memberState, memberDispatch] = useReducer(memberReducer, initMemberState)
  const [layoutState, layoutDispatch] = useReducer(layoutReducer, initLayoutState)

  return (
    <PopupContext.Provider value={{ popupState, popupDispatch }}>
      <MemberContext.Provider value={{ memberState, memberDispatch }}>
        <LayoutContext.Provider value={{ layoutState, layoutDispatch }}>
          <Component {...pageProps} />
        </LayoutContext.Provider>
      </MemberContext.Provider>
    </PopupContext.Provider>
  )
}