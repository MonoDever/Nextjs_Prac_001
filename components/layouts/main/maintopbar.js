
export default function MainTopbar() {

    return (
        <div className="main-topbar">
            <ul className="topbar-ul">
                <li><a href="#Home">Home</a></li>
                <li><a href="#News">News</a></li>
                <li><a href="#Contract">Contract</a></li>
            </ul>
            <div>
                <ul className="topbar-ul">
                    <li><a ><span className="topbar-ul-username">firstname lastname</span></a></li>
                    <li><a href="#Log out">Log out</a></li>
                </ul>
            </div>
        </div>
    )
}