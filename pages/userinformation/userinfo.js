import { useContext, useEffect } from "react";
import Mainheader from "../../components/layouts/main/mainheader";
import Mainnavbar from "../../components/layouts/main/mainnavbar";
import MainTopbar from "../../components/layouts/main/maintopbar";
import { MemberContext } from "../../providers/membercontext";
import { GetUserDirectory, UpdateUserDirectory } from "../../services/userservices/userservice";
import { LayoutContext } from "../../providers/layoutcontext";

export default function userinfo() {
    const { memberState, memberDispatch } = useContext(MemberContext);
    const { layoutState, layoutDispatch } = useContext(LayoutContext);

    const openWaitingSign = () => {
        layoutDispatch({ type: 'SET_DISPLAY', payload: { display: true } })
    }

    const closeWaitingSign = () => {
        layoutDispatch({ type: 'SET_DISPLAY', payload: { display: false } })
    }

    useEffect(() => {
        onDisableInput()
        onLoadData()
    }, [])

    const onEnableBtn = () => {
        document.getElementById("fname").removeAttribute("disabled")
        document.getElementById("lname").removeAttribute("disabled")
        document.getElementById("phone").removeAttribute("disabled")
        document.getElementById("btnUpdate").removeAttribute("disabled")
        document.getElementById("fname").focus()
    }

    const onDisableInput = () => {
        document.getElementById("fname").setAttribute("disabled", '')
        document.getElementById("lname").setAttribute("disabled", '')
        document.getElementById("phone").setAttribute("disabled", '')
        document.getElementById("btnUpdate").setAttribute("disabled", '')
    }

    const onChangeFirstname = (e) => {
        e.preventDefault()
        let fname = e.target.value;
        memberDispatch({ type: "SET_FIRSTNAME", payload: { firstname: fname } })
    }

    const onChangeLastname = (e) => {
        e.preventDefault()
        let lname = e.target.value;
        memberDispatch({ type: "SET_LASTNAME", payload: { lastname: lname } })
    }

    const onChangePhone = (e) => {
        e.preventDefault()
        let phone = e.target.value;
        memberDispatch({ type: "SET_PHONE", payload: { phone: phone } })
    }

    const onUpdateInfo = async () => {
        alert(JSON.stringify(memberState.userInfo))
        const data = await UpdateUserDirectory(memberState.userInfo);

        alert(JSON.parse(JSON.stringify(data)))
    }

    const ontestjson = async () => {
        console.log({ test: { test: 'test' } })
    }

    const onLoadData = async () => {
        openWaitingSign();
        try{

            const data = await GetUserDirectory();
            if (data && data.result.status == true) {
                memberDispatch({ type: "SET_FIRSTNAME", payload: { firstname: data.userDirectory.firstname ?? '' } })
                memberDispatch({ type: "SET_LASTNAME", payload: { lastname: data.userDirectory.lastname ?? '' } })
                memberDispatch({ type: "SET_PHONE", payload: { phone: data.userDirectory.phone ?? '' } })
                memberDispatch({ type: "SET_EMAIL_INFO", payload: { email: data.userDirectory.email ?? '' } })
            }
        }catch(error){
            console.log(error)
        }finally{
            closeWaitingSign()
        }
            
    }

    return (
        <>
            <MainTopbar></MainTopbar>
            {/* <Mainheader /> */}
            <Mainnavbar />
            <div className="main-content-info">
                <div className='topic-content-info'>
                    <h1 onClick={ontestjson}>Information</h1>
                </div>
                <div className="grid-content-info">
                    <label className="label-info" htmlFor='fname'>Firstname :</label>
                    <input className="input-info" id="fname" type="text" placeholder="Firstname" disabled onChange={(e) => { onChangeFirstname(e) }} value={memberState.userInfo.firstname}></input>

                    <label className="label-info" htmlFor="lname">Lastname :</label>
                    <input className="input-info" id="lname" type="text" placeholder="Lastname" disabled onChange={(e) => { onChangeLastname(e) }} value={memberState.userInfo.lastname}></input>

                    <label className="label-info" htmlFor="email">Email :</label>
                    <input className="input-info" id="email" type="text" placeholder="Email" disabled value={memberState.userInfo.email}></input>

                    <label className="label-info" htmlFor='phone'>Phone :</label>
                    <input className="input-info" id="phone" type="text" placeholder="Phone" disabled onChange={(e) => { onChangePhone(e) }} value={memberState.userInfo.phone}></input>
                </div>
                <div className="grid-btn-info">
                    <div className="div-btn-left">
                        <button className="btn-border-red" onClick={onEnableBtn}>Edit</button>
                    </div>
                    <div className="div-btn-right">
                        <button id="btnUpdate" type="button" className="btn-border-blue" onClick={() => { onUpdateInfo() }}>Update</button>
                    </div>
                </div>
            </div>


        </>
    )
}