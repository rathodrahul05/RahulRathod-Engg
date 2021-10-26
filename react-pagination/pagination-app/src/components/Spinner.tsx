import React from 'react'
import Spin from './image/Spin.gif'

function Spinner() {
    return (
        <div className="text-center">
            <img src={Spin} alt="" style={{width:'100px',height:'100px',zIndex:1,position:'absolute',top:'0%'}}/>
        </div>
    )
}

export default Spinner
