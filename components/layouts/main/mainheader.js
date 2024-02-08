
export default function mainheader(){

    return(
        <>
        <div className="top-header">
                <div className="top-left-header">
                    <div className="top-left-sub-header">
                        <div className="top-mini-box a-margin-top">
                            <a className="top-text top-menu">MENU</a>
                        </div>
                        <div className="top-mini-box a-margin-top">
                            <a className="top-text">about</a>
                        </div>
                        <div className="top-mini-box a-margin-top">
                            <a className="top-text">userinfo</a>
                        </div>
                    </div>
                </div>
                <div className="top-right-header">
                    <div className="top-right-sub-header">
                        <div className="top-mini-box i-margin-top">
                            <i class="bi bi-person-fill-up is-3"> </i>
                        </div>
                        <div className="top-mini-box">
                            <h6 className="h-margin-top">firstname lastname</h6>
                        </div>
                        <div className="top-mini-box i-margin-top">
                            <i class="bi bi-box-arrow-right is-3"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}