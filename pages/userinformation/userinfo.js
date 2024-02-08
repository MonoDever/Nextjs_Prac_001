import { useEffect } from "react";
import Mainheader from "../../components/layouts/main/mainheader";
import Mainnavbar from "../../components/layouts/main/mainnavbar";

export default function userinfo() {





    return (
        <>
            <Mainheader />
            <Mainnavbar />
            <div className="main-content-info">
                <div className='topic-content-info'>

                </div>
                <div className="grid-content-info">
                    <label className="label-info">Firstname :</label>
                    <input className="input-info" type="text" placeholder="Firstname"></input>

                    <label className="label-info">Lastname :</label>
                    <input className="input-info" type="text" placeholder="Lastname"></input>

                    <label className="label-info">Email :</label>
                    <input className="input-info" type="text" placeholder="Email" disabled></input>

                    <label className="label-info">Phone :</label>
                    <input className="input-info" type="text" placeholder="Phone"></input>
                </div>
            </div>


        </>
    )
}