import React from 'react'
import Spin from './image/Spin.gif'

function Spinner() {
    return (
        <div className="text-center">
            <img src={Spin} alt="" style={{width:'100px',height:'100px'}}/>
        </div>
    )
}

export default Spinner
