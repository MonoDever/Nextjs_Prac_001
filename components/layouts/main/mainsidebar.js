
export default function MainSidebar() {

    function openNav() {
        document.getElementById("mainSidebar").style.width = "200px";
        // document.getElementsByClassName("main-sidebar")[0].style.width = "200px !important"
        document.getElementsByClassName("main-content")[0].style.marginLeft = "200px";

        document.getElementById("openNav").style.display = "none";
        document.getElementById("closeNav").style.display = "inline"

        document.getElementById("sidebarBanner").style.display = 'flex'
    }

    function closeNav() {
        document.getElementById("mainSidebar").style.width = "50px";
        // document.getElementsByClassName("main-sidebar")[0].style.width = "50px"
        document.getElementsByClassName("main-content")[0].style.marginLeft = "50px";

        document.getElementById("openNav").style.display = "inline";
        document.getElementById("closeNav").style.display = "none"

        document.getElementById("sidebarBanner").style.display = 'none'
    }

    return (
        <div id="mainSidebar" className="main-sidebar">
            <div className="sidebar-grid">
                <div id='sidebarBanner' className="sidebar-banner-div is-3">
                    <label >ONIGIRI</label>
                </div>
                <div className="sidebar-opencloseNav-div">
                    <button id="openNav" className="sidebar-openNav-btn" onClick={() => openNav()}><i class="bi bi-list-task"></i></button>
                    <button id="closeNav" className="sidebar-closeNav-btn" onClick={() => closeNav()}><i class="bi bi-x-lg"></i></button>
                </div>
            </div>
        </div>
    )
}