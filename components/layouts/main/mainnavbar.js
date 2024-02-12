import { useEffect } from "react";

export default function mainnavbar(){
    useEffect(() => {
        var header = document.getElementById("sideBAR");
        var btns = header.getElementsByClassName("sub-menu");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("active");
                current[0].className = current[0]?.className.replace(" active", "");
                this.className += " active";
            });
        }
    }, [])

    function myFunction(id,arrow) {
        var x = document.getElementById(id);
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
        //arrow
        var x = document.getElementById(arrow);
        if (x.className.indexOf("rotate-180") == -1) {
            x.className += " rotate-180";
        } else {
            x.className = x.className.replace(" rotate-180", "");
        }
    }
    return (
        <>
        <div className="appNav" >
                <a className="appNav-leftbar-banner">
                    <div className="flex-with">
                        <img className="appNav-img-side-bar" src="/next.svg"></img>
                    </div>
                    <div className="flex-with">
                        <h1 className="title is-1">ONIGIRI</h1>
                        <h3 className="subtitle is-2">Make Monies</h3>
                    </div>
                </a>
                <div id='sideBAR' className='side-bar' >
                    <div className="manu-btn" onClick={() => myFunction('Demo1','Arrow1')}>
                        <button className="title is-6 dropdown-manu"
                            ><i className="bi bi-person-lines-fill"></i> Profile    </button>
                        <div id="Arrow1" className=""><i className="bi bi-caret-down arrow"></i></div>
                    </div>

                    <div id='Demo1' className="w3-hide">
                        <a className="sub-menu ">Change password</a>
                        <a className="sub-menu active">User info</a>
                    </div>
                    <a className="sub-menu">Menu 3</a>
                    <a className="sub-menu">Menu 4</a>
                    <a className="sub-menu">Menu 5</a>
                    <a className="sub-menu">Menu 6</a>
                </div>
            </div>
        </>
    )
}