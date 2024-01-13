import React, { useContext, useState } from "react";
import UserComponent from "../../components/user/usercomponent";
import { UserLogin } from "../../services/userservices/userservice";
import { MemberContext } from "../../providers/membercontext";
import { LayoutContext } from "../../providers/layoutcontext";
import Waitingsignal from "../../components/layouts/waitingsignal";

const login = () => {
    const {memberState,memberDispatch} = useContext(MemberContext)
    const {layoutState,layoutDispatch} = useContext(LayoutContext)

    const onLogon = async () =>{
        layoutDispatch({type:'SET_DISPLAY',payload:{display:true}})
        const data = await UserLogin({userId:'',username:memberState.userLogin.email,password:memberState.userLogin.password})
        if(data){
            localStorage.setItem('token',data.auth)
        }
        alert(`${JSON.stringify(data)}`)
        layoutDispatch({type:'SET_DISPLAY',payload:{display:false}})
    }

    return (
        <>
        <Waitingsignal></Waitingsignal>
        <div className="layout_member">
            <div className="box_login">
                    <UserComponent 
                    topic='Login' 
                    inputEmailDisplay='true'
                    inputPasswordDisplay='true'
                    onClickLogon= {()=>onLogon()}
                    ></UserComponent>
                </div>
        </div>
        </>
    )
}

export default login