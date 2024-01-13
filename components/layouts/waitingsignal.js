import { CircularProgress } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { LayoutContext } from "../../providers/layoutcontext"

export default function waitingsignal(props) {
    const { inline } = props
    const {layoutState,layoutDispatch} = useContext(LayoutContext)

    return (
        <>
            <div style={{
                height: '100%', width: '100%', position: 'absolute', opacity: '1', zIndex: '1'
                , backgroundColor: 'rgba(0, 0, 0, 0.25)', top: '0', 
                display: layoutState.waitingSignal.display == true ? 'inline' : 'none' 
            }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
                    <CircularProgress />
                </div>
            </div>
        </>
    )
}