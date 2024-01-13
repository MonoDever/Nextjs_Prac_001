import { useContext } from "react"
import { UserContext } from "../../pages/user/member";
import { MemberContext } from "../../providers/membercontext";

const Userheader = (props) => {
    const user = useContext(UserContext);
    const {memberState,memberDispatch} = useContext(MemberContext)

    return (
        <>
        <h1 className="user_header">{memberState.userStage.headerText}</h1>
        {/* <h1 className="user_header">{props.name}</h1> */}
        {/* <h1 className="user_header">{user}</h1> */}
        </>
    )
}
export default Userheader

